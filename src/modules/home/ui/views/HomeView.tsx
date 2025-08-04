"use client"


import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';


const HomeView = () => {
    const router = useRouter()
    
         const {data:session} =authClient.useSession()
         
         
         if(!session){
          return <p>loading...</p>
         }
  return (
     
        
    
    <div>
    <h1>user is:{session?.user.name}</h1>
    <Button className='w-full' onClick={ async()=>{
      authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/sign-in"); // redirect to login page
          },
        },
      });
    }}>
      Sign out
    </Button>
  </div>
  )
}

export default HomeView
