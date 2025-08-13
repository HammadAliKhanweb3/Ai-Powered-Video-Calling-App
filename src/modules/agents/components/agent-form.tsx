import { useTRPC } from "@/trpc/client"
import { useRouter } from "next/navigation"
import {useForm } from "react-hook-form"
import { agentInsertSchema } from "../schema"
import {z} from "zod"
import {  useMutation, useQueryClient } from "@tanstack/react-query"
import {  Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { GeneratedAvatar } from "@/components/generated-avatar"
import { AgentGetOne } from "../types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"





interface AgentFormProps{
onSuccess:()=>void,
onCancel:()=>void,  
initialValues:AgentGetOne
}


 export const AgentForm = ({onSuccess,onCancel,initialValues}:AgentFormProps) =>{

  const trpc = useTRPC()
  const router = useRouter()
  const queryClient= useQueryClient()

  const createAgent = useMutation(
    trpc.agents.create.mutationOptions(
        {
            onSuccess:async (     
            )=>{
                await queryClient.invalidateQueries(
                    trpc.agents.getMany.queryOptions({})
                )

                if(initialValues?.id){
                    await queryClient.invalidateQueries(
                        trpc.agents.getOne.queryOptions({id:initialValues.id})
                    )
                }

                onSuccess?.()
            },   


            onError:(error)=>{
            toast.error(error.message)

            // Todo check if error code is "FORBIDDEN",redirect to upgrade
            },
        }
    )
  )


  const form = useForm<z.infer<(typeof agentInsertSchema)>>({
    resolver:zodResolver(agentInsertSchema),
    defaultValues:{
        name:initialValues?.name ?? "",
        instructions:initialValues?.instructions ?? "",
    }
  })
  
  const isEdit = !!initialValues?.id
  const isPending = createAgent.isPending
   

 
  const onSubmit =(values:z.infer<typeof agentInsertSchema>)=>{
   
       if(isEdit){
    console.log("Todo: updateAgent");
  }else{
    createAgent.mutate(values)
  }
  }


  
  return(
    <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
    
      <GeneratedAvatar 
      seed={form.watch("name")}
      variant="botttsNeutral"
      className="border size-16"
      
      />
     <FormField 
     name="name" 
     control={form.control}
     render={({field})=>(
             <FormItem>
                  <FormLabel>
                Name
             </FormLabel>
             <FormControl>
                <Input {...field} placeholder="e.g Math Tutor"/>
             </FormControl>
             <FormMessage/>
             </FormItem>

            )}/>
            
            
              <FormField 
     name="instructions" 
     control={form.control}
     render={({field})=>(
             <FormItem>
                  <FormLabel>
                Instructions
             </FormLabel>
             <FormControl>
                <Textarea {...field} placeholder="you are helpful assistant that can answer questoins and help with tasks."/>
             </FormControl>
             <FormMessage/>
             </FormItem>

            )}/>
     <div className="flex justify-between gap-x-2">
     {onCancel && (
        <Button variant="ghost" disabled={isPending} type="button" onClick={()=>onCancel()}>
            Cancel
        </Button> 
     )
    }
        <Button  type="submit" disabled={isPending}>
            {isEdit ? "Update":"Create"}
        </Button> 
     </div>
        </form>

     
    </Form>

  )






 }