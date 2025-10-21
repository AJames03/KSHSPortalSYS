'use client';

import React, { useState, useEffect } from 'react';
import { Arvo, Poppins } from 'next/font/google';
import Image from 'next/image';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { supabase } from '@/lib/supabaseClient';
import { motion, AnimatePresence } from "framer-motion";

import EnrollmentInfo from "@/app/NewStudent/forms/enrollmentInfo";
import PersonalInfo from "@/app/NewStudent/forms/personalInfo";
import ParentInfo from "@/app/NewStudent/forms/parentInformation";
import SNEPInfo from "@/app/NewStudent/forms/SNEPInfo";
import ReturnRegular from "@/app/NewStudent/forms/returnRegular";
import DistanceLearning from "@/app/NewStudent/forms/distanceLearning";

const arvo = Arvo({ subsets: ["latin"], weight: ["700"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["200", "400"] });

const initialFormData = {
  enrollmentInfo: { 
    lrn: "", 
    gradeLevel: "", 
    schoolYear: `${new Date().getFullYear()}-${new Date().getFullYear() + 1}` 
  },
  personalInfo: {
    psa: "",
    lname: "",
    fname: "",
    mname: "",
    bday: "",
    age: "",
    sex: "",
    birthplace: "",
    religion: "",
    motherTongue: "",
    indigenousPeople: "",
    fourPS: "",
    houseNumber: "",
    streetName: "",
    barangay: "",
    municipality: "",
    province: "",
    country: "",
    zipCode: "",
    pHN: "",
    pSN: "",
    pbrgy: "",
    pMunicipal: "",
    pProvince: "",
    pCountry: "",
    pZipCode: "",
  },
};

export default function Page() {
  const [currentStep, setCurrentStep] = useState(1);
  const [notification, setNotification] = useState<{ message: string; type: "error" | "success" } | null>(null);
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleNext = () => {
    if (currentStep < 6) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.enrollmentInfo.lrn || !formData.enrollmentInfo.gradeLevel) {
      setNotification({ 
        message: "Please, make sure that your enrollment information is filled up.", 
        type: "error" 
      });
      return;
    }

    // ✅ Data Cleaning Utility
    const cleanData = (data: typeof formData) => {
      const cleanString = (str: any) =>
        typeof str === "string" ? str.trim().replace(/\s+/g, " ") : "";

      const cleanNumber = (num: any) =>
        isNaN(Number(num)) ? null : Number(num);

      const cleanDate = (date: string) => {
        const parsed = new Date(date);
        return isNaN(parsed.getTime()) ? null : parsed.toISOString().split("T")[0];
      };

      const toProperCase = (str: string) => {
        return str
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase());
      }

      return {
        lrn: cleanString(data.enrollmentInfo.lrn),
        gradeLevel: cleanString(data.enrollmentInfo.gradeLevel),
        schoolYear: cleanString(data.enrollmentInfo.schoolYear),
        psa: cleanString(data.personalInfo.psa),
        lname: toProperCase(cleanString(data.personalInfo.lname)),
        fname: toProperCase(cleanString(data.personalInfo.fname)),
        mname: toProperCase(cleanString(data.personalInfo.mname)),
        bday: cleanDate(data.personalInfo.bday),
        age: cleanNumber(data.personalInfo.age),
        sex: cleanString(data.personalInfo.sex),
        birthplace: toProperCase(cleanString(data.personalInfo.birthplace)),
        religion: toProperCase(cleanString(data.personalInfo.religion)),
        motherTongue: toProperCase(cleanString(data.personalInfo.motherTongue)),
        indigenousPeople: toProperCase(cleanString(data.personalInfo.indigenousPeople)),
        fourPS: cleanString(data.personalInfo.fourPS),
        houseNumber: cleanString(data.personalInfo.houseNumber),
        streetName: toProperCase(cleanString(data.personalInfo.streetName)),
        barangay: toProperCase(cleanString(data.personalInfo.barangay)),
        municipality: toProperCase(cleanString(data.personalInfo.municipality)),
        province: toProperCase(cleanString(data.personalInfo.province)),
        country: toProperCase(cleanString(data.personalInfo.country)),
        zipCode: toProperCase(cleanString(data.personalInfo.zipCode)),
        pHN: toProperCase(cleanString(data.personalInfo.pHN)),
        pSN: toProperCase(cleanString(data.personalInfo.pSN)),
        pbrgy: toProperCase(cleanString(data.personalInfo.pbrgy)),
        pMunicipal: toProperCase(cleanString(data.personalInfo.pMunicipal)),
        pProvince: toProperCase(cleanString(data.personalInfo.pProvince)),
        pCountry: toProperCase(cleanString(data.personalInfo.pCountry)),
        pZipCode: toProperCase(cleanString(data.personalInfo.pZipCode)),
      };
    };

    try {
      const cleanedData = cleanData(formData);

      const { data, error: supabaseError } = await supabase
        .from('NewStudents')
        .insert([cleanedData]);

      if (supabaseError) {
        setNotification({ message: "Failed to submit form: " + supabaseError.message, type: "error" });
      } else {
        setNotification({ message: "Form submitted successfully!", type: "success" });
        setFormData({ ...initialFormData });
        setCurrentStep(1);
      }
    } catch (err: any) {
      setNotification({ message: "❌ Something went wrong: " + JSON.stringify(err), type: "error" });
    }
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

      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -60 }}
            transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
            className={`${poppins.className} text-[14px] sm:text-[16px] font-bold fixed top-0 sm:transform sm:translate-x-1/2 sm:w-1/2 p-4 text-center m-2 
                        flex justify-center items-center text-white z-50
                        ${notification.type === "error" 
                          ? "bg-gradient-to-bl from-red-500 to-red-500 rounded-xl" 
                          : "bg-green-600 rounded-lg"
                        }`}
          >
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full h-full items-center justify-center"
      >
        {currentStep === 1 && <EnrollmentInfo formData={formData} setFormData={setFormData} />}
        {currentStep === 2 && <PersonalInfo formData={formData} setFormData={setFormData} />}
        {currentStep === 3 && <ParentInfo />}
        {currentStep === 4 && <SNEPInfo />}
        {currentStep === 5 && <ReturnRegular />}
        {currentStep === 6 && <DistanceLearning />}

        {/* Navigation */}
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

          {currentStep < 3 && (
            <button
              type="button"
              onClick={handleNext}
              className="bg-blue-600 w-full sm:w-1/3 text-white px-6 py-2 rounded-4xl hover:bg-blue-700 cursor-pointer"
            >
              Next
            </button>
          )}

          {currentStep === 3 && (
            <button
              type="submit"
              className="bg-green-600 w-full sm:w-1/3 text-white px-6 py-2 rounded-4xl hover:bg-green-700 cursor-pointer"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
