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
      const value = e.target.value;
      if (field === 'rlSchoolID') {
        if (value.length <= 6 && /^\d*$/.test(value)) {
          setFormData({
            ...formData,
            returnRegular: { ...formData.returnRegular, [field]: value },
          });
        }
      } else {
        setFormData({
          ...formData,
          returnRegular: { ...formData.returnRegular, [field]: value },
        });
      }
    };

  const track = formData.returnRegular?.track || '';
  const strand = formData.returnRegular?.strand || '';

  return (
    <div className="w-full flex flex-col p-3 justify-between items-center text-black">
      <div className="flex flex-col gap-5 p-2">
        <header
          className={`${poppins.className} text-[clamp(0.8rem,2vw,1.2rem)] sm:text-[18px] sm:text-start font-bold flex flex-col gap-5 border-b-2 pb-2 text-center`}
        >
          For Returning Learner (Balik-Aral) and those who will Transfer/Move in
        </header>
        <div className="flex flex-col sm:grid sm:grid-cols-2 gap-2">
          {[
            { label: 'Last Grade Level Completed:', name: 'rlGradeLevelComplete', type: 'number' },
            { label: 'Last School Year Completed:', name: 'rlLastSYComplete', type: 'text' },
            { label: 'Last School Attended:', name: 'rlLastSchoolAtt', type: 'text' },
            { label: 'School ID:', name: 'rlSchoolID', type: 'number' },
          ].map(({ label, name, type }) => (
            <span className='flex flex-col border-2 border-gray-300 focus-within:border-sky-500 p-2 rounded-md duration-200' key={name}>
              <label className={`${poppins.className} text-[14px] sm:text-[14px] italic text-gray-500`}>
                {label}
              </label>
              <input
                type={type}
                className={`${poppins.className} text-[clamp(0.8rem,2vw,1.2rem)] font-medium focus:outline-none w-full`}
                value={(formData.returnRegular[name as keyof ReturnInfoType] as string) || ''}
                onChange={handleChange(name as keyof ReturnInfoType)}
              />
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col w-full gap-5 p-2">
        <header
          className={`${poppins.className} text-[clamp(0.8rem,2vw,1.2rem)] sm:text-[18px] sm:text-start font-bold flex flex-col gap-5 border-b-2 pb-2 text-center`}
        >
          For Learner in Senior High School
        </header>

        <div className='flex flex-col lg:grid lg:grid-cols-3 gap-2'>
          {/* Semester */}
          <div className="flex flex-col border-2 border-gray-300 focus-within:border-sky-500 p-2 rounded-md duration-200">
            <label className={`${poppins.className} text-[16px] italic text-gray-500`}>
              Semester:
            </label>
            <div className="flex gap-5 col-span-3 sm:col-span-4">
                <span className="flex gap-2 items-center">
                  <input
                    type="text"
                    className="accent-blue-700 outline-none"
                    name="semester"
                    value="1st"
                    checked={formData.returnRegular.semester === "1st"}
                    onChange={handleChange('semester')}
                    readOnly
                  />
                </span>

            </div>
          </div>

          {/* Track */}
          <div className="flex flex-col border-2 border-gray-300 focus-within:border-sky-500 p-2 rounded-md duration-200">
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
          <div className="flex flex-col border-2 border-gray-300 focus-within:border-sky-500 p-2 rounded-md duration-200">
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
        </div>
      </div>
    </div>
  );
}
