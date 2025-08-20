


interface Props{
    params:Promise<{meetingsId:string}>
}




const page =async ({params}:Props) => {
    const {meetingsId} =await params
  return (
    <div>

      {meetingsId}
    </div>
  )
}

export default page