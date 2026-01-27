'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { motion, Variant } from "framer-motion";
import Image from 'next/image'
import KVSHSLOGO from '@/app/favicon.ico'
import deped from '@/app/images/deped.png'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['200', '400', '700', '900'],
  style: ['normal', 'italic'],
})

export default function Grades() {
  const [lrn, setLrn] = useState('')
  const [learnerType, setLearnerType] = useState('')
  const [grades, setGrades] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')
  const [section, setSection] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const [schoolYear, setSchoolYear] = useState('')
  const [track, setTrack] = useState('')
  const [strand, setStrand] = useState('')
  const [firstGeneralAverage, setFirstGeneralAverage] = useState('')
  const [secondGeneralAverage, setSecondGeneralAverage] = useState('')
  const [finalAverage, setFinalAverage] = useState('')
  const [finalRemarks, setFinalRemarks] = useState('')
  const [selectedGradeLevel, setSelectedGradeLevel] = useState('11')
  const [standings, setStandings] = useState<any[]>([])

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Get LRN and learnerType from localStorage
  useEffect(() => {
    const storedLrn = localStorage.getItem('studentLRN')
    const storedLearnerType = localStorage.getItem('learnerType')

    if (storedLrn) setLrn(storedLrn)
    if (storedLearnerType) setLearnerType(storedLearnerType)
  }, [])

  // Fetch student info
  useEffect(() => {
    if (lrn && learnerType) {
      const fetchStudentInfo = async () => {
        const tableName = learnerType === 'ALS' ? 'ALS' : 'NewStudents'

        const { data, error } = await supabase
          .from(tableName)
          .select('*')
          .eq('lrn', lrn)
          .single()

        if (error) {
          console.error('Error fetching student:', error)
        } else if (data) {
          const fullName = `${data.lname}, ${data.fname} ${data.mname} ${data.ename}`
          setName(fullName)
          setSection(`${data.gradeLevel} - ${data.strand} - ${data.section}`)
          setAge(`${data.age}`)
          setGender(`${data.sex}`)
          setSchoolYear(`${data.schoolYear}`)
          setTrack(data.track)
          setStrand(data.strand)
          if (data.gradeLevel) setSelectedGradeLevel(String(data.gradeLevel))
        }
      }

      fetchStudentInfo()
    }
  }, [lrn, learnerType])

  // Fetch grades
  useEffect(() => {
    if (lrn) {
      const fetchGrades = async () => {
        setLoading(true)
        const { data, error } = await supabase
          .from('grades')
          .select(`
            id,
            student_lrn,
            first_grading,
            second_grading,
            third_grading,
            fourth_grading,
            first_sem_subject_average,
            first_sem_subject_remarks,
            second_sem_subject_average,
            second_sem_subject_remarks,
            subjects (
              subject_title,
              grade_level,
              semester,
              classification
            )
          `)
          .eq('student_lrn', lrn)

        if (error) {
          console.error('Error fetching grades:', error)
        } else {
          setGrades(data || [])
        }
        setLoading(false)
      }

      fetchGrades()
    }
  }, [lrn])

  // Fetch General Average
  useEffect(() => {
    if (lrn) {
      const fetchGeneral = async () => {
        setLoading(true)
        const { data, error } = await supabase
        .from('student_final_standing')
        .select('*')
        .eq('student_lrn', lrn)

        if (error) {
          console.error('Error fetching general average:', error)
        } else if (data) {
          setStandings(data)
        }
        setLoading(false)
      }

      fetchGeneral()
    }
  }, [lrn])

  // Update averages based on selected grade level
  useEffect(() => {
    const standing = standings.find((s: any) => String(s.grade_level) === selectedGradeLevel)
    if (standing) {
      setFirstGeneralAverage(standing.first_sem_general_average)
      setSecondGeneralAverage(standing.second_sem_general_average)
      setFinalAverage(standing.final_grade)
      setFinalRemarks(standing.final_remarks)
    } else {
      setFirstGeneralAverage('')
      setSecondGeneralAverage('')
      setFinalAverage('')
      setFinalRemarks('')
    }
  }, [selectedGradeLevel, standings])

  // Filter grades by semester
  const filterGrades = (sem: string, classification: string) => 
    grades.filter(g => g.subjects?.semester === sem && g.subjects?.classification === classification && String(g.subjects?.grade_level) === selectedGradeLevel)

  const CorefirstSemesterGrades = filterGrades('1st', 'Core Subject')
  const AppliedfirstSemesterGrades = filterGrades('1st', 'Applied Subject')
  const SpecializedfirstSemesterGrades = filterGrades('1st', 'Specialized Subject')
  
  const CoresecondSemesterGrades = filterGrades('2nd', 'Core Subject')
  const AppliedsecondSemesterGrades = filterGrades('2nd', 'Applied Subject')
  const SpecializedsecondSemesterGrades = filterGrades('2nd', 'Specialized Subject')

  const renderGradesTable = (semesterGrades: any[], semester: '1st' | '2nd') => (
    semesterGrades.length > 0 ? (
      semesterGrades.map((g, index) => (
        
        <div
          key={index}
          className='grid grid-cols-[1fr_25px_25px_50px_50px] lg:grid-cols-[1fr_50px_50px_100px_100px] text-center border-b'
        >
          <p className='border-r border-l'>{g.subjects.subject_title}</p>
          <p className='border-r'>{semester === '1st' ? g.first_grading ?? '' : g.third_grading ?? ''}</p>
          <p className='border-r'>{semester === '1st' ? g.second_grading ?? '' : g.fourth_grading ?? ''}</p>
          <p className='border-r'>{semester === '1st' ? g.first_sem_subject_average ?? '' : g.second_sem_subject_average ?? ''}</p>
          <p className='border-r'>{semester === '1st' ? g.first_sem_subject_remarks ?? '' : g.second_sem_subject_remarks ?? ''}</p>
        </div>
      ))
    ) : (
      <p className='text-center col-span-5'>No grades available.</p>
    )
  )

  return (
    <div className={`${poppins.className} absolute inset-0  flex justify-center items-center`}>
      {name ? (
        <div className='md:w-1/2 h-full p-5 overflow-auto shadow-lg'>
          {/* Header */}
          <div className='flex flex-row gap-2 justify-center items-center'>
            <Image src={deped} alt='Logo' className='w-8 h-8 md:w-12 md:h-12' />
            <div className='flex flex-col justify-center items-center'>
              <label className='text-[clamp(8px,1vw,14px)]'>Region IV-A</label>
              <label className='text-[clamp(8px,1vw,14px)]'>Division of Rizal</label>
              <label className='text-[clamp(10px,1vw,18px)] font-semibold'>
                KASIGLAHAN VILLAGE SENIOR HIGH SCHOOL
              </label>
              <label className='text-[clamp(8px,1vw,10px)]'>
                1K2 Kasiglahan Village, San Jose, Rodriguez, Rizal
              </label>
            </div>
            <Image src={KVSHSLOGO} alt='Logo' className='w-8 h-8 md:w-12 md:h-12' />
          </div>

          {/* Student Info */}
          <div className='mt-2 md:mt-5'>
            <div className='text-[clamp(8px,1vw,14px)] grid grid-cols-1 gap-2'>
              <span className='grid grid-cols-[30px_1fr]  lg:grid-cols-[50px_1fr] gap-2'>
                <strong>NAME:</strong>
                <p className='w-full text-center border-b'>{name}</p>
              </span>

              <span className='grid grid-cols-[30px_1fr_30px_1fr] lg:grid-cols-[50px_1fr_100px_1fr] gap-2'>
                <strong>AGE:</strong>
                <p className='w-full text-center border-b'>{age}</p>
                <strong>SEX:</strong>
                <p className='w-full text-center border-b'>{gender}</p>
              </span>

              

              <span className='grid grid-cols-[85px_1fr] lg:grid-cols-[150px_1fr] gap-2 items-center'>
                <strong>TRACK AND STRAND:</strong>
                <p className='w-full text-[clamp(8px,1vw,11px)] text-center border-b'>
                  {track} -{' '}
                  {strand === 'STEM'
                    ? 'SCIENCE, TECHNOLOGY, ENGINEERING AND MATHEMATICS'
                    : strand === 'ABM'
                    ? 'ACCOUNTANCY, BUSINESS AND MANAGEMENT'
                    : strand === 'HUMSS'
                    ? 'HUMANITIES AND SOCIAL SCIENCES'
                    : strand === 'TVL-ICT'
                    ? 'TECHNICAL-VOCATIONAL-LIVELIHOOD INFORMATION AND COMMUNICATIONS TECHNOLOGY'
                    : strand}
                </p>
              </span>
            </div>

            {/* Grade Level Selection */}
            <div className="flex justify-end mt-2 px-2">
              <select
                value={selectedGradeLevel}
                onChange={(e) => setSelectedGradeLevel(e.target.value)}
                className="border border-gray-300 rounded-md p-1 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="11">Grade 11</option>
                <option value="12">Grade 12</option>
              </select>
            </div>

            {/* First Semester Grades Table */}
            <div className='mt-2 md:mt-3 text-[clamp(8px,1vw,12px)]'>
              <label className='text-[clamp(10px,1vw,14px)] font-semibold'>First Semester</label>

              <div className='grid grid-cols-[1fr_50px_50px_49px] lg:grid-cols-[1fr_100px_100px_99px] border text-center'>
                <label className='border-r'>Subjects</label>
                <p className='grid grid-cols-2'>
                  <label className='col-span-2 border-b border-r'>QUARTER</label>
                  <label className='border-r'>1</label>
                  <label className='border-r'>2</label>
                </p>
                <label className='border-r'>Average</label>
                <label>Remarks</label>

              </div>
              <p className='w-full border-b border-r border-l pl-1 font-semibold bg-sky-200'>Core Subjects</p>
              {renderGradesTable(CorefirstSemesterGrades, '1st')}
              
              <p className='w-full border-b border-r border-l pl-1 font-semibold bg-sky-200'>Applied Subjects</p>
              {renderGradesTable(AppliedfirstSemesterGrades, '1st')}
              
              <p className='w-full border-b border-r border-l pl-1 font-semibold bg-sky-200'>Specialized Subjects</p>
              {renderGradesTable(SpecializedfirstSemesterGrades, '1st')}
              
              <div className='grid grid-cols-[1fr_50px_50px] lg:grid-cols-[1fr_100px_100px]'>
                <p className='border-l border-b border-r text-end pr-2 font-semibold'>General Average:</p>
                <p className='text-center border-b border-r'>{firstGeneralAverage}</p>
                <p className='border-b border-r'/>
              </div>
            </div>

            {/* Second Semester Grades Table */}
            <div className='mt-2 md:mt-3 text-[clamp(10px,1vw,12px)]'>
              <label className='text-[clamp(10px,1vw,14px)] font-semibold'>Second Semester</label>

              <div className='grid grid-cols-[1fr_50px_50px_49px] lg:grid-cols-[1fr_100px_100px_99px] border text-center'>
                <label className='border-r'>Subjects</label>
                <p className='grid grid-cols-2'>
                  <label className='col-span-2 border-b border-r'>QUARTER</label>
                  <label className='border-r'>3</label>
                  <label className='border-r'>4</label>
                </p>
                <label className='border-r'>Average</label>
                <label>Remarks</label>
              </div>

              <p className='w-full border-b border-r border-l pl-1 font-semibold bg-sky-200'>Core Subjects</p>
              {renderGradesTable(CoresecondSemesterGrades, '2nd')}
              
              <p className='w-full border-b border-r border-l pl-1 font-semibold bg-sky-200'>Applied Subjects</p>
              {renderGradesTable(AppliedsecondSemesterGrades, '2nd')}
              
              <p className='w-full border-b border-r border-l pl-1 font-semibold bg-sky-200'>Specialized Subjects</p>
              {renderGradesTable(SpecializedsecondSemesterGrades, '2nd')}
              
              <div className='grid grid-cols-[1fr_50px_50px] lg:grid-cols-[1fr_100px_100px]'>
                <p className='border-l border-b border-r text-end pr-2 font-semibold'>General Average:</p>
                <p className='text-center border-b border-r'>{secondGeneralAverage}</p>
                <p className='border-b border-r'/>
              </div>
            </div>
            <div className='grid grid-cols-[1fr_50px_50px] lg:grid-cols-[1fr_100px_100px] mt-2 border text-[clamp(10px,1vw,12px)]'>
                <p className='font-semibold text-end border-r p-1'>Final Average:</p>
                <p className='text-center p-1 border-r'>{finalAverage}</p>
                <p className='text-center p-1 text-[clamp(8px,1vw,12px)] font-semibold'>{finalRemarks}</p>
              </div>
          </div>
        </div>
      ) : (
        <motion.div
          className=" flex justify-center items-center  space-x-2 absolute top-1/2"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="w-4 h-10 bg-blue-500" 
            animate={{
              scaleY: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "loop",
                delay: 0.2
              }} 
          />

          <motion.div className="w-4 h-10 bg-blue-500" 
            animate={{
              scaleY: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "loop",
                delay: 0.4
              }} 
          />

          <motion.div className="w-4 h-10 bg-blue-500" 
            animate={{
              scaleY: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: "easeInOut",
                repeatType: "loop",
                delay: 0.6
              }} 
          />
      </motion.div>
      )}
    </div>
  )
}
