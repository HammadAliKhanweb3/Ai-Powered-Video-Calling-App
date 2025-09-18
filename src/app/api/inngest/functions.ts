import { StreamTranscriptItem } from "@/modules/meetings/types";
import { inngest } from "../../../inngest/client";
import JSONL  from "jsonl-parse-stringify" ;
import { agents, meetings, user } from "@/db/schema";
import { db } from "@/db";
import { eq, inArray } from "drizzle-orm";
import {createAgent,TextMessage,gemini,openai} from "@inngest/agent-kit"


const summarizer = createAgent({
    name:"summarizer",
    system:`
Skip to content
Navigation Menu
AntonioErdeljac
meet-ai-assets

Code
Pull requests
Actions
Security

    Insights

    meet-ai-assets

/system-prompt.txt
t
 

19 lines (14 loc) · 850 Bytes
You are an expert summarizer. You write readable, concise, simple content. You are given a transcript of a meeting and you need to summarize it.

Use the following markdown structure for every output:

### Overview
Provide a detailed, engaging summary of the session's content. Focus on major features, user workflows, and any key takeaways. Write in a narrative style, using full sentences. Highlight unique or powerful aspects of the product, platform, or discussion.

### Notes
Break down key content into thematic sections with timestamp ranges. Each section should summarize key points, actions, or demos in bullet format.

Example:
#### Section Name
- Main point or demo shown here
- Another key insight or interaction
- Follow-up tool or explanation provided

#### Next Section
- Feature X automatically does Y
- Mention of integration with Z
Footer
© 2025 GitHub, Inc.
Footer navigation

    Terms
    Privacy
    Security
    Status
    Docs
    Contact

` .trim(),
    model:gemini({model:"gemini-2.0-flash-lite",apiKey:process.env.GEMENI_API_KEY})
}
)



export const meetingsProccessing = inngest.createFunction(
  { id: "meetings/proccessing" },
  { event: "meetings/proccessing" },
  async ({ event, step }) => {

    const response =await step.run("fetch-transcript",async()=>{
        return fetch(event.data.transcriptUrl).then((res)=>res.text())
    })
    
   
    const transcript = await step.run("parse-transcript",async()=>{
        return JSONL.parse<StreamTranscriptItem>(response)
    
  },)

  const transcriptWithSpeakers = await step.run("add-speaker",async ()=>{
    const speakerIds = [...new Set(transcript.map(item=>item.speaker_id))]

    const userSpeakers = await db
      .select()
      .from(user)
      .where(inArray(user.id, speakerIds))
      .then((users)=>
        users.map((user)=>({
        ...user,
    })))
    
    const agentSpeakers = await db
      .select()
      .from(agents)
      .where(inArray(agents.id, speakerIds))
      .then((agents)=>
        agents.map((agent)=>({
        ...agent
    })))
  
    const speakers = [...userSpeakers,...agentSpeakers]

    return transcript.map((item)=>{
        const speaker = speakers.find(
            (speaker)=>speaker.id === item.speaker_id
        )

        if(!speaker){
            return{
                ...item,
                user:{
                    name:"unknown"
                }
            }
        }

        return{
            ...item,
            user:{
                name:speaker.name
            }
        }
    })

    
  })

const {output} = await summarizer.run(
    "Summarize the following transcript: " + JSON.stringify(transcriptWithSpeakers)
)

await step.run("save-summary", async ()=>{
    await db
    .update(meetings)
    .set({
        summary:(output[0] as TextMessage).content as string,
        status:"completed"
    })
    .where(eq(meetings.id,event.data.meetingId))
})
}
);

// this is my transcript url @https://ohio.stream-io-cdn.com/1415932/video/transcriptions/default_KLgU23gAEo5PF4GMRez0m/transcript_default_KLgU23gAEo5PF4GMRez0m_1756553491346.jsonl?Expires=1757763120&Signature=ZF7TYD8HZ-qe~SKYLfD6krGLKcnJFVjWbW6tkxeAC1hYzTDCQDk9GMxMdbLutq8i8mIPQ9nJNI9iXSXhyk-fTRcb4oAUM4avP08w23OZvmLuESklowbRqcxiN3i2Owi77DQzQewGaYeQd1cSwcCIg-59lWCiWWneFEQRsYp0HXGAOQbdQr0sgk9V1IiTaqfuG5a~lgwbM5DWuGO4vCfFRWL0fjxtiSuP-Kgnd2JSsvXEs0QvueWfGHlHR0rWIwVrS1eGwGC6pQYxrJuuxCpEit4sA5jvqbU3DtbY4R5jPQtWP4ASFQwIF8AYCUpGTV5Pd4IJzX0j9hcfC4prRirIPA__&Key-Pair-Id=APKAIHG36VEWPDULE23Q 
// everything runs well but the input and output is empty in inngest 