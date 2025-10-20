'use client';
import React from 'react';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['200', '400', '700', '900'],
  style: ['normal', 'italic'],
});

export default function DistanceLearning() {
  const learningOptions = [
    'Blended (Combination)',
    'Educational Television',
    'Homeschooling',
    'Modular (Digital)',
    'Modular (Print)',
    'Online',
    'Radio-Based Television',
  ];

  return (
    <div className="w-full sm:w-1/2 m-5 flex flex-col p-3 justify-between items-center text-black bg-gray-100 shadow-gray-400 shadow-lg">
      <header
        className={`${poppins.className} text-[clamp(0.8rem,2vw,1.2rem)] sm:text-[20px] w-full sm:text-start font-bold flex flex-col gap-5 border-b-2 pb-2 text-center`}
      >
        If the school will implement other distance learning modalities aside
        from face-to-face instruction, what would you prefer for your child?
      </header>

      <div className="w-full mt-3">
        <label className="font-semibold">Check all that apply:</label>
        <div className="sm:grid sm:grid-cols-2 gap-3 mt-2">
          {learningOptions.map((option, index) => (
            <label key={index} className="flex items-center gap-2">
              <input type="checkbox" value={option} className="accent-blue-600" />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
