"use client"

import { useState } from "react"
import { authClient } from "@/lib/auth-client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"



const HomePage = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
 
 async function signUp (e: React.FormEvent<HTMLFormElement>){
 e.preventDefault();
  console.log("I am called");
  
  const {data, error} = await authClient.signUp.email({
    name,
    email,
    password
  },{
    onError:()=>{
      window.alert("something went wrong")
    },
    onSuccess:()=>{
      window.alert("successful")
    }
  })
 }


  return (
    <div>
      <form onSubmit={signUp} className="flex flex-col gap-2 p-4">
        <Input type="name" value={name} onChange={(e)=>setName(e.target.value)} />
        <Input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <Input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <Button type="submit">Login</Button>
      </form>
    </div>
  )
}

export default HomePage