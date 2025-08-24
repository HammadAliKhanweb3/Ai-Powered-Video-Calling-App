import { StreamTheme, useCall } from "@stream-io/video-react-sdk"
import { useState } from "react"
import { CallLobby } from "./call-lobby"
import { CallActive } from "./call-active"
import { CallEnded } from "./call-ended"




interface Props{
    meetingName:string
}

export const CallUi = ({meetingName}:Props)=>{


    const call = useCall()
    const [show ,setShow] = useState<"lobby"|"call"|"ended">("lobby")
   
   
    const handleJoin =async ()=>{

    if(!call) return

    try {
      await call.join()
    } catch (error) {
      console.log(error);
      
    }
    
    setShow("call")

    }
    
    const handleLeave =async ()=>{

    if(!call) return

    await call.endCall()

    setShow("ended")

    }


    return(
      <StreamTheme className="min-h-screen">
           {show === "lobby" && <CallLobby onJoin={handleJoin}/>}
           {show === "call" && <CallActive onLeave={handleLeave} meetingName={meetingName}/>}
           {show === "ended" && <CallEnded/>}
      </StreamTheme>
    )



}