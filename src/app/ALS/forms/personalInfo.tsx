'use client';
import React, { useEffect } from 'react'
import { Poppins } from 'next/font/google';
import { ALSFormData} from '@/app/ALS/page';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "700", "900"],
  style: ["normal", "italic"],
});

interface PersonalInfo {
  email?: string;
  date?: string;
  lrn?: string;
  lname?: string;
  fname?: string;
  mname?: string;
  ename?: string;
  cn?: string;
  birthdate?: string;
  age?: number;
  sex?: string;
  birthplace?: string;
  religion?: string;
  motherTongue?: string;
  civilStatus?: string;
  selectIP?: 'Yes' | 'No' | '';
  indigenousPeople?: string;
  select4PS?: 'Yes' | 'No';
  fourPS?: string;
  houseNumber?: string;
  streetName?: string;
  barangay?: string;
  municipality?: string;
  province?: string;
  country?: string;
  zipCode?: string;
  selectAddress?: 'Yes' | 'No';
  pHN?: string;
  pSN?: string;
  pbrgy?: string;
  pMunicipal?: string;
  pProvince?: string;
  pCountry?: string;
  pZipCode?: string;
};

interface PersonalInfoProps {
  formData: ALSFormData;
  setFormData: React.Dispatch<React.SetStateAction<ALSFormData>>;
}

export default function PersonalInfo({ formData, setFormData }: PersonalInfoProps) {

    useEffect(() => {
    setFormData(prev => {
            if (!prev.personalInfo?.date) {
                return {
                    ...prev,
                    personalInfo: {
                        ...prev.personalInfo,
                        date: new Date().toISOString().split("T")[0],
                    },
                };
            }
            return prev;
        });
    }, [setFormData]); 



    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
        ...formData,
        personalInfo: { ...formData.personalInfo, [field]: e.target.value },
        });
    };


  return (
    <div className='w-full flex flex-col sm:w-1/2 text-black sm:text-lg gap-5 m-2 sm:p-5'>
        <header className={`${poppins.className} sm:grid sm:grid-cols-2 text-[clamp(0.8rem,2vw,1.2rem)] bg-gray-100 shadow-gray-400 shadow-lg rounded-lg flex flex-col gap-5 p-5`}>
            <span className='col-span-2'>
                <p className='text-[clamp(0.8rem,2vw,1.2rem)] font-bold'>Email:</p>
                <input 
                    className='text-[clamp(0.8rem,2vw,1.2rem)] sm:text-[14px] font-medium border-0 focus:outline-none border-b w-full'
                    type="email" 
                    value={formData.personalInfo?.email || ''}
                    onChange={handleChange('email')}
                />
            </span>    
            <span>
                <p className='text-[clamp(0.8rem,2vw,1.2rem)] font-bold'>Date</p>
                <input 
                    className='text-[clamp(0.8rem,2vw,1.2rem)] sm:text-[14px] font-medium border-0 focus:outline-none border-b w-full'
                    type="date" 
                    value={formData.personalInfo?.date || ''}
                    readOnly
                    onChange={handleChange('date')}
                />
            </span>

            <span>
                <p className='text-[clamp(0.8rem,2vw,1.2rem)] font-bold'>LRN Number</p>
                <input 
                    className='text-[clamp(0.8rem,2vw,1.2rem)] sm:text-[14px] font-medium border-0 focus:outline-none border-b w-full'
                    type="number" 
                    value={formData.personalInfo.lrn}
                    onChange={handleChange('lrn')}
                />
            </span>
        </header>

        <div className='flex flex-col gap-2 font-medium bg-gray-100 rounded-lg p-5 shadow-gray-400 shadow-lg'>
            
            {/* FIRST NAME, LAST NAME, MIDDLE NAME */}
            <span className='grid grid-cols-2 sm:grid-cols-3 gap-2'>
                <label className={`${poppins.className} text-[12px] sm:text-[16px] col-span-1 italic text-gray-500`}>Last Name:</label>
                <input 
                    type="text" 
                    className={`${poppins.className} text-[12px] sm:text-[16px] col-span-2 font-medium border-0 focus:outline-none border-b w-full`} 
                    value={formData.personalInfo.lname}
                    onChange={handleChange('lname')}
                />
            </span>
            <span className='grid grid-cols-2 sm:grid-cols-3 gap-2'>
                <label className={`${poppins.className} text-[12px] sm:text-[16px] col-span-1 italic text-gray-500`}>First Name:</label>
                <input 
                    type="text" 
                    className={`${poppins.className} text-[12px] sm:text-[16px] col-span-2 font-medium border-0 focus:outline-none border-b w-full`} 
                    value={formData.personalInfo.fname}
                    onChange={handleChange('fname')}
                />
            </span>
            <span className='grid grid-cols-2 sm:grid-cols-3 gap-2'>
                <label className={`${poppins.className} text-[12px] sm:text-[16px] col-span-1 italic text-gray-500`}>Middle Name:</label>
                <input 
                    type="text" 
                    className={`${poppins.className} text-[12px] sm:text-[16px] col-span-2 font-medium border-0 focus:outline-none border-b w-full`} 
                    value={formData.personalInfo.mname}
                    onChange={handleChange('mname')}
                />
            </span>
            <span className='grid grid-cols-2 sm:grid-cols-3 gap-2'>
                <label className={`${poppins.className} text-[12px] sm:text-[16px] col-span-1 italic text-gray-500`}>Suffix:</label>
                <input 
                    type="text" 
                    className={`${poppins.className} text-[12px] sm:text-[16px] col-span-2 font-medium border-0 focus:outline-none border-b w-full`} 
                    value={formData.personalInfo.ename}
                    onChange={handleChange('ename')}
                />
            </span>
            <span className='grid grid-cols-2 sm:grid-cols-3 gap-2'>
                <label className={`${poppins.className} text-[12px] sm:text-[16px] col-span-1 italic text-gray-500`}>Contact Number:</label>
                <input 
                    type="text" 
                    className={`${poppins.className} text-[12px] sm:text-[16px] col-span-2 font-medium border-0 focus:outline-none border-b w-full`} 
                    value={formData.personalInfo.cn}
                    onChange={handleChange('cn')}
                />
            </span>


           
            {/* BIRTHDATE, AGE, SEX */}
            <span className='grid grid-cols-2 sm:grid-cols-3 gap-2'>
                <label className={`${poppins.className} text-[12px] sm:text-[16px] col-span-1 italic text-gray-500`}>Birthdate:</label>
                <input 
                    type="date" 
                    className={`${poppins.className} text-[12px] sm:text-[16px] col-span-2 font-medium border-0 focus:outline-none border-b w-full`} 
                    value={formData.personalInfo.bday}
                    onChange={handleChange('bday')}
                />
            </span>
            <div className='grid grid-cols-2 gap-10 sm:flex sm:flex-col sm:gap-2'>
                <span className='grid grid-cols-2 sm:grid-cols-3 gap-2'>
                    <label className={`${poppins.className} text-[12px] sm:text-[16px] col-span-1 italic text-gray-500`}>Age:</label>
                    <input 
                        type="number" 
                        className={`${poppins.className} text-[12px] sm:text-[16px] col-span-2 font-medium border-0 focus:outline-none border-b w-full`} 
                        value={formData.personalInfo.age ?? ''}
                        onChange={handleChange('age')}
                    />
                </span>
                <span className='grid grid-cols-2 sm:grid-cols-3 gap-2'>
                    <label className={`${poppins.className} text-[12px] sm:text-[16px] col-span-1 italic text-gray-500`}>Sex:</label>
                    <span className={`${poppins.className} text-[12px] sm:text-[16px] col-span-2 font-medium border-0 focus:outline-none flex gap-2 items-center `}>
                        <input 
                            type="radio" name="sex" 
                            className='accent-blue-700' 
                            value="Male"
                            checked={formData.personalInfo.sex === "Male"}
                            onChange={handleChange('sex')}
                        /> Male
                        <input 
                            type="radio" 
                            name="sex" 
                            className='accent-blue-700'
                            value="Female"
                            checked={formData.personalInfo.sex === "Female"}
                            onChange={handleChange('sex')}
                        /> Female
                    </span>
                </span>
            </div>

            {/* PLACE OF BIRTH, RELIGION, MOTHER TONGUE */}
            <span className='grid grid-cols-2 sm:grid-cols-3 gap-2'>
                <label className={`${poppins.className} text-[12px] sm:text-[16px] col-span-1 italic text-gray-500`}>Place of Birth:</label>
                <input 
                    type="text" 
                    className={`${poppins.className} text-[12px] sm:text-[16px] col-span-2 font-medium border-0 focus:outline-none border-b w-full`} 
                    value={formData.personalInfo.birthplace}
                    onChange={handleChange('birthplace')}
                />
            </span>
            <span className='grid grid-cols-2 sm:grid-cols-3 gap-2'>
                <label className={`${poppins.className} text-[12px] sm:text-[16px] col-span-1 italic text-gray-500`}>Religion:</label>
                <input
                    type="text"
                    className={`${poppins.className} text-[12px] sm:text-[16px] col-span-2 font-medium border-0 focus:outline-none border-b w-full`}
                    value={formData.personalInfo.religion}
                    onChange={handleChange('religion')}
                />
            </span>
            <span className='grid grid-cols-2 sm:grid-cols-3 gap-2'>
                <label className={`${poppins.className} text-[12px] sm:text-[16px] col-span-1 italic text-gray-500`}>Mother Tongue:</label>
                <input 
                    type="text" 
                    className={`${poppins.className} text-[12px] sm:text-[16px] col-span-2 font-medium border-0 focus:outline-none border-b w-full`} 
                    value={formData.personalInfo.motherTongue}
                    onChange={handleChange('motherTongue')}    
                />
            </span>

            <span className='grid grid-cols-2 sm:grid-cols-3 gap-2'>
                <label className={`${poppins.className} text-[12px] sm:text-[16px] col-span-1 italic text-gray-500`}>Civil Status:</label>
                <select 
                    className={`${poppins.className} text-[12px] sm:text-[16px] col-span-2 font-medium border-0 focus:outline-none border-b w-full`} 
                    value={formData.personalInfo.civilStatus} 
                    onChange={(e) =>
                        setFormData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, civilStatus: e.target.value },
                        }))
                    }
                >
                        <option value="" disabled>Select Civil Status</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Separated">Separated</option>
                        <option value="Divorced">Solo Parent</option>
                        <option value="Widowed">Widow/er</option>
                </select>
            </span>

            {/* BELONG TO ANY INDIGENOUS PEOPLE */}
            <span className='grid grid-cols-4 sm:grid-cols-3 gap-2'>
                <label className={`${poppins.className} text-[12px] sm:text-[14px] col-span-4 italic text-gray-500`}>Belong to any Indigenous People Community/Indigenous Cultural Community?</label>
                <div className='flex flex-row col-span-5 justify-around'>
                    <span className='flex gap-2'>
                        <input 
                            type="radio" 
                            name="IP" 
                            className='accent-blue-700 text-sm' 
                            value="Yes"
                            checked={formData.personalInfo?.selectIP === 'Yes'}
                            onChange={(a) => {
                                setFormData({
                                    ...formData,
                                    personalInfo: {
                                        ...formData.personalInfo,
                                        selectIP: a.target.value,
                                        indigenousPeople: formData.personalInfo.indigenousPeople || '',      
                                    },
                                });
                            }}
                        />
                        <label className={`${poppins.className} text-[12px] sm:text-[16px] font-medium`}>Yes</label>
                    </span>
                    <span className='flex gap-2'>
                        <input 
                            type="radio" 
                            name="IP" 
                            className='accent-blue-700 text-sm' 
                            value="No"
                            checked={formData.personalInfo.selectIP === 'No'}
                            onChange={(a) => {
                                setFormData({
                                    ...formData,
                                    personalInfo: {
                                        ...formData.personalInfo,
                                        selectIP: a.target.value as 'Yes' | 'No',   
                                        indigenousPeople: 'No',      
                                    },
                                });
                            }}
                        />
                        <label className={`${poppins.className} text-[12px] sm:text-[16px] font-medium`}>No</label>
                    </span>
                </div>
                
                {formData.personalInfo.selectIP === 'Yes' && (
                    <div className='col-span-5 grid grid-cols-3 border border-gray-400 p-2 rounded-lg'>
                        <label className={`${poppins.className} text-[12px] sm:text-[14px] col-span-2 sm:col-span-1 italic text-gray-500`}>Please Specify:</label>
                        <input 
                            type='text' 
                            className={`${poppins.className} text-[12px] sm:text-[16px] col-span-3 sm:col-span-2 font-medium border-0 focus:outline-none border-b w-full`} 
                            value={formData.personalInfo.indigenousPeople || ''}
                            onChange={(a) => setFormData({
                                ...formData,
                                personalInfo: { 
                                    ...formData.personalInfo, 
                                    indigenousPeople: a.target.value 
                                }
                            })}
                        />
                    </div>
                )}
            </span>

            {/* 4PS */}
            <span className='grid grid-cols-4 sm:grid-cols-3 gap-2'>
                <label className={`${poppins.className} text-[12px] sm:text-[14px] col-span-4 italic text-gray-500`}>Is your family a beneficiary of 4Ps?</label>
                <div className='flex flex-row col-span-5 justify-around'>
                    <span className='flex gap-2'>
                        <input 
                            type="radio" 
                            name="4ps" 
                            className='accent-blue-700 text-sm' 
                            value="Yes" 
                            checked={formData.personalInfo.select4PS === 'Yes'} 
                            onChange={(b) =>
                                setFormData({
                                    ...formData,
                                    personalInfo: {
                                        ...formData.personalInfo,
                                        select4PS: b.target.value as 'Yes' | 'No',
                                        fourPS: formData.personalInfo.fourPS || '',
                                    },
                                })
                            }
                        />
                        <label className={`${poppins.className} text-[12px] sm:text-[16px] font-medium`}>Yes</label>
                    </span>
                    <span className='flex gap-2'>
                        <input 
                            type="radio" 
                            name="4ps" 
                            className='accent-blue-700 text-sm' 
                            value="No" 
                            checked={formData.personalInfo.select4PS === 'No'} 
                            onChange={(b) =>{
                                setFormData({
                                    ...formData,
                                    personalInfo: {
                                        ...formData.personalInfo,
                                        select4PS: b.target.value as 'Yes' | 'No',
                                        fourPS: 'No',      
                                    },
                                });
                            }}
                        />
                        <label className={`${poppins.className} text-[12px] sm:text-[16px] font-medium`}>No</label>
                    </span>
                </div>
                {formData.personalInfo.select4PS === 'Yes' && (
                    <div className='col-span-5 grid grid-cols-3 border border-gray-400 p-2 rounded-lg'>
                        <label className={`${poppins.className} text-[12px] sm:text-[14px] col-span-2 italic text-gray-500`}>Please write the 4Ps Household ID Number:</label>
                        <input 
                            type='number' 
                            className={`${poppins.className} text-[12px] sm:text-[16px] col-span-3
                             font-medium border-0 focus:outline-none border-b w-full`} 
                            value={formData.personalInfo.fourPS || ''}
                            onChange={(b) => setFormData({
                                ...formData,
                                personalInfo: { 
                                    ...formData.personalInfo, 
                                    fourPS: b.target.value 
                                }
                            })}
                        />
                    </div>
                )}
            </span>

            {/* CURRENT ADDRESS */}
            <div className='flex flex-col gap-2 mt-4 sm:grid sm:grid-cols-3 sm:gap-3 sm:mt-5'>
                <label className={`${poppins.className} col-span-3 font-bold`}>CURRENT ADDRESS</label>
                <span className='sm:grid sm:grid-cols-2 gap-2'>
                    <label className={`${poppins.className} text-[12px] sm:text-[16px] col-span-1 italic text-gray-500`}>House No.</label>
                    <input 
                        type="text" 
                        className={`${poppins.className} text-[12px] sm:text-[16px] col-span-3 font-medium border-0 focus:outline-none border-b w-full`} 
                        value={formData.personalInfo.houseNumber}
                        onChange={handleChange('houseNumber')}
                    />
                </span>
                <span className='sm:grid sm:grid-cols-2 gap-2'>
                    <label className={`${poppins.className} text-[12px] sm:text-[16px] col-span-4 italic text-gray-500`}>Sitio/Street Name:</label>
                    <input 
                        type="text" 
                        className={`${poppins.className} text-[12px] sm:text-[16px] col-span-3 font-medium border-0 focus:outline-none border-b w-full`} 
                        value={formData.personalInfo.streetName}
                        onChange={handleChange('streetName')}
                    />
                </span>
                <span className='sm:grid sm:grid-cols-2 gap-2'>
                    <label className={`${poppins.className} text-[12px] sm:text-[16px] col-span-4 italic text-gray-500`}>Barangay:</label>
                    <input 
                        type="text" 
                        className={`${poppins.className} text-[12px] sm:text-[16px] col-span-3 font-medium border-0 focus:outline-none border-b w-full`} 
                        value={formData.personalInfo.barangay}
                        onChange={handleChange('barangay')}
                    />
                </span>
                
                <div className='flex flex-col gap-2 sm:col-span-3 sm:grid sm:grid-cols-4 sm:gap-3'>
                    <span className='sm:grid sm:grid-cols-2 gap-2'>
                        <label className={`${poppins.className} text-[12px] sm:text-[16px] sm:col-span-1 italic text-gray-500`}>Municipality/City:</label>
                        <input 
                            type="text" 
                            className={`${poppins.className} text-[12px] sm:text-[16px] sm:col-span-3 font-medium border-0 focus:outline-none border-b w-full`} 
                            value={formData.personalInfo.municipality}
                            onChange={handleChange('municipality')}
                        />
                    </span>
                    <span className='sm:grid sm:grid-cols-2 gap-2'>
                        <label className={`${poppins.className} text-[12px] sm:text-[16px] sm:col-span-2 italic text-gray-500`}>Province:</label>
                        <input 
                            type="text" 
                            className={`${poppins.className} text-[12px] sm:text-[16px] sm:col-span-3 font-medium border-0 focus:outline-none border-b w-full`} 
                            value={formData.personalInfo.province}
                            onChange={handleChange('province')}
                        />
                    </span>
                    <span className='sm:grid sm:grid-cols-2 gap-2'>
                        <label className={`${poppins.className} text-[12px] sm:text-[16px] sm:col-span-3 italic text-gray-500`}>Country:</label>
                        <input 
                            type="text" 
                            className={`${poppins.className} text-[12px] sm:text-[16px] sm:col-span-3 font-medium border-0 focus:outline-none border-b w-full`} 
                            value={formData.personalInfo.country}
                            onChange={handleChange('country')}
                        />
                    </span>
                    <span className='sm:grid sm:grid-cols-2 gap-2'>
                        <label className={`${poppins.className} text-[12px] sm:text-[16px] sm:col-span-4 italic text-gray-500`}>Zip Code:</label>
                        <input 
                            type="text" 
                            className={`${poppins.className} text-[12px] sm:text-[16px] sm:col-span-4 font-medium border-0 focus:outline-none border-b w-full`} 
                            value={formData.personalInfo.zipCode}
                            onChange={handleChange('zipCode')}
                        />
                    </span>
                </div>
                <div className='col-span-3 grid grid-cols-2'>
                    <label className={`${poppins.className} col-span-3 font-bold`}>PERMAMENT ADDRESS</label>
                    <label className={`${poppins.className} text-[12px] col-span-3 sm:text-[16px] italic text-gray-500`}>Same with your Current Address?</label>
                    <div className='flex flex-row col-span-5 justify-around'>
                        <span className='flex gap-2'>
                            <input 
                                type="radio" 
                                name="address" 
                                className='accent-blue-700 text-sm' 
                                value="Yes"
                                checked={formData.personalInfo.selectAddress === 'Yes'}
                                onChange={(c) =>{
                                    setFormData({
                                        ...formData,
                                        personalInfo: {
                                            ...formData.personalInfo,
                                            selectAddress: c.target.value as 'Yes' | 'No',  
                                            pHN: formData.personalInfo.houseNumber || '',
                                            pSN: formData.personalInfo.streetName || '',
                                            pbrgy: formData.personalInfo.barangay || '',
                                            pMunicipal: formData.personalInfo.municipality || '',
                                            pProvince: formData.personalInfo.province || '',
                                            pCountry: formData.personalInfo.country || '',
                                            pZipCode: formData.personalInfo.zipCode || '',
                                        },
                                    });
                                }}
                            />
                            <label className={`${poppins.className} text-[12px] sm:text-[16px] font-medium`}>Yes</label>
                        </span>
                        <span className='flex gap-2'>
                            <input 
                                type="radio" 
                                name="address" className='accent-blue-700 text-sm' 
                                value="No" 
                                checked={formData.personalInfo.selectAddress === 'No'} 
                                onChange={(c) => {
                                    setFormData({
                                        ...formData,
                                        personalInfo: {
                                            ...formData.personalInfo,
                                            selectAddress: c.target.value as 'Yes' | 'No',
                                            pHN: formData.personalInfo.pHN || '', 
                                            pSN: formData.personalInfo.pSN || '', 
                                            pbrgy: formData.personalInfo.pbrgy || '', 
                                            pMunicipal: formData.personalInfo.pMunicipal || '', 
                                            pProvince: formData.personalInfo.pProvince || '', 
                                            pCountry: formData.personalInfo.pCountry || '', 
                                            pZipCode: formData.personalInfo.pZipCode || '',    
                                        },
                                    });
                                    }
                                }
                            />
                            <label className={`${poppins.className} text-[12px] sm:text-[16px] font-medium`}>No</label>
                        </span>
                    </div>


                    {/* NOT PERMAMENT ADDRESS */}
                    {formData.personalInfo.selectAddress === 'No' && (
                        <div className='col-span-3 flex flex-col gap-2 mt-4 border border-gray-500 p-2 rounded-lg sm:grid sm:grid-cols-3 sm:gap-3 sm:mt-5'>
                            <span className='sm:grid sm:grid-cols-2 gap-2'>
                                <label className={`${poppins.className} text-[12px] sm:text-[16px] col-span-1 italic text-gray-500`}>House No.</label>
                                <input 
                                    type="text" 
                                    className={`${poppins.className} text-[12px] sm:text-[16px] col-span-3 font-medium border-0 focus:outline-none border-b w-full`} 
                                    value={formData.personalInfo.pHN}
                                    onChange={handleChange('pHN')}
                                />
                            </span>
                            <span className='sm:grid sm:grid-cols-2 gap-2'>
                                <label className={`${poppins.className} text-[12px] sm:text-[16px] col-span-4 italic text-gray-500`}>Sitio/Street Name:</label>
                                <input 
                                    type="text" 
                                    className={`${poppins.className} text-[12px] sm:text-[16px] col-span-3 font-medium border-0 focus:outline-none border-b w-full`} 
                                    value={formData.personalInfo.pSN}
                                    onChange={handleChange('pSN')}
                                />
                            </span>
                            <span className='sm:grid sm:grid-cols-2 gap-2'>
                                <label className={`${poppins.className} text-[12px] sm:text-[16px] col-span-4 italic text-gray-500`}>Barangay:</label>
                                <input 
                                    type="text" 
                                    className={`${poppins.className} text-[12px] sm:text-[16px] col-span-3 font-medium border-0 focus:outline-none border-b w-full`}
                                    value={formData.personalInfo.pbrgy}
                                    onChange={handleChange('pbrgy')}
                                />
                            </span>
                            
                            <div className='flex flex-col gap-2 sm:col-span-3 sm:grid sm:grid-cols-4 sm:gap-3'>
                                <span className='sm:grid sm:grid-cols-2 gap-2'>
                                    <label className={`${poppins.className} text-[12px] sm:text-[16px] sm:col-span-1 italic text-gray-500`}>Municipality/City:</label>
                                    <input 
                                        type="text" 
                                        className={`${poppins.className} text-[12px] sm:text-[16px] sm:col-span-3 font-medium border-0 focus:outline-none border-b w-full`} 
                                        value={formData.personalInfo.pMunicipal}
                                        onChange={handleChange('pMunicipal')}
                                    />
                                </span>
                                <span className='sm:grid sm:grid-cols-2 gap-2'>
                                    <label className={`${poppins.className} text-[12px] sm:text-[16px] sm:col-span-2 italic text-gray-500`}>Province:</label>
                                    <input 
                                        type="text" 
                                        className={`${poppins.className} text-[12px] sm:text-[16px] sm:col-span-3 font-medium border-0 focus:outline-none border-b w-full`} 
                                        value={formData.personalInfo.pProvince}
                                        onChange={handleChange('pProvince')}
                                    />
                                </span>
                                <span className='sm:grid sm:grid-cols-2 gap-2'>
                                    <label className={`${poppins.className} text-[12px] sm:text-[16px] sm:col-span-3 italic text-gray-500`}>Country:</label>
                                    <input 
                                        type="text" 
                                        className={`${poppins.className} text-[12px] sm:text-[16px] sm:col-span-3 font-medium border-0 focus:outline-none border-b w-full`} 
                                        value={formData.personalInfo.pCountry}
                                        onChange={handleChange('pCountry')}
                                    />
                                </span>
                                <span className='sm:grid sm:grid-cols-2 gap-2'>
                                    <label className={`${poppins.className} text-[12px] sm:text-[16px] sm:col-span-4 italic text-gray-500`}>Zip Code:</label>
                                    <input 
                                        type="text" 
                                        className={`${poppins.className} text-[12px] sm:text-[16px] sm:col-span-4 font-medium border-0 focus:outline-none border-b w-full`} 
                                        value={formData.personalInfo.pZipCode}
                                        onChange={handleChange('pZipCode')}
                                    />
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}
