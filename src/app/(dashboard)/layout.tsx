import { SidebarProvider } from "@/components/ui/sidebar"
import DashBoardNavbar from "@/modules/Dashboard/ui/components/dashboard-navbar"
import DashBoardSideBar from "@/modules/Dashboard/ui/components/dashboard-sidebar"

    
interface Props {
    children:React.ReactNode
 }


const HomeLayout = ({children}:Props) => {
  return (
   
    <SidebarProvider>
          <DashBoardSideBar/>
            <main className="flex flex-col h-screen w-screen bg-muted">
              <DashBoardNavbar/>
              {children}
            </main>
        
    </SidebarProvider>
  )
}

export default HomeLayout