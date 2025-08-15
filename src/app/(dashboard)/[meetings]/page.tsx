import { MeetingsView, MeetingsViewError, MeetingsViewLoader } from "@/modules/meetings/server/ui/views/meetings-view"
import { getQueryClient, trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"



const page = () => {

    const queryClient = getQueryClient()
    
    void queryClient.prefetchQuery(
        trpc.meetings.getMany.queryOptions({})
    )

  return (

    <div>
       <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<MeetingsViewLoader/>}>
            <ErrorBoundary fallback={<MeetingsViewError/>}>
            <MeetingsView/>
            </ErrorBoundary>
        </Suspense>
       </HydrationBoundary>
          
    </div>


  )
}

export default page