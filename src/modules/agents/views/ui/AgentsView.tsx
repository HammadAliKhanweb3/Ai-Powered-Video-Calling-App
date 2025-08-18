"use client"

import { EmptyState } from "@/components/empty-state"
import { ErrorState } from "@/components/error-state"
import { LoadingState } from "@/components/loading-state"
import { columns } from "@/modules/meetings/components/coloumn"

import { useTRPC } from "@/trpc/client"
import {  useSuspenseQuery } from "@tanstack/react-query"
import { useAgentsFilters } from "../../hooks/agents-filter"
import { DataPagination} from "../../components/data-pagination"
import { useRouter } from "next/navigation"
import { DataTable } from "@/components/data-table"

export const AgentsView = () => {
   const router = useRouter()

   const [filters,setFilters]=useAgentsFilters()
    const trpc = useTRPC()
 
    const {data} = useSuspenseQuery(trpc.agents.getMany.queryOptions({
      ...filters
    })) 
    
  

  return ( 

    <div className="flex-1 flex flex-col pb-4 px-4 md:px-8 gap-y-4 " >
       <DataTable
        data={data.items}
        columns={columns}
        onRowClick={(row)=>router.push(`agents/${row.id}`)}
       />
       <DataPagination
       page={filters.page}
       totalPages={data.totalPages}
       onPageChange={(page)=>setFilters({page})}
       />
       {data.items.length === 0 && (
         <EmptyState
         title="Create your first agent"
         description="Create an agent to join your meetings. Each agent will follow
         your instructions and can interact with participants during the call."
         />
       )}
    </div>
  )
}

export const AgentsViewLoader= ()=>{

   return (
   <LoadingState title="Loading Agents" description="This may take a few second..."/>
   )
}
export const AgentsViewError= ()=>{

   return (
      <ErrorState title="Error in loading agents" description="Please try again later"/>
   )
}
