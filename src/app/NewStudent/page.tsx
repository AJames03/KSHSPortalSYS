"use client";

import React, { useState } from 'react';
import { Arvo, Poppins } from 'next/font/google';
import Image from 'next/image';
import 'bootstrap-icons/font/bootstrap-icons.css';

import EnrollmentInfo from "@/app/NewStudent/forms/enrollmentInfo";
import PersonalInfo from "@/app/NewStudent/forms/personalInfo";
import ParentInfo from "@/app/NewStudent/forms/parentInformation";
import SNEPInfo from "@/app/NewStudent/forms/SNEPInfo";
import ReturnRegular from "@/app/NewStudent/forms/returnRegular";
import DistanceLearning from "@/app/NewStudent/forms/distanceLearning";

const arvo = Arvo({ subsets: ["latin"], weight: ["700"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["200", "400"] });

export default function Page() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep < 6) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Form submitted!" + currentStep);
    console.log("Submitted successfully");
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="text-center bg-blue-700 text-white flex justify-center items-center flex-col sm:flex-row p-2 gap-2 w-full sticky top-0">
        <Image
          src="/KSHS_LOGO.png"
          alt="logo"
          width={100}
          height={100}
          className="w-10 h-10 sm:w-10 sm:h-10 lg:w-32 lg:h-32"
        />
        <div className={`${arvo.className} flex flex-col justify-center sm:text-2xl`}>
          <label>KASIGLAHAN VILLAGE</label>
          <label>SENIOR HIGH SCHOOL</label>

          <div className="flex bg-white pl-2 pr-2 text-black justify-center items-center rounded-md">
            <label className={`${poppins.className} text-[10px] text-amber-600`}>STEM</label>
            <i className="bi bi-dot"></i>
            <label className={`${poppins.className} text-[10px] text-green-600`}>ABM</label>
            <i className="bi bi-dot"></i>
            <label className={`${poppins.className} text-[10px] text-blue-700`}>TVL-ICT</label>
            <i className="bi bi-dot"></i>
            <label className={`${poppins.className} text-[10px] text-green-800`}>HUMSS</label>
            <i className="bi bi-dot"></i>
            <label className={`${poppins.className} text-[10px] text-orange-500`}>ALS</label>
          </div>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full h-full items-center justify-center"
      >
        {currentStep === 1 && <EnrollmentInfo />}
        {currentStep === 2 && <PersonalInfo />}
        {currentStep === 3 && <ParentInfo />}
        {currentStep === 4 && <SNEPInfo />}
        {currentStep === 5 && <ReturnRegular />}
        {currentStep === 6 && <DistanceLearning />}

        {/* NAVIGATION */}
        <div className="flex gap-4 mt-4 p-5 w-full sm:w-1/2 justify-center flex-row">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handlePrevious}
              className="bg-gray-400 w-full sm:w-1/3 text-white px-6 py-2 rounded-4xl hover:bg-gray-500 cursor-pointer"
            >
              Back
            </button>
          )}

          {currentStep < 6  && (
            <button
              type="button"
              onClick={handleNext}
              className="bg-blue-600 w-full sm:w-1/3 text-white px-6 py-2 rounded-4xl hover:bg-blue-700 cursor-pointer"
            >
              Next
            </button>
          )}

          {currentStep === 6 && (
            <button
              type="submit"
              className="bg-blue-600 w-full sm:w-1/3 text-white px-6 py-2 rounded-4xl hover:bg-blue-700 cursor-pointer"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
