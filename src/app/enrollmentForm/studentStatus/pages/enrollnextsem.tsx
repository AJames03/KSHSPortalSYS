'use client'
import { useState, useEffect } from 'react'
import { motion, Variants } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';
import { Poppins, Bungee_Shade } from 'next/font/google';
import Image from 'next/image';
import Student from '@/app/images/student.png'

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['200', '400', '700', '900'],
    style: ['normal', 'italic'],
});

const bungeeShade = Bungee_Shade({
    subsets: ['latin'],
    weight: ['400'],
    style: ['normal'],
});

export default function EnrollNextSem() {
    const [lrn, setLrn] = useState('');
    const [learnerType, setLearnerType] = useState('');
    const [name, setName] = useState('');
    const [eligibilityResult, setEligibilityResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;

    // Load LRN and learner type from localStorage
    useEffect(() => {
        const storedLrn = localStorage.getItem('studentLRN');
        if (storedLrn) setLrn(storedLrn);

        const storedLearnerType = localStorage.getItem('learnerType');
        if (storedLearnerType) setLearnerType(storedLearnerType);
    }, []);

    // Fetch student name
    useEffect(() => {
        if (lrn && learnerType) {
            const fetchStudentName = async () => {
                const table = learnerType === 'ALS' ? 'ALS' : 'NewStudents';
                const { data, error } = await supabase
                    .from(table)
                    .select('*')
                    .eq('lrn', lrn)
                    .single();

                if (error) {
                    console.error('Error fetching student:', error);
                } else if (data) {
                    const fullName = `${data.lname}, ${data.fname} ${data.mname || ''} ${data.ename || ''}`.trim();
                    setName(fullName);
                }
            };
            fetchStudentName();
        }
    }, [lrn, learnerType]);

    // Handle eligibility check
    const handleSubmit = async () => {
        if (!lrn) return;
        setLoading(true);
        setEligibilityResult(null);

        const { data, error } = await supabase
            .rpc('check_enrollment_eligibility', { student_lrn_input: lrn });

        setLoading(false);

        if (error) {
            console.error('Error checking eligibility:', error);
        } else {
            setEligibilityResult(data);
        }
    };

    // Framer Motion variants
    const containerVariants: Variants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.2 } },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    };

    const loadingAnimation = (
        <motion.div className="flex space-x-2 items-center justify-center h-20">
            {[0.2, 0.4, 0.6].map((delay, i) => (
                <motion.div
                    key={i}
                    className="w-4 h-10 bg-blue-500"
                    animate={{ scaleY: [0.5, 1, 0.5] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", repeatType: "loop", delay }}
                />
            ))}
        </motion.div>
    );

    return (
        <motion.div
            className={`${poppins.className} flex justify-center items-center p-2 bg-white w-full h-full lg:p-4`}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {name ? (
                <div className='w-full h-full'>
                    <div className='relative w-full h-25 md:h-50 lg:h-60'>
                        <div 
                            className='bg-gradient-to-br from-blue-800 to-blue-400 w-full md:h-45
                            rounded-md flex flex-col absolute bottom-0'
                        >
                            <p className={`${bungeeShade.className} lg:w-[40%] p-2 text-[clamp(18px,3vw,50px)]  text-white flex flex-col`}>
                                <label>ENROLL FOR</label>
                                <label>NEXT SEMESTER</label>
                                <span className='inline-block [perspective:1000px] text-end'>
                                    <label 
                                        className={`${poppins.className} font-bold text-[clamp(12px,1.5vw,24px)] pl-2
                                        flex justify-start items-center w-full text-white
                                        transform-style-preserve-3d transition-transform duration-500`}
                                    >
                                            S.Y. {currentYear} - {nextYear}
                                    </label>
                                </span>
                            </p>
                        </div>
                        <Image 
                                src={Student} 
                                alt='Logo' 
                                className='absolute bottom-0 right-0 w-30 h-30 md:w-60 md:h-60 scale-x-[-1]'
                            />
                    </div>
                </div>
            ) : (
                loadingAnimation
            )}
        </motion.div>
    );
}
