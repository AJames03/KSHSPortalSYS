'use client'
import {useRef, useEffect, useState} from 'react'
import { Poppins, BBH_Sans_Hegarty, Luckiest_Guy} from 'next/font/google';
import STRAND from '@/app/images/strand.jpg'
import { motion, AnimatePresence, type Variants } from 'framer-motion';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['200', '400', '700', '900'],
  style: ['normal', 'italic'],
});

const bbh = BBH_Sans_Hegarty({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal'],
});

const luckiest = Luckiest_Guy({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal'],
});

export default function page() {
  const HomeRef = useRef<HTMLDivElement>(null);
  const career = ['Engineer', 'Doctor', 'Nurse', 'Entrepreneur', 'Teacher', 'Accountant', 'Lawyer', 'Journalist', 'Developer', 'Data Analyst']
  const [currentWord, setCurrentWord] = useState(0)


  const scrollTo = (ref: any) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % career.length)
    }, 1800) // 1 second

    return () => clearInterval(interval)
  }, [])

  const cubeVariants: Variants = {
    enter: { rotateX: 50, opacity: 0, y: 90, transition: { duration: 0.25, ease: "easeOut" } },
    center: { rotateX: 0, opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.6 } },
    exit: { rotateX: -90, opacity: 0, y: -25, transition: { duration: 0.2, ease: "easeIn" } },
  } as const;

  return (
    <div className={`${poppins.className} bg-white text-black`}>
      {/* NAV */}
      <div className="fixed top-0 left-0 flex flex-row gap-4 p-4  bg-white z-50 w-full justify-between items-center
                      shadow-[0px_2px_4px_rgba(0,0,0,0.25)]">
      
        <span
          className="pointer-events-none absolute inset-0
                    -translate-x-full
                    bg-gradient-to-r
                    from-transparent via-black/10 to-transparent
                    animate-sweep z-1"
        />
        <button onClick={() => scrollTo(HomeRef)} className='relative group px-1'>
          Home
          <span className="absolute left-1/2 bottom-0 h-[2px] w-0 bg-blue-500 transition-all 
                  duration-300 ease-out group-hover:w-full group-hover:left-0
                "
              />
        </button>
      </div>

      <div ref={HomeRef} className="relative h-screen pt-20">
        <div className="w-full h-full p-5 grid grid-cols-2">
          <div className={`${luckiest.className} flex flex-col items-start relative`}>
            <label className='text-[clamp(40px,6vw,150px)] absolute 
                              top-0 text-amber-600'
            >
              LEARN
            </label>
            <label className='text-[clamp(20px,3vw,100px)] absolute
                              top-10
                              md:top-12
                              lg:top-20 text-zinc-400'
            >
              ABOUT YOUR
            </label>
            
            <label className='text-[clamp(40px,6vw,150px)] absolute
                              top-13
                              md:top-15 
                              lg:top-25 text-blue-600'
            >
              STRAND
            </label>
          </div>

          <label 
            className='text-[clamp(14px,3vw,30px)] text-amber-500 font-semibold absolute bottom-35 left-20'
          >
            I'm future
          </label>
          <div className="absolute bottom-10 right-50 mt-10 perspective-1000 overflow-visible h-[100px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentWord}
                variants={cubeVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className={`${bbh.className} uppercase inline-block text-[clamp(18px,3vw,60px)] font-bold text-blue-900`}
              >
                {career[currentWord]}
              </motion.span>
            </AnimatePresence>
          </div>

          <img 
            src={STRAND.src} 
            alt="STRAND" 
            className='absolute w-100 mix-blend-multiply animate-fadeUpAppear
                       bottom-0 transform translate-y-0                      
                       md:bottom-0 md:right-0 md:w-100
                       lg:w-140 lg:bottom-20
            ' />
        </div>
        <div className="flex flex-col gap-2 p-4">
        </div>
      </div>
    </div>
  )
}
