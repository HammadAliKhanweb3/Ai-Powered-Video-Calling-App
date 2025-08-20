"use client"

import { Button } from "@/components/ui/button"
import { PlusIcon, XCircleIcon } from "lucide-react"
import {  NewAgentDialog } from "./new-agent-dialog"
import { useState } from "react"
import { AgentsSearchFilter } from "./agents-search-filter"
import { useAgentsFilters } from "../hooks/agents-filter"
import { DEFAULT_PAGE } from "@/constants"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"



export const ListHeader  = ()=>{
  
  const [filters,setFilters] = useAgentsFilters()
  
  const isAnyFilterModified = !!filters.search

  const onClearFilters =()=>{
    setFilters({
      search:"",
      page:DEFAULT_PAGE,
    })
  }


  const [isDialogopen,setIsDialogOpen] = useState(false)
    return(
       <>
       <NewAgentDialog open={isDialogopen} onOpenChange={setIsDialogOpen}/>
        <div className="px-4 py-4 flex flex-col md:p-8 gap-y-4">
            <div className="flex  items-center justify-between">
                  <h5 className="font-medium text-xl">
                    All Agents
                  </h5>
                  <Button onClick={()=>setIsDialogOpen(true)}>
                    <PlusIcon/>
                    New Agent
                  </Button>
            </div>
            <div className="flex items-center gap-x-2 p-1">
              <ScrollArea>
              <AgentsSearchFilter/>
               {isAnyFilterModified && (

               <Button variant="outline" size="sm"  onClick={onClearFilters}>
                <XCircleIcon className="size04"/>
                Clear
               </Button>
               )}
                <ScrollBar orientation="horizontal"/>
              </ScrollArea>
            </div>
        </div>
        </>
    )
}