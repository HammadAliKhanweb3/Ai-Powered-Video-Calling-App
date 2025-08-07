import { Loader2Icon } from "lucide-react"


interface Props{
    title:string,
    description:string,
    
}


export const LoadingState = ({title,description}:Props) => {

  return (
    <div className="px-4 py-8 flex flex-1 justify-center items-center inset-0">
      <div className="bg-background shadow-sm rounded-lg flex flex-col items-center justify-center gap-y-6 p-10">
        <Loader2Icon className="size-4 animate-spin text-primary"/>
        <div className="flex flex-col gap-y-2 text-center">
            <h6 className="font-medium text-lg">{title}</h6>
            <p className="text-sm">{description}</p>
        </div>
      </div>
        
        
     </div>
  )
}

