'use client';
import React, { useState, useEffect } from 'react'
import { Arvo, Bebas_Neue, Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "700", "900"],
  style: ["normal", "italic"],
})

export default function EnrollmentInfo() {
  const [lrn, setLrn] = useState<string>('');
  const[gradeLevel, setGradeLevel] = useState<string>('');
  const year = new Date().getFullYear();
  const schoolYear = `${year}-${year+1}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lrnValue = e.target.value;
    
    if(lrnValue.length <= 12){
      if (/^\d*$/.test(lrnValue)) {
        setLrn(lrnValue);
      }
    }
  }
  return (
    <div className='w-full flex flex-col sm:w-1/2 text-black bg-gray-100 shadow-lg rounded-lg gap-2 m-2 p-5'>
      <label className='flex flex-col'>
        <h1 className={`${poppins.className} font-bold text-lg sm:text-2xl text-center sm:text-start`}>ENROLLMENT INFORMATION</h1>
        <span className='h-1 bg-black mb-2'></span>
      </label>

      <label className='grid grid-cols-2 w-full'>
        <p className='text-[clamp(0.8rem,2vw,1.2rem)] font-medium'>School Year:</p>
        <p className='text-center text-[clamp(0.8rem,2vw,1.2rem)] font-medium border-b '>{schoolYear}</p>
      </label>

      <label className='grid grid-cols-2 w-full'>
        <p className='text-[clamp(0.8rem,2vw,1.2rem)] font-medium'>Grade Level to Enroll:</p>
        <select 
          value={gradeLevel} 
          onChange={(e) => setGradeLevel(e.target.value)} 
          className='text-center text-[clamp(0.8rem,2vw,1.2rem)] font-medium border-0 focus:outline-none border-b'
        >
          <option>11</option>
          <option>12</option>
          <option value='Non-Graded' ><label>Non-Graded</label></option>
        </select>
      </label>

      {gradeLevel === 'Non-Graded' && (
        <label className='grid grid-cols-1 italic text-red-700 text-end w-full text-[12px] sm:text-[14px]'>
          * For Special Needs Education (SNEd) Only *
        </label>
      )}

      <label className='grid grid-cols-2 w-full'>
        <p className='text-[clamp(0.8rem,2vw,1.2rem)] font-medium'>LRN Number:</p>
        <input type='number' value={lrn} onChange={handleChange} className='text-center text-[clamp(0.8rem,2vw,1.2rem)] font-medium border-0 focus:outline-none border-b' />
      </label>
    </div>
  )
}
