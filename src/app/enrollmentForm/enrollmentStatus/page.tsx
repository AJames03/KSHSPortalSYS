'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Poppins } from 'next/font/google'
import BackgroundIMG from '@/app/images/EnrollStatus.jpg'
import Image from 'next/image'
import Logo from '@/app/favicon.ico'
import { supabase } from '@/lib/supabaseClient'
import { motion, AnimatePresence  } from "framer-motion";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['200', '400', '700', '900'],
  style: ['normal', 'italic'],
});

export default function Page() {
  const [dateType, setDateType] = useState("text");
  const [lrn, setLrn] = useState('');
  const [birthday, setBirthday] = useState('');
  const [learnerType, setLearnerType] = useState('');
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const showMessage = (message: string) => {
    setAlertMsg(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      setLoading(false);
    }, 3000);
  };


  const handleSearch = async () => {
    if (!lrn || !birthday || !learnerType) {
      showMessage('Please enter all required fields.');
      return;
    }

    setLoading(true);

    let table = learnerType === 'Regular' ? 'NewStudents' : 'ALS';
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('lrn', lrn)
      .eq('bday', birthday);

    if (error) {
      console.error(error);
      showMessage(error.message);
      return;
    }

    if (data.length === 0) {
      showMessage('No record found.');
      return;
    }

    console.log('Found record:', data[0]);
    localStorage.setItem('studentLRN', lrn);
    localStorage.setItem('learnerType', learnerType);

    router.push('/enrollmentForm/studentStatus');
  };

  return (
    <div className={`${poppins.className} bg-cover bg-center bg-no-repeat
        flex flex-col 
        md:grid md:grid-rows-none md:grid-cols-[350px_1fr]
        lg:grid-cols-2 
        text-black justify-center items-center h-screen w-screen`}
    >
      <div 
        className='relative md:absolute w-full h-[42%] md:w-full md:h-full z-0 bg-no-repeat bg-contain md:bg-cover bg-center' 
        style={{ backgroundImage: `url(${BackgroundIMG.src})` }} 
      />
      
      <div className='w-full h-full flex justify-center items-center col-start-2 z-1'>
        <div className='flex flex-col justify-center items-center gap-2 px-10
                        w-full h-full
                        md:w-[75%] md:h-[70%] 
                        lg:w-[60%] 
                        md:bg-zinc-50 shadow-[5px_5px_10px_2px_rgba(0,0,0,0.3)]'>
          <Image src={Logo} alt='Logo' className='w-30 h-30 p-5' />

          <div className='relative flex flex-col w-full border-1 p-2 py-3 rounded-md'>
            <input 
              type="text" 
              placeholder=''
              inputMode='numeric'
              value={lrn}
              onChange={(e) => setLrn(e.target.value.replace(/[^0-9]/g, ''))}
              maxLength={12}
              className='outline-none peer z-1'
              required
            />
            <label className='absolute text-gray-500 transition-all px-1 z-0
                  peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
                  peer-focus:-top-2 peer-focus:bg-zinc-50 peer-focus:text-xs peer-focus:text-gray-700
                  peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-gray-700 
                  peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:bg-zinc-50'>
              Enter Your LRN
            </label>
          </div>

          <div className='relative flex flex-col w-full border-1 p-2 py-3 rounded-md'>
            <input 
              type={dateType} 
              placeholder=''
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              onFocus={() => setDateType("date")}
              onBlur={(e) => {
                if (e.target.value === "") setDateType("text");
              }}
              className='outline-none peer z-1'
              required
            />
            <label className='absolute text-gray-500 transition-all px-1 z-0
                  peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
                  peer-focus:-top-2 peer-focus:bg-zinc-50 peer-focus:text-xs peer-focus:text-gray-700
                  peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-gray-700 
                  peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:bg-zinc-50'>
              Enter Your Birthday
            </label>
          </div>

          <div className='relative flex flex-col w-full border-1 p-2 py-3 rounded-md'>
            <select
              className='outline-none peer z-1 w-full bg-transparent'
              value={learnerType}
              onChange={(e) => setLearnerType(e.target.value)}
              required
            >
              <option value="" disabled hidden>Choose Learner's Type</option>
              <option value="Regular">Regular Student</option>
              <option value="ALS">ALS Student</option>
            </select>
          </div>

          <button 
            onClick={handleSearch}
            disabled={loading}
            className={`flex flex-row gap-5 justify-center items-center
                  bg-blue-700 hover:bg-blue-800 cursor-pointer text-white w-full p-2 rounded-md
                  ${loading ? 'opacity-50 cursor-not-allowed' : ''}
              `}
          >
            {loading && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>}
            {loading ? `Loading...` : 'Search Status'}
          </button>

          <label 
            className='text-gray-600 hover:text-gray-800'
            onClick={() => router.push('/enrollmentForm')}
          >
            Back to Website
          </label>

          <AnimatePresence>
            {showAlert && (
              <motion.div
                className="absolute top-0 transform -translate-y-1/2 left-1/2 -translate-x-1/2 
                            w-full md:w-1/2 z-50 flex items-start justify-center "
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  initial={{ y: -100, opacity: 0 }}
                  animate={{ y: 50, opacity: 1 }}
                  exit={{ y: -100, opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25
                  }}
                  className="bg-sky-700 text-white rounded-lg shadow-lg w-[90%] max-w-sm p-5 text-center"
                >

                  <p className="">
                    {alertMsg}
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>


        </div>
      </div>
    </div>
  )
}
