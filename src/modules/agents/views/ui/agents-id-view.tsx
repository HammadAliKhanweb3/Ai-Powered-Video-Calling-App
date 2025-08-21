"use client"


import { ErrorState } from "@/components/error-state"
import { LoadingState } from "@/components/loading-state"
import { useTRPC } from "@/trpc/client"
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import { AgentsIdViewheader } from "../../components/agents-id-view-header"
import { GeneratedAvatar } from "@/components/generated-avatar"
import { Badge } from "@/components/ui/badge"
import { VideoIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useConfirm } from "@/hooks/use-delete"
import { UpdateAgentDialog } from "../../components/update-agent-dialog"
import { useState } from "react"


interface Props{
    agentId:string
}


export const AgentsIdView = ({agentId}:Props) =>{
    
    const [updateAgentDialogOpen,setUpdateAgentDialogOpen]= useState(false)
    const router = useRouter()
    const trpc = useTRPC()
    const queryClient = useQueryClient()

    const {data} = useSuspenseQuery(trpc.agents.getOne.queryOptions({id:agentId}))


    const removeAgent = useMutation(trpc.agents.remove.mutationOptions({
        onSuccess:async ()=>{
            await queryClient.invalidateQueries(trpc.agents.getMany.queryOptions({}));
            // invalidate free tier usage
            router.push("/agents")},
            onError:(error) => 
            {
               toast.error(error.message)
}    }

))

const [RemoveConfirmation,confirmRemove]=useConfirm(
    "Are you sure?",
    `This action will remove ${data.meetingCount} associated meetings`
)
    
const handleRemoveAgent = async()=>{

    const ok = await confirmRemove()
    if(!ok) return

    await removeAgent.mutateAsync({id:agentId})

}

    return(
       <>
        <div className="flex-1 flex flex-col gap-y-4 py-4 px-4 md:px-8">
             <RemoveConfirmation/>
             <UpdateAgentDialog 
             open={updateAgentDialogOpen} 
             onOpenChange={setUpdateAgentDialogOpen} 
             initialValues={data}
             />
    
            <AgentsIdViewheader
            agentId={agentId}
            agentName={data.name}
            onEdit={()=>{setUpdateAgentDialogOpen(true)}}
            onRemove={handleRemoveAgent}
            />
            
            <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-5 col-span-5">
             <div className="flex items-center gap-x-3">
                 <GeneratedAvatar variant="botttsNeutral" seed={data.name} className="size-10" />
                 <h2 className="font-medium text-2xl">{data.name}</h2>
             </div>
             <div>
                <Badge variant="outline" className="flex items-center gap-x-2 [&>svg]:size-4">
               <VideoIcon className="text-blue-700" />
               {data.meetingCount} {data.meetingCount===1 ? "meeting":"meetings"}
                </Badge>
             </div>
             <div className="flex flex-col  gap-y-4">
                  <p className="text-lg font-medium">Instructions</p>
                  <p className="text-neutral-800">{data.instructions}</p>
                  
             </div>
            </div>
            </div>
            </>
    )
}


export const MeetingsIdViewLoader= ()=>{

   return (
   <LoadingState title="Loading Agent" description="This may take a few second..."/>
   )
}
export const MeetingsIdViewError= ()=>{

   return (
      <ErrorState title="Error in loading agent" description="Something went wrong..."/>
   )
}
