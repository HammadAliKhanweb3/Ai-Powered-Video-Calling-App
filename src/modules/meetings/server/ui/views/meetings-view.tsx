import { ErrorState } from "@/components/error-state"
import { LoadingState } from "@/components/loading-state"
import { useTRPC } from "@/trpc/client"

import {  useSuspenseQuery } from "@tanstack/react-query"



export const MeetingsView =()=>{
   
      const trpc = useTRPC()
    const {data}= useSuspenseQuery(trpc.meetings.getMany.queryOptions({}))

    return(
<>
{JSON.stringify(data?.items)}
</>
    )

}

export const MeetingsViewLoader= ()=>{

   return (
   <LoadingState title="Loading meetings" description="This may take a few second..."/>
   )
}
export const MeetingsViewError= ()=>{

   return (
      <ErrorState title="Error in loading meetings" description="Something went wrong..."/>
   )
}
