"use client";

import React, { useState, useEffect } from "react";
import { Arvo, Poppins } from 'next/font/google';
import Image from 'next/image';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Link from 'next/link';

const arvo = Arvo({
  subsets: ["latin"],
  weight: ["700", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "400"],
});

interface TypingAnimationProps {
  text: string;
  speed?: number;
}

// Typing animation component
function TypingAnimation({ text, speed = 100 } : TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, index + 1));
      index++;
      if (index === text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <span>{displayedText}</span>;
}

export default function Page() {
  return (
    <div className='bg-gray-200 w-full h-screen flex flex-col'>

        {/* Header */}
        <div className="text-center bg-blue-700 text-white flex justify-center p-2 gap-2 w-full sticky top-0">
            <Image src="/KSHS_LOGO.png" alt="logo" width={100} height={100}  className="w-15 h-15 sm:w-10 sm:h-10 lg:w-32 lg:h-32"/>
            <div className={`${arvo.className} flex flex-col justify-center sm:text-sm lg:text-2xl`}>
                <label>KASIGLAHAN VILLAGE</label>
                <label>SENIOR HIGH SCHOOL</label>
                
                <div className="flex flex-wrap bg-white px-2 py-1 text-black justify-center items-center rounded-md max-w-xs sm:max-w-sm lg:max-w-md">
                  <label className={`${poppins.className} text-amber-600 text-[12px] sm:text-sm lg:text-base`}>STEM</label>
                  <i className="bi bi-dot text-xs sm:text-sm lg:text-base"></i>
                  <label className={`${poppins.className} text-green-600 text-[10px] sm:text-sm lg:text-base`}>ABM</label>
                  <i className="bi bi-dot text-xs sm:text-sm lg:text-base"></i>
                  <label className={`${poppins.className} text-blue-700 text-[10px] sm:text-sm lg:text-base`}>TVL-ICT</label>
                  <i className="bi bi-dot text-xs sm:text-sm lg:text-base"></i>
                  <label className={`${poppins.className} text-green-800 text-[10px] sm:text-sm lg:text-base`}>HUMSS</label>
                  <i className="bi bi-dot text-xs sm:text-sm lg:text-base"></i>
                  <label className={`${poppins.className} text-orange-500 text-[10px] sm:text-sm lg:text-base`}>ALS</label>
                </div>


            </div>
        </div>

        {/* SELECTION OF NEW STUDENT and ALS */}
        <div className='flex flex-col w-full h-full items-center gap-6 pt-20'>
            <div className="flex flex-col sm:flex-col lg:flex-row gap-2">
              <Link href="/NewStudent">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md w-full sm:w-64 lg:w-72 cursor-pointer">
                  New Student Enrollment
                </button>
              </Link>
              <Link href="/ALS">
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-md w-full sm:w-64 lg:w-72 cursor-pointer">
                  Alternative Learning System
                </button>
              </Link>
            </div>


            <h1 className={`${poppins.className} text-[12px] sm:text-xs lg:text-lg text-center sm:w-1/2 lg:w-6/12`}>
              <TypingAnimation 
              text="Welcome to Kasiglahan Village Senior High School! Get ready to start your journey with us—new students, gather your important documents for a smooth enrollment, and ALS students, connect with your coordinator to kickstart your learning adventure. Let's make this school year amazing together!" 
              speed={50} />
            </h1>
        </div>
    </div>
  )
}
