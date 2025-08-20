import { db } from "@/db";
import { agents, meetings } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import z from "zod";
import { and, desc, eq, getTableColumns, ilike,  sql } from "drizzle-orm";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, MIN_PAGE_SIZE } from "@/constants";
import { count } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { meetingsInsertSchema, meetingsUpdateSchema } from "../schema";
import { MeetingStatus } from "../types";



export const meetingsRouter = createTRPCRouter({

       update:protectedProcedure
       .input(meetingsUpdateSchema)
       .mutation(async ({input,ctx})=>{
    
        const updatedMeeting = await db
        .update(meetings)
        .set(input)
        .where(
        and(
            eq(meetings.id,input.id),
            eq(meetings.userId,ctx.auth.user.id),
    
        )
        ).returning()
    
        if(!updatedMeeting){
            throw new TRPCError({code:"UNAUTHORIZED",message:"Meeting not found"})
          }
          return updatedMeeting
    
    
        
       }),

    create: protectedProcedure
         .input(meetingsInsertSchema)
         .mutation(async ({input,ctx})=>{        
            
            const [createdMeeting] = await
            db.insert(meetings)
            .values({
                ...input, 
                userId: ctx.auth.user.id
            }).returning()
    
            return createdMeeting

            //TODO: create stream Call,Upsert stream Call
         }),
    
    getOne:protectedProcedure.input(z.object({id:z.string()})).query(async({input,ctx})=>{

        const [existingData] = await db.
        select(
            { ...getTableColumns(meetings),}
        )
        .from(meetings)
        .where(
            and(
            eq(meetings.id,input.id),
            eq(meetings.userId,ctx.auth.user.id)
        ),              )

        if(!existingData){
           throw new TRPCError({code:"UNAUTHORIZED",message:"Meetings not exists"})
        }


        return existingData

    }),



    
    getMany:protectedProcedure.input(z
        .object({
            page:z.number().default(DEFAULT_PAGE),
            pageSize:z.number().min(MIN_PAGE_SIZE).max(MAX_PAGE_SIZE).default(DEFAULT_PAGE_SIZE),
            search:z.string().nullish(),
            agentId:z.string().nullish(),
            status:z
            .enum([
                MeetingStatus.UpComing,
                MeetingStatus.Active,
                MeetingStatus.Completed,
                MeetingStatus.Processing,
                MeetingStatus.Cancelled,

            ]).nullish() 
        })
    )
    .query(async({ctx,input})=>{
       
        const {search,pageSize,page,agentId,status}=input

        const data = await db.select( 
            //TODO change to actual count
          {
            ...getTableColumns(meetings),
            agent:agents,
            duration:sql<number>`EXTRACT(EPOCH FROM (ended_at - started_at))`.as("duration")

        
        }
        ).
        from(meetings)
        .innerJoin(agents,eq(meetings.agentId,agents.id))
        .where(
            and(
                eq(meetings.userId,ctx.auth.user.id),
                search ? ilike(meetings.name,`%${search}%`) :undefined,
                agentId? eq(meetings.agentId,agentId):undefined,
               status? eq(meetings.status,status):undefined,

            )
        ).orderBy(desc(meetings.createdAt),desc(meetings.id))
        .limit(pageSize)
        .offset((page-1) *pageSize)


        const [total] = await db
        .select({ count:count() })
        .from(meetings)
        .where(
            and(
                eq(meetings.userId,ctx.auth.user.id),
                search ? ilike(meetings.name,`%${search}%`) :undefined,
            )
        )        

        const totalPages = Math.ceil(total.count/pageSize)

        
        

        return {
            items:data,
            total:total.count,
            totalPages}

    }),

     

})