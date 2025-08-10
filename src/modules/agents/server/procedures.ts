import { db } from "@/db";
import { agents } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { agentInsertSchema } from "../schema";
import z from "zod";
import { eq, getTableColumns, sql} from "drizzle-orm";



export const agentRouter = createTRPCRouter({

    // TODO  Change getMany to use Protected route
    getOne:protectedProcedure.input(z.object({id:z.string()})).query(async({input})=>{

        const [existingData] = await db.
        select(
           { 
            // TODO: add actual meetingCount
            ...getTableColumns(agents),
            meetingCount: sql<number>`5,`}
        )
        .from(agents)
        .where(eq(agents.id,input.id))
        
        return existingData

    }),
    
    getMany:protectedProcedure.query(async()=>{
        const data = await db.select().from(agents)
        await new Promise((resolve)=>{setTimeout(resolve,1000)})
        return data

    }),

     create: protectedProcedure
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