  'use client'
  import React, { useState, useEffect } from 'react';
  import Image from 'next/image';
  import { supabase } from '@/lib/supabaseClient';
  import { Poppins } from 'next/font/google';
  import { generateNewStudentPDF } from '@/app/enrollmentForm/studentStatus/lib/generateNewStudentPDF';
  import { generateAlsStudentPDF } from '@/app/enrollmentForm/studentStatus/lib/generateAlsStudentPDF';
  import { motion, Variants } from 'framer-motion';
  import Loading from '@/app/components/page';
  import Study from '@/app/images/study.png'


  const poppins = Poppins({
    subsets: ['latin'],
    weight: ['200', '400', '700', '900'],
    style: ['normal', 'italic'],
  });

  export default function Status() {
    const [lrn, setLrn] = useState('');
    const [learnerType, setLearnerType] = useState('');
    const [name, setName] = useState('');
    const [section, setSection] = useState('');
    const [psa, setPSA] = useState('');
    const [enterPSA, setEnterPSA] = useState('');
    const [enrollmentStatus, setEnrollmentStatus] = useState('');
    const [editingPSA, setEditingPSA] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipMessage, setTooltipMessage] = useState('');



    // Fetch LRN and learnerType from localStorage
    useEffect(() => {
      const storedLrn = localStorage.getItem('studentLRN');
      if (storedLrn) setLrn(storedLrn);

      const storedLearnerType = localStorage.getItem('learnerType');
      if (storedLearnerType) setLearnerType(storedLearnerType);
    }, []);

    // Fetch student data from Supabase
    useEffect(() => {
      if (lrn && learnerType) {
        const fetchStudentName = async () => {
          const tableName = learnerType === 'ALS' ? 'ALS' : 'NewStudents';
          const { data, error } = await supabase
            .from(tableName)
            .select('*')
            .eq('lrn', lrn)
            .single();

          if (error) {
            console.error('Error fetching student:', error);
          } else if (data) {
            const fullName = `${data.lname}, ${data.fname} ${data.mname} ${data.ename}`;
            const studentSection = `${data.gradeLevel}, ${data.strand}, ${data.section}`;
            setName(fullName);
            setSection(studentSection);
            setEnrollmentStatus(data.enrollment_status);
            setPSA(data.psa);
          }
        };

        fetchStudentName();
      }
    }, [lrn, learnerType]);

    const savePSA = async () => {
    if (!enterPSA) {
      setTooltipMessage('PSA cannot be empty');
      setShowTooltip(true); // ipakita tooltip
      setTimeout(() => setShowTooltip(false), 10000); 
      return;
    }

    // Save sa database
    try {
      const tableName = learnerType === 'ALS' ? 'ALS' : 'NewStudents';
      const { data, error } = await supabase
        .from(tableName)
        .update({ psa: enterPSA })
        .eq('lrn', lrn);

      if (error) {
        console.error("Error saving PSA:", error);
        setTooltipMessage(error.message || 'Error saving PSA');
        setShowTooltip(true); // pwede rin gamitin tooltip para error
        setTimeout(() => setShowTooltip(false), 10000);
      } else {
        setPSA(enterPSA);
        setEditingPSA(false);
      }
    } catch (err: any) {
      console.error(err);
      setTooltipMessage(err.message || 'Unexpected error');
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 10000);
    }
  };


    const getStatusColor = (status: string) => {
      switch (status) {
        case 'Enrolled':
          return 'bg-green-500';
        case 'Pending':
          return 'bg-yellow-600';
        default:
          return 'bg-red-600';
      }
    };

    const handleDownloadPDF = async () => {
      if (!lrn) {
        alert('No LRN found');
        return;
      }
      if (learnerType === 'ALS') {
        await generateAlsStudentPDF(lrn);
      } else {
        await generateNewStudentPDF(lrn);
      }
    };

    // Framer Motion variants
    const containerVariants: Variants = {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.2,
        },
      },
    };

    const itemVariants: Variants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    };
    

    return (
      <motion.div
        className={`${poppins.className} absolute inset-0 p-2  lg:mt-0 bg-white w-full h-full lg:p-4`}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header */}
        <motion.h1
          className="text-2xl font-bold mb-4 pb-2 border-b-2 border-gray-200"
          variants={itemVariants}
        >
          Enrollment Status
        </motion.h1>


        {/* LRN + Name + Button */}
        <motion.div
          className="flex flex-col w-full lg:flex-row lg:justify-between lg:items-center mb-5"
          variants={itemVariants}
        >
          
          <div className='w-full'>
            {name ? (
              <div className='relative flex flex-row justify-between items-center p-2 lg:px-10 bg-blue-700 w-full rounded-lg '>
                <div className=' text-white'>
                  <p className='text-[clamp(10px,1vw,18px)]'>Welcome to KVSHS,</p>
                  <p className="font-semibold text-[clamp(24px,3vw,35px)]">{name}</p>
                  <span className='flex flex-row gap-2 items-center'>
                    <p className="text-[clamp(10px,1vw,18px)]">
                      <strong>LRN: </strong>
                      {lrn}
                    </p>
                    |
                    <p className="text-[clamp(10px,1vw,18px)] ">{learnerType} Student</p>
                  </span>
                  <button
                    onClick={handleDownloadPDF}
                    className="text-[clamp(10px,1vw,18px)] flex flex-row gap-2 p-2 rounded-md bg-amber-700 text-white hover:bg-amber-800 cursor-pointer"
                  >
                    <i className="bi bi-filetype-pdf"></i>
                    <p>Download PDF</p>
                  </button>
                </div>
                <Image src={Study} alt='study' className='absolute bottom-0 right-0 lg:static w-25 lg:w-50 transform -scale-x-100'/>
              </div>
              
            ) : (
              <div className='relative h-50 bg-gray-100 rounded-lg overflow-hidden'>
                <span
                  className="pointer-events-none absolute inset-0
                            -translate-x-full
                            bg-gradient-to-r
                            from-transparent via-black/10 to-transparent
                            animate-sweepskeleton z-1"
                />
              </div>
            )}
          </div>
          
        </motion.div>

        {/* Dashboard */}
        <motion.div className="w-full p-2  shadow-[0_3px_10px_rgb(0,0,0,0.2)] text-[clamp(18px,1vw,24px)] text-black rounded-md">
          <motion.p
            className="w-full p-2 border-b font-bold text-[clamp(18px,1vw,24px)] text-black"
            variants={itemVariants}
          >
            DASHBOARD
          </motion.p>

          <motion.div
            className="flex flex-col md:grid md:grid-cols-4 gap-4 mt-3 w-full h-full p-2"
            variants={containerVariants}
          >
            {/* Enrollment Progress */}
            <motion.div variants={itemVariants}>
            {name ? (
              <div
                className="flex flex-col w-full h-full hover:scale-105 duration-75 items-center rounded-md p-3 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
              >
                <label className="text-blue-800 font-semibold text-[clamp(12px,1vw,18px)] text-start w-full">
                  Enrollment Progress
                </label>
                <div className="w-full h-1 bg-gray-200 rounded-full mt-2">
                  <div
                    className={`h-1 rounded-full ${getStatusColor(enrollmentStatus)}`}
                    style={{
                      width:
                        enrollmentStatus === 'Pending'
                          ? '50%'
                          : enrollmentStatus === 'Enrolled'
                          ? '100%'
                          : '25%',
                    }}
                  />
                </div>
                <div className="mt-2 w-full flex flex-row justify-start items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(enrollmentStatus)}`} />
                  <p className="text-[clamp(12px,1vw,18px)]">{enrollmentStatus}</p>
                </div>
              </div>
            ) : (
              <div>
                <div className=' bg-gray-100 w-full h-full p-3 rounded-md flex flex-col gap-2'>
                  <div className='w-[70%] h-2 bg-gray-200 rounded-md animate-pulse'/>
                  <div className='w-full h-2 bg-gray-200 rounded-md animate-pulse'/>
                  <div className='grid grid-cols-[40px_1fr] lg:grid-cols-[20px_1fr] items-center gap-1'>
                    <div className='w-4 h-4 bg-gray-200 rounded-full animate-pulse'/>
                    <div className='w-[40%] h-2 bg-gray-200 rounded-md animate-pulse'/>
                  </div>
                </div>
              </div>
            )}
            
            </motion.div>

            {/* Section */}
            <motion.div variants={itemVariants}>
              {name ? (
                <div
                className="flex flex-col w-full h-full hover:scale-105 duration-75 rounded-md p-3 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
                >
                  <label className="text-blue-800 font-semibold text-[clamp(12px,1vw,18px)] text-start w-full">
                    Section
                  </label>
                  <span className="flex flex-row gap-2 items-center text-start w-full">
                    <i className="bi bi-buildings"></i>
                    <p className="text-[clamp(12px,1vw,18px)]">{section || 'N/A'}</p>
                  </span>
                </div>
              ) : (
                  <div className=' bg-gray-100 w-full h-full  p-3 rounded-md flex flex-col gap-2'>
                    <div className='w-[70%] h-2 bg-gray-200 rounded-md animate-pulse'/>
                    <div className='grid grid-cols-[40px_1fr] lg:grid-cols-[20px_1fr] items-center gap-1'>
                      <div className='w-full h-2 bg-gray-200 rounded-full animate-pulse'/>
                      <div className='w-[30%] h-2 bg-gray-200 rounded-md animate-pulse'/>
                    </div>
                  </div>
              )}
            </motion.div>

            {/* PSA */}
            {learnerType !== 'ALS' && (
            <motion.div
              variants={itemVariants}
            >
              {name ? (
                <div className="flex flex-col w-full h-full hover:scale-105 duration-75  rounded-md p-3 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                  <div className='flex justify-between'>
                    <label className="text-blue-800 font-semibold text-[clamp(12px,1vw,12px)] text-start w-full">
                      PSA
                    </label>
                    {editingPSA ? (
                      <div className='flex flex-row gap-2 text-[clamp(10px,1vw,12px)] mb-1.5'>
                        <button className='flex flex-row gap-2 bg-gray-100 px-2 rounded-xs text-black hover:bg-gray-200' onClick={() => setEditingPSA(false)}>
                          <label>Cancel</label>
                        </button>
                        <button 
                          onClick={savePSA}
                          className='bg-blue-700 px-2 rounded-xs text-white hover:bg-blue-900'>
                          <label>Save</label>
                        </button>
                      </div>
                    ) : (
                      <button  onClick={() => setEditingPSA(true)}>
                        <i className="bi bi-pencil-square text-blue-700 cursor-pointer hover:text-blue-900"></i>
                      </button>
                    )}
                  </div>
                  <span className="flex flex-row gap-2 items-center text-start w-full">
                    <i className="bi bi-person-lines-fill"></i>
                    {editingPSA ? (
                      <div className="relative group">
                        <input
                          type="text"
                          inputMode='numeric'
                          maxLength={12}
                          onChange={(e) => setEnterPSA(e.target.value.replace(/[^0-9]/g, ''))}
                          value={enterPSA}
                          placeholder=''
                          className='w-full outline-0 peer bg-transparent'
                        />
                        <span className="absolute left-1/2 bottom-0 h-[2px] w-0 bg-blue-500 transition-all 
                            duration-300 ease-out group-hover:w-full group-hover:left-0 peer-focus:w-full
                            peer-focus:left-0 peer-not-placeholder-shown:w-full peer-not-placeholder-shown:left-0
                          "
                        />

                        {showTooltip && (
                          <span className="absolute top-7 right-0 bg-red-600 text-white text-xs px-2 py-1 rounded shadow-md">
                            {tooltipMessage}
                          </span>
                        )}
                      </div>
                    ) : (
                      <p className="text-[clamp(12px,1vw,18px)]">{psa || 'N/A'}</p>
                    )}
                  </span>
                </div>  
              ) : (
                  <div className=' bg-gray-100 w-full h-full  p-3 rounded-md flex flex-col gap-2'>
                    <div className='w-[70%] h-2 bg-gray-200 rounded-md animate-pulse'/>
                    <div className='grid grid-cols-[40px_1fr] lg:grid-cols-[20px_1fr] items-center gap-1'>
                      <div className='w-full h-2 bg-gray-200 rounded-full animate-pulse'/>
                      <div className='w-[30%] h-2 bg-gray-200 rounded-md animate-pulse'/>
                    </div>
                  </div>

              )}
            </motion.div>
            )}


          </motion.div>
        </motion.div>
      </motion.div>
    );
  }
