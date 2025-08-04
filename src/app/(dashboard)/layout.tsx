import { SidebarProvider } from "@/components/ui/sidebar"
import DashBoardSideBar from "@/modules/Dashboard/ui/components/DashBoardSideBar"

    
interface Props {
    children:React.ReactNode
 }


const HomeLayout = ({children}:Props) => {
  return (
   
    <SidebarProvider>
          <DashBoardSideBar/>
            <main className="flex flex-col h-screen w-screen bg-muted">
                {children}
            </main>
        
    </SidebarProvider>
  )
}

export default HomeLayout