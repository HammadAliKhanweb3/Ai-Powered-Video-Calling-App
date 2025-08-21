import { BanIcon, VideoIcon } from "lucide-react"
import { EmptyState } from "../../../components/empty-state"
import { Button } from "../../../components/ui/button"
import Link from "next/link"



interface Props{
   meetingId:string,   
}


export const ActiveState = ({meetingId,}:Props)=>{

    

    return (
   <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-4 items-center justify-center">
     <EmptyState
    title="Meeting is active"
    description="Meeting will end once all participants have left."
    image="/upcoming.svg"
    />

    <div className="w-full">
    
        <Button asChild className="w-full lg:w-auto">
            <Link href={`call/${meetingId}`}>
            <VideoIcon/>
            <VideoIcon/>
            Join meeting
            </Link>
        </Button>
    </div>

   </div>




    )
}


