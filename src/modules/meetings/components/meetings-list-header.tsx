"use client"

import { Button } from "@/components/ui/button"
import { PlusIcon, XCircleIcon,  } from "lucide-react"
import { NewMeetingDialog } from "./new-meeting-dialog"
import { useState } from "react"
import { MeetingsSearchFilter } from "./agents-search-filter"
import { StatusFilter } from "./status-filter"
import { AgentIdFilter } from "./agent-id-filter"
import { useMeetingsFilters } from "../hooks/use-meetings-filter"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { DEFAULT_PAGE } from "@/constants"

export const MeetingsListHeader  = ()=>{
  const [filters,setFilters]=useMeetingsFilters()
    const [isDialgOpen,setIsDialogOpen] = useState(false)

    const isAnyFilterModified = !!filters.agentId || !!filters.search || !!filters.status
  
    const onClearFilters = ()=>{
      setFilters({
        agentId:"",
        status:null,
        search:"",
        page:DEFAULT_PAGE,
      })
    }

    return(
       <>
       <NewMeetingDialog open={isDialgOpen} onOpenChange={setIsDialogOpen}/>
        <div className="px-4 py-4 flex flex-col md:p-8 gap-y-4">
            <div className="flex  items-center justify-between">
                  <h5 className="font-medium text-xl">
                    My Meetings
                  </h5>
                  <Button onClick={()=>{setIsDialogOpen(true)}}>
                    <PlusIcon/>
                    New Meeting
                  </Button>
            </div>
         <ScrollArea>
         <div className="flex items-center gap-x-2 p-1 ">
              <MeetingsSearchFilter/>
              <StatusFilter/>
              <AgentIdFilter/>
              {isAnyFilterModified && (
                <Button variant="outline" onClick={onClearFilters}>
                              <XCircleIcon className="size-4">
                              Clear
                              </XCircleIcon>
                </Button>
              ) }

            </div>
            <ScrollBar orientation="horizontal"/>
         </ScrollArea>
           
        </div>
        </>
    )
}