'use client';
import React from 'react';
import { Poppins } from 'next/font/google';
import { FormDataType, ReturnInfoType } from '../page';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "700", "900"],
  style: ["normal", "italic"],
});

interface ReturnRegularProps {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
}

export default function ReturnRegular({ formData, setFormData }: ReturnRegularProps) {
  const handleChange =
    (field: keyof ReturnInfoType) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormData({
        ...formData,
        returnRegular: { ...formData.returnRegular, [field]: e.target.value },
      });
    };

  const track = formData.returnRegular?.track || '';
  const strand = formData.returnRegular?.strand || '';

  return (
    <div className="w-full flex flex-col p-3 justify-between items-center text-black">
      <div className="flex flex-col gap-5 sm:w-1/2 p-2 sm:m-5 sm:p-5 bg-gray-100 shadow-gray-400 shadow-lg rounded-lg">
        <header
          className={`${poppins.className} text-[clamp(0.8rem,2vw,1.2rem)] sm:text-[24px] sm:text-start font-bold flex flex-col gap-5 border-b-2 pb-2 text-center`}
        >
          For Returning Learner (Balik-Aral) and those who will Transfer/Move in
        </header>
        <div className="flex flex-col sm:grid sm:grid-cols-2 gap-5">
          {[
            { label: 'Last Grade Level Completed:', name: 'rlGradeLevelComplete', type: 'number' },
            { label: 'Last School Year Completed:', name: 'rlLastSYComplete', type: 'text' },
            { label: 'Last School Attended:', name: 'rlLastSchoolAtt', type: 'text' },
            { label: 'School ID:', name: 'rlSchoolID', type: 'text' },
          ].map(({ label, name, type }) => (
            <span className="p-2" key={name}>
              <label className={`${poppins.className} text-[14px] sm:text-[16px] italic text-gray-500`}>
                {label}
              </label>
              <input
                type={type}
                className={`${poppins.className} text-[clamp(0.8rem,2vw,1.2rem)] font-medium border-0 focus:outline-none border-b w-full`}
                value={(formData.returnRegular[name as keyof ReturnInfoType] as string) || ''}
                onChange={handleChange(name as keyof ReturnInfoType)}
              />
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col w-full gap-5 m-2 p-2 sm:w-1/2 sm:m-5 sm:p-5 bg-gray-100 shadow-gray-400 shadow-lg rounded-lg">
        <header
          className={`${poppins.className} text-[clamp(0.8rem,2vw,1.2rem)] sm:text-[24px] sm:text-start font-bold flex flex-col gap-5 border-b-2 pb-2 text-center`}
        >
          For Learner in Senior High School
        </header>

        {/* Semester */}
        <div className="p-2 grid grid-cols-5">
          <label className={`${poppins.className} text-[16px] italic text-gray-500 col-span-2 sm:col-span-1`}>
            Semester:
          </label>
          <div className="flex gap-5 col-span-3 sm:col-span-4">
            {['1st', '2nd'].map((sem) => (
              <span key={sem} className="flex gap-2 items-center">
                <input
                  type="radio"
                  className="accent-blue-700"
                  name="semester"
                  value={sem}
                  checked={formData.returnRegular.semester === sem}
                  onChange={handleChange('semester')}
                />
                <label>{sem}</label>
              </span>
            ))}
          </div>
        </div>

        {/* Track */}
        <div className="p-2 grid grid-cols-5">
          <label className={`${poppins.className} text-[16px] italic text-gray-500 col-span-2 sm:col-span-1`}>
            Track:
          </label>
          <select
            className="col-span-3 sm:col-span-4 hover:cursor-pointer"
            value={track}
            onChange={(e) => {
              handleChange('track')(e);
              setFormData({
                ...formData,
                returnRegular: { ...formData.returnRegular, track: e.target.value, strand: '' },
              });
            }}
          >
            <option value="" disabled hidden>
              Select Track
            </option>
            <option value="Academic">Academic Track</option>
            <option value="TVL">TVL Track</option>
          </select>
        </div>

        {/* Strand */}
        {track && (
          <div className="p-2 grid grid-cols-5">
            <label className={`${poppins.className} text-[16px] italic text-gray-500 col-span-2 sm:col-span-1`}>
              Strand:
            </label>
            <select
              className="col-span-3 sm:col-span-4 hover:cursor-pointer"
              value={strand}
              onChange={handleChange('strand')}
            >
              <option value="" disabled hidden>
                Select Strand
              </option>
              {track === 'Academic' && (
                <>
                  <option value="STEM">STEM</option>
                  <option value="ABM">ABM</option>
                  <option value="HUMSS">HUMSS</option>
                </>
              )}
              {track === 'TVL' && <option value="TVL-ICT">TVL-ICT</option>}
            </select>
          </div>
        )}
      </div>
    </div>
  );
}
