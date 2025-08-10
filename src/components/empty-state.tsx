import {AlertCircleIcon} from "lucide-react"
import Image from "next/image"


interface Props{
    title:string,
    description:string,
    
}


export const EmptyState = ({title,description}:Props) => {

  return (
    <div className="flex flex-col justify-center items-center ">
        <Image src={"/empty.svg"} width={240} height={240} alt="Image"/>
        <div className="flex flex-col gap-y-2 text-center mx-auto max-w-md">
            <h6 className="font-medium text-lg">{title}</h6>
            <p className="text-sm text-muted-foreground">{description}</p>
        </div>
     
        
        
     </div>
  )
}

