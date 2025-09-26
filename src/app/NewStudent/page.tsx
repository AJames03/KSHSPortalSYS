"use client";

import React , { useState, useEffect } from 'react';
import { Arvo, Bebas_Neue, Poppins } from 'next/font/google';
import Image from 'next/image';
import 'bootstrap-icons/font/bootstrap-icons.css';

const arvo = Arvo({
  subsets: ["latin"],
  weight: ["700", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "400"],
});

export default function Page() {
  const [schoolYear, setSchoolYear] = useState("");

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    setSchoolYear(`${currentYear}-${nextYear}`);
  },[]);

  return (
    <div className=' w-full h-full flex flex-col'>

        {/* Header */}
        <div className="text-center bg-blue-700 text-white flex justify-center p-2 gap-2 w-full sticky top-0">
            <Image src="/KSHS_LOGO.png" alt="logo" width={100} height={100}/>
            <div className={`${arvo.className} flex flex-col justify-center text-2xl`}>
                <label>KASIGLAHAN VILLAGE</label>
                <label>SENIOR HIGH SCHOOL</label>
                
                <div className="flex bg-white pl-2 pr-2 text-black justify-center items-center rounded-md">
                    <label className={`${poppins.className} text-sm text-amber-600`}>STEM</label>
                    <i className="bi bi-dot"></i>
                    <label className={`${poppins.className} text-sm text-green-600`}>ABM</label>
                    <i className="bi bi-dot"></i>
                    <label className={`${poppins.className} text-sm text-blue-700`}>TVL-ICT</label>
                    <i className="bi bi-dot"></i>
                    <label className={`${poppins.className} text-sm text-green-800`}>HUMSS</label>
                    <i className="bi bi-dot"></i>
                    <label className={`${poppins.className} text-sm text-orange-500`}>ALS</label>
                </div>
            </div>
        </div>

        {/* FORM */}
        <div className='flex-1 flex flex-col p-2  h-screen'>
          <div>
            <h1 className='text-xl text-center font-bold'>BASIC EDUCATION ENROLLMENT FORM</h1>
          </div>

          <form className='flex flex-col gap-4 items-center'>

            <div className='flex flex-col gap-5 justify-center items-center w-1/2 h-1/2 m-4 p-2'>
              <div className='grid grid-cols-[auto_1fr] gap-2 w-full bg-cyan-50 p-5 rounded-2xl shadow-md shadow-gray-400'>
                <label className='font-bold'>Learner Reference No. (LRN):</label>
                <input type='number' className='border-b border-black' />

                <label className='font-bold'>1. School Year:</label>
                <input className='w-full border-b border-black' type='text' value={schoolYear}/>

                <label className='font-bold'>2. Grade Level to Enroll:</label>
                <select className='w-full border-b border-black'>
                  <option>11</option>
                  <option>12</option>
                </select>
              </div>

              <div className='grid grid-cols-[auto_1fr] gap-2 w-full bg-cyan-50 p-5 rounded-2xl shadow-md shadow-gray-400'>
                <label className='font-bold col-span-2'>3. Learner's Personal Information</label>
                <label>Last Name:</label>
                <input className='w-full border-b border-black' type='text'/>
                <label>First Name:</label>
                <input className='w-full border-b border-black' type='text'/>
                <label>Middle Name:</label>
                <input className='w-full border-b border-black' type='text'/>
                <label>Extension Name (If Applicable):</label>
                <input className='w-full border-b border-black' type='text'/>
                <label>Sex:</label>
                <select className='w-full border-b border-black'>
                  <option>Male</option>
                  <option>Female</option>
                </select>
                <label>Birthdate:</label>
                <input className='w-full border-b border-black' type='date'/>
                <label>Place of Birth (Municipal/City):</label>
                <input className='w-full border-b border-black' type='text'/>
                <label>Religion:</label>
                <input className='w-full border-b border-black' type='text'/>
                <label className='col-span-2'>Belonging to any Indigenous Peoples (IP) Community/Indigenous Cultural Community</label>
                <span className='flex gap-2 items-center justify-end'>
                  <input type='radio' value="Yes" name='IP' className='border-b border-black'/>
                  <label>Yes</label>
                </span>
                <span className='flex gap-2 items-center justify-center'>
                  <input type='radio' value="No" name='IP' className='border-b border-black'/>
                  <label>No</label>
                </span>
                <span className='col-span-2 border-b border-black mb-2'></span>

                <label>Is your family a beneficiary of 4Ps?</label>
                <span className='flex gap-10 items-center justify-center'>
                  <div className='flex gap-2'>
                    <input type='radio' value="Yes" name='4Ps'/>
                    <label>Yes</label>
                  </div>
                  <div className='flex gap-2'>
                    <input type='radio' value="No" name='4Ps'/>
                    <label>No</label>
                  </div>
                </span>
                <label className='col-span-2 font-bold'>Current Address:</label>
                <label>House No.</label>
                <input className='w-full border-b border-black' type='text' />
                <label>Sitio/Street Name</label>
                <input className='w-full border-b border-black' type='text'/>
                <label>Barangay</label>
                <input className='w-full border-b border-black' type='text'/>
                <label>City/Municipality</label>
                <input className='w-full border-b border-black' type='text'/>
                <label>Province</label>
                <input className='w-full border-b border-black' type='text'/>
                <label>Zip Code</label>
                <input className='w-full border-b border-black' type='text'/>
                <div className='col-span-2 bg-white p-2 grid grid-cols-[auto_1fr] border-black border-1 rounded-md'>
                  <label className='bg-'>Permament Address Same with your Current Address?</label>
                  <span className='flex gap-10 items-center justify-center'>
                    <div className='flex gap-2'>
                      <input type='radio' value="Yes" name='4Ps'/>
                      <label>Yes</label>
                    </div>
                    <div className='flex gap-2'>
                      <input type='radio' value="No" name='4Ps'/>
                      <label>No</label>
                    </div>
                  </span>
                </div>
              </div>

        
            </div>
          </form>
        </div>
    </div>
  )
}
