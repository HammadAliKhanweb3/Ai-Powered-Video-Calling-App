
import { auth } from "@/lib/auth"
import { ListHeader } from "@/modules/agents/components/agents-list-header"
import { AgentsView, AgentsViewError, AgentsViewLoader } from "@/modules/agents/views/ui/AgentsView"
 
 
import { getQueryClient,trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { Suspense } from "react"
import {ErrorBoundary} from "react-error-boundary"

const page =async () => {

   const session =await auth.api.getSession(
      {
         headers:await headers()
      }
    )
  
  
    if(!session){
      redirect("/sign-in")
    }

const queryClient = getQueryClient()

void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions())  

return (
   <>
    <ListHeader/>
    <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<AgentsViewLoader/>}>
         <ErrorBoundary fallback={<AgentsViewError/>}>
         <AgentsView/>
         </ErrorBoundary>
        </Suspense>
    </HydrationBoundary>
  </>

  )
}

export default page