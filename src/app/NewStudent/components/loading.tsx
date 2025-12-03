'use client'

import React from 'react'
import Image from 'next/image'
import Logo from '@/app/favicon.ico'

export default function Loading() {
  return (
    <div className='fixed inset-0  bg-white w-screen h-screen z-[9999]'>
      <span>
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex h-25 w-25 animate-ping rounded-full bg-sky-700 opacity-75"></span>
        <Image src={Logo} alt='Logo' width={120} height={120} className='w-30 h-30 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse' />
      </span>
    </div>
  )
}
