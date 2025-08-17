"use client"

import { Button } from "@/components/ui/button"
import { PlusIcon,  } from "lucide-react"
import { NewMeetingDialog } from "./new-meeting-dialog"
import { useState } from "react"

export const MeetingsListHeader  = ()=>{
    const [isDialgOpen,setIsDialogOpen] = useState(false)
  

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
           
        </div>
        </>
    )
}