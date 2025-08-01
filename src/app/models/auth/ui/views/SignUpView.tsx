"use client"

import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"



import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Form,FormControl,FormField,FormItem,FormLabel,FormMessage } from "@/components/ui/form"


import { Alert,AlertTitle } from "@/components/ui/alert"
import {  OctagonAlertIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"

const formSchema  = z.object({
name:z.string().min(1,{message:"Name is required"}),
email:z.string().email(),
password:z.string().min(1,{message:"Password is required"}),
confirmPassword:z.string().min(1,{message:"Password is required"})
})
.refine((data)=>data.password === data.confirmPassword,
{message:"Password Don't match",
path:["confirmPassword"]}

)
const SignUpView = () => {

  const router = useRouter()
  const [error,setError] = useState<string | null> (null)
  const [pending,setPending] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver:zodResolver(formSchema),
    defaultValues:{
      name:"",
      email:"",
      password:"",
      confirmPassword:""
    }
  })


 const onSubmit =async (data: z.infer<typeof formSchema>)=>{
    setPending(true)
 
 const {name,email,password} = data
  console.log(email,password);
  
await authClient.signUp.email ({
  name,
  email,
  password
 },

 {
   onSuccess:()=>{
    setPending(false)
  router.push("/")},
 
  onError:({error})=>{
  setError(error.message)
 }}
)




 }

  return (
    <div className="flex flex-col gap-6 ">
    <Card className="overflow-hidden p-0">
    <CardContent className="grid p-0  md:grid-cols-2">
    <Form {...form}> 
        <form action="submit" onSubmit={form.handleSubmit(onSubmit)} className="p-8" >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-2xl font-bold">Let's Get Started</h1>
              <p className="text-muted-foreground text-balance">Create your account</p>
            </div>
            <div>
              <FormField 
              control={form.control}
              name="name"
              render={({field})=>(
                <FormItem>
                  <FormLabel>
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                    type="name"
                    placeholder="Hammad Ali"
                    {...field}
                    />
                    
                  </FormControl>
                  <FormMessage/>
                </FormItem>

              )}
              >
                   
              </FormField>
            </div>
            
            <div>
              <FormField 
              control={form.control}
              name="email"
              render={({field})=>(
                <FormItem>
                  <FormLabel>
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                    type="email"
                    placeholder="hammad@gmail.com"
                    {...field}
                    />
                    
                  </FormControl>
                  <FormMessage/>
                </FormItem>

              )}
              >
                   
              </FormField>
            </div>

            <div>
              <FormField 
              control={form.control}
              name="password"
              render={({field})=>(
                <FormItem>
                  <FormLabel>
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                    type="password"
                    placeholder="********"
                    {...field}
                    />
                    
                  </FormControl>
                  <FormMessage/>
                </FormItem>

              )}
              >
                   
              </FormField>
            </div> 
            
            <div>
              <FormField 
              control={form.control}
              name="confirmPassword"
              render={({field})=>(
                <FormItem>
                  <FormLabel>
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input
                    type="password"
                    placeholder="********"
                    {...field}
                    />
                    
                  </FormControl>
                  <FormMessage/>
                </FormItem>

              )}
              >
                   
              </FormField>
            </div>

            {!!error && (
              <Alert className="bg-destructive/10 border-none">
                <OctagonAlertIcon className="h-4 w-4 !text-destructive"/>
              <AlertTitle>Error</AlertTitle>
              </Alert>
            )}
            <Button disabled={pending} className="w-fulll">Sign Up</Button>
            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-card text-muted-foreground relative z-10 px-2">
  Or continue with
</span>
            </div>
            <div  className="grid grid-cols-2 gap-4">
              <Button variant="outline" type="button" className="w-full">
                Google
              </Button>
              
              <Button variant="outline" type="button" className="w-full">
                Github
              </Button>

            </div>

            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link className="underline underline-offset-4" href="/sign-in">
               sign In
              </Link>
            </div>

            </div>
         
        </form>

      </Form> 
      


      <div className="bg-radial from-green-700 to-green-900 p-4 relative hidden md:flex flex-col gap-y-4
      items-center justify-center">
        <img src="/logo.png" alt="image"  className="h-[60px] w-[92px]"/>
        <p className="text-3xl font-semibold text-white">Meet.Ai</p>
      </div>

    </CardContent> 
       
    </Card>

    <div className="text-muted-foreground text-center *:[a]:hover:text-primary -m-3 *:[a]:underline *:[a]:underline-offset-4">
      By Clincking Continue you are agree to our <a href="#">Terms</a> and 
      <a href="#">Privacy Policy.</a>
    </div>







      
    </div>
  )
}

export default SignUpView