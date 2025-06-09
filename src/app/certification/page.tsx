import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div className='md:mt-1 mt-[20%]'>
      <Image src="/certification.jpg" width={1000} height={1000} alt="certification" className="w-full h-full object-cover" />
    </div>
  )
}

export default page
