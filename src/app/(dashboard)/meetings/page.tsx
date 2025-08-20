import { auth } from "@/lib/auth"
import { loeadSearchParams } from "@/modules/agents/params"
import { MeetingsListHeader } from "@/modules/meetings/components/meetings-list-header"
import { useMeetingsFilters } from "@/modules/meetings/hooks/use-meetings-filter"
import { MeetingsView, MeetingsViewError, MeetingsViewLoader } from "@/modules/meetings/ui/views/meetings-view"
import { getQueryClient, trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { SearchParams } from "nuqs"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"



interface Props{
  searchParams:Promise<SearchParams>
}

const page =async ({searchParams}:Props) => {
   const filters = await loeadSearchParams(searchParams)
    
    const session =await auth.api.getSession(
      {
         headers:await headers()
      }
    )
  
  
    if(!session){
      redirect("/sign-in")
    }

    const queryClient = getQueryClient()
    
    void queryClient.prefetchQuery(
        trpc.meetings.getMany.queryOptions({
          ...filters
        })
    )

  return (

    <>
      <MeetingsListHeader/>
       <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<MeetingsViewLoader/>}>
            <ErrorBoundary fallback={<MeetingsViewError/>}>
            <MeetingsView/>
            </ErrorBoundary>
        </Suspense>
       </HydrationBoundary>
          
    </>


  )
}

export default page