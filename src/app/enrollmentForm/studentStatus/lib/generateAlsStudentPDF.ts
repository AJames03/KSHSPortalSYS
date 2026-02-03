'use client'
import { supabase } from '@/lib/supabaseClient';
import { PDFDocument, StandardFonts, rgb, degrees as pdfdegrees } from 'pdf-lib';

export async function generateAlsStudentPDF(lrn: string) {
  const storedLrn = lrn;

  if (!storedLrn) {
    console.error('No LRN provided');
    return;
  }

  // Fetch data from Supabase table 'ALS'
  const { data, error } = await supabase
    .from('ALS')
    .select('*')
    .eq('lrn', storedLrn)
    .single();

  if (error) {
    console.error('Error fetching student data:', error);
    return;
  }

  if (!data) {
    console.error('No data found for the student');
    return;
  }

  const addedAt = data.date || new Date().toISOString();

  // Assuming added_at is in YYYY-MM-DD format or ISO string (e.g., 2023-10-25T...)
  const dateStr = addedAt.split('T')[0];
  const [year, month, day] = dateStr.split('-');
  
  const formattedDateSpace = `${day} ${month} ${year}`;

  const existingPdfBytes = await fetch('/ALS.pdf').then(res => res.arrayBuffer());
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const page = pdfDoc.getPage(0);

  const startX = 682;
  const startY = 548;
  const digitSpacing = 14.8;
  const spaceSpacing = 18;

  let currentY = startY;
  formattedDateSpace.split('').forEach((digit) => {
    page.drawText(digit, {
      x: startX,
      y: currentY,
      size: 12,
      font: font,
      color: rgb(0, 0, 0),
      rotate: pdfdegrees(-90)
    });
    currentY -= (digit === ' ' ? spaceSpacing : digitSpacing);
  });

  const uppercaseLastName = lrn.toUpperCase().replace(/\s/g, '');
  const lrnStartX = 682;
  const lrnStartY = 262;
  const lrnSpacing = 13.7;

  // Add user input to PDF
  uppercaseLastName.split('').forEach((digit, index) => {
    const digitY = lrnStartY - (index * lrnSpacing);

    page.drawText(digit, {
      x: lrnStartX,
      y: digitY,
      size: 12,
      font: font,
      color: rgb(0, 0, 0),
      rotate: pdfdegrees(-90) // Ibinababa ang text
    });
  });

  // LAST NAME
  const lastNameStr = (data.lname || '').toUpperCase().replace(/\s/g, '');
  const lastNameStartX = 618;
  const nameStartY = 542;
  const nameSpacing = 16.5;

  lastNameStr.split('').forEach((char: string, index: number) => {
    const charY = nameStartY - (index * nameSpacing);
    page.drawText(char, {
      x: lastNameStartX,
      y: charY,
      size: 12,
      font: font,
      color: rgb(0, 0, 0),
      rotate: pdfdegrees(-90)
    });
  });

  // FIRST NAME
  const firstNameStr = (data.fname || '').toUpperCase().replace(/\s/g, '');
  const firstNameStartX = 579;

  firstNameStr.split('').forEach((char: string, index: number) => {
    const charY = nameStartY - (index * nameSpacing);
    page.drawText(char, {
      x: firstNameStartX,
      y: charY,
      size: 12,
      font: font,
      color: rgb(0, 0, 0),
      rotate: pdfdegrees(-90)
    });
  });

  // MIDDLE NAME
  const middleNameStr = (data.mname || '').toUpperCase().replace(/\s/g, '');
  const middleNameStartX = 540;

  middleNameStr.split('').forEach((char: string, index: number) => {
    const charY = nameStartY - (index * nameSpacing);
    page.drawText(char, {
      x: middleNameStartX,
      y: charY,
      size: 12,
      font: font,
      color: rgb(0, 0, 0),
      rotate: pdfdegrees(-90)
    });
  });

  // SUFFIX NAME
  const suffixNameStr = (data.ename || '').toUpperCase().replace(/\s/g, '');
  const suffixStartX = 500;

  suffixNameStr.split('').forEach((char: string, index: number) => {
    const charY = nameStartY - (index * nameSpacing);
    page.drawText(char, {
      x: suffixStartX,
      y: charY,
      size: 12,
      font: font,
      color: rgb(0, 0, 0),
      rotate: pdfdegrees(-90)
    });
  });

  // CONTACT NUMBER
  const contactNumStr = (data.cn || '').toString().toUpperCase().replace(/\s/g, '');
  const contactStartX = 500;
  const contactStartY = 370;
  const contactSpacing = 8;

  contactNumStr.split('').forEach((char: string, index: number) => {
    const charY = contactStartY - (index * contactSpacing);
    page.drawText(char, {
      x: contactStartX,
      y: charY,
      size: 12,
      font: font,
      color: rgb(0, 0, 0),
      rotate: pdfdegrees(-90)
    });
  });

  // BIRTHDAY
  const bdayRaw = data.bday || '';
  if (bdayRaw) {
    const bdayDateStr = bdayRaw.split('T')[0];
    const [year, month, day] = bdayDateStr.split('-');
    const formattedBday = `${day} ${month} ${year}`;

    const bdayStartX = 618;
    const bdayStartY = 190;
    const bdayDigitSpacing = 14.8;
    const bdaySpaceSpacing = 18;

    let currentBdayY = bdayStartY;
    formattedBday.split('').forEach((digit: string) => {
      page.drawText(digit, {
        x: bdayStartX,
        y: currentBdayY,
        size: 12,
        font: font,
        color: rgb(0, 0, 0),
        rotate: pdfdegrees(-90)
      });
      currentBdayY -= (digit === ' ' ? bdaySpaceSpacing : bdayDigitSpacing);
    });
  }

  // AGE
  const ageStr = (data.age || '').toString().toUpperCase().replace(/\s/g, ' ');
  const ageStartX = 578;
  const ageStartY = 190;
  const ageSpacing = 15;

  ageStr.split('').forEach((char: string, index: number) => {
    const charY = ageStartY - (index * ageSpacing);
    page.drawText(char, {
      x: ageStartX,
      y: charY,
      size: 12,
      font: font,
      color: rgb(0, 0, 0),
      rotate: pdfdegrees(-90)
    });
  });

  // SEX
  const sexStr = (data.sex || '').toUpperCase();
  if (sexStr === 'MALE') {
    page.drawSquare({
      x: 577,
      y: 146.5,
      size: 10,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });
  } else if (sexStr === 'FEMALE') {
    page.drawSquare({
      x: 577,
      y: 100,
      size: 10,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });
  }

  // CIVIL STATUS
  const civilStatusStr = (data.civilStatus || '').toUpperCase();
  if (civilStatusStr === 'SINGLE') {
    page.drawSquare({
      x: 420,
      y: 189,
      size: 10,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });
  } else if (civilStatusStr === 'MARRIED') {
    page.drawSquare({
      x: 421,
      y: 110,
      size: 10,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });
  } else if (civilStatusStr === 'WIDOW' || civilStatusStr === 'WIDOWER') {
    page.drawSquare({
      x: 407,
      y: 110,
      size: 10,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });
  } else if (civilStatusStr === 'SEPARATED') {
    page.drawSquare({
      x: 407,
      y: 189,
      size: 10,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });
  } else if (civilStatusStr === 'SOLO PARENT') {
    page.drawSquare({
      x: 391,
      y: 188,
      size: 10,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });
  }

  // INDIGENOUS PEOPLE
  const ipStr = (data.indigenousPeople || '').toUpperCase().replace(/\s/g, ' ');
  const ipStartX = 460;
  const ipStartY = 370;

  if (ipStr !== 'NO' && ipStr !== '') {
    page.drawSquare({
      x: 457.5,
      y: 540.5,
      size: 10,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });

    page.drawText(ipStr, {
      x: ipStartX,
      y: ipStartY,
      size: 12,
      font: font,
      color: rgb(0, 0, 0),
      rotate: pdfdegrees(-90)
    });
  } else if (ipStr === 'NO') {
    page.drawSquare({
      x: 457.5,
      y: 504,
      size: 10,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });
  }

  // 4Ps ID NUMBER
  const fourPsStr = (data.fourPS || '').toUpperCase().replace(/\s/g, ' ');
  const fourPsStartX = 402;
  const fourPsStartY = 530;
  const fourPsSpacing = 15.6;

  if (fourPsStr !== 'NO' && fourPsStr !== '') {
    page.drawSquare({
      x: 438,
      y: 406,
      size: 10,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });

    fourPsStr.split('').forEach((char: string, index: number) => {
      const charY = fourPsStartY - (index * fourPsSpacing);
      page.drawText(char, {
        x: fourPsStartX,
        y: charY,
        size: 12,
        font: font,
        color: rgb(0, 0, 0),
        rotate: pdfdegrees(-90)
      });
    });
  } else if (fourPsStr === 'NO') {
    page.drawSquare({
      x: 438,
      y: 369,
      size: 10,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });
  }

  // PLACE OF BIRTH
  const birthplaceStr = (data.birthplace || '').toUpperCase().replace(/\s/g, ' ');
  const birthplaceStartX = 538;
  const birthplaceStartY = 190;

  page.drawText(birthplaceStr, {
    x: birthplaceStartX,
    y: birthplaceStartY,
    size: 12,
    font: font,
    color: rgb(0, 0, 0),
    rotate: pdfdegrees(-90)
  });

  // RELIGION
  const religionStr = (data.religion || '').toUpperCase().replace(/\s/g, ' ');
  const religionStartX = 500;
  const religionStartY = 190;

  page.drawText(religionStr, {
    x: religionStartX,
    y: religionStartY,
    size: 12,
    font: font,
    color: rgb(0, 0, 0),
    rotate: pdfdegrees(-90)
  });

  // MOTHER TONGUE
  const motherTongueStr = (data.motherTongue || '').toUpperCase().replace(/\s/g, ' ');
  const motherTongueStartX = 460;
  const motherTongueStartY = 190;

  page.drawText(motherTongueStr, {
    x: motherTongueStartX,
    y: motherTongueStartY,
    size: 12,
    font: font,
    color: rgb(0, 0, 0),
    rotate: pdfdegrees(-90)
  });

  // CURRENT ADDRESS – HOUSE NO.
  const houseNumberStr = (data.houseNumber || '').toUpperCase().replace(/\s/g, ' ');
  const houseNumberStartX = 355;
  const houseNumberStartY = 545;

  page.drawText(houseNumberStr, {
    x: houseNumberStartX,
    y: houseNumberStartY,
    size: 10,
    font: font,
    rotate: pdfdegrees(-90),
    color: rgb(0, 0, 0),
  });

  // CURRENT ADDRESS – SITIO/STREET NAME
  const streetNameStr = (data.streetName || '').toUpperCase().replace(/\s/g, ' ');
  const streetNameStartX = 355;
  const streetNameStartY = 440;

  page.drawText(streetNameStr, {
    x: streetNameStartX,
    y: streetNameStartY,
    size: 10,
    font: font,
    rotate: pdfdegrees(-90),
    color: rgb(0, 0, 0),
  });

  // CURRENT ADDRESS - BARANGAY
  const barangayStr = (data.barangay || '').toUpperCase().replace(/\s/g, ' ');
  const barangayStartX = 355;
  const barangayStartY = 220;

  page.drawText(barangayStr, {
    x: barangayStartX,
    y: barangayStartY,
    size: 10,
    font: font,
    rotate: pdfdegrees(-90),
    color: rgb(0, 0, 0),
  });

  // CURRENT ADDRESS - MUNICIPAL CITY
  const municipalStr = (data.municipal || '').toUpperCase().replace(/\s/g, ' ');
  const municipalStartX = 330;
  const municipalStartY = 545;

  page.drawText(municipalStr, {
    x: municipalStartX,
    y: municipalStartY,
    size: 10,
    font: font,
    rotate: pdfdegrees(-90),
    color: rgb(0, 0, 0),
  });

  // CURRENT ADDRESS - PROVINCE
  const provinceStr = (data.province || '').toUpperCase().replace(/\s/g, ' ');
  const provinceStartX = 330;
  const provinceStartY = 405;

  page.drawText(provinceStr, {
    x: provinceStartX,
    y: provinceStartY,
    size: 10,
    font: font,
    rotate: pdfdegrees(-90),
    color: rgb(0, 0, 0),
  });

  // CURRENT ADDRESS - COUNTRY
  const countryStr = (data.country || '').toUpperCase().replace(/\s/g, ' ');
  const countryStartX = 330;
  const countryStartY = 270;

  page.drawText(countryStr, {
    x: countryStartX,
    y: countryStartY,
    size: 10,
    font: font,
    rotate: pdfdegrees(-90),
    color: rgb(0, 0, 0),
  });

  // CURRENT ADDRESS - ZIP CODE
  const zipCodeStr = (data.zipCode || '').toString().toUpperCase().replace(/\s/g, ' ');
  const zipCodeStartX = 330;
  const zipCodeStartY = 110;

  page.drawText(zipCodeStr, {
    x: zipCodeStartX,
    y: zipCodeStartY,
    size: 10,
    font: font,
    rotate: pdfdegrees(-90),
    color: rgb(0, 0, 0),
  });

  // PERMANENT ADDRESS
  const pHNStr = (data.pHN || '').toUpperCase().replace(/\s/g, ' ');
  const pSNStr = (data.pSN || '').toUpperCase().replace(/\s/g, ' ');
  const pbrgyStr = (data.pbrgy || '').toUpperCase().replace(/\s/g, ' ');
  const pMunicipalStr = (data.pMunicipal || '').toUpperCase().replace(/\s/g, ' ');
  const pProvinceStr = (data.pProvince || '').toUpperCase().replace(/\s/g, ' ');
  const pCountryStr = (data.pCountry || '').toUpperCase().replace(/\s/g, ' ');
  const pZipCodeStr = (data.pZipCode || '').toString().toUpperCase().replace(/\s/g, ' ');

  const isSameAddress =
    houseNumberStr === pHNStr &&
    streetNameStr === pSNStr &&
    barangayStr === pbrgyStr &&
    municipalStr === pMunicipalStr &&
    provinceStr === pProvinceStr &&
    countryStr === pCountryStr &&
    zipCodeStr === pZipCodeStr;

  if (!isSameAddress) {
    page.drawSquare({
      x: 312,
      y: 254,
      size: 10,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });

    // PERMANENT ADDRESS - HOUSE NO.
    const pHNStartX = 290;
    const pHNStartY = 545;

    page.drawText(pHNStr, {
      x: pHNStartX,
      y: pHNStartY,
      size: 10,
      font: font,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });

    // PERMANENT ADDRESS - SITIO/STREET NAME
    const pSNStartX = 290;
    const pSNStartY = 440;

    page.drawText(pSNStr, {
      x: pSNStartX,
      y: pSNStartY,
      size: 10,
      font: font,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });

    // PERMANENT ADDRESS - BARANGAY
    const pbrgyStartX = 290;
    const pbrgyStartY = 220;

    page.drawText(pbrgyStr, {
      x: pbrgyStartX,
      y: pbrgyStartY,
      size: 10,
      font: font,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });

    // PERMANENT ADDRESS - MUNICIPAL CITY
    const pMunicipalStartX = 264;
    const pMunicipalStartY = 545;

    page.drawText(pMunicipalStr, {
      x: pMunicipalStartX,
      y: pMunicipalStartY,
      size: 10,
      font: font,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });

    // PERMANENT ADDRESS - PROVINCE
    const pProvinceStartX = 264;
    const pProvinceStartY = 405;

    page.drawText(pProvinceStr, {
      x: pProvinceStartX,
      y: pProvinceStartY,
      size: 10,
      font: font,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });

    // PERMANENT ADDRESS - COUNTRY
    const pCountryStartX = 264;
    const pCountryStartY = 270;

    page.drawText(pCountryStr, {
      x: pCountryStartX,
      y: pCountryStartY,
      size: 10,
      font: font,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });

    // PERMANENT ADDRESS - ZIP CODE
    const pZipCodeStartX = 264;
    const pZipCodeStartY = 110;

    page.drawText(pZipCodeStr, {
      x: pZipCodeStartX,
      y: pZipCodeStartY,
      size: 10,
      font: font,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });
  } else {
    page.drawSquare({
      x: 312,
      y: 291,
      size: 10,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });
  }

  // FATHER’S LAST NAME
  const fatherLNStr = (data.fatherLN || '').toUpperCase().replace(/\s/g, ' ');
  const fatherLNStartX = 200;
  const fatherLNStartY = 545;

  page.drawText(fatherLNStr, {
    x: fatherLNStartX,
    y: fatherLNStartY,
    size: 10,
    font: font,
    rotate: pdfdegrees(-90),
    color: rgb(0, 0, 0),
  });

  // FATHER’S FIRST NAME
  const fatherFNStr = (data.fatherFN || '').toUpperCase().replace(/\s/g, ' ');
  const fatherFNStartX = 200;
  const fatherFNStartY = 415;

  page.drawText(fatherFNStr, {
    x: fatherFNStartX,
    y: fatherFNStartY,
    size: 10,
    font: font,
    rotate: pdfdegrees(-90),
    color: rgb(0, 0, 0),
  });

  // FATHER’S MIDDLE NAME
  const fatherMNStr = (data.fatherMN || '').toUpperCase().replace(/\s/g, ' ');
  const fatherMNStartX = 200;
  const fatherMNStartY = 285;

  page.drawText(fatherMNStr, {
    x: fatherMNStartX,
    y: fatherMNStartY,
    size: 10,
    font: font,
    rotate: pdfdegrees(-90),
    color: rgb(0, 0, 0),
  });

  // FATHER’S CONTACT/OCCUPATION
  const fatherCNStr = (data.fatherCN || '').toString().toUpperCase().replace(/\s/g, ' ');
  const fatherCNStartX = 200;
  const fatherCNStartY = 110;

  page.drawText(fatherCNStr, {
    x: fatherCNStartX,
    y: fatherCNStartY,
    size: 10,
    font: font,
    rotate: pdfdegrees(-90),
    color: rgb(0, 0, 0),
  });

  // MOTHER’S LAST NAME
  const motherLNStr = (data.motherLN || '').toUpperCase().replace(/\s/g, ' ');
  const motherLNStartX = 160;
  const motherLNStartY = 545;

  page.drawText(motherLNStr, {
    x: motherLNStartX,
    y: motherLNStartY,
    size: 10,
    font: font,
    rotate: pdfdegrees(-90),
    color: rgb(0, 0, 0),
  });

  // MOTHER’S FIRST NAME
  const motherFNStr = (data.motherFN || '').toUpperCase().replace(/\s/g, ' ');
  const motherFNStartX = 160;
  const motherFNStartY = 415;

  page.drawText(motherFNStr, {
    x: motherFNStartX,
    y: motherFNStartY,
    size: 10,
    font: font,
    rotate: pdfdegrees(-90),
    color: rgb(0, 0, 0),
  });

  // MOTHER’S MIDDLE NAME
  const motherMNStr = (data.motherMN || '').toUpperCase().replace(/\s/g, ' ');
  const motherMNStartX = 160;
  const motherMNStartY = 285;

  page.drawText(motherMNStr, {
    x: motherMNStartX,
    y: motherMNStartY,
    size: 10,
    font: font,
    rotate: pdfdegrees(-90),
    color: rgb(0, 0, 0),
  });

  // MOTHER’S CONTACT/OCCUPATION
  const motherCNStr = (data.motherCN || '').toString().toUpperCase().replace(/\s/g, ' ');
  const motherCNStartX = 160;
  const motherCNStartY = 110;

  page.drawText(motherCNStr, {
    x: motherCNStartX,
    y: motherCNStartY,
    size: 10,
    font: font,
    rotate: pdfdegrees(-90),
    color: rgb(0, 0, 0),
  });

  // GUARDIAN’S LAST NAME
  const guardianLNStr = (data.guardianLN || '').toUpperCase().replace(/\s/g, ' ');
  const guardianLNStartX = 120;
  const guardianLNStartY = 545;

  page.drawText(guardianLNStr, {
    x: guardianLNStartX,
    y: guardianLNStartY,
    size: 10,
    font: font,
    rotate: pdfdegrees(-90),
    color: rgb(0, 0, 0),
  });

  // GUARDIAN’S FIRST NAME
  const guardianFNStr = (data.guardianFN || '').toUpperCase().replace(/\s/g, ' ');
  const guardianFNStartX = 120;
  const guardianFNStartY = 415;

  page.drawText(guardianFNStr, {
    x: guardianFNStartX,
    y: guardianFNStartY,
    size: 10,
    font: font,
    rotate: pdfdegrees(-90),
    color: rgb(0, 0, 0),
  });

  // GUARDIAN’S MIDDLE NAME
  const guardianMNStr = (data.guardianMN || '').toUpperCase().replace(/\s/g, ' ');
  const guardianMNStartX = 120;
  const guardianMNStartY = 285;

  page.drawText(guardianMNStr, {
    x: guardianMNStartX,
    y: guardianMNStartY,
    size: 10,
    font: font,
    rotate: pdfdegrees(-90),
    color: rgb(0, 0, 0),
  });

  // GUARDIAN’S CONTACT/OCCUPATION
  const guardianCNStr = (data.guardianCN || '').toString().toUpperCase().replace(/\s/g, ' ');
  const guardianCNStartX = 120;
  const guardianCNStartY = 155;

  page.drawText(guardianCNStr, {
    x: guardianCNStartX,
    y: guardianCNStartY,
    size: 10,
    font: font,
    rotate: pdfdegrees(-90),
    color: rgb(0, 0, 0),
  });

  // PWD
  const pwdRaw = data.pwd || '';
  const pwdStr = pwdRaw.toUpperCase();
  const page2 = pdfDoc.getPage(1);

  if (pwdStr !== 'NONE' && pwdStr !== 'NO' && pwdStr !== '') {
    page2.drawSquare({
      x: 445,
      y: 42,
      size: 10,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });

    if (pwdStr.includes('ATTENTION DEFICIT HYPERACTIVITY DISORDER')) {
      page2.drawSquare({
        x: 550,
        y: 78,
        size: 10,
        rotate: pdfdegrees(-90),
        color: rgb(0, 0, 0),
      });
    }
    if (pwdStr.includes('AUTISM SPECTRUM DISORDER')) {
      page2.drawSquare({
        x: 550,
        y: 93,
        size: 10,
        rotate: pdfdegrees(-90),
        color: rgb(0, 0, 0),
      });
    }
    if (pwdStr.includes('CEREBRAL PALSY')) {
      page2.drawSquare({
        x: 550,
        y: 108,
        size: 10,
        rotate: pdfdegrees(-90),
        color: rgb(0, 0, 0),
      });
    }
    if (pwdStr.includes('EMOTIONAL-BEHAVIOR DISORDER')) {
      page2.drawSquare({
        x: 550,
        y: 123,
        size: 10,
        rotate: pdfdegrees(-90),
        color: rgb(0, 0, 0),
      });
    }
    if (pwdStr.includes('HEARING IMPAIRMENT')) {
      page2.drawSquare({
        x: 550,
        y: 138,
        size: 10,
        rotate: pdfdegrees(-90),
        color: rgb(0, 0, 0),
      });
    }
    if (pwdStr.includes('SPEECH LANGUAGE DISORDER') || pwdStr.includes('SPEECH/LANGUAGE DISORDER')) {
      page2.drawSquare({
        x: 391,
        y: 135,
        size: 10,
        rotate: pdfdegrees(-90),
        color: rgb(0, 0, 0),
      });
    }
    if (pwdStr.includes('MULTIPLE DISABILITIES')) {
      page2.drawSquare({
        x: 391,
        y: 108,
        size: 10,
        rotate: pdfdegrees(-90),
        color: rgb(0, 0, 0),
      });
    }
    if (pwdStr.includes('ORTHOPEDIC/PHYSICAL HANDICAP')) {
      page2.drawSquare({
        x: 391,
        y: 108,
        size: 10,
        rotate: pdfdegrees(-90),
        color: rgb(0, 0, 0),
      });
    }
    if (pwdStr.includes('LEARNING DISABILITY')) {
      page2.drawSquare({
        x: 391,
        y: 93,
        size: 10,
        rotate: pdfdegrees(-90),
        color: rgb(0, 0, 0),
      });
    }
    if (pwdStr.includes('INTELLECTUAL DISABILITY')) {
      page2.drawSquare({
        x: 391,
        y: 77,
        size: 10,
        rotate: pdfdegrees(-90),
        color: rgb(0, 0, 0),
      });
    }
    if (pwdStr.includes('SPECIAL HEALTH PROBLEM') || pwdStr.includes('CHRONIC DISEASE')) {
      page2.drawSquare({
        x: 228,
        y: 76,
        size: 10,
        rotate: pdfdegrees(-90),
        color: rgb(0, 0, 0),
      });
      if (pwdStr.includes('CANCER') && !pwdStr.includes('NON-CANCER')) {
        page2.drawSquare({
          x: 208,
          y: 90,
          size: 10,
          rotate: pdfdegrees(-90),
          color: rgb(0, 0, 0),
        });
      }
      if (pwdStr.includes('NON-CANCER')) {
        page2.drawSquare({
          x: 160,
          y: 90,
          size: 10,
          rotate: pdfdegrees(-90),
          color: rgb(0, 0, 0),
        });
      }
    }
    if (pwdStr.includes('VISUAL IMPAIRMENT') || pwdStr.includes('VISION IMPAIRMENT')) {
      page2.drawSquare({
        x: 227,
        y: 107,
        size: 10,
        rotate: pdfdegrees(-90),
        color: rgb(0, 0, 0),
      });
      if (pwdStr.includes('BLIND')) {
        page2.drawSquare({
          x: 206,
          y: 122,
          size: 10,
          rotate: pdfdegrees(-90),
          color: rgb(0, 0, 0),
        });
      }
      if (pwdStr.includes('LOW VISION')) {
        page2.drawSquare({
          x: 160,
          y: 122,
          size: 10,
          rotate: pdfdegrees(-90),
          color: rgb(0, 0, 0),
        });
      }
    }
  } else {
    page2.drawSquare({
      x: 407,
      y: 42,
      size: 10,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });
  }

  // PWD ID
  const pwdIdStr = (data.pwdID || '').toUpperCase();
  if (pwdIdStr === 'YES') {
    page2.drawSquare({
      x: 403,
      y: 159,
      size: 10,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });
  } else {
    // This handles 'No' or empty cases
    page2.drawSquare({
      x: 365,
      y: 159,
      size: 10,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });
  }

  // Education Information
  if (data.education_information === 'Elementary (Kinder)') {
    page2.drawSquare({
      x: 545.5,
      y: 241.8,
      size: 10,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });
  } else if (data.education_information === 'Elementary (Grade 1)') {
    page2.drawSquare({
      x: 499,
      y: 241,
      size: 10,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });
  } else if (data.education_information === 'Elementary (Grade 3)') {
    page2.drawSquare({
      x: 438,
      y: 241,
      size: 10,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });
  } else if (data.education_information === 'Elementary (Grade 2)') {
    page2.drawSquare({
      x: 499,
      y: 255.5,
      size: 10,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });
  } else if (data.education_information === 'Elementary (Grade 4)') {
    page2.drawSquare({
      x: 438,
      y: 255.5,
      size: 10,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });
  } else if (data.education_information === 'Elementary (Grade 5)') {
    page2.drawSquare({
      x: 379,
      y: 241,
      size: 10,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });
  } else if (data.education_information === 'Elementary (Grade 6)') {
    page2.drawSquare({
      x: 378.5,
      y: 255.5,
      size: 10,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });
  } else if (data.education_information === 'Junior High (Grade 8)') {
    page2.drawSquare({
      x: 305,
      y: 257.5,
      size: 10,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });
  } else if (data.education_information === 'Junior High (Grade 10)') {
    page2.drawSquare({
      x: 228,
      y: 257.5,
      size: 10,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });
  } else if (data.education_information === 'Junior High (Grade 7)') {
    page2.drawSquare({
      x: 305,
      y: 243.5,
      size: 10,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });
  } else if (data.education_information === 'Junior High (Grade 9)') {
    page2.drawSquare({
      x: 228,
      y: 243.8,
      size: 10,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });
  } else if (data.education_information === 'Senior High (Grade 11)') {
    page2.drawSquare({
      x: 135.8,
      y: 243.8,
      size: 10,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });
  }

  // OSY Reason
  if (data.OSY === 'No School In Barangay') {
    page2.drawSquare({
      x: 539,
      y: 315,
      size: 10,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });
  } else if (data.OSY === 'School Too Far From Home') {
    page2.drawSquare({
      x: 539,
      y: 329,
      size: 10,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });
  } else if (data.OSY === 'Needed To Help Family') {
    page2.drawSquare({
      x: 539,
      y: 344,
      size: 10,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });
  } else if (data.OSY === 'Unable To Pay For Miscellaneous And Other Expenses') {
    page2.drawSquare({
      x: 539,
      y: 358,
      size: 10,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });
  } else if (data.OSY) {
    page2.drawSquare({
      x: 539,
      y: 363,
      size: 10,
      rotate: pdfdegrees(0),
      color: rgb(0, 0, 0),
    });
    page2.drawText(data.OSY.toUpperCase(), {
      x: 460,
      y: 369,
      size: 8,
      font: font,
      rotate: pdfdegrees(-180),
      color: rgb(0, 0, 0),
    });
  }

  // ALS Attended
  if (data.als_attended === 'No' || data.als_attended === '') {
    page2.drawSquare({
      x: 89.5,
      y: 288.5,
      size: 10,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });
  } else if (data.als_attended) {
    page2.drawSquare({
      x: 125.5,
      y: 288.5,
      size: 10,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });

    if (data.als_attended === 'Basic Literacy') {
      page2.drawSquare({
        x: 284,
        y: 318,
        size: 10,
        rotate: pdfdegrees(-90),
        color: rgb(0, 0, 0),
      });
    } else if (data.als_attended === 'A&E Elementary') {
      page2.drawSquare({
        x: 284,
        y: 331,
        size: 10,
        rotate: pdfdegrees(-90),
        color: rgb(0, 0, 0),
      });
    } else if (data.als_attended === 'A&E Secondary') {
      page2.drawSquare({
        x: 169.5,
        y: 318,
        size: 10,
        rotate: pdfdegrees(-90),
        color: rgb(0, 0, 0),
      });
    } else if (data.als_attended === 'ALS Senior High') {
      page2.drawSquare({
        x: 169.5,
        y: 331,
        size: 10,
        rotate: pdfdegrees(-90),
        color: rgb(0, 0, 0),
      });
    }
  }

  // Completed Program
  if (data.complete_program === 'Yes') {
    page2.drawSquare({
      x: 180.5,
      y: 346,
      size: 10,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });
  } else if (data.complete_program || data.complete_program === '') {
    page2.drawSquare({
      x: 142.5,
      y: 346.5,
      size: 10,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });
    page2.drawText(data.complete_program.toUpperCase(), {
      x: 310,
      y: 374,
      size: 8,
      font: font,
      rotate: pdfdegrees(-180),
      color: rgb(0, 0, 0),
    });
  }

  // KMS from home
  if (data.kms) {
    page2.drawText(data.kms.toString().toUpperCase(), {
      x: 310,
      y: 410,
      size: 8,
      font: font,
      rotate: pdfdegrees(-180),
      color: rgb(0, 0, 0),
    });
  }

  // Hours from home
  if (data.hour) {
    page2.drawText(data.hour.toString().toUpperCase(), {
      x: 190,
      y: 410,
      size: 8,
      font: font,
      rotate: pdfdegrees(-180),
      color: rgb(0, 0, 0),
    });
  }

  // Transportation
  const transportationStr = (data.transportation || '').toUpperCase().replace(/\s/g, ' ');

  if (transportationStr === 'WALKING') {
    page2.drawSquare({
      x: 521,
      y: 443,
      size: 10,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });
  } else if (transportationStr === 'MOTORCYCLE') {
    page2.drawSquare({
      x: 475,
      y: 443,
      size: 10,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });
  } else if (transportationStr === 'BICYCLE') {
    page2.drawSquare({
      x: 420,
      y: 443,
      size: 10,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });
  } else if (transportationStr && transportationStr !== 'NONE') {
    page2.drawSquare({
      x: 373,
      y: 443,
      size: 10,
      rotate: pdfdegrees(-90),
      color: rgb(0, 0, 0),
    });
    page2.drawText(transportationStr, {
      x: 270,
      y: 439,
      size: 8,
      font: font,
      rotate: pdfdegrees(-180),
      color: rgb(0, 0, 0),
    });
  }

  // Day and Time
  if (data.day === 'Monday' && data.time) {
    page2.drawText(data.time.toString().toUpperCase(), {
      x: 530,
      y: 485,
      size: 8,
      font: font,
      rotate: pdfdegrees(-180),
      color: rgb(0, 0, 0),
    });
  } else if (data.day === 'Tuesday' && data.time) {
    page2.drawText(data.time.toString().toUpperCase(), {
      x: 470,
      y: 485,
      size: 8,
      font: font,
      rotate: pdfdegrees(-180),
      color: rgb(0, 0, 0),
    });
  } else if (data.day === 'Wednesday' && data.time) {
    page2.drawText(data.time.toString().toUpperCase(), {
      x: 410,
      y: 485,
      size: 8,
      font: font,
      rotate: pdfdegrees(-180),
      color: rgb(0, 0, 0),
    });
  } else if (data.day === 'Thursday' && data.time) {
    page2.drawText(data.time.toString().toUpperCase(), {
      x: 335,
      y: 485,
      size: 8,
      font: font,
      rotate: pdfdegrees(-180),
      color: rgb(0, 0, 0),
    });
  } else if (data.day === 'Friday' && data.time) {
    page2.drawText(data.time.toString().toUpperCase(), {
      x: 270,
      y: 485,
      size: 8,
      font: font,
      rotate: pdfdegrees(-180),
      color: rgb(0, 0, 0),
    });
  } else if (data.day === 'Saturday' && data.time) {
    page2.drawText(data.time.toString().toUpperCase(), {
      x: 200,
      y: 485,
      size: 8,
      font: font,
      rotate: pdfdegrees(-180),
      color: rgb(0, 0, 0),
    });
  } else if (data.day === 'Sunday' && data.time) {
    page2.drawText(data.time.toString().toUpperCase(), {
      x: 135,
      y: 485,
      size: 8,
      font: font,
      rotate: pdfdegrees(-180),
      color: rgb(0, 0, 0),
    });
  }

  if (data.distanceLearning && data.distanceLearning.length > 0) {
    (data.distanceLearning as string[]).forEach((option) => {
      switch (option) {
        case 'Blended (Combination)':
          page2.drawSquare({
            x: 523,
            y: 562,
            size: 9,
            borderWidth: 1,
            borderColor: rgb(0, 0, 0),
            color: rgb(0, 0, 0),
            rotate: pdfdegrees(-90),
          });
          break;
        case 'Educational Television':
          page2.drawSquare({
            x: 522.5,
            y: 579,
            size: 9,
            borderWidth: 1,
            borderColor: rgb(0, 0, 0),
            color: rgb(0, 0, 0),
            rotate: pdfdegrees(-90),
          });
          break;
        case 'Homeschooling':
          page2.drawSquare({
            x: 393,
            y: 562,
            size: 9,
            borderWidth: 1,
            borderColor: rgb(0, 0, 0),
            color: rgb(0, 0, 0),
            rotate: pdfdegrees(-90),
          });
          break;
        case 'Modular (Digital)':
          page2.drawSquare({
            x: 393,
            y: 579,
            size: 9,
            borderWidth: 1,
            borderColor: rgb(0, 0, 0),
            color: rgb(0, 0, 0),
            rotate: pdfdegrees(-90),
          });
          break;
        case 'Modular (Print)':
          page2.drawSquare({
            x: 293,
            y: 563,
            size: 9,
            borderWidth: 1,
            borderColor: rgb(0, 0, 0),
            color: rgb(0, 0, 0),
            rotate: pdfdegrees(-90),
          });
          break;
        case 'Online':
          page2.drawSquare({
            x: 293,
            y: 579,
            size: 9,
            borderWidth: 1,
            borderColor: rgb(0, 0, 0),
            color: rgb(0, 0, 0),
            rotate: pdfdegrees(-90),
          });
          break;
        case 'Radio-Based Television':
          page2.drawSquare({
            x: 189,
            y: 562,
            size: 9,
            borderWidth: 1,
            borderColor: rgb(0, 0, 0),
            color: rgb(0, 0, 0),
            rotate: pdfdegrees(-90),
          });
          break;
      }
    });
  }

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = `ALS_${storedLrn}.pdf`;
  link.click();
  URL.revokeObjectURL(url);
}