import { AgentsView, AgentsViewError, AgentsViewLoader } from "@/modules/agents/views/ui/AgentsView"
 
 
import { getQueryClient,trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { Suspense } from "react"
import {ErrorBoundary} from "react-error-boundary"

const page = () => {


const queryClient = getQueryClient()

void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions())  

return (

    <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<AgentsViewLoader/>}>
         <ErrorBoundary fallback={<AgentsViewError/>}>
         <AgentsView/>
         </ErrorBoundary>
        </Suspense>

    </HydrationBoundary>

  )
}

export default page