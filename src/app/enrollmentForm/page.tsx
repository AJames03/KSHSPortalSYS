'use client'
import { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Poppins, BBH_Sans_Hegarty, Luckiest_Guy } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from "framer-motion";
import Logo from '@/app/favicon.ico'
import depEd from '@/app/images/deped.png'
import bagongPilipinas from '@/app/images/Bagong_Pilipinas.png'
import KVSHS from '@/app/images/kvshs.jpg'
import programPromotion from '@/app/images/Program_students.png'
import EnrollmentModal from '@/app/enrollmentForm/components/enrollmodal'
import Loading from '@/app/components/page'

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

export default function Page() {
  const router = useRouter()
  const homeRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const programRef = useRef<HTMLDivElement>(null)
  const words = ['QUALITY EDUCATION', 'STRONG VALUES']
  const programWords = ['STEM', 'ABM', 'HUMSS', 'TVL-ICT', 'ALS']
  const acronym = [
  'Science, Technology, Engineering, and Mathematics',
  'Accountancy, Business and Management',
  'Humanities and Social Sciences',
  <>
    Technical-Vocational-Livelihood
    <br />
    Information and Communications Technology
  </>,
  'Alternative Learning System',
]

  const [program, setProgram] = useState(0)
  const [currentWord, setCurrentWord] = useState(0)
  const [openEnrollModal, setOpenEnrollModal] = useState(false)
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length)
    }, 1000) // 1 second

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setProgram((prev) => (prev + 1) % programWords.length)
    }, 1000) // 1 second

    return () => clearInterval(interval)
  }, [])

  const scrollTo = (ref: any) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const navigateWithLoading = async (path: string) => {
    setLoading(true);
    await new Promise(res => setTimeout(res, 1000));
    router.push(path);
  };


  return (
    <div className={`${poppins.className} bg-white text-black`}>
      {/* NAV */}
      <div className="fixed top-0 left-0 flex flex-row gap-4 p-4 bg-white z-50 w-full justify-between items-center
                      shadow-[0px_2px_4px_rgba(0,0,0,0.25)]">
        <span className='gap-2 items-center flex'>
          <Image src={Logo} alt='logo'  className='hidden md:w-10 md:h-10 md:flex' />
          <p className='font-bold text-[clamp(12px,2vw,20px)] hidden lg:flex'>
            Kasiglahan Village Senior High School
          </p>
        </span>
        <div className='flex flex-col overflow-auto'>
          <span className='flex flex-row gap-5 font-medium '>
            <button onClick={() => scrollTo(homeRef)} className='relative group md:px-1'>
              HOME
              <span className="absolute left-1/2 bottom-0 h-[2px] w-0 bg-blue-500 transition-all 
                  duration-300 ease-out group-hover:w-full group-hover:left-0
                "
              />

            </button>

            <button onClick={() => scrollTo(programRef)} className='relative group md:px-1'>
              PROGRAM
              <span className="absolute left-1/2 bottom-0 h-[2px] w-0 bg-blue-500 transition-all 
                  duration-300 ease-out group-hover:w-full group-hover:left-0
                "
              />
            </button>

            <button 
              onClick={() => navigateWithLoading('/enrollmentForm/enrollmentStatus')}
              className='relative group md:px-1 truncate' >
              Enrollment Status
              <span className="absolute left-1/2 bottom-0 h-[2px] w-0 bg-blue-500 transition-all 
                  duration-300 ease-out group-hover:w-full group-hover:left-0
                "
              />
            </button>

            <button onClick={() => scrollTo(aboutRef)} className='relative group px-1'>
              ABOUT
              <span className="absolute left-1/2 bottom-0 h-[2px] w-0 bg-blue-500 transition-all 
                  duration-300 ease-out group-hover:w-full group-hover:left-0
                "
              />
            </button>
          </span>
        </div>
      </div>

      {/* HOME */}
      <div ref={homeRef} className=" relative h-screen pt-20 flex justify-center items-center">
        <div className='flex flex-col items-center w-full text-center h-full p-4 gap-2'>
          {/* Main Heading */}
          <p className={`${bbh.className} font text-gray-800 
                        text-[clamp(16px,4vw,24px)]
                        md:text-[clamp(10px,4vw,19px)]
                        lg:text-[clamp(18px,4vw,30px)] 
                        leading-snug 
                        max-w-[clamp(300px,50vw,600px)]`}>
            SHAPING FUTURE-READY LEARNERS THROUGH
          </p>

          {/* Rotating Words */}
          <div className="mt-2 h-[clamp(100px,40vw,200px)] overflow-hidden flex justify-center items-center">
            <span
              key={currentWord}
              className={`${bbh.className} text-blue-600 font-extrabold
                        text-[clamp(23px,4vw,40px)]
                        md:text-[clamp(24px,3vw,25px)]
                        lg:text-[clamp(50px,3.5vw,80px)] 
                        leading-tight 
                        animate-slideUp`}
            >
              {words[currentWord]}
            </span>
          </div>

          <div className='flex flex-col lg:flex-row mt-10 justify-center gap-5 items-center w-full'>
            <button 
                onClick={() => setOpenEnrollModal(true)}
                className='p-3 px-10 bg-blue-700 hover:bg-blue-900 rounded-md 
                text-white font-semibold cursor-pointer
              '>
              Enroll Now
            </button>
            <label className='cursor-pointer hover:bg-gray-100 rounded-md p-3 px-10'>Learn More</label>
          </div>

          <span className='flex flex-row p-15 justify-center'>
            <Image src={depEd} alt='deped' className='w-18 h-18 lg:w-25 lg:h-25 mr-5' />
            <Image src={Logo} alt='logo'  className='w-18 h-18 lg:w-25 lg:h-25' />
            <Image src={bagongPilipinas} alt='bagongPilipinas' className='w-25 h-18 lg:w-33 lg:h-25 ' />
          </span>
        </div>   

      </div>

      {/* PROGRAM */}
      <div ref={programRef} className="relative h-screen pt-20 bg-cover bg-center z-0 grid grid-rows-[350px_1fr] lg:grid-cols-2 lg:grid-rows-1" style={{ backgroundImage: `url(${KVSHS.src})` }}>
        <div className="absolute inset-0 bg-blue-900/80 -z-1" />

        <div className={`${luckiest.className} grid grid-rows-[120px_1fr] lg:grid-rows-[200px_1fr] p-2`}>
          <div className='relative  flex p-5 '>
            <div className='absolute bg-blue-900 -skew-7 px-3  z-3'>
              <h1 className='text-white text-[clamp(24px,4vw,40px)] text-center'>STRAND</h1>
            </div>
            
            <div className='absolute top-12 left-6 lg:top-17 lg:left-8 bg-amber-300 -skew-7 px-3 z-2'>
              <h1 className='text-white text-[clamp(24px,4vw,40px)] text-center'>OFFERED</h1>
            </div>

            <div className='bg-gray-200 absolute top-6 left-6 w-27 h-9 lg:top-6 lg:left-8 lg:w-40 lg:h-15 -skew-7 z-1' />
            <div className='bg-gray-200 absolute top-13 left-8 w-27 h-9 lg:top-18 lg:left-13 lg:w-40 lg:h-15 -skew-7 z-0' />
          </div>
          <div className='flex flex-col items-center'>
            {/* Rotating Words */}
            <div className="mt-2 h-[clamp(36px,4vw,60px)] overflow-hidden flex justify-center items-center">
              <span
                key={program}
                className={`${poppins.className} text-white font-extrabold
                          text-[clamp(40px,4vw,70px)]
                          lg:text-[clamp(70px,3.5vw,100px)] 
                          leading-tight
                          animate-programSlideUp`}
              >
                {programWords[program]}
              </span>
            </div>

            {/* Rotating Words */}
            <div className="mt-2 h-[clamp(36px,4vw,60px)] overflow-hidden flex justify-center items-center">
              <span
                key={program}
                className={`${poppins.className} text-white
                          text-[clamp(12px,3.5vw,18px)] 
                          leading-tight text-center
                          animate-programSlideUp`}
              >
                {acronym[program]}
              </span>
            </div>
            <div className={`${poppins.className} flex flex-row  w-[40%]
                  p-3 rounded-4xl mt-10  gap-2 items-center justify-center
                  bg-gradient-to-l from-blue-700 to-blue-900 text-white
                  border-2 hover:border-sky-200`}
                onClick={() => router.push('/enrollmentForm/strand')}
            >
              <i className="bi bi-info-circle"></i>
              <p className='text-center cursor-default'>Learn About the Strand</p>
            </div>
          </div>
        </div>
        
        <div className=' bg-cover bg-center w-[clamp(300px,50vw,600px] h-[clamp(300px,50vw,600px] aspect-auto' style={{ backgroundImage: `url(${programPromotion.src})` }}>
          
        </div>
      </div>

      <div ref={aboutRef} 
           className="relative h-screen pt-20 lg:pt-5 lg:h-[500px] p-5 bg-blue-900 z-0
            flex flex-col" 
      >
        <div className='flex flex-col justify-center items-center gap-2 text-white'>
          <Image src={Logo} alt='logo'  className='w-15 h-15 ' />
          <p className='text-center'>Kasiglahan Village Senior High School</p>
        </div>

        <div className='flex flex-col w-full h-full lg:flex-row gap-10 text-white md:mt-10'>
          <div className='flex flex-col gap-4 '>
            <h1 className='font-bold text-[clamp(14px,4vw,20px)]'>CONTACT</h1>

            <span className='grid grid-cols-[10px_auto] lg:flex lg:flex-row gap-2 text-[clamp(14px,4vw,20px)]'>
              <i className="bi bi-geo-alt"></i>
              <strong>Address:</strong>
              <p className='col-span-2'>Phase 1K2, Kasiglahan Village, San Jose, Rodriguez, Rizal, Philippines</p>
            </span>

            <span className='grid grid-cols-[10px_auto] lg:flex lg:flex-row gap-2 text-[clamp(14px,4vw,20px)]'>
              <i className="bi bi-telephone"></i>
              <strong>Contact Number:</strong>
              <p className='col-span-2'>(02) 8296-1534</p>
            </span>

            <span className='grid grid-cols-[10px_auto] lg:flex lg:flex-row gap-2 text-[clamp(14px,4vw,20px)]'>
              <i className="bi bi-facebook"></i>
              <strong>Facebook Page:</strong>
              <Link className='col-span-2' href='https://facebook.com/KasiglahanVillageSHS' target='_blank'>https://facebook.com/KasiglahanVillageSHS</Link>
            </span>

            <span className='grid grid-cols-[10px_auto] lg:flex lg:flex-row gap-2 text-[clamp(14px,4vw,20px)]'>
              <i className="bi bi-envelope"></i>
              <strong>Email:</strong>
              <Link className='col-span-2' href='https://mail.google.com/mail/?view=cm&to=342562@deped.gov.ph'>342562@deped.gov.ph</Link> 
              <p className='hidden lg:flex'>|</p>
              <Link className='col-span-2' href='https://mail.google.com/mail/?view=cm&to=kasiglahanvillageshs342562@deped.gov.ph'>kasiglahanvillageshs342562@deped.gov.ph</Link>
            </span>
          </div>

          <div className='flex flex-col gap-2'>
            <h1 className='font-bold text-xl'>PROGRAM OFFERED</h1>

            <div className='grid grid-cols-2'>
              <span className='flex flex-row gap-2 text-[clamp(14px,4vw,20px)]'>
                <i className="bi bi-flask-florence"></i>
                <strong>STEM </strong>
                
              </span>

              <span className='flex flex-row gap-2 text-[clamp(14px,4vw,20px)]'>
                <i className="bi bi-graph-up-arrow"></i>
                <strong>ABM</strong>
                
              </span>

              <span className='flex flex-row gap-2 text-[clamp(14px,4vw,20px)]'>
                <i className="bi bi-globe"></i>
                <strong>HUMSS</strong>
    
              </span>

              <span className='flex flex-row gap-2 text-[clamp(14px,4vw,20px)]'>
                <i className="bi bi-cpu"></i>
                <strong className='w-[95px]'>TVL-ICT</strong>
                
              </span>

              <span className='flex flex-row gap-2 text-[clamp(14px,4vw,20px)]'>
                <i className="bi bi-book-half"></i>
                <strong>ALS</strong>
              </span>
            </div>
          </div>
        </div>

        <div className='w-full h-full flex items-end justify-center text-center text-white text-[clamp(6px,4vw,10px)]
                        lg:text-[clamp(12px,2vw,16px)]'>
          Copyright © 2025 Kasiglahan Village Senior High School
        </div>
      </div>

      {openEnrollModal && (
        <motion.div 
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }} 
          className="fixed inset-0 z-50 flex justify-center items-center">
           <span className="absolute z-2 w-screen h-screen bg-black/80 backdrop-blur-sm" onClick={() => setOpenEnrollModal(false)}></span>
          <EnrollmentModal  />
        </motion.div>
      )}

      {loading && <Loading />}
    </div>
  )
}
