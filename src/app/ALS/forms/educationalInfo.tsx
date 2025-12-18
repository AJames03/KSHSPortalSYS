'use client';
import React, { useEffect } from 'react';
import { Poppins } from 'next/font/google';
import { ALSFormData } from '@/app/ALS/page';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['200', '400', '700', '900'],
  style: ['normal', 'italic'],
});

interface EducationalInfoType {
  education_information: string;
  OSY: string;
  attended: string;
  als_attended: string;
  complete_program: string;
  incomplete_reason: string;
  program_status: string;
}

interface EducationalInfoProps {
  formData: ALSFormData;
  setFormData: React.Dispatch<React.SetStateAction<ALSFormData>>;
}

export default function EducationalInfo({ formData, setFormData }: EducationalInfoProps) {
  useEffect(() => {
    if (!formData.educationalInfo) {
      setFormData(prev => ({
        ...prev,
        educationalInfo: {
          education_information: '',
          OSY: '',
          attended: '',
          als_attended: '',
          complete_program: '',
          incomplete_reason: '',
          program_status: '',
        },
      }));
    }
  }, [formData.educationalInfo, setFormData]);

  const handleChange = (key: keyof EducationalInfoType) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      educationalInfo: {
        ...prev.educationalInfo!,
        [key]: value,
      },
    }));
  };

  const elem = ['Kinder', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6'];
  const junior = ['Grade 7', 'Grade 8', 'Grade 9', 'Grade 10'];
  const senior = ['Grade 11', 'Grade 12'];
  const osy = [
    'No School In Barangay',
    'School Too Far From Home',
    'Needed To Help Family',
    'Unable To Pay For Miscellaneous And Other Expenses',
    'Other',
  ];
  const program = ['Basic Literacy', 'A&E Elementary', 'A&E Secondary', 'A&E Senior High'];

  return (
    <div className=" m-5 flex flex-col gap-4 sm:gap-5 justify-between items-center text-black ">
      <header>
        <label
          className={`${poppins.className} text-[14px] sm:text-[20px] font-bold flex flex-col gap-5 border-b-2 pb-2 text-center`}
        >
          Last Grade Level Completed (Select Only One Per Category)
        </label>
      </header>

      <div className="flex flex-col sm:grid sm:grid-cols-4 w-full text-center mt-2 sm:text-[18px] gap-4">
        {/* Elementary */}
        <span className="col-span-4 border-1 flex flex-col items-center">
          <label className="font-semibold mb-2">Elementary</label>
          <div className="grid grid-cols-3 gap-3">
            {elem.map((option, i) => (
              <label key={i} className="flex items-center gap-2 text-[14px]">
                <input
                  type="radio"
                  name="educationLevel"
                  value={`Elementary (${option})`}
                  checked={formData.educationalInfo?.education_information === `Elementary (${option})`}
                  onChange={handleChange('education_information')}
                  className="accent-blue-600"
                />
                {option}
              </label>
            ))}
          </div>
        </span>

        {/* Junior High */}
        <span className="col-span-2 border-1 flex flex-col items-center">
          <label className="font-semibold mb-2">Junior High</label>
          <div className="grid grid-cols-3 gap-3">
            {junior.map((option, i) => (
              <label key={i} className="flex items-center gap-2 text-[14px]">
                <input
                  type="radio"
                  name="educationLevel"
                  value={`Junior High (${option})`}
                  checked={formData.educationalInfo?.education_information === `Junior High (${option})`}
                  onChange={handleChange('education_information')}
                  className="accent-blue-600"
                />
                {option}
              </label>
            ))}
          </div>
        </span>

        {/* Senior High */}
        <span className="col-span-2 border-1 flex flex-col items-center">
          <label className="font-semibold mb-2">Senior High</label>
          <div className="flex gap-3">
            {senior.map((option, i) => (
              <label key={i} className="flex items-center gap-2 text-[14px]">
                <input
                  type="radio"
                  name="educationLevel"
                  value={`Senior High (${option})`}
                  checked={formData.educationalInfo?.education_information === `Senior High (${option})`}
                  onChange={handleChange('education_information')}
                  className="accent-blue-600"
                />
                {option}
              </label>
            ))}
          </div>
        </span>
      </div>

      {/* OSY Section */}
      <div className="w-full flex flex-col items-start mt-2 border-1 p-3">
        <p className="font-semibold text-[16px] mb-2">
          Why did you not attend/complete schooling (For OSY only)
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {osy.map((reason, i) => (
            <label key={i} className="flex items-center gap-2 text-[16px]">
              <input
                type="radio"
                name="OSY"
                value={reason}
                checked={
                  reason === 'Other'
                    ? !(formData.educationalInfo?.OSY ?? '') || !osy.includes(formData.educationalInfo?.OSY ?? '')
                    : formData.educationalInfo?.OSY === reason
                }

                onChange={(e) => {
                  if (e.target.value === 'Other') {
                    setFormData(prev => ({
                      ...prev,
                      educationalInfo: {
                        ...prev.educationalInfo!,
                        OSY: '',
                      },
                    }));
                  } else {
                    handleChange('OSY')(e);
                  }
                }}
                className="accent-blue-600"
              />
              {reason}
            </label>
          ))}
        </div>

        {/* Show textbox only if "Other" is selected */}
        {!(osy.includes(formData.educationalInfo?.OSY ?? '')) && (
          <input
            type="text"
            placeholder="Please specify other reason"
            value={formData.educationalInfo?.OSY ?? ''}
            onChange={handleChange('OSY')}
            className="mt-3 border border-gray-400 rounded-md p-2 w-full text-[14px]"
          />
        )}

      </div>

      {/* ALS Section */}
      <div className="w-full flex flex-col items-start mt-2 border-1 p-3">
        <p className="font-semibold text-[16px] mb-2">Have you attended ALS learning sessions before?</p>
        <div className="flex gap-5 text-[16px]">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="alsAttendedMain"
              value="Yes"
              checked={formData.educationalInfo?.attended === 'Yes'}
              onChange={(e) =>
                setFormData(prev => ({
                  ...prev,
                  educationalInfo: {
                    ...prev.educationalInfo!,
                    attended: e.target.value,
                    als_attended: '',
                    complete_program: '',
                    incomplete_reason: '',
                  },
                }))
              }
              className="accent-blue-600"
            />
            Yes
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="alsAttendedMain"
              value="No"
              checked={formData.educationalInfo?.attended === 'No'}
              onChange={(e) =>
                setFormData(prev => ({
                  ...prev,
                  educationalInfo: {
                    ...prev.educationalInfo!,
                    attended: e.target.value,
                    als_attended: '',
                    complete_program: '',
                    incomplete_reason: '',
                  },
                }))
              }
              className="accent-blue-600"
            />
            No
          </label>
        </div>

        {formData.educationalInfo?.attended === 'Yes' && (
          <div className="mt-3 w-full">
            <p className="font-semibold text-[16px] mb-2">If Yes, check the appropriate program</p>
            <div className="sm:grid sm:grid-cols-2 gap-3">
              {program.map((p, i) => (
                <label key={i} className="flex items-center gap-2 text-[16px]">
                  <input
                    type="radio"
                    name="alsProgram"
                    value={p}
                    checked={formData.educationalInfo?.als_attended === p}
                    onChange={handleChange('als_attended')}
                    className="accent-blue-600"
                  />
                  {p}
                </label>
              ))}
            </div>

            {/* ALS Completion Question */}
            <div className="mt-5">
              <p className="font-semibold text-[16px] mb-2">Have you completed the program?</p>
              <div className="flex justify-center sm:justify-start gap-5 text-[16px]">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="completeProgram"
                    value="Yes"
                    checked={formData.educationalInfo?.complete_program === 'Yes'}
                    onChange={(e) => {
                      const newComplete = e.target.value;
                      setFormData(prev => ({
                        ...prev,
                        educationalInfo: {
                          ...prev.educationalInfo!,
                          complete_program: newComplete,
                          program_status: newComplete === 'Yes' ? 'YES' : prev.educationalInfo!.incomplete_reason || '',
                        },
                      }));
                    }}
                    className="accent-blue-600"
                  />
                  Yes
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="completeProgram"
                    value="No"
                    checked={formData.educationalInfo?.complete_program === 'No'}
                    onChange={(e) => {
                      const newComplete = e.target.value;
                      setFormData(prev => ({
                        ...prev,
                        educationalInfo: {
                          ...prev.educationalInfo!,
                          complete_program: newComplete,
                          program_status: newComplete === 'Yes' ? 'YES' : prev.educationalInfo!.incomplete_reason || '',
                        },
                      }));
                    }}
                    className="accent-blue-600"
                  />
                  No
                </label>
              </div>

              {formData.educationalInfo?.complete_program === 'No' && (
                <input
                  type="text"
                  placeholder="Please state the reason"
                  value={formData.educationalInfo?.incomplete_reason || ''}
                  onChange={handleChange('incomplete_reason')}
                  className="mt-3 border border-gray-400 rounded-md p-2 w-full text-[14px]"
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
