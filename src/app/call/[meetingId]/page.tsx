import { auth } from '@/lib/auth'
import { CallView } from '@/modules/call/ui/views/call-view'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React, { Suspense } from 'react'




interface Props{
    params:Promise<{meetingId:string}>
}






const Page =async ({params}:Props) => {

  const {meetingId} = await params

  const session =await auth.api.getSession({
    headers:await headers()
  })
  
  if(!session){
    redirect("/sign-in")
  }
  


  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(
    trpc.meetings.getOne.queryOptions({
        id:meetingId
    })
  )
  
    return (
    <div>
    
    <HydrationBoundary state={dehydrate(queryClient)}>
        {/* <Suspense>
         <ErrorBoundry>
            <CallView
            meetingId={meetingId}
            />
         </ErrorBoundry>
        </Suspense> */}
        <CallView
            meetingId={meetingId}
            />

    </HydrationBoundary>
    </div>
  )
}

export default Page