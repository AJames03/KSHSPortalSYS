'use client';
import React from 'react';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['200', '400', '700', '900'],
  style: ['normal', 'italic'],
});

interface PWDInfoProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export default function pwdInfo({ formData, setFormData }: PWDInfoProps) {
  // ✅ Universal handleChange with combine logic
  const handleChange =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = e.target.value;

      const updatedPwdInfo = { ...formData.pwdInfo, [field]: value };

      const choice = updatedPwdInfo.pwdChoice || '';
      const option = updatedPwdInfo.pwdOption || '';
      const sub = updatedPwdInfo.subOption || '';
      const pwd = updatedPwdInfo.pwdID || '';

      let combined = '';

      if (choice.toLowerCase() === 'no') combined = 'None';
      else if (sub) combined = `${option} (${sub})`;
      else if (option) combined = option;

      setFormData({
        ...formData,
        pwdInfo: {
          ...updatedPwdInfo,
          PWD: combined,
        },
      });
    };

  // a1. With Diagnosis
  const aOptions = [
    'Attention Deficit Hyperactivity Disorder',
    'Autism Spectrum Disorder',
    'Cerebral Palsy',
    'Emotional-Behavior Disorder',
    'Hearing Impairment',
    'Intellectual Disability',
    'Learning Disability',
    'Multiple Disabilities',
    'Orthopedic/Physical Handicap',
    'Speech Language Disorder',
    'Special Health Problems/Chronic Diseases',
    'Visual Impairment',
  ];


  const subSHP = ['Cancer', 'Non-Cancer'];
  const subVI = ['Blind', 'Low Vision'];

  const pwdChoice = formData.pwdInfo?.pwdChoice || '';
  const pwdOption = formData.pwdInfo?.pwdOption || '';
  const subOption = formData.pwdInfo?.subOption || '';
  const pwdID = formData.pwdInfo?.pwdID || '';

  return (
    <div className="w-full flex flex-col sm:w-1/2 text-black sm:text-lg gap-5 p-2 sm:m-5 sm:p-5 bg-gray-100 shadow-gray-400 shadow-lg">
      <span className="flex flex-col gap-2 font-medium text-center">
        <label>Is the Learner PWD?</label>
        <span className="flex gap-2 justify-center items-center">
          <input
            type="radio"
            className="accent-blue-700"
            name="pwdChoice"
            value="Yes"
            checked={pwdChoice === 'Yes'}
            onChange={handleChange('pwdChoice')}
          />
          <label>Yes</label>

          <input
            type="radio"
            className="accent-blue-700"
            name="pwdChoice"
            value="No"
            checked={pwdChoice === 'No'}
            onChange={(e) => {
              handleChange('pwdChoice')(e);
              setFormData({
                ...formData,
                pwdInfo: {
                  pwdChoice: 'No',
                  pwdOption: '',
                  subOption: '',
                  pwdID: '',
                  PWD: 'None',
                },
              });
            }}
          />
          <label>No</label>
        </span>
      </span>

      {pwdChoice === 'Yes' && (
        <div className="border-t p-2 flex flex-col gap-5">
          <p className={`${poppins.className} font-bold text-[clamp(0.8rem,2vw,1.2rem)]`}>
            Check Only 1, either from a1 or a2
          </p>

          {/* 🔹 a1 Section */}
          <p className={`${poppins.className} italic text-[clamp(0.8rem,2vw,1.2rem)]`}>
            a1. With Diagnosis from Licensed Medical Specialist:
          </p>

          <div className="sm:grid sm:grid-cols-2 gap-4 p-2">
            {aOptions.map((option) => (
              <label key={option} className="flex gap-2 items-center text-[14px]">
                <input
                  type="radio"
                  className="accent-blue-700"
                  name="a1"
                  value={option}
                  checked={pwdOption === option}
                  onChange={handleChange('pwdOption')}
                />
                {option}
              </label>
            ))}
          </div>

          {/* 🔹 Sub-options for SHP */}
          {pwdOption === 'Special Health Problems/Chronic Diseases' && (
            <div className="pl-4 border-l-4 border-blue-500 flex flex-col gap-2 text-[14px]">
              <p className="italic text-gray-500 font-medium">
                If Special Health Problem, specify:
              </p>
              {subSHP.map((sub) => (
                <label key={sub} className="flex gap-2 items-center">
                  <input
                    type="radio"
                    className="accent-blue-700"
                    name="subSHP"
                    value={sub}
                    checked={subOption === sub}
                    onChange={handleChange('subOption')}
                  />
                  {sub}
                </label>
              ))}
            </div>
          )}

          {/* 🔹 Sub-options for VI */}
          {pwdOption === 'Visual Impairment' && (
            <div className="pl-4 border-l-4 border-blue-500 flex flex-col gap-2 text-[14px]">
              <p className="italic text-gray-500 font-medium">
                If Visual Impairment, specify:
              </p>
              {subVI.map((sub) => (
                <label key={sub} className="flex gap-2 items-center">
                  <input
                    type="radio"
                    className="accent-blue-700"
                    name="subVI"
                    value={sub}
                    checked={subOption === sub}
                    onChange={handleChange('subOption')}
                  />
                  {sub}
                </label>
              ))}
            </div>
          )}

          {/* 🔹 a2 Section */}
          <p className={`${poppins.className} italic text-[clamp(0.8rem,2vw,1.2rem)]`}>
            a2. With Manifestation:
          </p>


          {/* 🔹 PWD ID Section */}
          <div className="flex flex-col">
            <label className={`${poppins.className} italic text-[clamp(0.8rem,2vw,1.2rem)]`}>
              b. Does the Learner have a PWD ID?
            </label>
            <span className="flex gap-3 justify-center">
              <label className="flex gap-2 items-center">
                <input
                  type="radio"
                  name="pwdID"
                  value="Yes"
                  className="accent-blue-700"
                  checked={pwdID === 'Yes'}
                  onChange={handleChange('pwdID')}
                />
                Yes
              </label>
              <label className="flex gap-2 items-center">
                <input
                  type="radio"
                  name="pwdID"
                  value="No"
                  className="accent-blue-700"
                  checked={pwdID === 'No'}
                  onChange={handleChange('pwdID')}
                />
                No
              </label>
            </span>
          </div>
        </div>
      )}

      {pwdChoice === 'No' && (
        <p className={`${poppins.className} text-[14px] text-red-800 italic`}>
          * Please Proceed to the next form *
        </p>
      )}
    </div>
  );
}
