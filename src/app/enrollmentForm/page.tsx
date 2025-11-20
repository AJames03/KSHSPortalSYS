"use client"

import React, { useState, useEffect } from "react";
import { Arvo, Poppins, Alfa_Slab_One } from 'next/font/google';
import Image from 'next/image';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';
import KSHS from "@/app/images/KSHS.jpg"
import BP from "@/app/images/Bagong_Pilipinas.png"
import DepEd from "@/app/images/deped.png"
import Logo from "@/app/favicon.ico"

const arvo = Arvo({
  subsets: ["latin"],
  weight: ["700", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "400"],
});

const alfa = Alfa_Slab_One({
  subsets: ["latin"],
  weight: ["400"],
});



export default function Page() {
  const [enrollModal, setEnrollModal] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [])

  let clipPathStyle = "";
  if (windowWidth >= 1024) {
    // Desktop (lg:)
    clipPathStyle = "polygon(0 0, 100% 0, 80% 100%, 0% 100%)";
  } else if (windowWidth >= 640) {
    // Tablet (sm: ~640px)
    clipPathStyle = "polygon(00 0, 100% 0, 100% 100%, 0 100%)";
  } else {
    // Mobile
    clipPathStyle = "polygon(100% 0%, 100% 90%, 0 100%, 0 10%)";
  }

  return (
    <div className='bg-gray-200 w-full h-screen flex flex-col'>
      <Image src={KSHS} alt="kshs" className="fixed w-full h-screen sm:w-full sm:h-screen 
          lg:w-full lg:h-screen" />

        {/* Header */}
        <div className="text-center bg-blue-700 text-white flex justify-center p-2 gap-2 w-full sticky top-0 z-1">
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
        <div className="grid grid-rows-[3fr_1fr] h-screen">
          <span
            className="relative w-full h-full lg:w-[60%] lg:h-full bg-white flex flex-col 
            justify-end lg:justify-start items-center shadow-right p-10"
            style={{ clipPath: clipPathStyle }}
          >
            <h1 className={`${alfa.className} text-2xl sm:text-3xl text-blue-900 lg:text-4xl text-center sm:w-[50%] lg:w-[70%]`}>
              BACK TO SCHOOL
            </h1>
            <p className={`${poppins.className} text-xs sm:text-sm lg:text-base text-center sm:w-[50%] lg:w-[70%]`}>
              Maligayang Pagbabalik sa Paaralan, mga Bagong Mag-aaral! Malugod namin kayong tinatanggap
              sa Kasiglahan Village Senior High School! Handog namin ang bagong taon ng pagkatuto,
              kasiyahan, at pagkakaibigan. Ito ang panahon para makilala ang inyong mga kaklase,
              matuto ng mga bagong kaalaman, at subukan ang iba at ibang extracurricular activities.
              Sama-sama nating palalimin ang ating mga talento at kakayahan habang nag-eenjoy sa bawat
              araw sa paaralan.
            </p>
            <button 
              onClick={() => setEnrollModal(true)} 
              className={`${poppins.className} bg-green-600  text-white px-6 p-3 mt-3 
              rounded-lg shadow-md text-xs sm:text-sm w-40 sm:w-64 lg:w-72  cursor-pointer font-black tracking-widest
              animate-enlarge
              `}
            >
                ENROLL NOW!!!
            </button>
          </span>

          <div className="bg-blue-900 z-10 flex flex-col gap-2 bottom-0 w-full p-3 lg:p-5 text-white">
            <label className={`${poppins.className} text-xs sm:text-sm lg:text-base font-black 
              tracking-wide w-full border-b-2`}
            >
              ABOUT
            </label>
            
            <span className={`${poppins.className} flex flex-row gap-3 text-xs sm:text-sm lg:text-base`}>
              <i className="bi bi-house-door-fill"></i>
              <p>Phase 1K2, Kasiglahan Village, Barangay San Jose, 1860</p>
            </span>

            <span className={`${poppins.className} flex flex-row gap-3 text-xs sm:text-sm lg:text-base`}>
              <i className="bi bi-telephone-fill"></i>
              <p>282961534</p>
            </span>

            <span className={`${poppins.className} flex flex-row gap-3 text-xs sm:text-sm lg:text-base`}>
              <i className="bi bi-envelope-fill"></i>
              <p>kasiglahanvillageshs342562@deped.gov.ph</p>
            </span>
          </div>
        </div>

        
        <AnimatePresence>
          {enrollModal && (
            <motion.div 
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="fixed w-screen h-screen flex flex-col justify-center items-center z-50">
              <span className="absolute z-2 w-screen h-screen bg-black/80 backdrop-blur-sm" onClick={() => setEnrollModal(false)}></span>
              
              <div className="flex flex-col w-[60%] justify-center items-center sm:flex-col lg:flex-col gap-10 z-3">
                <span className="flex flex-col justify-content items-center">
                  
                  <div className="flex flex-row w-1/2 justify-center gap-2 mb-5">
                    <Image src={DepEd} alt="deped" className="w-15 h-15 lg:w-20 lg:h-20" />
                    <Image src={BP} alt="bagong pilipinas" className="w-20 lg:w-30 lg:h-25" />
                    <Image src={Logo} alt="kasiglahan" className="w-15 h-15 lg:w-20 lg:h-20" />
                  </div>
                  
                  <label className={`${poppins.className} text-white text-2xl text-center sm:w-[50%] lg:w-[70%}`}>REPUBLIC ACT NO. 10173</label>
                  <p className={`${poppins.className} text-white text-xs sm:text-sm lg:text-base text-center sm:w-[50%] lg:w-[70%] p-2`}>AN ACT PROTECTING INDIVIDUAL PERSONAL INFORMATION IN INFORMATION AND COMMUNICATIONS SYSTEMS IN THE GOVERNMENT AND THE PRIVATE SECTOR, CREATING FOR THIS PURPOSE A NATIONAL PRIVACY COMMISSION, AND FOR OTHER PURPOSES</p>
                </span>
                <span className="flex flex-col gap-2">
                  <Link href="/NewStudent">
                    <button className="bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-transform duration-200 text-white px-6 py-3 rounded-lg shadow-md w-full sm:w-64 lg:w-72 cursor-pointer">
                      New Student Enrollment
                    </button>
                  </Link>
                  <Link href="/ALS">
                    <button className="bg-gray-200 hover:scale-105 transition-transform duration-200 text-black px-6 py-3 rounded-lg shadow-md w-full sm:w-64 lg:w-72 cursor-pointer">
                      Alternative Learning System
                    </button>
                  </Link>
                </span>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
    </div>
  )
}
