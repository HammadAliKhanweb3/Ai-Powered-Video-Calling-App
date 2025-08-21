import { EmptyState } from "../../../components/empty-state"


export const CancelledState = ()=>{

    

    return (
   <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-4 items-center justify-center">
     <EmptyState
    title="Meeting Cancelled"
    description="Meeting will end once all participants have left."
    image="/cancelled.svg"
    />


   </div>




    )
}


