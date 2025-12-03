'use client';
import React from 'react';
import { Poppins } from 'next/font/google';
import { FormDataType, SnepInfoType } from '../page';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['200', '400', '700', '900'],
  style: ['normal', 'italic'],
});

export const a1Options = [
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

export const a2Options = [
  'Difficulty in Applying Knowledge',
  'Difficulty in Communicating',
  'Difficulty in Displaying Interpersonal Behavior (Emotional and Behavioral)',
  'Difficulty in Hearing',
  'Difficulty in Mobility (Walking, Climbing, and Grasping)',
  'Difficulty in Performing Adaptive Skills (Self-Care)',
  'Difficulty in Remembering, Concentrating, Paying Attention and Understanding',
  'Difficulty in Seeing',
];

export const subSHP = ['Cancer', 'Non-Cancer'];
export const subVI = ['Blind', 'Low Vision'];

interface SNEPInfoProps {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
}

export default function SNEPInfo({ formData, setFormData }: SNEPInfoProps) {
  const handleChange =
    (field: keyof SnepInfoType) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = e.target.value;
      const updatedSnepInfo = { ...formData.snepInfo, [field]: value };

      const choice = updatedSnepInfo.snepChoice || '';
      const option = updatedSnepInfo.snepOption || '';
      const sub = updatedSnepInfo.subOption || '';

      let combined = '';
      if (choice.toLowerCase() === 'no') combined = 'None';
      else if (sub) combined = `${option} (${sub})`;
      else if (option) combined = option;

      setFormData((prev) => ({
        ...prev,
        snepInfo: {
          ...updatedSnepInfo,
          SNEP: combined,
        },
      }));
    };


  const { snepChoice, snepOption, subOption, pwdID } = formData.snepInfo;

  return (
    <div className="w-full flex flex-col text-black sm:text-lg gap-5 p-2">
      <span className="flex flex-col gap-2 font-medium text-center">
        <label>Is the Learner under the Special Needs Education Program?</label>
        <span className="flex gap-2 justify-center items-center">
          <input
            type="radio"
            className="accent-blue-700"
            name="snepChoice"
            value="Yes"
            checked={snepChoice === 'Yes'}
            onChange={handleChange('snepChoice')}
          />
          <label>Yes</label>

          <input
            type="radio"
            className="accent-blue-700"
            name="snepChoice"
            value="No"
            checked={snepChoice === 'No'}
            onChange={(e) => {
              handleChange('snepChoice')(e);
              setFormData({
                ...formData,
                snepInfo: {
                  snepChoice: 'No',
                  snepOption: '',
                  subOption: '',
                  pwdID: '',
                  SNEP: 'None',
                },
              });
            }}
          />
          <label>No</label>
        </span>
      </span>

      {snepChoice === 'Yes' && (
        <div className="border-t p-2 flex flex-col gap-5">
          <p className={`${poppins.className} font-bold text-[clamp(0.8rem,2vw,1.2rem)]`}>
            Check Only 1, either from a1 or a2
          </p>

          <p className={`${poppins.className} italic text-[clamp(0.8rem,2vw,1.2rem)]`}>
            a1. With Diagnosis from Licensed Medical Specialist:
          </p>

          <div className="sm:grid sm:grid-cols-2 gap-4 p-2">
            {a1Options.map((option) => (
              <label key={option} className="flex gap-2 items-center text-[14px]">
                <input
                  type="radio"
                  className="accent-blue-700"
                  name="a1"
                  value={option}
                  checked={snepOption === option}
                  onChange={handleChange('snepOption')}
                />
                {option}
              </label>
            ))}
          </div>

          {snepOption === 'Special Health Problems/Chronic Diseases' && (
            <div className="pl-4 border-l-4 border-blue-500 flex flex-col gap-2 text-[14px]">
              <p className="italic text-gray-500 font-medium">If Special Health Problem, specify:</p>
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

          {snepOption === 'Visual Impairment' && (
            <div className="pl-4 border-l-4 border-blue-500 flex flex-col gap-2 text-[14px]">
              <p className="italic text-gray-500 font-medium">If Visual Impairment, specify:</p>
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

          <p className={`${poppins.className} italic text-[clamp(0.8rem,2vw,1.2rem)]`}>
            a2. With Manifestation:
          </p>

          <div className="sm:grid sm:grid-cols-2 gap-4 p-2">
            {a2Options.map((option) => (
              <label key={option} className="flex gap-2 items-center text-[14px]">
                <input
                  type="radio"
                  className="accent-blue-700"
                  name="a2"
                  value={option}
                  checked={snepOption === option}
                  onChange={handleChange('snepOption')}
                />
                {option}
              </label>
            ))}
          </div>

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

      {snepChoice === 'No' && (
        <p className={`${poppins.className} text-[14px] text-red-800 italic`}>
          * Please Proceed to the next form *
        </p>
      )}
    </div>
  );
}
