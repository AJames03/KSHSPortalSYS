"use client";

import React from 'react';
import { Arvo, Bebas_Neue, Poppins } from 'next/font/google';
import Image from 'next/image';
import 'bootstrap-icons/font/bootstrap-icons.css';

const arvo = Arvo({
  subsets: ["latin"],
  weight: ["700", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "400"],
});

export default function Page() {
  return (
    <div className='bg-gray-200 w-screen h-screen'>

        {/* Header */}
        <div className="text-center bg-blue-700 text-white flex justify-center p-2 gap-2">
        <Image src="/KSHS_LOGO.png" alt="logo" width={100} height={100}/>
        <div className={`${arvo.className} flex flex-col justify-center text-2xl`}>
            <label>KASIGLAHAN VILLAGE</label>
            <label>SENIOR HIGH SCHOOL</label>
            
            <div className="flex bg-white pl-2 pr-2 text-black justify-center items-center rounded-md">
            <label className={`${poppins.className} text-sm text-amber-600`}>STEM</label>
            <i className="bi bi-dot"></i>
            <label className={`${poppins.className} text-sm text-green-600`}>ABM</label>
            <i className="bi bi-dot"></i>
            <label className={`${poppins.className} text-sm text-blue-700`}>TVL-ICT</label>
            <i className="bi bi-dot"></i>
            <label className={`${poppins.className} text-sm text-green-800`}>HUMSS</label>
            <i className="bi bi-dot"></i>
            <label className={`${poppins.className} text-sm text-orange-500`}>ALS</label>
            </div>
        </div>
        </div>
    </div>
  )
}
