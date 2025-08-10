"use client"

import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import {  NewAgentDialog } from "./new-agent-dialog"
import { useState } from "react"



export const ListHeader  = ()=>{

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
        </div>
        </>
    )
}