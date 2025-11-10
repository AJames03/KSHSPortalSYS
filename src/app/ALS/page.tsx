'use client';

import React, { useState, useEffect } from 'react';
import { Arvo, Poppins } from 'next/font/google';
import Image from 'next/image';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from '@/lib/supabaseClient';

import PersonalInfo from "@/app/ALS/forms/personalInfo";
import ParentInfo from "@/app/ALS/forms/parentInformation";
import PWDInfo from "@/app/ALS/forms/pwdInfo";
import EducationalInfo from "@/app/ALS/forms/educationalInfo";
import CLC from "@/app/ALS/forms/clc";
import DistanceLearning from "@/app/ALS/forms/distanceLearning";

// Fonts
const arvo = Arvo({ subsets: ["latin"], weight: ["700"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["200", "400"] });

// --- Types ---
export interface PersonalInfoType {
  email: string;
  lrn: string;
  date: string;
  lname: string;
  fname: string;
  mname: string;
  ename: string;
  cn: string;
  bday: string;
  age: number | undefined;
  sex: string;
  birthplace: string;
  religion: string;
  motherTongue: string;
  civilStatus: string;
  indigenousPeople: string;
  fourPS: string;
  houseNumber: string;
  streetName: string;
  region: string;
  barangay: string;
  municipality: string;
  province: string;
  country: string;
  zipCode: string;
  pHN: string;
  pSN: string;
  pRegion: string;
  pbrgy: string;
  pMunicipal: string;
  pProvince: string;
  pCountry: string;
  pZipCode: string;
  // not deploy in database
  selectIP: string;
  select4PS: string;
  selectAddress: string;
}

export interface ParentInfoType {
  fatherLN: string;
  fatherFN: string;
  fatherMN: string;
  fatherCN: string;
  motherLN: string;
  motherFN: string;
  motherMN: string;
  motherCN: string;
  guardianLN: string;
  guardianFN: string;
  guardianMN: string;
  guardianCN: string;
}

export interface PWDInfoType {
  PWD: string;
  pwdID: string;
  // not store in database
  pwdChoice: string;
  pwdOption: string;
  subOption: string;
}

export interface EducationalInfoType {
  education_information: string;
  OSY: string;
  attended: string;
  als_attended: string;
  complete_program: string;
  incomplete_reason: string;
  program_status: string;
}

export interface CLCType {
  kms?: string;
  hour?: string;
  transport?: string;
  otherTransport?: string;
  transportation?: string;
  day?: string;
  time?: string;
}

export interface DistanceLearningType {
  selectedOptions: string[];
}

export interface ALSFormData {
  personalInfo: PersonalInfoType;
  parentInfo: ParentInfoType;
  pwdInfo: PWDInfoType;
  educationalInfo: EducationalInfoType;
  clc: CLCType;
  distanceLearning: DistanceLearningType;
  enrollment_status: "Pending" | "Completed";
}

// --- Initial Data ---
const initialFormData: ALSFormData = {
  personalInfo: {
    email: "",
    lrn: "",
    date: "",
    lname: "",
    fname: "",
    mname: "",
    ename: "",
    cn: "",
    bday: "",
    age: undefined,
    sex: "",
    birthplace: "",
    religion: "",
    motherTongue: "",
    civilStatus: "",
    indigenousPeople: "",
    fourPS: "",
    houseNumber: "",
    streetName: "",
    region: "",
    barangay: "",
    municipality: "",
    province: "",
    country: "Philippines",
    zipCode: "",
    pHN: "",
    pSN: "",
    pRegion: "",
    pbrgy: "",
    pMunicipal: "",
    pProvince: "",
    pCountry: "Philippines",
    pZipCode: "",
    // not store in DataBase
    selectIP: "",
    select4PS: "",
    selectAddress: "",
  },
  parentInfo: {
    fatherLN: "",
    fatherFN: "",
    fatherMN: "",
    fatherCN: "",
    motherLN: "",
    motherFN: "",
    motherMN: "",
    motherCN: "",
    guardianLN: "",
    guardianFN: "",
    guardianMN: "",
    guardianCN: "",
  },
  pwdInfo: {
    PWD: "",
    pwdID: "",
    // not store in database
    pwdChoice: "",
    pwdOption: "",
    subOption: "",
  },
  educationalInfo: {
    education_information: "",
    OSY: "",
    attended: "",
    als_attended: "",
    program_status: "",
    // not store in database
    complete_program: "",
    incomplete_reason: "",
  },
  clc: {
    kms: '',
    hour: '',
    transport: '',
    otherTransport: '',
    transportation: '',
    day: '',
    time: '',
  },
  distanceLearning: {
    selectedOptions: [],
  },
  enrollment_status: "Pending",
};

// --- Component ---
export default function Page() {
  const [currentStep, setCurrentStep] = useState(1);
  const [notification, setNotification] = useState<{ message: string; type: "error" | "success" } | null>(null);
  const [formData, setFormData] = useState<ALSFormData>(initialFormData);

  // Notification timer
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleNext = () => {
    const missingFields: string[] = [];

    if (currentStep === 1) {
      const { lrn, lname, fname, mname, bday, age, sex, birthplace, religion, motherTongue, indigenousPeople, fourPS, houseNumber, streetName, barangay, municipality, province, country, zipCode, selectAddress, pHN, pSN, pbrgy, pMunicipal, pProvince, pCountry, pZipCode } = formData.personalInfo;
      if (!lrn) missingFields.push("LRN Number");
      if (!lname) missingFields.push("Last Name");
      if (!fname) missingFields.push("First Name");
      if (!mname) missingFields.push("Middle Name");
      if (!bday) missingFields.push("Birthdate");
      if (!age) missingFields.push("Age");
      if (!sex) missingFields.push("Sex");
      if (!birthplace) missingFields.push("Birthplace");
      if (!religion) missingFields.push("Religion");
      if (!motherTongue) missingFields.push("Mother Tongue");
      if (!indigenousPeople) missingFields.push("Indigenous People");
      if (!fourPS) missingFields.push("4Ps");
      if (!houseNumber) missingFields.push("House Number");
      if (!streetName) missingFields.push("Street Name");
      if (!barangay) missingFields.push("Barangay");
      if (!municipality) missingFields.push("Municipality");
      if (!province) missingFields.push("Province");
      if (!country) missingFields.push("Country");
      if (!zipCode) missingFields.push("Zip Code");
      if (selectAddress === 'No' && ![pHN, pSN, pbrgy, pMunicipal, pProvince, pCountry, pZipCode].every(Boolean)) missingFields.push("Permanent Address");
    }
    if (currentStep === 3) {
      const { fatherLN, fatherFN, fatherMN, fatherCN, motherLN, motherFN, motherMN, motherCN, guardianLN, guardianFN, guardianMN, guardianCN } = formData.parentInfo;
      if (![fatherCN, fatherFN, fatherLN, fatherMN, motherCN, motherFN, motherLN, motherMN, guardianCN, guardianFN, guardianLN, guardianMN].every(Boolean)) missingFields.push("Parent Information");
    }
    if (currentStep === 4) {
      const { education_information, OSY } = formData.educationalInfo;
      if (!education_information) missingFields.push("Education Information");
      if (!OSY) missingFields.push("OSY");
    }
    if (currentStep === 5) {
      const { kms, hour, transportation, day, time } = formData.clc;
      if (!kms) missingFields.push("Kms");
      if (!hour) missingFields.push("Hour");
      if (!transportation) missingFields.push("Transportation");
      if (!day) missingFields.push("Day");
      if (!time) missingFields.push("Time");
    }

    if (missingFields.length > 0) {
      setNotification({ message: `Please, make sure that your ${missingFields.join(", ")} is filled up.`, type: "error" });
      return;
    }
    if (currentStep < 6) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  // --- Utilities ---
  const cleanString = (str: string | undefined) =>
    typeof str === "string" ? str.trim().replace(/\s+/g, " ") : "";

  const cleanNumber = (num: string | number | undefined) =>
    isNaN(Number(num)) ? null : Number(num);

  const cleanDate = (date: string) => {
    const parsed = new Date(date);
    return isNaN(parsed.getTime()) ? null : parsed.toISOString().split("T")[0];
  };

  const toProperCase = (str: string) =>
    str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());

  // --- Submit ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.personalInfo.lrn) {
      setNotification({
        message: "Please fill out your enrollment information.",
        type: "error",
      });
      return;
    }

    const cleanData = (data: ALSFormData) => ({
      lrn: cleanString(data.personalInfo.lrn),
      date: cleanDate(data.personalInfo.date),
      lname: toProperCase(cleanString(data.personalInfo.lname)),
      fname: toProperCase(cleanString(data.personalInfo.fname)),
      mname: toProperCase(cleanString(data.personalInfo.mname)),
      ename: toProperCase(cleanString(data.personalInfo.ename)),
      cn: cleanString(data.personalInfo.cn),
      civilStatus: toProperCase(cleanString(data.personalInfo.civilStatus)),
      bday: cleanDate(data.personalInfo.bday),
      age: cleanNumber(data.personalInfo.age), // <-- number-safe
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
      zipCode: cleanString(data.personalInfo.zipCode),
      pHN: cleanString(data.personalInfo.pHN),
      pSN: cleanString(data.personalInfo.pSN),
      pbrgy: toProperCase(cleanString(data.personalInfo.pbrgy)),
      pMunicipal: toProperCase(cleanString(data.personalInfo.pMunicipal)),
      pProvince: toProperCase(cleanString(data.personalInfo.pProvince)),
      pCountry: toProperCase(cleanString(data.personalInfo.pCountry)),
      pZipCode: cleanString(data.personalInfo.pZipCode),

      fatherLN: toProperCase(cleanString(data.parentInfo.fatherLN)),
      fatherFN: toProperCase(cleanString(data.parentInfo.fatherFN)),
      fatherMN: toProperCase(cleanString(data.parentInfo.fatherMN)),
      fatherCN: cleanString(data.parentInfo.fatherCN),
      motherLN: toProperCase(cleanString(data.parentInfo.motherLN)),
      motherFN: toProperCase(cleanString(data.parentInfo.motherFN)),
      motherMN: toProperCase(cleanString(data.parentInfo.motherMN)),
      motherCN: cleanString(data.parentInfo.motherCN),
      guardianLN: toProperCase(cleanString(data.parentInfo.guardianLN)),
      guardianFN: toProperCase(cleanString(data.parentInfo.guardianFN)),
      guardianMN: toProperCase(cleanString(data.parentInfo.guardianMN)),
      guardianCN: cleanString(data.parentInfo.guardianCN),

      pwd: toProperCase(cleanString(data.pwdInfo.PWD)),
      pwdID: cleanString(data.pwdInfo.pwdID),

      education_information: toProperCase(cleanString(data.educationalInfo.education_information)),
      OSY: toProperCase(cleanString(data.educationalInfo.OSY)),
      als_attended: toProperCase(cleanString(data.educationalInfo.als_attended)),
      complete_program: toProperCase(cleanString(data.educationalInfo.program_status)),

      kms: cleanString(data.clc.kms),
      hour: cleanString(data.clc.hour),
      transportation: cleanString(data.clc.transportation),
      day: cleanString(data.clc.day),
      time: cleanString(data.clc.time),

      distanceLearning: data.distanceLearning.selectedOptions.map(opt =>
        toProperCase(cleanString(opt))
      ),

      enrollment_status: "Pending",
    });

    try {
      const cleanedData = cleanData(formData);

      const { error: supabaseError } = await supabase
        .from('ALS')
        .insert([cleanedData]);

      if (supabaseError) {
        setNotification({ message: "Failed to submit form: " + supabaseError.message, type: "error" });
      } else {
        setNotification({ message: "Form submitted successfully!", type: "success" });
        setFormData({ ...initialFormData });
        setCurrentStep(1);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setNotification({ message: "❌ Something went wrong: " + err.message, type: "error" });
      } else {
        setNotification({ message: "❌ Something went wrong", type: "error" });
      }
    }
  };

  

  // --- Render ---
  return (
    <div className="w-full h-full flex flex-col bg-amber-50">
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
            <label className={`${poppins.className} text-[12px] text-amber-600`}>STEM</label>
            <i className="bi bi-dot"></i>
            <label className={`${poppins.className} text-[12px] text-green-600`}>ABM</label>
            <i className="bi bi-dot"></i>
            <label className={`${poppins.className} text-[12px] text-blue-700`}>TVL-ICT</label>
            <i className="bi bi-dot"></i>
            <label className={`${poppins.className} text-[12px] text-green-800`}>HUMSS</label>
            <i className="bi bi-dot"></i>
            <label className={`${poppins.className} text-[12px] text-orange-500`}>ALS</label>
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
        {currentStep === 1 && <PersonalInfo formData={formData} setFormData={setFormData} />}
        {currentStep === 2 && <ParentInfo formData={formData} setFormData={setFormData} />}
        {currentStep === 3 && <PWDInfo formData={formData} setFormData={setFormData} />}
        {currentStep === 4 && <EducationalInfo formData={formData} setFormData={setFormData} />}
        {currentStep === 5 && <CLC formData={formData} setFormData={setFormData} />}
        {currentStep === 6 && <DistanceLearning formData={formData} setFormData={setFormData} />}

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

          {currentStep < 6 && (
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
