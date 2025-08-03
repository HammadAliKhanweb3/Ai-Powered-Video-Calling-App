import { auth } from "@/lib/auth"
import SignInView from "@/modules/auth/ui/views/SignInView"
import { headers } from "next/headers"
import { redirect } from "next/navigation"


const page =async () => {

   const session =await auth.api.getSession(
      {
         headers:await headers()
      }
    )
  
  
    if(!!session){
      redirect("/")
    }
  return (

    <>
     <SignInView/>
    </>
  )
}

export default page