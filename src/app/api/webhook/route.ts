import { db } from "@/db";
import { agents, meetings } from "@/db/schema";
import { streamVideo } from "@/lib/stream-video";
import { CallSessionStartedEvent } from "@stream-io/node-sdk";
import { error } from "console";
import { and, eq, not } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";




function verifyVideoSignatureSdk (body:string,signature:string):boolean{
    return streamVideo.verifyWebhook(body,signature)

}



export async function POST(req:NextRequest){
    const signature = req.headers.get("x-signature")
    const apiKey = req.headers.get("x-api-key")


    if(!signature || !!apiKey){
        return NextResponse.json(
            {error:"Missing signature or API key"},
            {status:400}
        )
    }


    const body = await req.text()

    if(!verifyVideoSignatureSdk(body,signature)){
        return NextResponse.json({error:"Invalid signature"},{status:401})
    }

    let payload: unknown


   try {
     payload = JSON.parse(body) as Record<string,unknown>
   } catch (error) {
    return NextResponse.json({error:"Invalid signature"},{status:401})
   }
    
   const eventType = (payload as Record<string,unknown>)?.type



  if(eventType == "call.session_started"){

    const event = payload as CallSessionStartedEvent

    const meetingId  = event.call.custom?.meetingId

   const [existingMeeting]= await db
    .select()
    .from(meetings)
    .where(
        and(
            eq(meetings.id,meetingId),
            not(eq(meetings.status,"completed")),
            not(eq(meetings.status,"active")),
            not(eq(meetings.status,"cancelled")),
            not(eq(meetings.status,"processing"))
        
        )
    )

    if(!existingMeeting){
        return NextResponse.json({error:"Meeting not found"},{status:404})
    }

    await db
    .update(meetings)
    .set({
        status:"active",
        startedAt:new Date()
    })
    .where(
        eq(meetings.id,existingMeeting.id)
    )


    const [existingAgent] = 
    await db
    .select()
    .from(agents)
    .where(
        eq(agents.id,existingMeeting.agentId)
    )

     if(!existingMeeting){
        return NextResponse.json({error:"Agent not found"},{status:404})
    }

    // const call 


  }
  




   return NextResponse.json({status:"ok"})
    
}