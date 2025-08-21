"use client"

import { ErrorState } from "@/components/error-state"
import { LoadingState } from "@/components/loading-state"
import { useTRPC } from "@/trpc/client"
import { useMutation,  useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import { MeetingIdViewHeader } from "../../components/meeting-id-view-header"
import { useRouter } from "next/navigation"
import { useConfirm } from "@/hooks/use-delete"
import { UpdateMeetingDialog } from "../../components/update-meeting-dialog"
import { useState } from "react"



interface Props{
    meetingId:string
}



export const MeetingIdView =({meetingId}:Props)=>{

    const [updateMeetingDialogOpen,setUpdateMeetingDialogOpen]=useState(false)

    const router = useRouter()
    const trpc = useTRPC()
    const queryClient = useQueryClient()

    const [RemoveConfirmation,confirmRemove]=useConfirm(
        "Are you sure?",
        "The action will remove this meeting"
    )

    const {data} = useSuspenseQuery(
        trpc.meetings.getOne.queryOptions({
            id:meetingId
        })
    )

    const removeMeeting = useMutation(
        trpc.meetings.remove.mutationOptions({
            onSuccess:()=>{
                queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}))
                router.push("/meetings")
 
            }
        })
    )

    const handleRemoveMeeting =async ()=> {
            const ok = await confirmRemove()

            if(!ok) return

            await removeMeeting.mutateAsync({id:meetingId})
            
        }


return(

  <>
     <RemoveConfirmation
     
     
     
     
     />
     <UpdateMeetingDialog
     open={updateMeetingDialogOpen}
     onOpenChange={setUpdateMeetingDialogOpen}
     initialValues={data}
     />
    <div className="flex-1 flex  py-4 px-4 md:px-8 flex-col gap-y-4">
        <MeetingIdViewHeader
        meetingId={meetingId}
        meetingName={data.name}
        onEdit={()=>{}}
        onRemove={handleRemoveMeeting}
        />
        {JSON.stringify(data)}
    </div>
  </>
    )
}

export const MeetingsIdViewLoader= ()=>{

   return (
   <LoadingState title="Loading Meeting" description="This may take a few second..."/>
   )
}
export const MeetingsIdViewError= ()=>{

   return (
      <ErrorState title="Error in loading Meeting" description="Something went wrong..."/>
   )
}
