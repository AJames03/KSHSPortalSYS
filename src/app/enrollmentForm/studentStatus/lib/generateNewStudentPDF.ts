'use client'
import { supabase } from '@/lib/supabaseClient';
import { PDFDocument, StandardFonts, rgb, degrees as pdfdegrees } from 'pdf-lib';

export async function generateNewStudentPDF(lrn: string)  {
      const storedLrn = lrn;

        if (!storedLrn) {
          console.error('No LRN provided');
          return;
        }


        const { data, error } = await supabase
            .from('NewStudents')
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

        // cleaning
        const dbLRN = data.lrn || '';
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

        (cleanLRN.split('') as string[]).forEach((char, index) => {
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

        (cleanCY.split('') as string[]).forEach((char, index) => {
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

        (cleanNY.split('') as string[]).forEach((char, index) => {
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
          (cleanGL.split('') as string[]).forEach((char, index) => {
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

        (cleanPSA.split('') as string[]).forEach((char, index) => {
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

        (cleanLname.split('') as string[]).forEach((char, index) => {
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

        (cleanFname.split('') as string[]).forEach((char, index) => {
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

        (cleanMname.split('') as string[]).forEach((char, index) => {
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

        (cleanSuffix.split('') as string[]).forEach((char, index) => {
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
        (ageStr.split('') as string[]).forEach((digit, index) => {
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

          (uppercaseFourPS.split('') as string[]).forEach((digit, index) => {
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
        (cleanRlSchoolID.split('') as string[]).forEach((digit, index) => {
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

        // SNEP Choice
        if (data.snepChoice && data.snepChoice && data.SNEP !== 'None') {
          // Draw YES square
          page.drawSquare({
            x: 769.5,
            y: 235.5,
            size: 9,
            borderWidth: 1,
            borderColor: rgb(0, 0, 0),
            color: rgb(0, 0, 0),
          });

          // Draw specific option square
          switch (data.snepOption) {
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
              if (data.subOption === 'Cancer') {
                page.drawSquare({
                  x: 712,
                  y: 181,
                  size: 9,
                  borderWidth: 1,
                  borderColor: rgb(0, 0, 0),
                  color: rgb(0, 0, 0),
                });
              } else if (data.subOption === 'Non-Cancer') {
                page.drawSquare({
                  x: 712,
                  y: 134,
                  size: 9,
                  borderWidth: 1,
                  borderColor: rgb(0, 0, 0),
                  color: rgb(0, 0, 0),
                });
              }
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
              if (data.subOption === 'Blind') {
                page.drawSquare({
                  x: 681,
                  y: 180,
                  size: 9,
                  borderWidth: 1,
                  borderColor: rgb(0, 0, 0),
                  color: rgb(0, 0, 0),
                });
              } else if (data.subOption === 'Low Vision') {
                page.drawSquare({
                  x: 681,
                  y: 133,
                  size: 9,
                  borderWidth: 1,
                  borderColor: rgb(0, 0, 0),
                  color: rgb(0, 0, 0),
                });
              }
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
        } else if (data.SNEP === 'None') {
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
          (data.distanceLearning as string[]).forEach(option => {
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
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.download = `${data.lname}_${storedLrn}.pdf`;
        link.click();
        URL.revokeObjectURL(url);

}
