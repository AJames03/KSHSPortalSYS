'use client';
import React, { useEffect } from 'react';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "700", "900"],
  style: ["normal", "italic"],
});

interface Props {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export default function EnrollmentInfo({ formData, setFormData }: Props) {
  // Automatically set schoolYear in formData when component mounts
  useEffect(() => {
    if (!formData.enrollmentInfo?.schoolYear) {
      const year = new Date().getFullYear();
      setFormData({
        ...formData,
        enrollmentInfo: {
          ...formData.enrollmentInfo,
          schoolYear: `${year}-${year + 1}`,
        },
      });
    }
  }, []);

  const handleLrnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 12 && /^\d*$/.test(value)) {
      setFormData({
        ...formData,
        enrollmentInfo: { ...formData.enrollmentInfo, lrn: value },
      });
    }
  };

  const handleGradeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      enrollmentInfo: { ...formData.enrollmentInfo, gradeLevel: e.target.value },
    });
  };

  return (
    <div className='w-full flex flex-col sm:w-1/2 text-black bg-gray-100 shadow-lg rounded-lg gap-2 m-2 p-5'>
      <label className='flex flex-col'>
        <h1 className={`${poppins.className} font-bold text-lg sm:text-2xl text-center sm:text-start`}>
          ENROLLMENT INFORMATION
        </h1>
        <span className='h-1 bg-black mb-2'></span>
      </label>

      {/* School Year */}
      <label className='grid grid-cols-2 w-full'>
        <p className='text-[clamp(0.8rem,2vw,1.2rem)] font-medium'>School Year:</p>
        <input
          value={formData.enrollmentInfo?.schoolYear || ''}
          className='text-center text-[clamp(0.8rem,2vw,1.2rem)] font-medium border-b'
          readOnly
        />
      </label>

      {/* Grade Level */}
      <label className='grid grid-cols-2 w-full'>
        <p className='text-[clamp(0.8rem,2vw,1.2rem)] font-medium'>Grade Level to Enroll:</p>
        <select
          value={formData.enrollmentInfo?.gradeLevel || ''}
          onChange={handleGradeChange}
          className='text-center text-[clamp(0.8rem,2vw,1.2rem)] font-medium border-0 focus:outline-none border-b'
        >
          <option value=''  disabled >Select Grade Level</option>
          <option value='11'>11</option>
          <option value='12'>12</option>
          <option value='Non-Graded'>Non-Graded</option>
        </select>
      </label>

      {/* Special Note for Non-Graded */}
      {formData.enrollmentInfo?.gradeLevel === 'Non-Graded' && (
        <label className='grid grid-cols-1 italic text-red-700 text-end w-full text-[12px] sm:text-[14px]'>
          * For Special Needs Education (SNEd) Only *
        </label>
      )}

      {/* LRN Number */}
      <label className='grid grid-cols-2 w-full'>
        <p className='text-[clamp(0.8rem,2vw,1.2rem)] font-medium'>LRN Number:</p>
        <input
          type='number'
          value={formData.enrollmentInfo?.lrn || ''}
          onChange={handleLrnChange}
          className='text-center text-[clamp(0.8rem,2vw,1.2rem)] font-medium border-0 focus:outline-none border-b'
        />
      </label>
    </div>
  );
}
