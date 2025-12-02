'use client'
export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
import Loading from "@/app/NewStudent/components/loading"
 import { PDFDocument, StandardFonts, rgb, degrees as pdfdegrees } from 'pdf-lib';

const arvo = Arvo({ subsets: ["latin"], weight: ["700"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["200", "400"] });

type EnrollmentInfoType = {
  email: string;
  schoolYear: string;
  gradeLevel: string;
  lrn: string;
};

type PersonalInfoType = {
   psa: string;
   lname: string;
   fname: string;
   mname: string;
   ename: string;
   bday: string;
   age: string;
   sex: string;
   birthplace: string;
   religion: string;
   motherTongue: string;
   selectIP: string;
   indigenousPeople: string;
   select4PS: string;
   fourPS: string;
   houseNumber: string;
   streetName: string;
   region: string;
   barangay: string;
   municipality: string;
   province: string;
   country: string;
   zipCode: string;
   selectAddress: string;
   pHN: string;
   pSN: string;
   pRegion: string;
   pbrgy: string;
   pMunicipal: string;
   pProvince: string;
   pCountry: string;
   pZipCode: string;
};

export type ParentInfoType = {
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
};

export type SnepInfoType = {
  SNEP: string;
  pwdID: string;
  snepChoice: string;
  snepOption: string;
  subOption: string;
};

export type ReturnInfoType = {
  rlGradeLevelComplete: string,
  rlLastSYComplete: string,
  rlLastSchoolAtt: string,
  rlSchoolID: string,
  semester: string,
  track: string,
  strand: string,
}

type DistanceInfoType = {
  selectedOptions: string[],
};

type EnrollmentStatusType = {
  enrollment_status: "Pending";
};

export type FormDataType = {
  enrollmentInfo: EnrollmentInfoType;
  personalInfo: PersonalInfoType;
  parentInfo: ParentInfoType;
  snepInfo: SnepInfoType;
  returnRegular: ReturnInfoType;
  distanceLearning: DistanceInfoType;
  enrollment_status: EnrollmentStatusType;
};

type CleanedDataType = {
  lrn: string;
  gradeLevel: string;
  schoolYear: string;
  email: string;
  psa: string;
  lname: string;
  fname: string;
  mname: string;
  ename: string;
  bday: string | null;
  age: number | null;
  sex: string;
  birthplace: string;
  religion: string;
  motherTongue: string;
  indigenousPeople: string;
  fourPS: string;
  houseNumber: string;
  streetName: string;
  barangay: string;
  municipality: string;
  province: string;
  country: string;
  zipCode: string;
  pHN: string;
  pSN: string;
  pbrgy: string;
  pMunicipal: string;
  pProvince: string;
  pCountry: string;
  pZipCode: string;
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
  SNEP: string;
  pwdID: string;
  snepChoice: string;
  snepOption: string;
  subOption: string;
  rlGradeLevelComplete: string;
  rlLastSYComplete: string;
  rlLastSchoolAtt: string;
  rlSchoolID: string;
  semester: string;
  track: string;
  strand: string;
  distanceLearning: string[];
  enrollment_status: string;
};


const initialFormData: FormDataType = {
  enrollmentInfo: { 
    lrn: "", 
    gradeLevel: "", 
    schoolYear: `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`,
    email: "",
  },
  personalInfo: {
    psa: "",
    lname: "",
    fname: "",
    mname: "",
    ename: "",
    bday: "",
    age: "",
    sex: "",
    birthplace: "",
    religion: "",
    motherTongue: "",
    selectIP: "",
    indigenousPeople: "",
    select4PS: "",
    fourPS: "",
    houseNumber: "",
    streetName: "",
    region: "",
    barangay: "",
    municipality: "",
    province: "",
    country: "Philippines",
    zipCode: "",
    selectAddress: "",
    pHN: "",
    pSN: "",
    pRegion: "",
    pbrgy: "",
    pMunicipal: "",
    pProvince: "",
    pCountry: "Philippines",
    pZipCode: "",
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
  snepInfo: {
    SNEP: "",
    pwdID: "",
    snepChoice: "",
    snepOption: "",
    subOption: "",
  },
  returnRegular: {
    rlGradeLevelComplete: "",
    rlLastSYComplete: "",
    rlLastSchoolAtt: "",
    rlSchoolID: "",
    semester: "",
    track: "",
    strand: "",
  },
  distanceLearning: {
    selectedOptions: [],
  },
  enrollment_status: {
    enrollment_status: "Pending"
  },
};

export default function Page() {
  const [currentStep, setCurrentStep] = useState(1);
  const [notification, setNotification] = useState<{ message: string; type: "error" | "success" } | null>(null);
  const [formData, setFormData] = useState<FormDataType>(initialFormData);
  const [exitModal, setExitModal] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  

  const navigateWithLoading = async (path: string) => {
    setIsLoading(true);
    await new Promise(res => setTimeout(res, 1000));
    router.push(path);
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);


  const handleNext = () => {
    const missingFields: string[] = [];

    if (currentStep === 1){
      const { lrn, gradeLevel } = formData.enrollmentInfo;
      if(!lrn) missingFields.push("LRN Number");
      if(!gradeLevel) missingFields.push("Grade Level");
    }
    if(currentStep === 2){
      const { lname, fname, mname, bday, age, sex, birthplace, religion, motherTongue, indigenousPeople, fourPS, houseNumber, streetName, barangay, municipality, province, country, zipCode, selectAddress, pHN, pSN, pbrgy, pMunicipal, pProvince, pCountry, pZipCode } = formData.personalInfo;
      if(!lname) missingFields.push("Last Name");
      if(!fname) missingFields.push("First Name");
      if(!mname) missingFields.push("Middle Name");
      if(!bday) missingFields.push("Birthdate");
      if(!age) missingFields.push("Age");
      if(!sex) missingFields.push("Sex");
      if(!birthplace) missingFields.push("Birthplace");
      if(!religion) missingFields.push("Religion");
      if(!motherTongue) missingFields.push("Mother Tongue");
      if(!indigenousPeople) missingFields.push("Indigenous People");
      if(!fourPS) missingFields.push("4Ps");
      if(!houseNumber) missingFields.push("House Number");
      if(!streetName) missingFields.push("Street Name");
      if(!barangay) missingFields.push("Barangay");
      if(!municipality) missingFields.push("Municipality");
      if(!province) missingFields.push("Province");
      if(!country) missingFields.push("Country");
      if(!zipCode) missingFields.push("Zip Code");
      if (selectAddress === 'No' && ![pHN, pSN, pbrgy, pMunicipal, pProvince, pCountry, pZipCode].every(Boolean)) missingFields.push("Permanent Address");
    }
    if(currentStep === 3){
      const { fatherLN, fatherFN, fatherMN, fatherCN, motherLN, motherFN, motherMN, motherCN, guardianLN, guardianFN, guardianMN, guardianCN } = formData.parentInfo;
      if(![fatherCN, fatherFN, fatherLN, fatherMN, motherCN, motherFN, motherLN, motherMN, guardianCN, guardianFN, guardianLN, guardianMN].every(Boolean)) missingFields.push("Parent Information");
    }
    if(currentStep === 4){
      const { SNEP } = formData.snepInfo;
      if(!SNEP) missingFields.push("SNEP");
    }
    if(currentStep === 5){
      const {semester, track, strand } = formData.returnRegular;
      if(!semester) missingFields.push("Semester");
      if(!track) missingFields.push("Track");
      if(!strand) missingFields.push("Strand");
    }


    if(missingFields.length > 0){
      setNotification ({ message: `Please, make sure that your ${missingFields.join(", ")} is filled up.`, type: "error" });
      return;
    }
    if(currentStep < 6) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const generatedPDF = async (data: CleanedDataType) => {
    // cleaning
    const lrn = data.lrn || '';
    const GradeLevel = data.gradeLevel || '';
    const currentYear = new Date().getFullYear().toString();
    const nextYear = new Date().getFullYear() + 1;
    const PSA = data.psa || '';
    const Lname = data.lname || '';
    const Fname = data.fname || '';
    const Mname = data.mname || '';
    const Suffix = data.ename || '';
    const BDay = data.bday || '';
    const rlGradeLevelComplete = data.rlGradeLevelComplete || '';
    const rlLastSYComplete = data.rlLastSYComplete || '';
    const rlLastSchoolAtt = data.rlLastSchoolAtt || '';
    const rlSchoolID = data.rlSchoolID || '';
    const track = data.track || '';
    const strand = data.strand || '';
    const semester = data.semester || '';

    const cleanNY = nextYear.toString().replace(/\s/g, ' ');
    const cleanLRN = lrn.replace(/\s/g, ' ');
    const cleanCY = currentYear.replace(/\s/g, ' ');
    const cleanGL = GradeLevel.replace(/\s/g, ' ');
    const cleanPSA = PSA.replace(/\s/g, ' ');
    const cleanLname = Lname.toUpperCase().replace(/\s/g, ' ');
    const cleanFname = Fname.toUpperCase().replace(/\s/g, ' ');
    const cleanMname = Mname.toUpperCase().replace(/\s/g, ' ');
    const cleanSuffix = Suffix.toUpperCase().replace(/\s/g, ' ');
    const cleanRlGradeLevelComplete = rlGradeLevelComplete.toUpperCase().replace(/\s/g, ' ');
    const cleanRlLastSYComplete = rlLastSYComplete.toUpperCase().replace(/\s/g, ' ');
    const cleanRlLastSchoolAtt = rlLastSchoolAtt.toUpperCase().replace(/\s/g, ' ');
    const cleanRlSchoolID = rlSchoolID.toUpperCase().replace(/\s/g, '');
    const cleanTrack = track.toUpperCase().replace(/\s/g, ' ');
    const cleanStrand = strand.toUpperCase().replace(/\s/g, ' ');
    // For bday
    const [year, month, day] = BDay.split('-');
    const formattedBDAY =  `${month} ${day} ${year}`;
    const formattedDataSpace = formattedBDAY;

    const lrnX = 688, lrnY = 245, lrnSpacing = 13.7;
    const cyX = 706, cyY = 472, cySpacing = 13.7;
    const nyX = 706, nyY = 400, nySpacing = 13.7;
    const glX = 668, glY = 400, glSpacing = 13.7;
    const psaX = 605, psaY = 330, psaSpacing = 7;
    const lnameX = 565, lnameY = 545, lnameSpacing = 16.5;
    const fnameX = 525, fnameY = 545, fnameSpacing = 16.5;
    const mnameX = 485, mnameY = 545, mnameSpacing = 16.5;
    const suffixX = 445, suffixY = 545, suffixSpacing = 16.5;
    const bdayX = 565, bdayY = 193, bdayDigitalSpace = 15.5, bdaySpaceSpacing = 19;
    const ageX = 525, ageY = 195, ageSpacing = 16.5;
    const birthplaceX = 485, birthplaceY = 195;
    const religionX = 445, religionY = 195;
    const motherTongueX = 408, motherTongueY = 195;

    const existingPdfBytes = await fetch('/NewStudent.pdf').then(res => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const page = pdfDoc.getPage(1);

    cleanLRN.split('').forEach((char, index) => {
      const charY = lrnY - (index * lrnSpacing);
      firstPage.drawText(char, {
        x: lrnX,
        y: charY,
        size: 12, 
        font: font,
        color: rgb(0, 0, 0), 
        rotate: pdfdegrees(-90) 
      });
    });

    cleanCY.split('').forEach((char, index) => {
      const charY = cyY - (index * cySpacing);
      firstPage.drawText(char, {
        x: cyX,
        y: charY,
        size: 12, 
        font: font,
        color: rgb(0, 0, 0), 
        rotate: pdfdegrees(-90) 
      });
    });

    cleanNY.split('').forEach((char, index) => {
      const charY = nyY - (index * nySpacing);
      firstPage.drawText(char, {
        x: nyX,
        y: charY,
        size: 12, 
        font: font,
        color: rgb(0, 0, 0), 
        rotate: pdfdegrees(-90) 
      });
    });

    if(GradeLevel === "11" || GradeLevel === "12"){
      cleanGL .split('').forEach((char, index) => {
        const charY = glY - (index * glSpacing);
        firstPage.drawText(char, {
          x: glX,
          y: charY,
          size: 12, 
          font: font,
          color: rgb(0, 0, 0), 
          rotate: pdfdegrees(-90) 
        });
      });
    }

    cleanPSA.split('').forEach((char, index) => {
      const charY = psaY - (index * psaSpacing);
      firstPage.drawText(char, {
        x: psaX,
        y: charY,
        size: 12, 
        font: font,
        color: rgb(0, 0, 0), 
        rotate: pdfdegrees(-90) 
      });
    });

    cleanLname.split('').forEach((char, index) => {
      const charY = lnameY - (index * lnameSpacing);
      firstPage.drawText(char, {
        x: lnameX,
        y: charY,
        size: 12, 
        font: font,
        color: rgb(0, 0, 0), 
        rotate: pdfdegrees(-90) 
      });
    });

    cleanFname.split('').forEach((char, index) => {
      const charY = fnameY - (index * fnameSpacing);
      firstPage.drawText(char, {
        x: fnameX,
        y: charY,
        size: 12, 
        font: font,
        color: rgb(0, 0, 0), 
        rotate: pdfdegrees(-90) 
      });
    });

    cleanMname.split('').forEach((char, index) => {
      const charY = mnameY - (index * mnameSpacing);
      firstPage.drawText(char, {
        x: mnameX,
        y: charY,
        size: 12, 
        font: font,
        color: rgb(0, 0, 0), 
        rotate: pdfdegrees(-90) 
      });
    });

    cleanSuffix.split('').forEach((char, index) => {
      const charY = suffixY - (index * suffixSpacing);
      firstPage.drawText(char, {
        x: suffixX,
        y: charY,
        size: 12, 
        font: font,
        color: rgb(0, 0, 0), 
        rotate: pdfdegrees(-90) 
      });
    });

    let currentBdayY = bdayY;
    formattedDataSpace.split('').forEach((digit) => {
      firstPage.drawText(digit, {
        x: bdayX,
        y: currentBdayY,
        size: 12, 
        font: font,
        color: rgb(0, 0, 0), 
        rotate: pdfdegrees(-90)
      });
      currentBdayY -= (digit === ''? bdaySpaceSpacing:bdayDigitalSpace);      

    });

    const ageStr = data.age ? data.age.toString() : '';
    ageStr.split('').forEach((digit, index) => {
      const digitY = ageY - (index * ageSpacing);
      firstPage.drawText(digit, {
        x: ageX,
        y: digitY,
        size: 12,
        font: font,
        color: rgb(0, 0, 0),
        rotate: pdfdegrees(-90)
      });
    });

    const birthplaceStr = data.birthplace || '';
    firstPage.drawText(birthplaceStr, {
      x: birthplaceX,
      y: birthplaceY,
      size: 12,
      font: font,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });

    const religionStr = data.religion || '';
    firstPage.drawText(religionStr, {
      x: religionX,
      y: religionY,
      size: 12,
      font: font,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });

    const motherTongueStr = data.motherTongue || '';
    firstPage.drawText(motherTongueStr, {
      x: motherTongueX,
      y: motherTongueY,
      size: 12,
      font: font,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });

    // Address fields
    const houseNumber = data.houseNumber.toUpperCase() || '';
    const streetName = data.streetName.toUpperCase() || '';
    const barangay = data.barangay.toUpperCase() || '';
    const municipality = data.municipality.toUpperCase() || '';
    const province = data.province.toUpperCase() || '';
    const country = data.country.toUpperCase() || '';
    const zipCode = data.zipCode.toUpperCase() || '';

    // HOUSE NO.
    firstPage.drawText(houseNumber, {
      x: 300,
      y: 550,
      size: 10,
      font: font,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });

    // SITIO
    firstPage.drawText(streetName, {
      x: 300,
      y: 445,
      size: 10,
      font: font,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });

    // BARANGAY
    firstPage.drawText(barangay, {
      x: 300,
      y: 225,
      size: 10,
      font: font,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });

    // MUNICIPALITY
    firstPage.drawText(municipality, {
      x: 275,
      y: 550,
      size: 10,
      font: font,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });

    // PROVINCE
    firstPage.drawText(province, {
      x: 275,
      y: 410,
      size: 10,
      font: font,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });

    // COUNTRY
    firstPage.drawText(country, {
      x: 275,
      y: 270,
      size: 10,
      font: font,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });

    // ZIP CODE
    firstPage.drawText(zipCode, {
      x: 275,
      y: 120,
      size: 10,
      font: font,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });

    // Permanent Address handling based on address comparison
    const addressesMatch = data.houseNumber === data.pHN && data.streetName === data.pSN && data.barangay === data.pbrgy && data.municipality === data.pMunicipal && data.province === data.pProvince && data.country === data.pCountry && data.zipCode === data.pZipCode;

    if (!addressesMatch) {
      // Addresses do not match: draw permanent address texts and No square
      const pHN = data.pHN.toUpperCase() || '';
      const pSN = data.pSN.toUpperCase() || '';
      const pbrgy = data.pbrgy.toUpperCase() || '';
      const pMunicipal = data.pMunicipal.toUpperCase() || '';
      const pProvince = data.pProvince.toUpperCase() || '';
      const pCountry = data.pCountry.toUpperCase() || '';
      const pZipCode = data.pZipCode.toUpperCase() || '';

      // Not Permanent House No.
      firstPage.drawText(pHN, {
        x: 235,
        y: 550,
        size: 10,
        font: font,
        rotate: pdfdegrees(-90),
        color: rgb(0, 0, 0),
      });

      // Not Permanent Sitio
      firstPage.drawText(pSN, {
        x: 235,
        y: 445,
        size: 10,
        font: font,
        rotate: pdfdegrees(-90),
        color: rgb(0, 0, 0),
      });

      // Not Permanent Barangay
      firstPage.drawText(pbrgy, {
        x: 235,
        y: 225,
        size: 10,
        font: font,
        rotate: pdfdegrees(-90),
        color: rgb(0, 0, 0),
      });

      // Not Permanent Municipalities
      firstPage.drawText(pMunicipal, {
        x: 210,
        y: 550,
        size: 10,
        font: font,
        rotate: pdfdegrees(-90),
        color: rgb(0, 0, 0),
      });

      // Not Permanent Province
      firstPage.drawText(pProvince, {
        x: 210,
        y: 410,
        size: 10,
        font: font,
        rotate: pdfdegrees(-90),
        color: rgb(0, 0, 0),
      });

      // Not Permanent Country
      firstPage.drawText(pCountry, {
        x: 210,
        y: 270,
        size: 10,
        font: font,
        rotate: pdfdegrees(-90),
        color: rgb(0, 0, 0),
      });

      // Not Permanent Zip Code
      firstPage.drawText(pZipCode, {
        x: 210,
        y: 120,
        size: 10,
        font: font,
        rotate: pdfdegrees(-90),
        color: rgb(0, 0, 0),
      });

      // Square for No
      firstPage.drawSquare({
        x: 259,
        y: 246,
        size: 9,
        borderWidth: 1,
        borderColor: rgb(0, 0, 0),
        color: rgb(0, 0, 0),
      });
    } else {
      // Addresses match: draw Yes square
      firstPage.drawSquare({
        x: 259,
        y: 284,
        size: 9,
        borderWidth: 1,
        borderColor: rgb(0, 0, 0),
        color: rgb(0, 0, 0),
      });
    }

    // 4PS handling
    if (data.fourPS && data.fourPS !== 'No') {
      // 4PS - YES: draw the 4PS number vertically and YES square
      firstPage.drawSquare({
        x: 385,
        y: 399,
        size: 9,
        borderWidth: 1,
        borderColor: rgb(0, 0, 0),
        color: rgb(0, 0, 0),
      });

      const uppercaseFourPS = data.fourPS.toUpperCase().replace(/\s/g, '');
      const startX = 348;
      const startY = 535;
      const spacing = 15.8;

      uppercaseFourPS.split('').forEach((digit, index) => {
        const digitY = startY - (index * spacing);
        firstPage.drawText(digit, {
          x: startX,
          y: digitY,
          size: 12,
          font: font,
          color: rgb(0, 0, 0),
          rotate: pdfdegrees(-90)
        });
      });
    } else if (data.fourPS === 'No') {
      // 4PS - NO
      firstPage.drawSquare({
        x: 385,
        y: 361,
        size: 9,
        borderWidth: 1,
        borderColor: rgb(0, 0, 0),
        color: rgb(0, 0, 0),
      });
    }
    // If blank, do nothing

    // Indigenous People handling
    if (data.indigenousPeople && data.indigenousPeople !== 'No') {
      // YES: draw the indigenous people name and YES square
      firstPage.drawSquare({
        x: 403.5,
        y: 534,
        size: 9,
        borderWidth: 1,
        borderColor: rgb(0, 0, 0),
        color: rgb(0, 0, 0),
      });

      const indigenousText = data.indigenousPeople.toUpperCase();
      firstPage.drawText(indigenousText, {
        x: 408,
        y: 380,
        size: 10,
        font: font,
        rotate: pdfdegrees(-90),
        color: rgb(0, 0, 0),
      });
    } else if (data.indigenousPeople === 'No') {
      // NO: draw NO square
      firstPage.drawSquare({
        x: 403.5,
        y: 495.5,
        size: 9,
        borderWidth: 1,
        borderColor: rgb(0, 0, 0),
        color: rgb(0, 0, 0),
      });
    }

    // LAST GRADE LEVEL COMPLETE
    page.drawText(cleanRlGradeLevelComplete, {
      x: 505,
      y: 535,
      size: 10,
      font: font,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });

    // LAST SCHOOL ATTENDED
    page.drawText(cleanRlLastSchoolAtt, {
      x: 505,
      y: 295,
      size: 10,
      font: font,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });

    // LAST SCHOOL YEAR COMPLETED
    page.drawText(cleanRlLastSYComplete, {
      x: 478,
      y: 535,
      size: 10,
      font: font,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });

    // SCHOOL ID
    cleanRlSchoolID.split('').forEach((digit, index) => {
        const digitY = 248 - (index * 13.7);
        page.drawText(digit, {
            x: 482,
            y: digitY,
            size: 12,
            font: font,
            color: rgb(0, 0, 0),
            rotate: pdfdegrees(-90)
        });
    });

    // TRACK
    page.drawText(cleanTrack, {
      x: 400,
      y: 490,
      size: 10,
      font: font,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });

    // STRAND
    page.drawText(cleanStrand, {
      x: 370,
      y: 490,
      size: 10,
      font: font,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });

    // SEMESTER 1
    if (semester === '1st') {
      page.drawSquare({
        x: 427,
         y: 471,
         size: 9,
         borderWidth: 1,
         borderColor: rgb(0, 0, 0),
         color: rgb(0, 0, 0),
      });
    }

    // SEMESTER 2
    if (semester === '2nd') {
      page.drawSquare({
        x: 427,
         y: 433,
         size: 9,
         borderWidth: 1,
         borderColor: rgb(0, 0, 0),
         color: rgb(0, 0, 0),
      });
    }

    // Sex checkboxes
    if (data.sex === 'Male') {
      firstPage.drawSquare({
        x: 525,
        y: 140,
        size: 8,
        borderWidth: 1,
        borderColor: rgb(0, 0, 0),
        color: rgb(0, 0, 0),
      });
    } else if (data.sex === 'Female') {
      firstPage.drawSquare({
        x: 526,
        y: 94,
        size: 8,
        borderWidth: 1,
        borderColor: rgb(0, 0, 0),
        color: rgb(0, 0, 0),
      });
    }

    // Grade level checkboxes
    if (GradeLevel === "11" || GradeLevel === "12") {
      firstPage.drawSquare({
        x: 667,
        y: 537.5,
        size: 8,
        borderWidth: 1,
        borderColor: rgb(0, 0, 0),
        color: rgb(0, 0, 0),
      });
    } else {
      firstPage.drawSquare({
        x: 648.5,
        y: 537.5,
        size: 8,
        borderWidth: 1,
        borderColor: rgb(0, 0, 0),
        color: rgb(0, 0, 0),
      });
    }

    // Parent information
    // Father LNAME
    firstPage.drawText(data.fatherLN.toUpperCase() || '', {
      x: 140,
      y: 548,
      size: 10,
      font: font,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });

    // Mother LNAME
    firstPage.drawText(data.motherLN.toUpperCase() || '', {
      x: 98,
      y: 548,
      size: 10,
      font: font,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });

    // Guardian LNAME
    firstPage.drawText(data.guardianLN.toUpperCase() || '', {
      x: 58,
      y: 548,
      size: 10,
      font: font,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });

    // Father FNAME
    firstPage.drawText(data.fatherFN.toUpperCase() || '', {
      x: 140,
      y: 418,
      size: 10,
      font: font,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });

    // Mother FNAME
    firstPage.drawText(data.motherFN.toUpperCase() || '', {
      x: 98,
      y: 418,
      size: 10,
      font: font,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });

    // Guardian FNAME
    firstPage.drawText(data.guardianFN.toUpperCase() || '', {
      x: 58,
      y: 418,
      size: 10,
      font: font,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });

    // Father MNAME
    firstPage.drawText(data.fatherMN.toUpperCase() || '', {
      x: 140,
      y: 289,
      size: 10,
      font: font,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });

    // Mother MNAME
    firstPage.drawText(data.motherMN.toUpperCase() || '', {
      x: 98,
      y: 289,
      size: 10,
      font: font,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });

    // Guardian MNAME
    firstPage.drawText(data.guardianMN.toUpperCase() || '', {
      x: 58,
      y: 289,
      size: 10,
      font: font,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });

    // Father Contact
    firstPage.drawText(data.fatherCN.toUpperCase() || '', {
      x: 140,
      y: 160,
      size: 10,
      font: font,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });

    // Mother Contact
    firstPage.drawText(data.motherCN.toUpperCase() || '', {
      x: 98,
      y: 160,
      size: 10,
      font: font,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });

    // Guardian Contact
    firstPage.drawText(data.guardianCN.toUpperCase() || '', {
      x: 58,
      y: 160,
      size: 10,
      font: font,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });

    console.log('snepOption:', data.snepOption);
    console.log('subOption:', data.subOption);

    // SNEP Choice
    if (data.snepChoice === 'Yes' || data.SNEP !== 'None') {
      // Draw YES square
      page.drawSquare({
        x: 769.5,
        y: 235.5,
        size: 9,
        borderWidth: 1,
        borderColor: rgb(0, 0, 0),
        color: rgb(0, 0, 0),
      });

      // 🔹 Parse SNEP value to split mainOption & subOption
      function parseSnep(SNEP: string) {
        const main = SNEP.split(" (")[0];
        const sub = SNEP.split(" (")[1]?.replace(")", "");
        return { main, sub };
      }

      // 🔹 Parse data.SNEP once
      const { main: snepOption, sub: subOption } = parseSnep(data.SNEP);

      // Draw specific option square
      switch (snepOption) {
        case 'Attention Deficit Hyperactivity Disorder':
          page.drawSquare({
            x: 727,
            y: 523,
            size: 9,
            borderWidth: 1,
            borderColor: rgb(0, 0, 0),
            color: rgb(0, 0, 0),
          });
          break;
        case 'Autism Spectrum Disorder':
          page.drawSquare({
            x: 712,
            y: 523,
            size: 9,
            borderWidth: 1,
            borderColor: rgb(0, 0, 0),
            color: rgb(0, 0, 0),
          });
          break;
        case 'Cerebral Palsy':
          page.drawSquare({
            x: 697,
            y: 523,
            size: 9,
            borderWidth: 1,
            borderColor: rgb(0, 0, 0),
            color: rgb(0, 0, 0),
          });
          break;
        case 'Emotional-Behavior Disorder':
          page.drawSquare({
            x: 682,
            y: 523,
            size: 9,
            borderWidth: 1,
            borderColor: rgb(0, 0, 0),
            color: rgb(0, 0, 0),
          });
          break;
        case 'Hearing Impairment':
          page.drawSquare({
            x: 667,
            y: 523,
            size: 9,
            borderWidth: 1,
            borderColor: rgb(0, 0, 0),
            color: rgb(0, 0, 0),
          });
          break;
        case 'Intellectual Disability':
          page.drawSquare({
            x: 727,
            y: 365,
            size: 9,
            borderWidth: 1,
            borderColor: rgb(0, 0, 0),
            color: rgb(0, 0, 0),
          });
          break;
        case 'Learning Disability':
          page.drawSquare({
            x: 712,
            y: 365,
            size: 9,
            borderWidth: 1,
            borderColor: rgb(0, 0, 0),
            color: rgb(0, 0, 0),
          });
          break;
        case 'Multiple Disabilities':
          page.drawSquare({
            x: 697,
            y: 365,
            size: 9,
            borderWidth: 1,
            borderColor: rgb(0, 0, 0),
            color: rgb(0, 0, 0),
          });
          break;
        case 'Orthopedic/Physical Handicap':
          page.drawSquare({
            x: 682,
            y: 365,
            size: 9,
            borderWidth: 1,
            borderColor: rgb(0, 0, 0),
            color: rgb(0, 0, 0),
          });
          break;
        case 'Speech Language Disorder':
          page.drawSquare({
            x: 667,
            y: 365,
            size: 9,
            borderWidth: 1,
            borderColor: rgb(0, 0, 0),
            color: rgb(0, 0, 0),
          });
          break;
        case 'Special Health Problems/Chronic Diseases':
          page.drawSquare({
            x: 727,
            y: 201,
            size: 9,
            borderWidth: 1,
            borderColor: rgb(0, 0, 0),
            color: rgb(0, 0, 0),
          });
          break;
        case 'Visual Impairment':
          page.drawSquare({
            x: 696,
            y: 200,
            size: 9,
            borderWidth: 1,
            borderColor: rgb(0, 0, 0),
            color: rgb(0, 0, 0),
          });
          break;
        case 'Difficulty in Applying Knowledge':
          page.drawSquare({
            x: 632,
            y: 523,
            size: 9,
            borderWidth: 1,
            borderColor: rgb(0, 0, 0),
            color: rgb(0, 0, 0),
          });
          break;
        case 'Difficulty in Communicating':
          page.drawSquare({
            x: 618,
            y: 523,
            size: 9,
            borderWidth: 1,
            borderColor: rgb(0, 0, 0),
            color: rgb(0, 0, 0),
          });
          break;
        case 'Difficulty in Displaying Interpersonal Behavior (Emotional and Behavioral)':
          page.drawSquare({
            x: 603,
            y: 523,
            size: 9,
            borderWidth: 1,
            borderColor: rgb(0, 0, 0),
            color: rgb(0, 0, 0),
          });
          break;
        case 'Difficulty in Hearing':
          page.drawSquare({
            x: 581,
            y: 523,
            size: 9,
            borderWidth: 1,
            borderColor: rgb(0, 0, 0),
            color: rgb(0, 0, 0),
          });
          break;
        case 'Difficulty in Mobility (Walking, Climbing, and Grasping)':
          page.drawSquare({
            x: 632,
            y: 278,
            size: 9,
            borderWidth: 1,
            borderColor: rgb(0, 0, 0),
            color: rgb(0, 0, 0),
          });
          break;
        case 'Difficulty in Performing Adaptive Skills (Self-Care)':
          page.drawSquare({
            x: 618,
            y: 278,
            size: 9,
            borderWidth: 1,
            borderColor: rgb(0, 0, 0),
            color: rgb(0, 0, 0),
          });
          break;
        case 'Difficulty in Remembering, Concentrating, Paying Attention and Understanding':
          page.drawSquare({
            x: 603,
            y: 278,
            size: 9,
            borderWidth: 1,
            borderColor: rgb(0, 0, 0),
            color: rgb(0, 0, 0),
          });
          break;
        case 'Difficulty in Seeing':
          page.drawSquare({
            x: 582,
            y: 278,
            size: 9,
            borderWidth: 1,
            borderColor: rgb(0, 0, 0),
            color: rgb(0, 0, 0),
          });
          break;
      }

      // ---------------------------------------------
      // 1️⃣ VISUAL IMPAIRMENT
      // ---------------------------------------------
      if (snepOption === 'Visual Impairment') {
        if (subOption === 'Blind') {
          page.drawSquare({
            x: 681,
            y: 180,
            size: 9,
            borderWidth: 1,
            borderColor: rgb(0, 0, 0),
            color: rgb(0, 0, 0),
          });
        } else if (subOption === 'Low Vision') {
          page.drawSquare({
            x: 681,
            y: 133,
            size: 9,
            borderWidth: 1,
            borderColor: rgb(0, 0, 0),
            color: rgb(0, 0, 0),
          });
        }
      }

      // ---------------------------------------------
      // 2️⃣ SPECIAL HEALTH PROBLEMS / CHRONIC DISEASES
      // ---------------------------------------------
      if (snepOption === 'Special Health Problems/Chronic Diseases') {
        if (subOption === 'Cancer') {
          page.drawSquare({
            x: 712,
            y: 181,
            size: 9,
            borderWidth: 1,
            borderColor: rgb(0, 0, 0),
            color: rgb(0, 0, 0),
          });
        } else if (subOption === 'Non-Cancer') {
          page.drawSquare({
            x: 712,
            y: 134,
            size: 9,
            borderWidth: 1,
            borderColor: rgb(0, 0, 0),
            color: rgb(0, 0, 0),
          });
        }
      }

      // Draw PWD ID
      if (data.pwdID === 'Yes') {
        page.drawSquare({
          x: 559,
          y: 375,
          size: 9,
          borderWidth: 1,
          borderColor: rgb(0, 0, 0),
          color: rgb(0, 0, 0),
        });
      } else {
        page.drawSquare({
          x: 559,
          y: 338,
          size: 9,
          borderWidth: 1,
          borderColor: rgb(0, 0, 0),
          color: rgb(0, 0, 0),
        });
      }
    } else if (data.snepChoice === 'No') {
      // Draw NO square
      page.drawSquare({
        x: 769.5,
        y: 198,
        size: 9,
        borderWidth: 1,
        borderColor: rgb(0, 0, 0),
        color: rgb(0, 0, 0),
      });
    }

    // Distance Learning checkboxes
    if (data.distanceLearning && data.distanceLearning.length > 0) {
      data.distanceLearning.forEach(option => {
        switch (option) {
          case 'Blended (Combination)':
            page.drawSquare({
              x: 297,
              y: 495,
              size: 9,
              borderWidth: 1,
              borderColor: rgb(0, 0, 0),
              color: rgb(0, 0, 0),
            });
            break;
          case 'Educational Television':
            page.drawSquare({
              x: 282,
              y: 495,
              size: 9,
              borderWidth: 1,
              borderColor: rgb(0, 0, 0),
              color: rgb(0, 0, 0),
            });
            break;
          case 'Homeschooling':
            page.drawSquare({
              x: 297,
              y: 366,
              size: 9,
              borderWidth: 1,
              borderColor: rgb(0, 0, 0),
              color: rgb(0, 0, 0),
            });
            break;
          case 'Modular (Digital)':
            page.drawSquare({
              x: 282,
              y: 366,
              size: 9,
              borderWidth: 1,
              borderColor: rgb(0, 0, 0),
              color: rgb(0, 0, 0),
            });
            break;
          case 'Modular (Print)':
            page.drawSquare({
              x: 297,
              y: 265.8,
              size: 9,
              borderWidth: 1,
              borderColor: rgb(0, 0, 0),
              color: rgb(0, 0, 0),
            });
            break;
          case 'Online':
            page.drawSquare({
              x: 281,
              y: 265.8,
              size: 9,
              borderWidth: 1,
              borderColor: rgb(0, 0, 0),
              color: rgb(0, 0, 0),
            });
            break;
          case 'Radio-Based Television':
            page.drawSquare({
              x: 297,
              y: 162,
              size: 9,
              borderWidth: 1,
              borderColor: rgb(0, 0, 0),
              color: rgb(0, 0, 0),
            });
            break;
        }
      });
    }

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
    const link = document.createElement('a');

    // Use flattened names for filename
    link.href = URL.createObjectURL(blob);
    link.download = 'NewStudent_Form.pdf';
    link.click();
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    const cleanData = (data: typeof formData) => {
      const cleanString = (str: unknown): string =>
        typeof str === "string" ? str.trim().replace(/\s+/g, " ") : "";

      const cleanNumber = (num: unknown): number | null =>
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
        email: cleanString(data.enrollmentInfo.email),
        psa: cleanString(data.personalInfo.psa),
        lname: toProperCase(cleanString(data.personalInfo.lname)),
        fname: toProperCase(cleanString(data.personalInfo.fname)),
        mname: toProperCase(cleanString(data.personalInfo.mname)),
        ename: toProperCase(cleanString(data.personalInfo.ename)),
        bday: cleanDate(data.personalInfo.bday),
        age: cleanNumber(data.personalInfo.age),
        sex: cleanString(data.personalInfo.sex),
        birthplace: toProperCase(cleanString(data.personalInfo.birthplace)),
        religion: toProperCase(cleanString(data.personalInfo.religion)),
        motherTongue: toProperCase(cleanString(data.personalInfo.motherTongue)),
        indigenousPeople: toProperCase(cleanString(data.personalInfo.indigenousPeople)),
        fourPS: cleanString(data.personalInfo.fourPS),
        houseNumber: toProperCase(cleanString(data.personalInfo.houseNumber)),
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
        fatherLN: toProperCase(cleanString(data.parentInfo.fatherLN)),
        fatherFN: toProperCase(cleanString(data.parentInfo.fatherFN)),
        fatherMN: toProperCase(cleanString(data.parentInfo.fatherMN)),
        fatherCN: toProperCase(cleanString(data.parentInfo.fatherCN)),
        motherLN: toProperCase(cleanString(data.parentInfo.motherLN)),
        motherFN: toProperCase(cleanString(data.parentInfo.motherFN)),
        motherMN: toProperCase(cleanString(data.parentInfo.motherMN)),
        motherCN: toProperCase(cleanString(data.parentInfo.motherCN)),
        guardianLN: toProperCase(cleanString(data.parentInfo.guardianLN)),
        guardianFN: toProperCase(cleanString(data.parentInfo.guardianFN)),
        guardianMN: toProperCase(cleanString(data.parentInfo.guardianMN)),
        guardianCN: toProperCase(cleanString(data.parentInfo.guardianCN)),
        SNEP: toProperCase(cleanString(data.snepInfo.SNEP)),
        pwdID: toProperCase(cleanString(data.snepInfo.pwdID)),
        snepChoice: cleanString(data.snepInfo.snepChoice),
        snepOption: cleanString(data.snepInfo.snepOption),
        subOption: cleanString(data.snepInfo.subOption),
        rlGradeLevelComplete: toProperCase(cleanString(data.returnRegular.rlGradeLevelComplete)),
        rlLastSYComplete: toProperCase(cleanString(data.returnRegular.rlLastSYComplete)),
        rlLastSchoolAtt: toProperCase(cleanString(data.returnRegular.rlLastSchoolAtt)),
        rlSchoolID: toProperCase(cleanString(data.returnRegular.rlSchoolID)),
        semester: toProperCase(cleanString(data.returnRegular.semester)),
        track: cleanString(data.returnRegular.track),
        strand: cleanString(data.returnRegular.strand),
        distanceLearning: (data.distanceLearning?.selectedOptions || []).map((opt: string) =>
          toProperCase(cleanString(opt))
        ),
        enrollment_status: "Pending",
      };
    };

    try {
      const cleanedData = cleanData(formData);
        

      const { error: supabaseError } = await supabase
        .from('NewStudents')
        .insert([cleanedData]);

      if (supabaseError) {
        setNotification({ message: "Failed to submit form: " + supabaseError.message, type: "error" });
      } else {
        setNotification({ message: "Form submitted successfully!", type: "success" });

        setFormData({ ...initialFormData });
        setCurrentStep(1);

        await generatedPDF(cleanedData);

      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : JSON.stringify(err);
      setNotification({ message: "❌ Something went wrong: " + errorMessage, type: "error" });
    }

  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <label
        onClick={() => setExitModal(true)} 
        className=' top-2 right-2 p-2 bg-blue-800 text-white flex flex-row gap-3 text-[12px] lg:text-[14px] cursor-pointer'>
          <i className="bi bi-box-arrow-left"></i>
          <p>Back to Home Page</p>
        </label>
      <div className="text-center bg-gradient-to-b from-blue-800 via-blue-700 to-sky-500 text-white flex justify-center items-center flex-col sm:flex-row p-2 gap-2 w-full sticky top-0">
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
            <label className={`${poppins.className} text-[10px] sm:text-sm text-amber-600`}>STEM</label>
            <i className="bi bi-dot"></i>
            <label className={`${poppins.className} text-[10px] sm:text-sm text-green-600`}>ABM</label>
            <i className="bi bi-dot"></i>
            <label className={`${poppins.className} text-[10px] sm:text-sm text-blue-700`}>TVL-ICT</label>
            <i className="bi bi-dot"></i>
            <label className={`${poppins.className} text-[10px] sm:text-sm text-green-800`}>HUMSS</label>
            <i className="bi bi-dot"></i>
            <label className={`${poppins.className} text-[10px] sm:text-sm text-orange-500`}>ALS</label>
          </div>
        </div>
      </div>

      {exitModal && (
        <div className='fixed flex justify-center items-center h-screen w-screen bg-black/10 backdrop-blur-sm'>
          <div className='w-[95%] lg:w-[30%] lg:h-[20%] rounded-md bg-white p-5 flex flex-col 
            items-center justify-center gap-5'>
            <p className='text-md p-2 lg:text-lg w-full border-b-1 font-bold'>Would you like to exit the form?</p>
            <span className='grid grid-rows-1 lg:grid-cols-2 w-full gap-2'>
              <button className='bg-blue-700 hover:bg-blue-800 text-white p-2 rounded-md cursor-pointer'
                onClick = {(e) => { e.stopPropagation(); navigateWithLoading('/enrollmentForm'); }}
              >Yes, Exit</button>
              <button className='bg-gray-200 hover:bg-gray-300  p-2 rounded-md cursor-pointer' 
                onClick={() => setExitModal(false)}>Cancel</button>
            </span>
          </div>
        </div>
      )}

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

      {isLoading && <Loading />}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full h-full items-center justify-center"
      >
        {currentStep === 1 && <EnrollmentInfo formData={formData} setFormData={setFormData} />}
        {currentStep === 2 && <PersonalInfo formData={formData} setFormData={setFormData} />}
        {currentStep === 3 && <ParentInfo formData={formData} setFormData={setFormData} />}
        {currentStep === 4 && <SNEPInfo  formData={formData} setFormData={setFormData} />}
        {currentStep === 5 && <ReturnRegular formData={formData} setFormData={setFormData} />}
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
