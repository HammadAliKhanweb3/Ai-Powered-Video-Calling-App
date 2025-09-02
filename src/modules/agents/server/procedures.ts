import { db } from "@/db";
import { agents } from "@/db/schema";
import { createTRPCRouter, premiumProcudure, protectedProcedure } from "@/trpc/init";
import { agentInsertSchema, agentUpdateSchema } from "../schema";
import z from "zod";
import { and, desc, eq, getTableColumns, ilike, sql } from "drizzle-orm";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, MIN_PAGE_SIZE } from "@/constants";
import { count } from "drizzle-orm";
import { TRPCError } from "@trpc/server";



export const agentRouter = createTRPCRouter({





   update:protectedProcedure
   .input(agentUpdateSchema)
   .mutation(async ({input,ctx})=>{

    const updatedAgent = await db
    .update(agents)
    .set(input)
    .where(
    and(
        eq(agents.id,input.id),
        eq(agents.userId,ctx.auth.user.id),

    )
    ).returning()

    if(!updatedAgent){
        throw new TRPCError({code:"UNAUTHORIZED",message:"Agent not found"})
      }
      return updatedAgent


    
   }),

    remove:protectedProcedure
    .input(
        z.object({id:z.string()}))
        .mutation(async ({input,ctx})=>{

          const [removedAgent] = await db
          .delete(agents)
          .where(
            and(
                eq(agents.id,input.id),
                eq(agents.userId,ctx.auth.user.id)
          ) ).returning()


          if(!removedAgent){
            throw new TRPCError({code:"UNAUTHORIZED",message:"Agent not found"})
          }
          return removedAgent
    }),



    
    getOne:protectedProcedure.input(z.object({id:z.string()})).query(async({input,ctx})=>{

        const [existingData] = await db.
        select(
            { ...getTableColumns(agents),
            meetingCount: sql<number>`5`}
        )
        .from(agents)
        .where(
            and(
            eq(agents.id,input.id),
            eq(agents.userId,ctx.auth.user.id)
        ),              )

        if(!existingData){
           throw new TRPCError({code:"UNAUTHORIZED",message:"Agents not exists"})
        }


        return existingData

    }),



    
    getMany:protectedProcedure.input(z
        .object({
            page:z.number().default(DEFAULT_PAGE),
            pageSize:z.number().min(MIN_PAGE_SIZE).max(MAX_PAGE_SIZE).default(DEFAULT_PAGE_SIZE),
            search:z.string().nullish()
        })
    )
    .query(async({ctx,input})=>{
       
        const {search,pageSize,page}=input

        const data = await db.select( 
            //TODO change to actual count
          {  meetingCount:sql<number>`6`,
            ...getTableColumns(agents)}
        ).
        from(agents)
        .where(
            and(
                eq(agents.userId,ctx.auth.user.id),
                search ? ilike(agents.name,`%${search}%`) :undefined,
            )
        ).orderBy(desc(agents.createdAt),desc(agents.id))
        .limit(pageSize)
        .offset((page-1) *pageSize)


        const [total] = await db
        .select({ count:count() })
        .from(agents)
        .where(
            and(
                eq(agents.userId,ctx.auth.user.id),
                search ? ilike(agents.name,`%${search}%`) :undefined,
            )
        )        

        const totalPages = Math.ceil(total.count/pageSize)

        
        

        return {
            items:data,
            total:total.count,
            totalPages}

    }),

     create: premiumProcudure("agents")
     .input(agentInsertSchema)
     .mutation(async ({input,ctx})=>{        
        const [createdAgent] = await
        db.insert(agents)
        .values({
            ...input, 
            userId: ctx.auth.user.id
        }).returning()

        return createdAgent
     })
    
     

})