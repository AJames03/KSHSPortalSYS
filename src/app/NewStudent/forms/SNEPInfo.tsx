'use client';
import React, { useState } from 'react';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "700", "900"],
  style: ["normal", "italic"],
});

export default function SNEPInfo() {
  const [selectSNEP, setSelectSNEP] = useState('');
  const [optionSNEP, setOptionSNEP] = useState('');
  const [subOptionSHP, setSubOptionSHP] = useState('');

  // a1. With Diagnosis 
  const adhd = "Attendion Deficit Hyperactivity Disorder"; 
  const autism = "Autism Spectrum Disorder"; 
  const cp = "Cerebral Palsy"; const ebd = "Emotional-Behavior Disorder"; 
  const hI = "Hearing Impairment"; const Id = "Intellectual Disability"; 
  const ld = "Learning Disability"; const md = "Multiple Disabilities"; 
  const oph = "Orthopedic/Physical Handicap"; 
  const sld = "Speech Language Disorder"; 
  const shp = "Special Health Problems/Chronic Diseases"; 
  const cancer = "Cancer"; const ncancer = "Non-Cancer"; 
  const vi = "Visual Impairment"; const b = "Blind"; 
  const lv = "Low Vision"; 
  
  //a2. With Manifestation
  const dak = "Difficulty in Applying Knowledge"; 
  const dc = "Difficulty in Communicating"; 
  const ddib = "Difficulty in Displaying Interpersonal Behavior (Emotional and Behavioral)"; 
  const dh = "Difficulty in Hearing"; 
  const dm = "Difficulty in Mobility (Walking, Climbing, and Grasping)"; 
  const dpa = "Difficulty in Performing Adaptive Skills (Self-Care)"; 
  const dr = "Difficulty in Remembering, Concentrating, Pay Attention and Understanding"; 
  const ds = "Difficulty in Seeing";

  return (
    <div className="w-full flex flex-col sm:w-1/2 text-black sm:text-lg gap-5 p-2 sm:m-5 sm:p-5 bg-gray-100 shadow-gray-400 shadow-lg">
      <span className="flex flex-col gap-2 font-medium text-center">
        <label>Is the Learner under the Special Needs Education Program?</label>
        <span className="flex gap-2 justify-center items-center">
          <input
            type="radio"
            className="accent-blue-700 text-sm"
            name="snepChoice"
            value="Yes"
            checked={selectSNEP === 'Yes'}
            onChange={(e) => setSelectSNEP(e.target.value)}
          />
          <label>Yes</label>

          <input
            type="radio"
            className="accent-blue-700 text-sm"
            name="snepChoice"
            value="No"
            checked={selectSNEP === 'No'}
            onChange={(e) => setSelectSNEP(e.target.value)}
          />
          <label>No</label>
        </span>
      </span>

      {selectSNEP === "Yes" && (
        <div className="border-t p-2 flex flex-col gap-5">
          <p className={`${poppins.className} text-[clamp(0.8rem,2vw,1.2rem)] text-black font-bold`}>
            Check Only 1, either from a1 or a2
          </p>
          <p className={`${poppins.className} text-[clamp(0.8rem,2vw,1.2rem)] text-black italic`}>
            a1. With Diagnosis from Licensed Medical Specialist:
          </p>

          <div className="sm:grid sm:grid-cols-2 gap-4 justify-center items-center border-black border-1 p-2">
            {[adhd, autism, cp, ebd, hI, Id, ld, md, oph, sld, shp, vi].map((option) => (
              <span key={option} className="flex gap-2 items-center">
                <input
                  type="radio"
                  className="accent-blue-700 text-sm"
                  name="snep"
                  value={option}
                  checked={optionSNEP === option}
                  onChange={(e) => {
                    setOptionSNEP(e.target.value);
                    setSubOptionSHP(''); // reset kapag lilipat sa ibang diagnosis
                  }}
                />
                <label className={`${poppins.className} text-[14px]`}>{option}</label>
              </span>
            ))}
          </div>

          {/* 🔽 Show SHP sub-options only when SHP is selected */}
          {optionSNEP === shp && (
            <div className="text-[14px] pl-4 border-l-4 border-blue-500 flex flex-col gap-2">
              <p className="font-medium italic text-gray-500 ">If Special Health Problem, specify:</p>
              <span className="flex gap-3">
                <input
                  type="radio"
                  name="subSHP"
                  value={cancer}
                  checked={subOptionSHP === cancer}
                  onChange={(e) => setSubOptionSHP(e.target.value)}
                  className="accent-blue-700"
                />
                <label>{cancer}</label>
              </span>
              <span className="flex gap-3">
                <input
                  type="radio"
                  name="subSHP"
                  value={ncancer}
                  checked={subOptionSHP === ncancer}
                  onChange={(e) => setSubOptionSHP(e.target.value)}
                  className="accent-blue-700"
                />
                <label>{ncancer}</label>
              </span>
            </div>
          )}

          {optionSNEP === vi && (
            <div className="text-[14px] pl-4 border-l-4 border-blue-500 flex flex-col gap-2">
              <p className="font-medium italic text-gray-500 ">If Special Health Problem, specify:</p>
              <span className="flex gap-3">
                <input
                  type="radio"
                  name="subSHP"
                  value={b}
                  checked={subOptionSHP === b}
                  onChange={(e) => setSubOptionSHP(e.target.value)}
                  className="accent-blue-700"
                />
                <label>{b}</label>
              </span>
              <span className="flex gap-3">
                <input
                  type="radio"
                  name="subSHP"
                  value={lv}
                  checked={subOptionSHP === lv}
                  onChange={(e) => setSubOptionSHP(e.target.value)}
                  className="accent-blue-700"
                />
                <label>{lv}</label>
              </span>
            </div>
          )}

          <p className={`${poppins.className} text-[clamp(0.8rem,2vw,1.2rem)] text-black italic`}>
            a2. With Manifestation:
          </p>
          <div className="sm:grid sm:grid-cols-2 gap-4 justify-center items-center border-black border-1 p-2">
            {[dak, dc, ddib, dh, dm, dpa, dr, ds].map((option) => (
              <span key={option} className="flex gap-2 items-center">
                <input
                  type="radio"
                  className="accent-blue-700 text-sm"
                  name="snep"
                  value={option}
                  checked={optionSNEP === option}
                  onChange={(e) => {
                    setOptionSNEP(e.target.value);
                    setSubOptionSHP(''); // reset kapag lilipat sa ibang diagnosis
                  }}
                />
                <label className={`${poppins.className} text-[14px]`}>{option}</label>
              </span>
            ))}
          </div>

          <div className='flex flex-col'>
            <label className={`${poppins.className} text-[clamp(0.8rem,2vw,1.2rem)] text-black italic`}>b. Does the Learner have a PWD ID?</label>
            <span className='flex gap-3 justify-center'>
                <input type='radio' name='pwdID' className='accent-blue-700' /> Yes
                <input type='radio' name='pwdID' className='accent-blue-700' /> No
            </span>
          </div>
        </div>
      )}

      {selectSNEP === "No" && (
        <div>
          <p className={`${poppins.className}  text-[14px] text-red-800 italic`}>
            * Please Proceed to the next form *
          </p>
        </div>
      )}
    </div>
  );
}
