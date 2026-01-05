'use client'

import React from 'react'
import Image from 'next/image'
import Logo from '@/app/favicon.ico'
import {easeInOut, motion } from "framer-motion";


export default function Loading() {
  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className='fixed inset-0 flex flex-col gap-2 justify-center items-center bg-white w-screen h-screen z-[9999]'>
      <span>
        <Image src={Logo} alt='Logo' width={120} height={120} className='w-30 h-30 ' />
      </span>

      <motion.div
        className="flex space-x-2 items-end justify-center h-20 absolute bottom-10"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="w-4 h-10 bg-blue-500" 
          animate={{
            scaleY: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "loop",
              delay: 0.2
            }} 
        />

        <motion.div className="w-4 h-10 bg-blue-500" 
          animate={{
            scaleY: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "loop",
              delay: 0.4
            }} 
        />

        <motion.div className="w-4 h-10 bg-blue-500" 
          animate={{
            scaleY: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "loop",
              delay: 0.6
            }} 
        />
    </motion.div>
  
    </div>
  )
}
