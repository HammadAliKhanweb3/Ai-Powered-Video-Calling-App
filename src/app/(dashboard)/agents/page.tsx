
import { auth } from "@/lib/auth"
import { ListHeader } from "@/modules/agents/components/agents-list-header"
import { loeadSearchParams } from "@/modules/agents/params"
import { AgentsView, AgentsViewError, AgentsViewLoader } from "@/modules/agents/views/ui/AgentsView"
 
 
import { getQueryClient,trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import type { SearchParams } from "nuqs"
import { Suspense } from "react"
import {ErrorBoundary} from "react-error-boundary"


interface Props {
  searchParams:Promise<SearchParams>
}


const page =async ({searchParams}:Props) => {
  
  const filters =await loeadSearchParams(searchParams) 

   const session =await auth.api.getSession(
      {
         headers:await headers()
      }
    )
  
  
    if(!session){
      redirect("/sign-in")
    }

const queryClient = getQueryClient()

void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions({
  ...filters
}))  

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