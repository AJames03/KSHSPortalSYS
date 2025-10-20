'use client';
import React, { useState, useEffect } from 'react'
import { Arvo, Bebas_Neue, Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "700", "900"],
  style: ["normal", "italic"],
})

export default function returnRegular() {
    const [track, setTrack] = useState<string>('');
    const [strand, setStrand] = useState<string>('');
  return (
    <div className="w-full flex flex-col p-3 justify-between items-center text-black">
        <div className='flex flex-col gap-5 sm:w-1/2 p-2 sm:m-5 sm:p-5 bg-gray-100 shadow-gray-400 shadow-lg rounded-lg'>
            <header className={`${poppins.className} text-[clamp(0.8rem,2vw,1.2rem] sm:text-[24px] sm:text-start font-bold flex flex-col gap-5 border-b-2 pb-2 text-center`}>For Returning Learner (Balik-Aral) and those who will Transfer/Move in</header>
            <div className='flex flex-col sm:grid sm:grid-cols-2 gap-5'>
                <span className='p-2'>
                    <label className={`${poppins.className} text-[14px] sm:text-[16px] col-span-1 italic text-gray-500`}>Last Grade Level Completed:</label>
                    <input type="number" className={`${poppins.className} text-[clamp(0.8rem,2vw,1.2rem] font-medium border-0 focus:outline-none border-b w-full`} />
                </span>

                <span className='p-2'>
                    <label className={`${poppins.className} text-[14px] sm:text-[16px] col-span-1 italic text-gray-500`}>Last School Year Completed:</label>
                    <input type="text" className={`${poppins.className} text-[clamp(0.8rem,2vw,1.2rem] font-medium border-0 focus:outline-none border-b w-full`} />
                </span>

                <span className='p-2'>
                    <label className={`${poppins.className} text-[14px] sm:text-[16px] col-span-1 italic text-gray-500`}>Last School Attended:</label>
                    <input type="text" className={`${poppins.className} text-[clamp(0.8rem,2vw,1.2rem] font-medium border-0 focus:outline-none border-b w-full`} />
                </span>

                <span className='p-2'>
                    <label className={`${poppins.className} text-[14px] sm:text-[16px] col-span-1 italic text-gray-500`}>School ID:</label>
                    <input type="text" className={`${poppins.className} text-[clamp(0.8rem,2vw,1.2rem] font-medium border-0 focus:outline-none border-b w-full`} />
                </span>
            </div>
        </div>

        <div className='flex flex-col w-full gap-5 m-2 p-2 sm:w-1/2 sm:m-5 sm:p-5 bg-gray-100 shadow-gray-400 shadow-lg rounded-lg'>
            <header className={`${poppins.className} text-[clamp(0.8rem,2vw,1.2rem] sm:text-[24px] sm:text-start font-bold flex flex-col gap-5 border-b-2 pb-2 text-center`}>For Learner in Senior High School</header>
            <div className=' sm:grid sm:grid-cols-1 gap-2'>
                <div className='p-2 grid grid-cols-5'>
                    <label className={`${poppins.className} text-[16px] sm:text-[16px] col-span-2 sm:col-span-1 italic text-gray-500`}>Semester:</label>
                    <div className='flex gap-5 col-span-3 sm:col-span-4'>
                        <span className='flex gap-2 items-center justify-center text-center'>
                            <input type="radio" className='accent-blue-700' name="sem" />
                            <label>1st</label>
                        </span>
                        <span className='flex gap-2 items-center justify-center text-center'>
                            <input type="radio" className='accent-blue-700' name="sem" />
                            <label>2nd</label>
                        </span>
                    </div>
                </div>

                <div className=' sm:grid sm:grid-cols-1 gap-2'>
                    <div className='p-2 grid grid-cols-5'>
                        <label className={`${poppins.className} text-[16px] sm:text-[16px] col-span-2 sm:col-span-1 italic text-gray-500`}>Track:</label>
                        <select className='col-span-3 sm:col-span-4 hover:cursor-pointer focus ' defaultValue='' value={track} onChange={(e) => setTrack(e.target.value)}>
                            <option value="" disabled hidden>Select Track</option>
                            <option value="Academic">Academic Track</option>
                            <option value="TVL">TVL Track</option>
                        </select>
                    </div>
                </div>

                <div className=' sm:grid sm:grid-cols-1 gap-2'>
                    <div className='p-2 grid grid-cols-5'>
                        <label className={`${poppins.className} text-[16px] sm:text-[16px] col-span-2 sm:col-span-1 italic text-gray-500`}>Strand:</label>
                        {track === 'Academic' && (
                            <select className='col-span-3 sm:col-span-4 hover:cursor-pointer' defaultValue='' value={strand} onChange={(a) => setStrand(a.target.value)}>
                                <option value="" disabled hidden>Select Strand</option>
                                <option value="STEM">STEM</option>
                                <option value="ABM">ABM</option>
                                <option value="HUMSS">HUMSS</option>
                            </select>
                        )}
                        {track === 'TVL' && (
                            <select className='col-span-3 sm:col-span-4 hover:cursor-pointer' defaultValue='' value={strand} onChange={(b) => setStrand(b.target.value)}>
                                <option value="" disabled hidden>Select Strand</option>
                                <option value="TVL-ICT">TVL-ICT</option>
                            </select>
                        )}
                    </div>
                </div>

                
            </div>
        </div>

    </div>
  )
}
