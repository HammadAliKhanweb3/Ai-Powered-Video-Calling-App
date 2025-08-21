import { BanIcon, VideoIcon } from "lucide-react"
import { EmptyState } from "../../../components/empty-state"
import { Button } from "../../../components/ui/button"
import Link from "next/link"



interface Props{
   meetingId:string,
    isCancelling:boolean,
    onCancelMeeting:()=>void,
   
}


export const UpcomingState = ({meetingId,isCancelling,onCancelMeeting}:Props)=>{

    

    return (
   <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-4 items-center justify-center">
     <EmptyState
    title="Not started yet"
    description="Once you start this meeting, a sumary will appear here."
    image="/upcoming.svg"
    />

    <div className="flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2 w-full">
        <Button disabled={isCancelling}  className="w-full lg:w-auto"  variant="secondary" onClick={onCancelMeeting}>
            <BanIcon />
          Cancel
        </Button>
        
        <Button asChild className="w-full lg:w-auto" disabled={isCancelling} >
            <Link href={`call/${meetingId}`}>
            <VideoIcon/>
            Start meeting
            </Link>
        </Button>
    </div>

   </div>




    )
}


