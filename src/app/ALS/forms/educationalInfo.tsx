'use client';
import React, { useEffect } from 'react';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['200', '400', '700', '900'],
  style: ['normal', 'italic'],
});

interface PWDInfoProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export default function EducationalInfo({ formData, setFormData }: PWDInfoProps) {
  useEffect(() => {
    if (!formData.educationalInfo) {
      setFormData({
        ...formData,
        educationalInfo: {
          education_information: '',
          OSY: '',
          als_attended: '',
          complete_program: '',
          incomplete_reason: '',
          program_status: '',
        },
      });
    }
  }, []);

  const handleChange = (category: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      educationalInfo: {
        ...formData.educationalInfo,
        [category]: value,
      },
    });
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
    <div className="w-full sm:w-1/2 m-5 flex flex-col gap-4 sm:gap-5 p-3 justify-between items-center text-black bg-gray-100 shadow-gray-400 shadow-lg">
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
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      educationalInfo: {
                        ...formData.educationalInfo,
                        education_information: e.target.value,
                      },
                    })
                  }
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
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      educationalInfo: {
                        ...formData.educationalInfo,
                        education_information: e.target.value,
                      },
                    })
                  }
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
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      educationalInfo: {
                        ...formData.educationalInfo,
                        education_information: e.target.value,
                      },
                    })
                  }
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
                reason === "Other"
                ? !osy.includes(formData.educationalInfo?.OSY)
                : formData.educationalInfo?.OSY === reason
            }
            onChange={(e) => {
                if (e.target.value === "Other") {
                // Clear the OSY field for new input
                setFormData({
                    ...formData,
                    educationalInfo: {
                    ...formData.educationalInfo,
                    OSY: "",
                    },
                });
                } else {
                setFormData({
                    ...formData,
                    educationalInfo: {
                    ...formData.educationalInfo,
                    OSY: e.target.value,
                    },
                });
                }
            }}
            className="accent-blue-600"
            />
            {reason}
        </label>
        ))}
    </div>

    {/* Show textbox only if "Other" is selected */}
    {!osy.includes(formData.educationalInfo?.OSY) && (
        <input
        type="text"
        placeholder="Please specify other reason"
        value={formData.educationalInfo?.OSY}
        onChange={(e) =>
            setFormData({
            ...formData,
            educationalInfo: {
                ...formData.educationalInfo,
                OSY: e.target.value,
            },
            })
        }
        className="mt-3 border border-gray-400 rounded-md p-2 w-full text-[14px]"
        />
    )}
    </div>


      {/* ALS Section */}
<div className="w-full flex flex-col items-start mt-2 border-1 p-3">
  <p className="font-semibold text-[16px] mb-2">
    Have you attended ALS learning sessions before?
  </p>
  <div className="flex gap-5 text-[16px]">
    <label className="flex items-center gap-2">
      <input
        type="radio"
        name="alsAttendedMain"
        value="Yes"
        checked={formData.educationalInfo?.alsAttended === 'Yes'}
        onChange={(e) =>
          setFormData({
            ...formData,
            educationalInfo: {
              ...formData.educationalInfo,
              alsAttended: e.target.value,
              alsProgram: '', // reset program when toggling Yes/No
              complete_program: '', // reset completion info
            },
          })
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
        checked={formData.educationalInfo?.alsAttended === 'No'}
        onChange={(e) =>
          setFormData({
            ...formData,
            educationalInfo: {
              ...formData.educationalInfo,
              alsAttended: e.target.value,
              alsProgram: '',
              complete_program: '',
            },
          })
        }
        className="accent-blue-600"
      />
      No
    </label>
  </div>

  {/* Show ALS program options only if Yes */}
  {formData.educationalInfo?.alsAttended === 'Yes' && (
    <div className="mt-3 w-full">
      <p className="font-semibold text-[16px] mb-2">
        If Yes, check the appropriate program
      </p>
      <div className="sm:grid sm:grid-cols-2 gap-3">
        {program.map((p, i) => (
          <label key={i} className="flex items-center gap-2 text-[16px]">
            <input
              type="radio"
              name="alsProgram"
              value={p}
              checked={formData.educationalInfo?.als_attended === p}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  educationalInfo: {
                    ...formData.educationalInfo,
                    als_attended: e.target.value, // store program in als_attended
                  },
                })
              }
              className="accent-blue-600"
            />
            {p}
          </label>
        ))}
      </div>

      {/* ALS Completion Question */}
      <div className="mt-5">
        <p className="font-semibold text-[16px] mb-2">
          Have you completed the program?
        </p>
        <div className="flex justify-center sm:justify-start gap-5 text-[16px]">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="completeProgram"
              value="Yes"
              checked={formData.educationalInfo?.complete_program === 'Yes'}
              onChange={(e) => {
                const newComplete = e.target.value;
                const newIncomplete = formData.educationalInfo?.incomplete_reason || '';
                setFormData({
                  ...formData,
                  educationalInfo: {
                    ...formData.educationalInfo,
                    complete_program: newComplete,
                    incomplete_reason: newIncomplete,
                    program_status: newComplete === 'Yes' ? 'YES' : newIncomplete ? newIncomplete : '',
                  },
                })
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
                    const newIncomplete = formData.educationalInfo?.incomplete_reason || '';
                    setFormData({
                        ...formData,
                        educationalInfo: {
                            ...formData.educationalInfo,
                            complete_program: newComplete,
                            incomplete_reason: newIncomplete,
                            program_status: newComplete === 'Yes' ? 'YES' : newIncomplete ? newIncomplete : '',
                        },
                    })
                }}
                className="accent-blue-600"
            />
            No
        </label>
        </div>

        {/* If No, show reason input */}
        {formData.educationalInfo?.complete_program === 'No' && (
            <input
                type="text"
                placeholder="Please state the reason"
                value={formData.educationalInfo?.incomplete_reason || ''}
                onChange={(e) => {
                    const newIncomplete = e.target.value;
                    const newComplete = formData.educationalInfo?.complete_program || '';
                    setFormData({
                        ...formData,
                        educationalInfo: {
                            ...formData.educationalInfo,
                            incomplete_reason: e.target.value,
                            program_status: newComplete === 'Yes' ? 'YES' : newIncomplete ? newIncomplete : '',
                        },
                    })
                }}
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
