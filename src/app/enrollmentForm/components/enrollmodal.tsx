'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Loading from '@/app/components/page'

export default function enrollmodal() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false);
      
    
    const navigateWithLoading = async (path: string) => {
    setIsLoading(true);
    await new Promise(res => setTimeout(res, 1000));
    router.push(path);
    };
  return (
    <div className='flex justify-center items-center w-[90%] md:w-1/2 md:h-1/2  z-100'>
        <div className='w-full h-full bg-white rounded-lg flex flex-col justify-center items-center 
                        lg:p-10 md:p-5 p-2
        '>
            <p className='text-center flex flex-col'>
                <strong className='text-[clamp(14px,2vw,20px)]'>REPUBLIC ACT NO. 10173</strong>
                <label className='italic'>"Data Privacy Act of 2012"</label>
                AN ACT PROTECTING INDIVIDUAL PERSONAL INFORMATION IN INFORMATION 
                AND COMMUNICATIONS SYSTEMS IN THE GOVERNMENT AND THE PRIVATE SECTOR,
                CREATING FOR THIS PURPOSE A NATIONAL PRIVACY COMMISSION, AND FOR 
                OTHER PURPOSES
            </p>

            <div className='flex flex-col lg:flex-row gap-2 justify-center items-center p-3 w-full'>
                <button 
                    onClick = {(e) => { e.stopPropagation(); navigateWithLoading('/NewStudent'); }}
                    className='bg-blue-700 hover:bg-blue-900 text-white p-2 w-full rounded-sm'>Regular Student</button>
                
                <button 
                    onClick = {(e) => { e.stopPropagation(); navigateWithLoading('/ALS'); }}
                    className='bg-zinc-100 hover:bg-zinc-200 text-black p-2 w-full  rounded-sm'>ALS Student</button>
            </div>

            
        </div>

        {isLoading && <Loading />}
    </div>
  )
}
