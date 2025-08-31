"use client"

import { MeetingsGetMany } from "@/modules/meetings/types"
import { ColumnDef } from "@tanstack/react-table"
import { GeneratedAvatar } from "../../../components/generated-avatar"
import { CircleCheckIcon, CircleXIcon, ClockArrowUpIcon, ClockFadingIcon, CornerDownRightIcon, LoaderIcon} from "lucide-react"
import { Badge } from "../../../components/ui/badge"
import { cn, formatDuration } from "@/lib/utils"
import { format } from "date-fns"


const statusIconMap={
upcoming:ClockArrowUpIcon,
  active:LoaderIcon,
  completed:CircleCheckIcon,
  processing:LoaderIcon,
  cancelled:CircleXIcon

  }
  const statusColorMap = {
    upcoming: "bg-yellow-500/20 text-yellow-800 border-yellow-800/5",
    active: "bg-blue-500/20 text-blue-800 border-blue-800/5",
    completed: "bg-emerald-500/20 text-emerald-800 border-emerald-800/5",
    cancelled: "bg-rose-500/20 text-rose-800 border-rose-800/5",
    processing: "bg-gray-300/20 text-gray-800 border-gray-800/5",
  }
  
  


export const columns: ColumnDef<MeetingsGetMany[number]>[] = [
  {
    accessorKey: "name",
    header: "Agent Name",
    cell:({row})=>
         (
        <div className="flex flex-col gap-y-1">
          <span className="font-semibold capitalize">{row.original.name}</span>
        
          <div className="flex items-center gap-x-2">
            
            <div className="flex items-center gap-x-1">
            <CornerDownRightIcon className="size-3 text-muted-foreground"/>
            <span className="text-muted-foreground max-w-[200px] text-sm truncate capitalize">{row.original.agent.name}</span>
          </div>
          

          <GeneratedAvatar
          seed={row.original.agent.name}
          variant="botttsNeutral"
          className="size-4"
          />
          <span className="text-sm text-muted-foreground">
            {row.original.startedAt ? format(row.original.startedAt,"MMM d"): ""}
          </span>
          </div>
        </div>
        )
  },
  {
    accessorKey:"status",
    header:"Status",
    cell:({row})=>{
          
             const Icon = statusIconMap[row.original.status as keyof typeof statusIconMap] 
            return( 
            <Badge className={
              cn(
                "capitalize [&>svg]:size-4 text-muted-foreground",
                statusColorMap[row.original.status as keyof typeof statusColorMap]
              )
            }  variant="outline">
              <Icon
             className= {cn(
                row.original.status === "processing" && "animate-spin" 
              )}
              />
            {row.original.status}
            </Badge>
            )
  }
},

{
  accessorKey:"duration",
  header:"duration",
  cell:({row})=>{
      return(
        <Badge
      className="capitalize [&>svg]:size-4 flex items-center gap-x-2"

      >
        <ClockFadingIcon className="text-blue-700"/>
        {row.original.duration ? formatDuration(row.original.duration):"No duration"}
      </Badge>
      )
  }
}
]