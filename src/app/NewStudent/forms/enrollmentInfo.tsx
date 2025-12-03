'use client';
import React, { useEffect } from 'react';
import { Poppins } from 'next/font/google';
import {FormDataType} from '../page';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['200', '400', '700', '900'],
  style: ['normal', 'italic'],
});

// ✅ Props
type EnrollmentInfoProps = {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
};


export default function EnrollmentInfo({ formData, setFormData }: EnrollmentInfoProps) {
  // ✅ Automatically set schoolYear
  useEffect(() => {
    if (!formData.enrollmentInfo?.schoolYear) {
      const year = new Date().getFullYear();
      setFormData((prev: FormDataType) => ({
        ...prev,
        enrollmentInfo: {
          ...prev.enrollmentInfo,
          schoolYear: `${year}-${year + 1}`,
        },
      }));
    }
  }, [formData.enrollmentInfo?.schoolYear, setFormData]);

  // ✅ Handle LRN input
  const handleLrnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 12 && /^\d*$/.test(value)) {
      setFormData((prev: FormDataType) => ({
        ...prev,
        enrollmentInfo: { ...prev.enrollmentInfo, lrn: value },
      }));
    }
  };

  // ✅ Handle Grade Level selection
  const handleGradeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev: FormDataType) => ({
      ...prev,
      enrollmentInfo: { ...prev.enrollmentInfo, gradeLevel: e.target.value },
    }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev: FormDataType) => ({
      ...prev,
      enrollmentInfo: { ...prev.enrollmentInfo, email: e.target.value },
    }));
  };

  return (
    <div className='w-full h-full flex flex-col text-black gap-3 sm:gap-2 p-5 items-center overflow-auto'>
      <p className='text-[12px] lg:text-[16px]'>
        <label className='italic font-bold'>Instruction: </label>
        <label>
          Please complete all required fields and fill in your personal information with full details. Select your course or program carefully from the options provided. Ensure that all sections are completed before submitting the form and double-check your entries for any errors.
        </label>
      </p>
      <label className='flex flex-col w-full'>
        <h1
          className={`${poppins.className} font-bold text-md sm:text-2xl text-center w-[100%]`}
        >
          ENROLLMENT INFORMATION
        </h1>
        <span className='h-1 bg-black mb-2'></span>
      </label>

      <div className='w-full flex flex-col gap-3 lg:grid lg:grid-cols-2 lg:gap-5 lg:mt-5 overflw-auto'>
        {/* Email */}
        <label className='flex flex-col border-2 border-gray-300 focus-within:border-sky-500 p-2 rounded-md duration-200 group'>
          <p className='text-[clamp(0.8rem,2vw,1.2rem)] lg:text-[14px] font-medium relative 
                         text-gray-500 group-focus-within:text-sky-500 duration-200'>
            Email:
          </p>
          <input
            value={formData.enrollmentInfo?.email || ''}
            onChange={handleEmailChange}
            className='text-left text-[16px] font-medium border-0 focus:outline-none'
          />
        </label>
        {/* School Year */}
        <label className='flex flex-col border-2 border-gray-300 focus-within:border-sky-500 p-2 rounded-md duration-200 group'>
          <p className='text-[clamp(0.8rem,2vw,1.2rem)] lg:text-[14px] font-medium relative 
                         text-gray-500 group-focus-within:text-sky-500 duration-200'>
            School Year:
          </p>
          <input
            value={formData.enrollmentInfo?.schoolYear || ''}
            className='text-left text-gray-500 text-[16px] font-medium outline-none'
            readOnly
          />
        </label>

        {/* Grade Level */}
        <label className='flex flex-col border-2 border-gray-300 focus-within:border-sky-500 p-2 rounded-md duration-200 group'>
          <p className='text-[clamp(0.8rem,2vw,1.2rem)] lg:text-[14px] font-medium relative 
                         text-gray-500 group-focus-within:text-sky-500 duration-200'>
            Grade Level to Enroll:
          </p>
          <select
            value={formData.enrollmentInfo?.gradeLevel || ''}
            onChange={handleGradeChange}
            className='text-left text-[16px] font-medium border-0 focus:outline-none'
          >
            <option value='' disabled>
              Select Grade Level
            </option>
            <option value='11'>11</option>
            <option value='12'>12</option>
            <option value='Non-Graded'>Non-Graded</option>
          </select>
          {/* Special Note for Non-Graded */}
          {formData.enrollmentInfo?.gradeLevel === 'Non-Graded' && (
            <label className='right-[30px] italic text-gray-500 
                  text-[10px] sm:text-[12px] bg-white pl-1 pr-1 lg:bg-transparent lg:pl-0 lg:pr-0'>
              * For Special Needs Education (SNEd) Only *
            </label>
          )}
        </label>


        {/* LRN Number */}
        <label className='flex flex-col border-2 border-gray-300 focus-within:border-sky-500 p-2 rounded-md duration-200 group'>
          <p className='text-[clamp(0.8rem,2vw,1.2rem)] lg:text-[14px] font-medium relative 
                         text-gray-500 group-focus-within:text-sky-500 duration-200'>
            LRN Number:
          </p>
          <input
            type='number'
            value={formData.enrollmentInfo?.lrn || ''}
            onChange={handleLrnChange}
            className='text-left text-[16px] font-medium border-0 focus:outline-none'
          />
        </label>
      </div>
    </div>
  );
}
