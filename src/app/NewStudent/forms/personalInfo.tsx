'use client';
import React, { useState, useEffect } from 'react'
import { Arvo, Bebas_Neue, Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "700", "900"],
  style: ["normal", "italic"],
})

export default function PersonalInfo() {
    const [age, setAge] = useState<string>('');
    const [selectIP, setSelectIP] = useState<string>('');
    const [select4PS, setselect4PS] = useState<string>('');
    const [selectAddress, setSelectAddress] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const ageValue = e.target.value;
        
        if(ageValue.length <= 2){
          if (/^\d*$/.test(ageValue)) {
            setAge(ageValue);
          }
        }
      }

  return (
    <div className='w-full flex flex-col sm:w-1/2 text-black sm:text-lg gap-5 m-2 sm:p-5'>
        <header className={`${poppins.className} text-[clamp(0.8rem,2vw,1.2rem)] bg-gray-100 shadow-gray-400 shadow-lg rounded-lg flex flex-col gap-5 p-5`}>
            <p>PSA Birth Certificate No. (if available upon registration):</p>
            <input className='text-[clamp(0.8rem,2vw,1.2rem)] font-medium border-0 focus:outline-none border-b w-full' />
        </header>

        <div className='flex flex-col gap-2 font-medium bg-gray-100 rounded-lg p-5 shadow-gray-400 shadow-lg'>
            
            {/* FIRST NAME, LAST NAME, MIDDLE NAME */}
            <span className='grid grid-cols-2 sm:grid-cols-3 gap-2'>
                <label className={`${poppins.className} text-[12px] sm:text-[16px] col-span-1 italic text-gray-500`}>Last Name:</label>
                <input type="text" className={`${poppins.className} text-[12px] sm:text-[16px] col-span-2 font-medium border-0 focus:outline-none border-b w-full`} />
            </span>
            <span className='grid grid-cols-2 sm:grid-cols-3 gap-2'>
                <label className={`${poppins.className} text-[12px] sm:text-[16px] col-span-1 italic text-gray-500`}>First Name:</label>
                <input type="text" className={`${poppins.className} text-[12px] sm:text-[16px] col-span-2 font-medium border-0 focus:outline-none border-b w-full`} />
            </span>
            <span className='grid grid-cols-2 sm:grid-cols-3 gap-2'>
                <label className={`${poppins.className} text-[12px] sm:text-[16px] col-span-1 italic text-gray-500`}>Middle Name:</label>
                <input type="text" className={`${poppins.className} text-[12px] sm:text-[16px] col-span-2 font-medium border-0 focus:outline-none border-b w-full`} />
            </span>

           
            {/* BIRTHDATE, AGE, SEX */}
            <span className='grid grid-cols-2 sm:grid-cols-3 gap-2'>
                <label className={`${poppins.className} text-[12px] sm:text-[16px] col-span-1 italic text-gray-500`}>Birthdate:</label>
                <input type="date" className={`${poppins.className} text-[12px] sm:text-[16px] col-span-2 font-medium border-0 focus:outline-none border-b w-full`} />
            </span>
            <div className='grid grid-cols-2 gap-10 sm:flex sm:flex-col sm:gap-2'>
                <span className='grid grid-cols-2 sm:grid-cols-3 gap-2'>
                    <label className={`${poppins.className} text-[12px] sm:text-[16px] col-span-1 italic text-gray-500`}>Age:</label>
                    <input type="number" value={age} onChange={handleChange} className={`${poppins.className} text-[12px] sm:text-[16px] col-span-2 font-medium border-0 focus:outline-none border-b w-full`} />
                </span>
                <span className='grid grid-cols-2 sm:grid-cols-3 gap-2'>
                    <label className={`${poppins.className} text-[12px] sm:text-[16px] col-span-1 italic text-gray-500`}>Sex:</label>
                    <span className={`${poppins.className} text-[12px] sm:text-[16px] col-span-2 font-medium border-0 focus:outline-none flex gap-2 items-center `}>
                        <input type="radio" name="sex" className='accent-blue-700' /> Male
                        <input type="radio" name="sex" className='accent-blue-700' /> Female
                    </span>
                </span>
            </div>

            {/* PLACE OF BIRTH, RELIGION, MOTHER TONGUE */}
            <span className='grid grid-cols-2 sm:grid-cols-3 gap-2'>
                <label className={`${poppins.className} text-[12px] sm:text-[16px] col-span-1 italic text-gray-500`}>Place of Birth:</label>
                <input type="text" className={`${poppins.className} text-[12px] sm:text-[16px] col-span-2 font-medium border-0 focus:outline-none border-b w-full`} />
            </span>
            <span className='grid grid-cols-2 sm:grid-cols-3 gap-2'>
                <label className={`${poppins.className} text-[12px] sm:text-[16px] col-span-1 italic text-gray-500`}>Religion:</label>
                <input type="text" className={`${poppins.className} text-[12px] sm:text-[16px] col-span-2 font-medium border-0 focus:outline-none border-b w-full`} />
            </span>
            <span className='grid grid-cols-2 sm:grid-cols-3 gap-2'>
                <label className={`${poppins.className} text-[12px] sm:text-[16px] col-span-1 italic text-gray-500`}>Mother Tongue:</label>
                <input type="text" className={`${poppins.className} text-[12px] sm:text-[16px] col-span-2 font-medium border-0 focus:outline-none border-b w-full`} />
            </span>

            {/* BELONG TO ANY INDIGENOUS PEOPLE */}
            <span className='grid grid-cols-4 sm:grid-cols-3 gap-2'>
                <label className={`${poppins.className} text-[12px] sm:text-[14px] col-span-4 italic text-gray-500`}>Belong to any Indigenous People Community/Indigenous Cultural Community?</label>
                <div className='flex flex-row col-span-5 justify-around'>
                    <span className='flex gap-2'>
                        <input type="radio" name="IP" className='accent-blue-700 text-sm' value="Yes" checked={selectIP === 'Yes'} onChange={(e) => setSelectIP(e.target.value)}/>
                        <label className={`${poppins.className} text-[12px] sm:text-[16px] font-medium`}>Yes</label>
                    </span>
                    <span className='flex gap-2'>
                        <input type="radio" name="IP" className='accent-blue-700 text-sm' value="No" checked={selectIP === 'No'} onChange={(e) => setSelectIP(e.target.value)}/>
                        <label className={`${poppins.className} text-[12px] sm:text-[16px] font-medium`}>No</label>
                    </span>
                </div>
                {selectIP === 'Yes' && (
                    <div className='col-span-5 grid grid-cols-3 border border-gray-400 p-2 rounded-lg'>
                        <label className={`${poppins.className} text-[12px] sm:text-[14px] col-span-2 sm:col-span-1 italic text-gray-500`}>Please Specify:</label>
                        <input type='text' className={`${poppins.className} text-[12px] sm:text-[16px] col-span-3 sm:col-span-2 font-medium border-0 focus:outline-none border-b w-full`} />
                    </div>
                )}
            </span>

            {/* 4PS */}
            <span className='grid grid-cols-4 sm:grid-cols-3 gap-2'>
                <label className={`${poppins.className} text-[12px] sm:text-[14px] col-span-4 italic text-gray-500`}>Is your family a beneficiary of 4Ps?</label>
                <div className='flex flex-row col-span-5 justify-around'>
                    <span className='flex gap-2'>
                        <input type="radio" name="4ps" className='accent-blue-700 text-sm' value="Yes" checked={select4PS === 'Yes'} onChange={(a) => setselect4PS(a.target.value)}/>
                        <label className={`${poppins.className} text-[12px] sm:text-[16px] font-medium`}>Yes</label>
                    </span>
                    <span className='flex gap-2'>
                        <input type="radio" name="4ps" className='accent-blue-700 text-sm' value="No" checked={select4PS === 'No'} onChange={(a) => setselect4PS(a.target.value)}/>
                        <label className={`${poppins.className} text-[12px] sm:text-[16px] font-medium`}>No</label>
                    </span>
                </div>
                {select4PS === 'Yes' && (
                    <div className='col-span-5 grid grid-cols-3 border border-gray-400 p-2 rounded-lg'>
                        <label className={`${poppins.className} text-[12px] sm:text-[14px] col-span-2 italic text-gray-500`}>Please write the 4Ps Household ID Number:</label>
                        <input type='number' className={`${poppins.className} text-[12px] sm:text-[16px] col-span-3 font-medium border-0 focus:outline-none border-b w-full`} />
                    </div>
                )}
            </span>

            {/* CURRENT ADDRESS */}
            <div className='flex flex-col gap-2 mt-4 sm:grid sm:grid-cols-3 sm:gap-3 sm:mt-5'>
                <label className={`${poppins.className} col-span-3 font-bold`}>CURRENT ADDRESS</label>
                <span className='sm:grid sm:grid-cols-2 gap-2'>
                    <label className={`${poppins.className} text-[12px] sm:text-[16px] col-span-1 italic text-gray-500`}>House No.</label>
                    <input type="text" className={`${poppins.className} text-[12px] sm:text-[16px] col-span-3 font-medium border-0 focus:outline-none border-b w-full`} />
                </span>
                <span className='sm:grid sm:grid-cols-2 gap-2'>
                    <label className={`${poppins.className} text-[12px] sm:text-[16px] col-span-4 italic text-gray-500`}>Sitio/Street Name:</label>
                    <input type="text" className={`${poppins.className} text-[12px] sm:text-[16px] col-span-3 font-medium border-0 focus:outline-none border-b w-full`} />
                </span>
                <span className='sm:grid sm:grid-cols-2 gap-2'>
                    <label className={`${poppins.className} text-[12px] sm:text-[16px] col-span-4 italic text-gray-500`}>Barangay:</label>
                    <input type="text" className={`${poppins.className} text-[12px] sm:text-[16px] col-span-3 font-medium border-0 focus:outline-none border-b w-full`} />
                </span>
                
                <div className='flex flex-col gap-2 sm:col-span-3 sm:grid sm:grid-cols-4 sm:gap-3'>
                    <span className='sm:grid sm:grid-cols-2 gap-2'>
                        <label className={`${poppins.className} text-[12px] sm:text-[16px] sm:col-span-1 italic text-gray-500`}>Municipality/City:</label>
                        <input type="text" className={`${poppins.className} text-[12px] sm:text-[16px] sm:col-span-3 font-medium border-0 focus:outline-none border-b w-full`} />
                    </span>
                    <span className='sm:grid sm:grid-cols-2 gap-2'>
                        <label className={`${poppins.className} text-[12px] sm:text-[16px] sm:col-span-2 italic text-gray-500`}>Province:</label>
                        <input type="text" className={`${poppins.className} text-[12px] sm:text-[16px] sm:col-span-3 font-medium border-0 focus:outline-none border-b w-full`} />
                    </span>
                    <span className='sm:grid sm:grid-cols-2 gap-2'>
                        <label className={`${poppins.className} text-[12px] sm:text-[16px] sm:col-span-3 italic text-gray-500`}>Country:</label>
                        <input type="text" className={`${poppins.className} text-[12px] sm:text-[16px] sm:col-span-3 font-medium border-0 focus:outline-none border-b w-full`} />
                    </span>
                    <span className='sm:grid sm:grid-cols-2 gap-2'>
                        <label className={`${poppins.className} text-[12px] sm:text-[16px] sm:col-span-4 italic text-gray-500`}>Zip Code:</label>
                        <input type="text" className={`${poppins.className} text-[12px] sm:text-[16px] sm:col-span-4 font-medium border-0 focus:outline-none border-b w-full`} />
                    </span>
                </div>
                <div className='col-span-3 grid grid-cols-2'>
                    <label className={`${poppins.className} col-span-3 font-bold`}>PERMAMENT ADDRESS</label>
                    <label className={`${poppins.className} text-[12px] col-span-3 sm:text-[16px] italic text-gray-500`}>Same with your Current Address?</label>
                    <div className='flex flex-row col-span-5 justify-around'>
                        <span className='flex gap-2'>
                            <input type="radio" name="address" className='accent-blue-700 text-sm' value="Yes" checked={selectAddress === 'Yes'} onChange={(b) => setSelectAddress(b.target.value)}/>
                            <label className={`${poppins.className} text-[12px] sm:text-[16px] font-medium`}>Yes</label>
                        </span>
                        <span className='flex gap-2'>
                            <input type="radio" name="address" className='accent-blue-700 text-sm' value="No" checked={selectAddress === 'No'} onChange={(b) => setSelectAddress(b.target.value)}/>
                            <label className={`${poppins.className} text-[12px] sm:text-[16px] font-medium`}>No</label>
                        </span>
                    </div>
                    {selectAddress === 'No' && (
                        <div className='col-span-3 flex flex-col gap-2 mt-4 border border-gray-500 p-2 rounded-lg sm:grid sm:grid-cols-3 sm:gap-3 sm:mt-5'>
                            <span className='sm:grid sm:grid-cols-2 gap-2'>
                                <label className={`${poppins.className} text-[12px] sm:text-[16px] col-span-1 italic text-gray-500`}>House No.</label>
                                <input type="text" className={`${poppins.className} text-[12px] sm:text-[16px] col-span-3 font-medium border-0 focus:outline-none border-b w-full`} />
                            </span>
                            <span className='sm:grid sm:grid-cols-2 gap-2'>
                                <label className={`${poppins.className} text-[12px] sm:text-[16px] col-span-4 italic text-gray-500`}>Sitio/Street Name:</label>
                                <input type="text" className={`${poppins.className} text-[12px] sm:text-[16px] col-span-3 font-medium border-0 focus:outline-none border-b w-full`} />
                            </span>
                            <span className='sm:grid sm:grid-cols-2 gap-2'>
                                <label className={`${poppins.className} text-[12px] sm:text-[16px] col-span-4 italic text-gray-500`}>Barangay:</label>
                                <input type="text" className={`${poppins.className} text-[12px] sm:text-[16px] col-span-3 font-medium border-0 focus:outline-none border-b w-full`} />
                            </span>
                            
                            <div className='flex flex-col gap-2 sm:col-span-3 sm:grid sm:grid-cols-4 sm:gap-3'>
                                <span className='sm:grid sm:grid-cols-2 gap-2'>
                                    <label className={`${poppins.className} text-[12px] sm:text-[16px] sm:col-span-1 italic text-gray-500`}>Municipality/City:</label>
                                    <input type="text" className={`${poppins.className} text-[12px] sm:text-[16px] sm:col-span-3 font-medium border-0 focus:outline-none border-b w-full`} />
                                </span>
                                <span className='sm:grid sm:grid-cols-2 gap-2'>
                                    <label className={`${poppins.className} text-[12px] sm:text-[16px] sm:col-span-2 italic text-gray-500`}>Province:</label>
                                    <input type="text" className={`${poppins.className} text-[12px] sm:text-[16px] sm:col-span-3 font-medium border-0 focus:outline-none border-b w-full`} />
                                </span>
                                <span className='sm:grid sm:grid-cols-2 gap-2'>
                                    <label className={`${poppins.className} text-[12px] sm:text-[16px] sm:col-span-3 italic text-gray-500`}>Country:</label>
                                    <input type="text" className={`${poppins.className} text-[12px] sm:text-[16px] sm:col-span-3 font-medium border-0 focus:outline-none border-b w-full`} />
                                </span>
                                <span className='sm:grid sm:grid-cols-2 gap-2'>
                                    <label className={`${poppins.className} text-[12px] sm:text-[16px] sm:col-span-4 italic text-gray-500`}>Zip Code:</label>
                                    <input type="text" className={`${poppins.className} text-[12px] sm:text-[16px] sm:col-span-4 font-medium border-0 focus:outline-none border-b w-full`} />
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}
