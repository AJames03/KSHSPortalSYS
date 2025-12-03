'use client';
import React, { useState, useEffect } from 'react'
import { Poppins } from 'next/font/google';
import { FormDataType } from '../page';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "700", "900"],
  style: ["normal", "italic"],
});


interface PersonalInfoProps {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
}

export default function PersonalInfo({ formData, setFormData }: PersonalInfoProps) {
    const [regions, setRegions] = useState<{ name: string; code: string }[]>([]);
    const [provinces, setProvinces] = useState<{ name: string; code: string }[]>([]);
    const [cities, setCities] = useState<{ name: string; code: string }[]>([]);
    const [barangays, setBarangays] = useState<{ name: string; code: string }[]>([]);

    useEffect(() => {
        fetch('https://psgc.gitlab.io/api/regions/')
            .then((res) => res.json())
            .then((data) => setRegions(data));
    }, []);

    const handleRegionChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const name = e.target.value;
        const region = regions.find((r) => r.name === name);
        if (!region) return;
        setFormData({
            ...formData,
            personalInfo: {
                ...formData.personalInfo,
                region: name,
                province: '',
                municipality: '',
                barangay: '',
            },
        });
        const res = await fetch(`https://psgc.gitlab.io/api/regions/${region.code}/provinces/`);
        setProvinces(await res.json());
        setCities([]);
        setBarangays([]);
    };

    const handleProvinceChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const name = e.target.value;
        const province = provinces.find((p) => p.name === name);
        if (!province) return;
        setFormData({
            ...formData,
            personalInfo: {
                ...formData.personalInfo,
                province: name,
                municipality: '',
                barangay: '',
            },
        });
        const res = await fetch(`https://psgc.gitlab.io/api/provinces/${province.code}/cities-municipalities/`);
        setCities(await res.json());
        setBarangays([]);
    };

    const handleCityChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const name = e.target.value;
        const city = cities.find((c) => c.name === name);
        if (!city) return;
        setFormData({
            ...formData,
            personalInfo: {
                ...formData.personalInfo,
                municipality: name,
                barangay: '',
            },
        });
        const res = await fetch(`https://psgc.gitlab.io/api/cities-municipalities/${city.code}/barangays/`);
        setBarangays(await res.json());
    };

    const handleBarangayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const brgy = e.target.value;
        setFormData({
            ...formData,
            personalInfo: {
                ...formData.personalInfo,
                barangay: brgy,
            },
        });
    };

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            personalInfo: { ...formData.personalInfo, [field]: e.target.value },
        });
    };


  return (
    <div className=' w-full h-full flex flex-col text-black  sm:text-lg gap-5 p-2 sm:p-5 overflow-auto'>
        <label className={`${poppins.className} text-[clamp(0.8rem,2vw,1.2rem)] font-bold border-b-2`}>
            Learner&apos;s Personal Information
        </label>
        <header className={`${poppins.className} text-[clamp(0.8rem,2vw,1.2rem)] flex flex-col gap-2
            border-2 border-gray-300 p-2 rounded-md focus-within:border-sky-500 transition-colors 
            duration-200`}>
            <p className='text-sky-800 lg:text-[14px]'>PSA Birth Certificate No. (if available upon registration):</p>
            <input 
                className='text-[16px] font-medium border-0 focus:outline-none w-full' 
                type="number" 
                value={formData.personalInfo.psa}
                onChange={handleChange('psa')} 
            />
        </header>

        <div className='flex flex-col gap-2 font-medium '>
            {/* FIRST NAME, LAST NAME, MIDDLE NAME */}
            <div className='flex flex-col gap-2 lg:grid lg:grid-cols-2 lg:gap-2'>
                <span className='flex flex-col border-2 border-gray-300 focus-within:border-sky-500 p-2 rounded-md duration-200'>
                    <label className={`${poppins.className} text-[12px] sm:text-[14px] col-span-1 italic text-gray-500`}>Last Name:</label>
                    <input 
                        type="text" 
                        className={`${poppins.className} text-[12px] sm:text-[16px] col-span-2 font-medium focus:outline-none w-full`} 
                        value={formData.personalInfo.lname}
                        onChange={handleChange('lname')}
                    />
                </span>
                <span className='flex flex-col border-2 border-gray-300 focus-within:border-sky-500 p-2 rounded-md duration-200'>
                    <label className={`${poppins.className} text-[12px] sm:text-[14px] col-span-1 italic text-gray-500`}>First Name:</label>
                    <input 
                        type="text" 
                        className={`${poppins.className} text-[12px] sm:text-[16px] col-span-2 font-medium border-0 focus:outline-none w-full`} 
                        value={formData.personalInfo.fname}
                        onChange={handleChange('fname')}
                    />
                </span>
                <span className='flex flex-col border-2 border-gray-300  focus-within:border-sky-500 p-2 rounded-md duration-200'>
                    <label className={`${poppins.className} text-[12px] sm:text-[14px] col-span-1 italic text-gray-500`}>Middle Name:</label>
                    <input 
                        type="text" 
                        className={`${poppins.className} text-[12px] sm:text-[16px] col-span-2 font-medium border-0 focus:outline-none  w-full`} 
                        value={formData.personalInfo.mname}
                        onChange={handleChange('mname')}
                    />
                </span>

                <span className='flex flex-col border-2 border-gray-300 focus-within:border-sky-500 p-2 rounded-md duration-200'>
                    <label className={`${poppins.className} text-[12px] sm:text-[14px] col-span-1 italic text-gray-500`}>Extension Name:</label>
                    <input 
                        type="text" 
                        className={`${poppins.className} text-[12px] sm:text-[16px] col-span-2 font-medium border-0 focus:outline-none  w-full`} 
                        value={formData.personalInfo.ename}
                        onChange={handleChange('ename')}
                        placeholder='e.g. Jr., III (If Applicable)'
                    />
                </span>
            </div>

           
            {/* BIRTHDATE, AGE, SEX */}
            <div className='flex flex-col gap-2 lg:grid lg:grid-cols-3 lg:gap-2'>
                <span className='flex flex-col border-2 border-gray-300 focus-within:border-sky-500 p-2 rounded-md duration-200'>
                    <label className={`${poppins.className} text-[12px] sm:text-[14px] col-span-1 italic text-gray-500`}>Birthdate:</label>
                    <input
                        type="date"
                        className={`${poppins.className} text-[12px] sm:text-[16px] col-span-2 font-medium border-0 focus:outline-none w-full`}
                        value={formData.personalInfo.bday ? formData.personalInfo.bday : ''}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                personalInfo: {
                                    ...prev.personalInfo,
                                    bday: e.target.value, // e.target.value is always YYYY-MM-DD
                                },
                            }))
                        }
                    />

                </span>
                <span className='flex flex-col border-2 border-gray-300 focus-within:border-sky-500 p-2 rounded-md duration-200'>
                    <label className={`${poppins.className} text-[12px] sm:text-[14px] col-span-1 italic text-gray-500`}>Age:</label>
                    <input 
                        type="number" 
                        className={`${poppins.className} text-[12px] sm:text-[16px] col-span-2 font-medium border-0 focus:outline-none w-full`} 
                        value={formData.personalInfo.age}
                        onChange={handleChange('age')}
                    />
                </span>
                <span className='flex flex-col border-2 border-gray-300 focus-within:border-sky-500 p-2 rounded-md duration-200'>
                    <label className={`${poppins.className} text-[12px] sm:text-[14px] col-span-1 italic text-gray-500`}>Sex:</label>
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
            <div className='flex flex-col gap-2 lg:grid lg:grid-cols-3 lg:gap-2'>
                <span className='flex flex-col border-2 border-gray-300 focus-within:border-sky-500 p-2 rounded-md duration-200'>
                    <label className={`${poppins.className} text-[12px] sm:text-[16px] col-span-1 italic text-gray-500`}>Place of Birth:</label>
                    <input 
                        type="text" 
                        className={`${poppins.className} text-[12px] sm:text-[16px] col-span-2 font-medium border-0 focus:outline-none w-full`} 
                        value={formData.personalInfo.birthplace}
                        onChange={handleChange('birthplace')}
                    />
                </span>
                <span className='flex flex-col border-2 border-gray-300 focus-within:border-sky-500 p-2 rounded-md duration-200'>
                    <label className={`${poppins.className} text-[12px] sm:text-[16px] col-span-1 italic text-gray-500`}>Religion:</label>
                    <input
                        type="text"
                        className={`${poppins.className} text-[12px] sm:text-[16px] col-span-2 font-medium border-0 focus:outline-none w-full`}
                        value={formData.personalInfo.religion}
                        onChange={handleChange('religion')}
                    />
                </span>
                <span className='flex flex-col border-2 border-gray-300 focus-within:border-sky-500 p-2 rounded-md duration-200'>
                    <label className={`${poppins.className} text-[12px] sm:text-[16px] col-span-1 italic text-gray-500`}>Mother Tongue:</label>
                    <input 
                        type="text" 
                        className={`${poppins.className} text-[12px] sm:text-[16px] col-span-2 font-medium border-0 focus:outline-none w-full`} 
                        value={formData.personalInfo.motherTongue}
                        onChange={handleChange('motherTongue')}    
                    />
                </span>
            </div>

            {/* BELONG TO ANY INDIGENOUS PEOPLE */}
            <span className='flex flex-col border-2 border-gray-300 focus-within:border-sky-500 p-2 rounded-md duration-200'>
                <label className={`${poppins.className} text-[12px] sm:text-[14px] col-span-4 italic text-gray-500`}>Belong to any Indigenous People Community/Indigenous Cultural Community?</label>
                <div className='flex flex-row col-span-5 justify-around'>
                    <span className='flex gap-2'>
                        <input 
                            type="radio" 
                            name="IP" 
                            className='accent-blue-700 text-sm' 
                            value="Yes"
                            checked={formData.personalInfo.selectIP === 'Yes'}
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
                                        selectIP: a.target.value,  
                                        indigenousPeople: 'No',      
                                    },
                                });
                            }}
                        />
                        <label className={`${poppins.className} text-[12px] sm:text-[16px] font-medium`}>No</label>
                    </span>
                </div>
                
                {formData.personalInfo.selectIP === 'Yes' && (
                    <div className='flex flex-col border border-gray-400 p-2 rounded-lg focus-within:border-blue-900 duration-500'>
                        <label className={`${poppins.className} text-[12px] sm:text-[14px] col-span-2 sm:col-span-1 italic text-gray-500`}>Please Specify:</label>
                        <input 
                            type='text' 
                            className={`${poppins.className} text-[12px] sm:text-[16px] col-span-3 sm:col-span-2 font-medium border-0 focus:outline-none w-full`} 
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
            <span className='flex flex-col border-2 border-gray-300 focus-within:border-sky-500 p-2 rounded-md duration-200'>
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
                                        select4PS: b.target.value,
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
                                        select4PS: b.target.value,
                                        fourPS: 'No',      
                                    },
                                });
                            }}
                        />
                        <label className={`${poppins.className} text-[12px] sm:text-[16px] font-medium`}>No</label>
                    </span>
                </div>
                {formData.personalInfo.select4PS === 'Yes' && (
                    <div className='flex flex-col border border-gray-400 p-2 rounded-lg focus-within:border-blue-900 duration-500'>
                        <label className={`${poppins.className} text-[12px] sm:text-[14px] col-span-2 italic text-gray-500`}>Please write the 4Ps Household ID Number:</label>
                        <input 
                            type='number' 
                            className={`${poppins.className} text-[12px] sm:text-[16px] col-span-3
                             font-medium border-0 focus:outline-none w-full`} 
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
                <span className='flex flex-col border border-gray-400 p-2 rounded-lg focus-within:border-sky-500 duration-200'>
                    <label className={`${poppins.className} text-[12px] sm:text-[14px] col-span-1 italic text-gray-500`}>House No.</label>
                    <input
                        type="text"
                        className={`${poppins.className} text-[12px] sm:text-[16px] col-span-3 font-medium focus:outline-none w-full`}
                        value={formData.personalInfo.houseNumber}
                        onChange={handleChange('houseNumber')}
                    />
                </span>
                <span className='flex flex-col border border-gray-400 p-2 rounded-lg focus-within:border-sky-500 duration-200'>
                    <label className={`${poppins.className} text-[12px] sm:text-[14px] col-span-4 italic text-gray-500`}>Sitio/Street Name:</label>
                    <input
                        type="text"
                        className={`${poppins.className} text-[12px] sm:text-[16px] col-span-3 font-medium focus:outline-none w-full`}
                        value={formData.personalInfo.streetName}
                        onChange={handleChange('streetName')}
                    />
                </span>
                <span className='flex flex-col border border-gray-400 p-2 rounded-lg focus-within:border-sky-500 duration-200'>
                    <label className={`${poppins.className} text-[12px] sm:text-[14px] col-span-4 italic text-gray-500`}>Region:</label>
                    <select
                        className={`${poppins.className} text-[12px] sm:text-[16px] col-span-3 font-medium focus:outline-none w-full`}
                        value={formData.personalInfo.region}
                        onChange={handleRegionChange}
                    >
                        <option value="">Select Region</option>
                        {regions.map((r: { name: string; code: string }) => (
                            <option key={r.code} value={r.name}>
                                {r.name}
                            </option>
                        ))}
                    </select>
                </span>
                <span className='flex flex-col border border-gray-400 p-2 rounded-lg focus-within:border-sky-500 duration-200'>
                    <label className={`${poppins.className} text-[12px] sm:text-[14px] col-span-4 italic text-gray-500`}>Province:</label>
                    <select
                        className={`${poppins.className} text-[12px] sm:text-[16px] col-span-3 font-medium focus:outline-none w-full`}
                        value={formData.personalInfo.province}
                        onChange={handleProvinceChange}
                    >
                        <option value="">Select Province</option>
                        {provinces.map((p: { name: string; code: string }) => (
                            <option key={p.code} value={p.name}>
                                {p.name}
                            </option>
                        ))}
                    </select>
                </span>
                <span className='flex flex-col border border-gray-400 p-2 rounded-lg focus-within:border-sky-500 duration-200'>
                    <label className={`${poppins.className} text-[12px] sm:text-[14px] col-span-4 italic text-gray-500`}>Municipality/City:</label>
                    <select
                        className={`${poppins.className} text-[12px] sm:text-[16px] col-span-3 font-medium focus:outline-none w-full`}
                        value={formData.personalInfo.municipality}
                        onChange={handleCityChange}
                    >
                        <option value="">Select Municipality/City</option>
                        {cities.map((c: { name: string; code: string }) => (
                            <option key={c.code} value={c.name}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                </span>
                <span className='flex flex-col border border-gray-400 p-2 rounded-lg focus-within:border-sky-500 duration-200'>
                    <label className={`${poppins.className} text-[12px] sm:text-[14px] col-span-4 italic text-gray-500`}>Barangay:</label>
                    <select
                        className={`${poppins.className} text-[12px] sm:text-[16px] col-span-3 font-medium focus:outline-none w-full`}
                        value={formData.personalInfo.barangay}
                        onChange={handleBarangayChange}
                    >
                        <option value="">Select Barangay</option>
                        {barangays.map((b: { name: string; code: string }) => (
                            <option key={b.code} value={b.name}>
                                {b.name}
                            </option>
                        ))}
                    </select>
                </span>
                <span className='flex flex-col border border-gray-400 p-2 rounded-lg focus-within:border-sky-500 duration-200'>
                    <label className={`${poppins.className} text-[12px] sm:text-[14px] col-span-4 italic text-gray-500`}>Zip Code:</label>
                    <input
                        type="text"
                        className={`${poppins.className} text-[12px] sm:text-[16px] col-span-3 font-medium focus:outline-none w-full`}
                        value={formData.personalInfo.zipCode}
                        onChange={handleChange('zipCode')}
                    />
                </span>
                <span className='flex flex-col border border-gray-400 p-2 rounded-lg focus-within:border-sky-500 duration-200'>
                    <label className={`${poppins.className} text-[12px] sm:text-[14px] col-span-4 italic text-gray-500`}>Country:</label>
                    <input
                        type="text"
                        className={`${poppins.className} text-[12px] sm:text-[16px] col-span-3 font-medium focus:outline-none w-full`}
                        value="Philippines"
                        onChange={handleChange('country')}
                        readOnly
                    />
                </span>
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
                                            selectAddress: c.target.value,    
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
                                onChange={(b) => {
                                    setFormData({
                                        ...formData,
                                        personalInfo: {
                                            ...formData.personalInfo,
                                            selectAddress: b.target.value,
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


                    {/* PERMANENT ADDRESS FIELDS */}
                    {formData.personalInfo.selectAddress === 'No' && (
                        <div className='col-span-3 flex flex-col gap-2 mt-4 p-2 rounded-lg sm:grid sm:grid-cols-3 sm:gap-3 sm:mt-5 '>
                        <span className='flex flex-col border border-gray-400 p-2 rounded-lg focus-within:border-sky-500 duration-200'>
                            <label className={`${poppins.className} text-[12px] sm:text-[14px] col-span-1 italic text-gray-500`}>House No.</label>
                            <input
                                type="text"
                                className={`${poppins.className} text-[12px] sm:text-[16px] col-span-3 font-medium border-0 focus:outline-none border-b w-full`}
                                value={formData.personalInfo.pHN}
                                onChange={handleChange('pHN')}
                            />
                        </span>
                        <span className='flex flex-col border border-gray-400 p-2 rounded-lg focus-within:border-sky-500 duration-200'>
                            <label className={`${poppins.className} text-[12px] sm:text-[14px] col-span-4 italic text-gray-500`}>Sitio/Street Name:</label>
                            <input
                                type="text"
                                className={`${poppins.className} text-[12px] sm:text-[16px] col-span-3 font-medium border-0 focus:outline-none border-b w-full`}
                                value={formData.personalInfo.pSN}
                                onChange={handleChange('pSN')}
                            />
                        </span>
                        <span className='flex flex-col border border-gray-400 p-2 rounded-lg focus-within:border-sky-500 duration-200'>
                            <label className={`${poppins.className} text-[12px] sm:text-[14px] col-span-4 italic text-gray-500`}>Region:</label>
                            <select
                                className={`${poppins.className} text-[12px] sm:text-[16px] col-span-3 font-medium border-0 focus:outline-none border-b w-full`}
                                value={formData.personalInfo.pRegion}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                    const name = e.target.value;
                                    const region = regions.find((r) => r.name === name);
                                    if (!region) return;
                                    setFormData({
                                        ...formData,
                                        personalInfo: {
                                            ...formData.personalInfo,
                                            pRegion: name,
                                            pProvince: '',
                                            pMunicipal: '',
                                            pbrgy: '',
                                        },
                                    });
                                    fetch(`https://psgc.gitlab.io/api/regions/${region.code}/provinces/`)
                                        .then(res => res.json())
                                        .then(data => setProvinces(data));
                                }}
                            >
                                <option value="">Select Region</option>
                                {regions.map((r: { name: string; code: string }) => (
                                    <option key={r.code} value={r.name}>
                                        {r.name}
                                    </option>
                                ))}
                            </select>
                        </span>
                        <span className='flex flex-col border border-gray-400 p-2 rounded-lg focus-within:border-sky-500 duration-200'>
                            <label className={`${poppins.className} text-[12px] sm:text-[14px] col-span-4 italic text-gray-500`}>Province:</label>
                            <select
                                className={`${poppins.className} text-[12px] sm:text-[16px] col-span-3 font-medium border-0 focus:outline-none border-b w-full`}
                                value={formData.personalInfo.pProvince}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                    const name = e.target.value;
                                    const province = provinces.find((p) => p.name === name);
                                    if (!province) return;
                                    setFormData({
                                        ...formData,
                                        personalInfo: {
                                            ...formData.personalInfo,
                                            pProvince: name,
                                            pMunicipal: '',
                                            pbrgy: '',
                                        },
                                    });
                                    fetch(`https://psgc.gitlab.io/api/provinces/${province.code}/cities-municipalities/`)
                                        .then(res => res.json())
                                        .then(data => setCities(data));
                                }}
                            >
                                <option value="">Select Province</option>
                                {provinces.map((p: { name: string; code: string }) => (
                                    <option key={p.code} value={p.name}>
                                        {p.name}
                                    </option>
                                ))}
                            </select>
                        </span>
                        <span className='flex flex-col border border-gray-400 p-2 rounded-lg focus-within:border-sky-500 duration-200'>
                            <label className={`${poppins.className} text-[12px] sm:text-[14px] col-span-4 italic text-gray-500`}>Municipality/City:</label>
                            <select
                                className={`${poppins.className} text-[12px] sm:text-[16px] col-span-3 font-medium border-0 focus:outline-none border-b w-full`}
                                value={formData.personalInfo.pMunicipal}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                    const name = e.target.value;
                                    const city = cities.find((c) => c.name === name);
                                    if (!city) return;
                                    setFormData({
                                        ...formData,
                                        personalInfo: {
                                            ...formData.personalInfo,
                                            pMunicipal: name,
                                            pbrgy: '',
                                        },
                                    });
                                    fetch(`https://psgc.gitlab.io/api/cities-municipalities/${city.code}/barangays/`)
                                        .then(res => res.json())
                                        .then(data => setBarangays(data));
                                }}
                            >
                                <option value="">Select Municipality/City</option>
                                {cities.map((c: { name: string; code: string }) => (
                                    <option key={c.code} value={c.name}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                        </span>
                        <span className='flex flex-col border border-gray-400 p-2 rounded-lg focus-within:border-sky-500 duration-200'>
                            <label className={`${poppins.className} text-[12px] sm:text-[14px] col-span-4 italic text-gray-500`}>Barangay:</label>
                            <select
                                className={`${poppins.className} text-[12px] sm:text-[16px] col-span-3 font-medium border-0 focus:outline-none border-b w-full`}
                                value={formData.personalInfo.pbrgy}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                    const brgy = e.target.value;
                                    setFormData({
                                        ...formData,
                                        personalInfo: {
                                            ...formData.personalInfo,
                                            pbrgy: brgy,
                                        },
                                    });
                                }}
                            >
                                <option value="">Select Barangay</option>
                                {barangays.map((b: { name: string; code: string }) => (
                                    <option key={b.code} value={b.name}>
                                        {b.name}
                                    </option>
                                ))}
                            </select>
                        </span>
                        <span className='flex flex-col border border-gray-400 p-2 rounded-lg focus-within:border-sky-500 duration-200'>
                            <label className={`${poppins.className} text-[12px] sm:text-[14px] col-span-4 italic text-gray-500`}>Zip Code:</label>
                            <input
                                type="text"
                                className={`${poppins.className} text-[12px] sm:text-[16px] col-span-3 font-medium border-0 focus:outline-none border-b w-full`}
                                value={formData.personalInfo.pZipCode}
                                onChange={handleChange('pZipCode')}
                            />
                        </span>
                        <span className='flex flex-col border border-gray-400 p-2 rounded-lg focus-within:border-sky-500 duration-200'>
                            <label className={`${poppins.className} text-[12px] sm:text-[14px] col-span-4 italic text-gray-500`}>Country:</label>
                            <input
                                type="text"
                                className={`${poppins.className} text-[12px] sm:text-[16px] col-span-3 font-medium border-0 focus:outline-none border-b w-full`}
                                value="Philippines"
                                readOnly
                            />
                        </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}
