'use client';
import React, { useState, useEffect } from 'react'
import { Arvo, Bebas_Neue, Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "700", "900"],
  style: ["normal", "italic"],
})

export default function parentInformation() {
  return (
    <div className='w-full flex flex-col sm:w-1/2 text-black sm:text-lg gap-5 m-2 sm:p-2'>
        <div className='flex flex-col m-2 gap-5 bg-gray-100 rounded-lg p-5 shadow-gray-400 shadow-lg'>
            <div>
                <label className={`${poppins.className} text-[14px] sm:text-[20px] col-span-1 font-bold text-black mb-5`}>Father's Name:</label>
                <div className='p-2 sm:grid sm:grid-cols-3 gap-2'>
                    <span>
                        <label className={`${poppins.className} text-[12px] sm:text-[16px] col-span-1 italic text-gray-500`}>Last Name:</label>
                        <input type="text" className={`${poppins.className} text-[12px] sm:text-[16px] col-span-2 font-medium border-0 focus:outline-none border-b w-full`} />
                    </span>
                    <span>
                        <label className={`${poppins.className} text-[12px] sm:text-[16px] col-span-1 italic text-gray-500`}>First Name:</label>
                        <input type="text" className={`${poppins.className} text-[12px] sm:text-[16px] col-span-2 font-medium border-0 focus:outline-none border-b w-full`} />
                    </span>
                    <span>
                        <label className={`${poppins.className} text-[12px] sm:text-[16px] col-span-1 italic text-gray-500`}>Middle Name:</label>
                        <input type="text" className={`${poppins.className} text-[12px] sm:text-[16px] col-span-2 font-medium border-0 focus:outline-none border-b w-full`} />
                    </span>
                    <span className='col-span-3'>
                        <label className={`${poppins.className} text-[12px] sm:text-[16px] col-span-1 italic text-gray-500`}>Contact Number:</label>
                        <input type="text" className={`${poppins.className} text-[12px] sm:text-[16px] col-span-2 font-medium border-0 focus:outline-none border-b w-full`} />
                    </span>
                </div>
            </div>
            
            <div>
                <label className={`${poppins.className} text-[14px] sm:text-[20px] col-span-1 font-bold text-black mb-5`}>Mother's Name:</label>
                <div className='p-2 sm:grid sm:grid-cols-3 gap-2'>
                    <span>
                        <label className={`${poppins.className} text-[12px] sm:text-[16px] col-span-1 italic text-gray-500`}>Last Name:</label>
                        <input type="text" className={`${poppins.className} text-[12px] sm:text-[16px] col-span-2 font-medium border-0 focus:outline-none border-b w-full`} />
                    </span>
                    <span>
                        <label className={`${poppins.className} text-[12px] sm:text-[16px] col-span-1 italic text-gray-500`}>First Name:</label>
                        <input type="text" className={`${poppins.className} text-[12px] sm:text-[16px] col-span-2 font-medium border-0 focus:outline-none border-b w-full`} />
                    </span>
                    <span>
                        <label className={`${poppins.className} text-[12px] sm:text-[16px] col-span-1 italic text-gray-500`}>Middle Name:</label>
                        <input type="text" className={`${poppins.className} text-[12px] sm:text-[16px] col-span-2 font-medium border-0 focus:outline-none border-b w-full`} />
                    </span>
                    <span className='col-span-3'>
                        <label className={`${poppins.className} text-[12px] sm:text-[16px] col-span-1 italic text-gray-500`}>Contact Number:</label>
                        <input type="text" className={`${poppins.className} text-[12px] sm:text-[16px] col-span-2 font-medium border-0 focus:outline-none border-b w-full`} />
                    </span>
                </div>
            </div>

            <div>
                <label className={`${poppins.className} text-[14px] sm:text-[20px] col-span-1 font-bold text-black mb-5`}>Legal Guardian's Name:</label>
                <div className='p-2 sm:grid sm:grid-cols-3 gap-2'>
                    <span>
                        <label className={`${poppins.className} text-[12px] sm:text-[16px] col-span-1 italic text-gray-500`}>Last Name:</label>
                        <input type="text" className={`${poppins.className} text-[12px] sm:text-[16px] col-span-2 font-medium border-0 focus:outline-none border-b w-full`} />
                    </span>
                    <span>
                        <label className={`${poppins.className} text-[12px] sm:text-[16px] col-span-1 italic text-gray-500`}>First Name:</label>
                        <input type="text" className={`${poppins.className} text-[12px] sm:text-[16px] col-span-2 font-medium border-0 focus:outline-none border-b w-full`} />
                    </span>
                    <span>
                        <label className={`${poppins.className} text-[12px] sm:text-[16px] col-span-1 italic text-gray-500`}>Middle Name:</label>
                        <input type="text" className={`${poppins.className} text-[12px] sm:text-[16px] col-span-2 font-medium border-0 focus:outline-none border-b w-full`} />
                    </span>
                    <span className='col-span-3'>
                        <label className={`${poppins.className} text-[12px] sm:text-[16px] col-span-1 italic text-gray-500`}>Contact Number:</label>
                        <input type="text" className={`${poppins.className} text-[12px] sm:text-[16px] col-span-2 font-medium border-0 focus:outline-none border-b w-full`} />
                    </span>
                </div>
            </div>
        </div>
    </div>
  )
}
