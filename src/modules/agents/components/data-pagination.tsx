import { Button } from "@/components/ui/button"





interface Props
    {
        page:number,
        totalPages:number,
        onPageChange:(page:number)=>void
    }

export const DataPagination = ({page,
    totalPages,
    onPageChange
    }:Props)=>{
return(
    <div className="flex items-center justify-between">
    <div className="fle-1 text-sm text-muted-foreground">
     Page {page} of {totalPages}
    </div>
    
    <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant='outline' disabled={page===1} className="size-sm" onClick={()=>(onPageChange(Math.max(1,page-1)))}>
           Previous
        </Button>
        <Button variant='outline' disabled={page===totalPages || totalPages ===0} className="size-sm" onClick={()=>(onPageChange(Math.min(totalPages,page+1)))}>
           Next
        </Button>
    </div>
</div>
)
}