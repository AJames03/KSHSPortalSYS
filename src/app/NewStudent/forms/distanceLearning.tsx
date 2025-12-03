'use client';
import React, { useEffect } from 'react';
import { Poppins } from 'next/font/google';
import { FormDataType } from '../page';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['200', '400', '700', '900'],
  style: ['normal', 'italic'],
});


interface DistanceLearningProps {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
}

export default function DistanceLearning({ formData, setFormData }: DistanceLearningProps) {
  useEffect(() => {
    if (!formData.distanceLearning?.selectedOptions) {
      setFormData(prev => ({
        ...prev,
        distanceLearning: {
          ...prev.distanceLearning,
          selectedOptions: [],
        }
      }));
    }
  }, [formData, setFormData]);

  const handleChange = (option: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    const updatedSelections = [...(formData.distanceLearning?.selectedOptions || [])];

    if (checked) {
      if (!updatedSelections.includes(option)) updatedSelections.push(option);
    } else {
      const index = updatedSelections.indexOf(option);
      if (index > -1) updatedSelections.splice(index, 1);
    }

    setFormData(prev => ({
      ...prev,
      distanceLearning: {
        ...prev.distanceLearning,
        selectedOptions: updatedSelections,
      }
    }));
  };

  const learningOptions = [
    'Blended (Combination)',
    'Educational Television',
    'Homeschooling',
    'Modular (Digital)',
    'Modular (Print)',
    'Online',
    'Radio-Based Television',
  ];

  const selectedOptions = formData.distanceLearning?.selectedOptions || [];

  return (
    <div className="w-full flex flex-col p-5 justify-between items-center text-black">
      <header
        className={`${poppins.className} text-[clamp(0.8rem,2vw,1.2rem)] sm:text-[18px] w-full sm:text-start font-bold flex flex-col gap-5 border-b-2 pb-2 text-center`}
      >
        If the school will implement other distance learning modalities aside
        from face-to-face instruction, what would you prefer for your child?
      </header>

      <div className="w-full mt-3">
        <label className="font-semibold">Check all that apply:</label>
        <div className="sm:grid sm:grid-cols-2 gap-3 mt-2">
          {learningOptions.map((option, index) => (
            <label key={index} className="flex items-center gap-2">
              <input 
                type="checkbox" 
                value={option} 
                className="accent-blue-600"
                checked={selectedOptions.includes(option)}
                onChange={handleChange(option)} 
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
