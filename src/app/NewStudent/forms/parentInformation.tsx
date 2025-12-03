'use client';
import React from 'react';
import { Poppins } from 'next/font/google';
import { FormDataType, ParentInfoType } from '../page';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['200', '400', '700', '900'],
  style: ['normal', 'italic'],
});

interface ParentInfoProps {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
}

export default function ParentInformation({ formData, setFormData }: ParentInfoProps) {
  const handleChange =
    (field: keyof ParentInfoType) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = e.target.value;
      if (field === 'fatherCN' || field === 'motherCN' || field === 'guardianCN') {
        if (value.length <= 11 && /^\d*$/.test(value)) {
          setFormData({
            ...formData,
            parentInfo: { ...formData.parentInfo, [field]: value },
          });
        }
      } else {
        setFormData({
          ...formData,
          parentInfo: { ...formData.parentInfo, [field]: value },
        });
      }
    };

  return (
    <div className=" flex flex-col text-black sm:text-lg gap-5 m-2 sm:p-2">
      <div className="flex flex-col gap-5">
        {/* Father's Information */}
        <div>
          <label
            className={`${poppins.className} text-[14px] sm:text-[20px] font-bold text-black mb-5`}
          >
            Father&apos;s Name:
          </label>
          <div className="flex flex-col sm:grid sm:grid-cols-3 gap-2">
            <span className='flex flex-col border-2 border-gray-300 focus-within:border-sky-500 p-2 rounded-md duration-200'>
              <label className={`${poppins.className} text-[12px] sm:text-[12px] italic text-gray-500`}>
                Last Name:
              </label>
              <input
                type="text"
                className={`${poppins.className} text-[12px] sm:text-[16px] font-medium focus:outline-none w-full`}
                value={formData.parentInfo.fatherLN}
                onChange={handleChange('fatherLN')}
              />
            </span>
            <span className='flex flex-col border-2 border-gray-300 focus-within:border-sky-500 p-2 rounded-md duration-200'>
              <label className={`${poppins.className} text-[12px] sm:text-[12px] italic text-gray-500`}>
                First Name:
              </label>
              <input
                type="text"
                className={`${poppins.className} text-[12px] sm:text-[16px] font-medium focus:outline-none w-full`}
                value={formData.parentInfo.fatherFN}
                onChange={handleChange('fatherFN')}
              />
            </span>
            <span className='flex flex-col border-2 border-gray-300 focus-within:border-sky-500 p-2 rounded-md duration-200'>
              <label className={`${poppins.className} text-[12px] sm:text-[12px] italic text-gray-500`}>
                Middle Name:
              </label>
              <input
                type="text"
                className={`${poppins.className} text-[12px] sm:text-[16px] font-medium focus:outline-none w-full`}
                value={formData.parentInfo.fatherMN}
                onChange={handleChange('fatherMN')}
              />
            </span>
            <span className='col-span-3 flex flex-col border-2 border-gray-300 focus-within:border-sky-500 p-2 rounded-md duration-200'>
              <label className={`${poppins.className} text-[12px] sm:text-[12px] italic text-gray-500`}>
                Contact Number:
              </label>
              <input
                type="number"
                className={`${poppins.className} text-[12px] sm:text-[16px] font-medium focus:outline-none w-full`}
                value={formData.parentInfo.fatherCN}
                onChange={handleChange('fatherCN')}
              />
            </span>
          </div>
        </div>

        {/* Mother's Information */}
        <div>
          <label
            className={`${poppins.className} text-[14px] sm:text-[20px] font-bold text-black mb-5`}
          >
            Mother&apos;s Name:
          </label>
          <div className="flex flex-col sm:grid sm:grid-cols-3 gap-2">
            <span className='flex flex-col border-2 border-gray-300 focus-within:border-sky-500 p-2 rounded-md duration-200'>
              <label className={`${poppins.className} text-[12px] sm:text-[12px] italic text-gray-500`}>
                Last Name:
              </label>
              <input
                type="text"
                className={`${poppins.className} text-[12px] sm:text-[16px] font-medium focus:outline-none w-full`}
                value={formData.parentInfo.motherLN}
                onChange={handleChange('motherLN')}
              />
            </span>
            <span className='flex flex-col border-2 border-gray-300 focus-within:border-sky-500 p-2 rounded-md duration-200'>
              <label className={`${poppins.className} text-[12px] sm:text-[12px] italic text-gray-500`}>
                First Name:
              </label>
              <input
                type="text"
                className={`${poppins.className} text-[12px] sm:text-[16px] font-medium focus:outline-none w-full`}
                value={formData.parentInfo.motherFN}
                onChange={handleChange('motherFN')}
              />
            </span>
            <span className='flex flex-col border-2 border-gray-300 focus-within:border-sky-500 p-2 rounded-md duration-200'>
              <label className={`${poppins.className} text-[12px] sm:text-[12px] italic text-gray-500`}>
                Middle Name:
              </label>
              <input
                type="text"
                className={`${poppins.className} text-[12px] sm:text-[16px] font-medium focus:outline-none w-full`}
                value={formData.parentInfo.motherMN}
                onChange={handleChange('motherMN')}
              />
            </span>
            <span className='col-span-3 flex flex-col border-2 border-gray-300 focus-within:border-sky-500 p-2 rounded-md duration-200'>
              <label className={`${poppins.className} text-[12px] sm:text-[12px] italic text-gray-500`}>
                Contact Number:
              </label>
              <input
                type="number"
                className={`${poppins.className} text-[12px] sm:text-[16px] font-medium focus:outline-none w-full`}
                value={formData.parentInfo.motherCN}
                onChange={handleChange('motherCN')}
              />
            </span>
          </div>
        </div>

        {/* Guardian's Information */}
        <div>
          <label
            className={`${poppins.className} text-[14px] sm:text-[20px] font-bold text-black mb-5`}
          >
            Legal Guardian&apos;s Name:
          </label>
          <div className="flex flex-col sm:grid sm:grid-cols-3 gap-2">
            <span className='flex flex-col border-2 border-gray-300 focus-within:border-sky-500 p-2 rounded-md duration-200'>
              <label className={`${poppins.className} text-[12px] sm:text-[12px] italic text-gray-500`}>
                Last Name:
              </label>
              <input
                type="text"
                className={`${poppins.className} text-[12px] sm:text-[16px] font-medium focus:outline-none w-full`}
                value={formData.parentInfo.guardianLN}
                onChange={handleChange('guardianLN')}
              />
            </span>
            <span className='flex flex-col border-2 border-gray-300 focus-within:border-sky-500 p-2 rounded-md duration-200'>
              <label className={`${poppins.className} text-[12px] sm:text-[12px] italic text-gray-500`}>
                First Name:
              </label>
              <input
                type="text"
                className={`${poppins.className} text-[12px] sm:text-[16px] font-medium focus:outline-none w-full`}
                value={formData.parentInfo.guardianFN}
                onChange={handleChange('guardianFN')}
              />
            </span>
            <span className='flex flex-col border-2 border-gray-300 focus-within:border-sky-500 p-2 rounded-md duration-200'>
              <label className={`${poppins.className} text-[12px] sm:text-[12px] italic text-gray-500`}>
                Middle Name:
              </label>
              <input
                type="text"
                className={`${poppins.className} text-[12px] sm:text-[16px] font-medium focus:outline-none w-full`}
                value={formData.parentInfo.guardianMN}
                onChange={handleChange('guardianMN')}
              />
            </span>
            <span className='col-span-3 flex flex-col border-2 border-gray-300 focus-within:border-sky-500 p-2 rounded-md duration-200'>
              <label className={`${poppins.className} text-[12px] sm:text-[12px] italic text-gray-500`}>
                Contact Number:
              </label>
              <input
                type="number"
                className={`${poppins.className} text-[12px] sm:text-[16px] font-medium focus:outline-none w-full`}
                value={formData.parentInfo.guardianCN}
                onChange={handleChange('guardianCN')}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
