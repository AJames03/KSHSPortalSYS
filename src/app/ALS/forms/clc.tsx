'use client';
import React from 'react';
import { Poppins } from 'next/font/google';
import { ALSFormData } from '@/app/ALS/page';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['200', '400', '700', '900'],
  style: ['normal', 'italic'],
});

// ✅ Keep only the local type needed for this form
export interface CLCType {
  kms?: string;
  hour?: string;
  transport?: string;
  otherTransport?: string;
  transportation?: string;
  day?: string;
  time?: string;
}

interface ClcProps {
  formData: ALSFormData;
  setFormData: React.Dispatch<React.SetStateAction<ALSFormData>>;
}

export default function Clc({ formData, setFormData }: ClcProps) {
  const handleChange =
    (field: keyof CLCType) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormData((prevData) => {
        const updatedClc: CLCType = { ...(prevData.clc || {}) };

        if (field === 'transport') {
          updatedClc.transport = e.target.value;
          if (e.target.value !== 'Others') updatedClc.otherTransport = '';
        } else if (field === 'otherTransport') {
          updatedClc.transport = 'Others';
          updatedClc.otherTransport = e.target.value;
        } else {
          updatedClc[field] = e.target.value;
        }

        updatedClc.transportation =
          updatedClc.transport === 'Others'
            ? updatedClc.otherTransport
            : updatedClc.transport;

        return {
          ...prevData,
          clc: updatedClc,
        };
      });
    };

  const trans = ['Walking', 'Motorcycle', 'Bicycle', 'Others'];
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  return (
    <div className="w-full sm:w-1/2 m-5 flex flex-col p-3 justify-between items-center text-black bg-gray-100 shadow-gray-400 shadow-lg">
      <header className="w-full border-b">
        <label
          className={`${poppins.className} text-[16px] sm:text-[24px] font-bold flex flex-col gap-5 pb-2 text-center`}
        >
          Accessibility and Availability of CLC
        </label>
      </header>

      {/* Question 1 */}
      <div className="grid grid-cols-2 mt-5 m-2 sm:p-2 gap-2 w-full">
        <label
          className={`${poppins.className} font-bold col-span-2 sm:text-[20px] sm:text-start`}
        >
          1. How far is your home to your Learning Center?
        </label>

        <span className="col-span-2 grid grid-cols-[110px_150px] gap-2 sm:col-span-1 sm:text-[20px] sm:flex sm:justify-center sm:items-center">
          <label className="text-[14px]">kilometer/s:</label>
          <input
            type="number"
            className="border-b outline-none bg-transparent text-center"
            onChange={handleChange('kms')}
            value={formData.clc?.kms || ''}
          />
        </span>

        <span className="col-span-2 grid grid-cols-[110px_150px] gap-2 sm:col-span-1 sm:flex sm:justify-center sm:items-center">
          <label className="text-end text-[14px]">In hour and mins:</label>
          <input
            type="number"
            className="border-b outline-none bg-transparent text-center"
            onChange={handleChange('hour')}
            value={formData.clc?.hour || ''}
          />
        </span>
      </div>

      {/* Question 2 */}
      <div className="grid grid-cols-1 m-2 sm:p-2 gap-3 w-full">
        <label
          className={`${poppins.className} font-bold sm:text-[20px] sm:text-start`}
        >
          2. How do you get from your home to your Learning Center?
        </label>

        <div className="flex flex-col gap-2 pl-3">
          {trans.map((item, i) => (
            <div key={i} className="flex flex-col">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="transport"
                  value={item}
                  className="accent-blue-700"
                  onChange={handleChange('transport')}
                  checked={formData.clc?.transport === item}
                />
                <span className="text-[14px]">{item}</span>
              </label>

              {item === 'Others' && formData.clc?.transport === 'Others' && (
                <div className="flex flex-row items-center gap-1 ml-2">
                  <span className="block bg-blue-600 w-1 h-5/6 rounded-lg"></span>
                  <input
                    type="text"
                    placeholder="Please specify"
                    className="mt-2 border-b p-2 outline-none bg-transparent text-[14px] w-3/4 sm:w-1/2"
                    onChange={handleChange('otherTransport')}
                    value={formData.clc?.otherTransport || ''}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Question 3 */}
        <div className="mt-4 grid grid-cols-2">
          <label
            className={`${poppins.className} col-span-2 font-bold sm:text-[20px] sm:text-start`}
          >
            3. Please provide the specific day and time you can be at your
            Learning Center.
          </label>

          <div className="col-span-2 grid grid-cols-2 sm:flex-row gap-2 p-2 justify-center m-2">
            {days.map((item, i) => (
              <div key={i} className="flex flex-col">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="day"
                    value={item}
                    className="accent-blue-700"
                    onChange={handleChange('day')}
                    checked={formData.clc?.day === item}
                  />
                  <span className="text-[14px]">{item}</span>
                </label>
              </div>
            ))}
          </div>

          <span className="col-span-1 flex gap-2 items-center p-2">
            <span className="block bg-blue-700 w-1 h-10/12 rounded-lg"></span>
            <label>Time:</label>
            <input
              type="time"
              className="border-b text-center p-1"
              value={formData.clc?.time || ''}
              onChange={handleChange('time')}
            />
          </span>
        </div>
      </div>
    </div>
  );
}
