import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import { generatedAvatarUri } from "@/lib/avatar"
import { DefaultVideoPlaceholder, StreamVideoParticipant, ToggleAudioPreviewButton, ToggleVideoPreviewButton, useCallStateHooks, VideoPreview } from "@stream-io/video-react-sdk"


import  "@stream-io/video-react-sdk/dist/css/styles.css"
import { LogInIcon } from "lucide-react"
import Link from "next/link"




interface Props{
    onJoin:()=>void
}


const DisableVideoPreview = ()=>{

    const{ data } = authClient.useSession()

    return(
        <DefaultVideoPlaceholder  
         participant={
           { name:data?.user.name ?? "",
            image:data?.user.image ??
             generatedAvatarUri(
                {seed:data?.user.name ?? "",
                variant:"initials"
            }) } as StreamVideoParticipant
         } 
         />
    )
}

const AllowBrowserPermissions = ()=>{
    return(
       <p className="text-sm">
         Please grant your Permission to access your camera and microphone.
       </p>
    )
}


export const CallLobby =({onJoin}:Props)=>{


    const {useCameraState,useMicrophoneState} = useCallStateHooks()

    const {hasBrowserPermission:hasCameraInformation} = useCameraState()
    const {hasBrowserPermission:hasMicInformation} = useMicrophoneState()


    const hasBrowserMediaPermission = hasCameraInformation && hasMicInformation 


    return (
           <div className="flex flex-col justify-center items-center min-h-screen bg-radial from bg-sidebar-accent to-sidebar">
             <div className="py-4 px-8 flex-1 flex items-center justify-center">
                <div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm">
                     <div className="flex flex-col gap-y-2 text-center">
                           <h6 className="text-lg font-medium">Ready to join?</h6>
                           <p className="text-sm">Set up your call before joining</p>
                     </div>
                     <VideoPreview
                     DisabledVideoPreview={
                        hasBrowserMediaPermission
                        ? DisableVideoPreview
                        : AllowBrowserPermissions
                     }
                     />
                     <div className="flex gap-x-2">
                          <ToggleAudioPreviewButton/>
                          <ToggleVideoPreviewButton/>
                     </div>
                     <div className="flex justify-between w-full gap-x-2">
                           <Button asChild variant="ghost">
                                <Link href="/meetings">
                                Cancel
                                </Link>
                           </Button>
                           
                           <Button onClick={onJoin}>
                              <LogInIcon/>
                               Join Call
                           </Button>
                           
                     </div>
                </div>
             </div>
           </div>
    )
}