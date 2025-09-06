"use client" 

import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuSubContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { GeneratedAvatar } from "@/components/generated-avatar"
import { authClient } from "@/lib/auth-client"
import { ChevronDownIcon, CreditCardIcon, LogOutIcon } from "lucide-react"
import { useRouter } from "next/navigation"



const DashboardUserButton = () => {
  const router =useRouter()
const {data,isPending} = authClient.useSession()  
  
  if(isPending || !data){
    return null
  }
    const onLogout = async () => {
      try {
        await authClient.signOut()
        router.push("/sign-in")
        router.refresh()
      } catch (error) {
        console.error('Error during sign out:', error)
      }
    }
  
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-lg p-3 flex flex-items-center justify-between border border-border/10 w-ful bg-wihte bg-white/10 overflow-hidden">
      {data.user.image? (
        <Avatar>
          <AvatarImage src={data.user.image}/>
        </Avatar>
      ):(<GeneratedAvatar seed={data.user.name} variant="initials" className="size-9 mr-3"/>)
      }
      <div className="flex flex-col gap-0.5 flex-1 text-left overflow-hidden min-w-0">
      <p className="text-sm truncate font-semibold w-full">{data.user.name}</p>
      <p className="text-xs truncate w-full">{data.user.email}</p>
    </div>
    <ChevronDownIcon className="size-4 shrink-0"/>

      </DropdownMenuTrigger>

    <DropdownMenuContent align="end" side="right" className="w-72">
      <DropdownMenuLabel>
        <div className="flex flex-col gap-1">
          <span className="font-medium truncate">
            {data.user.name}
            </span>
            <span className="text-sm font-normal text-muted-foreground truncate">
             
            {data.user.email}
            </span>
        </div>

      </DropdownMenuLabel>

      <DropdownMenuSeparator/>
      <DropdownMenuItem className="cursor-pointer flex justify-between items-center"
      onClick={()=>authClient.customer.portal()}
      >
        Biling
        <CreditCardIcon className="size-4"/>
      </DropdownMenuItem>
      
      <DropdownMenuItem className="cursor-pointer flex justify-between items-center" onClick={onLogout}>
        logout
        <LogOutIcon className="size-4"/>
      </DropdownMenuItem>
    </DropdownMenuContent>


    </DropdownMenu>
   
  )
}

export default DashboardUserButton