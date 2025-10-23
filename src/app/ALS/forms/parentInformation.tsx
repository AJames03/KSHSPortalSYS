'use client';
import React, { useState, useEffect } from 'react'
import { Arvo, Bebas_Neue, Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "700", "900"],
  style: ["normal", "italic"],
})

interface ParentInfoProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
};

export default function parentInformation({ formData, setFormData }: ParentInfoProps) {
    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
        ...formData,
        parentInfo: { ...formData.parentInfo, [field]: e.target.value },
        });
    };

  return (
    <div className='w-full flex flex-col sm:w-1/2 text-black sm:text-lg gap-5 m-2 sm:p-2'>
        <div className='flex flex-col m-2 gap-5 bg-gray-100 rounded-lg p-5 shadow-gray-400 shadow-lg'>
            <div>
                <label className={`${poppins.className} text-[14px] sm:text-[20px] col-span-1 font-bold text-black mb-5`}>Father's Name:</label>
                <div className='p-2 sm:grid sm:grid-cols-3 gap-2'>
                    <span>
                        <label className={`${poppins.className} text-[12px] sm:text-[16px] col-span-1 italic text-gray-500`}>Last Name:</label>
                        <input 
                            type="text" 
                            className={`${poppins.className} text-[12px] sm:text-[16px] col-span-2 font-medium border-0 focus:outline-none border-b w-full`} 
                            value={formData.parentInfo.fatherLN}
                            onChange={handleChange('fatherLN')}
                        />
                    </span>
                    <span>
                        <label className={`${poppins.className} text-[12px] sm:text-[16px] col-span-1 italic text-gray-500`}>First Name:</label>
                        <input 
                        type="text" 
                        className={`${poppins.className} text-[12px] sm:text-[16px] col-span-2 font-medium border-0 focus:outline-none border-b w-full`}
                        value={formData.parentInfo.fatherFN}
                        onChange={handleChange('fatherFN')}
                        />
                    </span>
                    <span>
                        <label className={`${poppins.className} text-[12px] sm:text-[16px] col-span-1 italic text-gray-500`}>Middle Name:</label>
                        <input 
                        type="text" 
                        className={`${poppins.className} text-[12px] sm:text-[16px] col-span-2 font-medium border-0 focus:outline-none border-b w-full`}
                        value={formData.parentInfo.fatherMN}
                        onChange={handleChange('fatherMN')}
                        />
                    </span>
                    <span className='col-span-3'>
                        <label className={`${poppins.className} text-[12px] sm:text-[16px] col-span-1 italic text-gray-500`}>Contact Number:</label>
                        <input 
                        type="number" 
                        className={`${poppins.className} text-[12px] sm:text-[16px] col-span-2 font-medium border-0 focus:outline-none border-b w-full`} 
                        value={formData.parentInfo.fatherCN}
                        onChange={handleChange('fatherCN')}
                        />
                    </span>
                </div>
            </div>
            
            <div>
                <label className={`${poppins.className} text-[14px] sm:text-[20px] col-span-1 font-bold text-black mb-5`}>Mother's Name:</label>
                <div className='p-2 sm:grid sm:grid-cols-3 gap-2'>
                    <span>
                        <label className={`${poppins.className} text-[12px] sm:text-[16px] col-span-1 italic text-gray-500`}>Last Name:</label>
                        <input 
                            type="text" 
                            className={`${poppins.className} text-[12px] sm:text-[16px] col-span-2 font-medium border-0 focus:outline-none border-b w-full`} 
                            value={formData.parentInfo.motherLN}
                            onChange={handleChange('motherLN')}
                        />
                    </span>
                    <span>
                        <label className={`${poppins.className} text-[12px] sm:text-[16px] col-span-1 italic text-gray-500`}>First Name:</label>
                        <input 
                            type="text" 
                            className={`${poppins.className} text-[12px] sm:text-[16px] col-span-2 font-medium border-0 focus:outline-none border-b w-full`} 
                            value={formData.parentInfo.motherFN}
                            onChange={handleChange('motherFN')}
                        />
                    </span>
                    <span>
                        <label className={`${poppins.className} text-[12px] sm:text-[16px] col-span-1 italic text-gray-500`}>Middle Name:</label>
                        <input 
                            type="text" 
                            className={`${poppins.className} text-[12px] sm:text-[16px] col-span-2 font-medium border-0 focus:outline-none border-b w-full`} 
                            value={formData.parentInfo.motherMN}
                            onChange={handleChange('motherMN')}
                        />
                    </span>
                    <span className='col-span-3'>
                        <label className={`${poppins.className} text-[12px] sm:text-[16px] col-span-1 italic text-gray-500`}>Contact Number:</label>
                        <input 
                            type="number" 
                            className={`${poppins.className} text-[12px] sm:text-[16px] col-span-2 font-medium border-0 focus:outline-none border-b w-full`} 
                            value={formData.parentInfo.motherCN}
                            onChange={handleChange('motherCN')}
                        />
                    </span>
                </div>
            </div>

            <div>
                <label className={`${poppins.className} text-[14px] sm:text-[20px] col-span-1 font-bold text-black mb-5`}>Legal Guardian's Name:</label>
                <div className='p-2 sm:grid sm:grid-cols-3 gap-2'>
                    <span>
                        <label className={`${poppins.className} text-[12px] sm:text-[16px] col-span-1 italic text-gray-500`}>Last Name:</label>
                        <input 
                            type="text" 
                            className={`${poppins.className} text-[12px] sm:text-[16px] col-span-2 font-medium border-0 focus:outline-none border-b w-full`} 
                            value={formData.parentInfo.guardianLN}
                            onChange={handleChange('guardianLN')}
                        />
                    </span>
                    <span>
                        <label className={`${poppins.className} text-[12px] sm:text-[16px] col-span-1 italic text-gray-500`}>First Name:</label>
                        <input 
                            type="text" 
                            className={`${poppins.className} text-[12px] sm:text-[16px] col-span-2 font-medium border-0 focus:outline-none border-b w-full`} 
                            value={formData.parentInfo.guardianFN}
                            onChange={handleChange('guardianFN')}
                        />
                    </span>
                    <span>
                        <label className={`${poppins.className} text-[12px] sm:text-[16px] col-span-1 italic text-gray-500`}>Middle Name:</label>
                        <input 
                            type="text" 
                            className={`${poppins.className} text-[12px] sm:text-[16px] col-span-2 font-medium border-0 focus:outline-none border-b w-full`} 
                            value={formData.parentInfo.guardianMN}
                            onChange={handleChange('guardianMN')}
                        />
                    </span>
                    <span className='col-span-3'>
                        <label className={`${poppins.className} text-[12px] sm:text-[16px] col-span-1 italic text-gray-500`}>Contact Number:</label>
                        <input 
                            type="number" 
                            className={`${poppins.className} text-[12px] sm:text-[16px] col-span-2 font-medium border-0 focus:outline-none border-b w-full`} 
                            value={formData.parentInfo.guardianCN}
                            onChange={handleChange('guardianCN')}
                        />
                    </span>
                </div>
            </div>
        </div>
    </div>
  )
}
