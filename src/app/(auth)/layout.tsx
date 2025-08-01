import React, { ReactNode } from 'react'


interface Props {
    children: React.ReactNode
}
const layout = ({children}:Props) => {
  return (
    <div  className='bg-muted flex min-h-svh flex-col item-center justify-center p-4 md:p-10'>
        <div className='w-full max-w-sm md:max-w-3xl'>
       {children}
        </div>
    </div>
  )
}

export default layout