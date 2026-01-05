'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import { Poppins } from 'next/font/google'
import Logo from '@/app/favicon.ico'
import Status from '@/app/enrollmentForm/studentStatus/pages/status'
import NextSem from '@/app/enrollmentForm/studentStatus/pages/enrollnextsem'
import Grades from '@/app/enrollmentForm/studentStatus/pages/grades'
import Loading from '@/app/components/page'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['200', '400', '700', '900'],
  style: ['normal', 'italic'],
});

export default function Page() {
  const router = useRouter();
  const [tabs, setTabs] = useState(0);
  const [showNav, setShowNav] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const [loading, setLoading] = useState(false);


  const tabHandler = () => {
    switch (tabs) {
      case 0:
        return <Status />;
      case 1:
        return <Grades />;
      case 2:
        return <NextSem />;
      default:
        return <div>Hello</div>;
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    await new Promise(res => setTimeout(res, 1000));
    localStorage.removeItem('studentLRN');
    localStorage.removeItem('learnerType');
    router.push('/enrollmentForm');
    
  };

  return (
    <div className={`${poppins.className} w-screen h-screen bg-white lg:grid lg:grid-cols-[220px_1fr]`}>

      {/* TOGGLE BUTTON (MOBILE ONLY) */}
      <div className='bg-white lg:hidden fixed top-0 p-2 w-full z-30'>
        <button
          onClick={() => setShowNav(true)}
          className="
            lg:hidden
            bg-gray-200
            w-8 h-8 rounded-md
            z-50
          "
        >
          <i className={`bi ${showNav ? '' : 'bi-list'}`} />
        </button>
      </div>

      {/* SIDEBAR / NAV */}
      <div
        className={`
          bg-zinc-50
          fixed lg:static
          top-0 left-0
          h-full w-[220px]
          z-40
          transform transition-transform duration-300
          ${showNav ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          flex flex-col items-center p-2
        `}
      >
        <button
            onClick={() => setShowNav(false)}
            className="
            lg:hidden
            fixed top-3 left-45 
            bg-gray-200
            w-8 h-8 rounded-md
            "
        >
            <i className={`bi ${showNav ? 'bi-box-arrow-left' : ''}`} />
        </button>
        <div className="mt-10 lg:mt-0 flex flex-row items-center pb-5 border-b-2 w-full justify-center">
          <Image src={Logo} alt="Logo" className="w-12 h-12 lg:w-10 lg:h-10 " />
          <label className="text-[clamp(12px,1vw,18px)] font-bold text-center">
            Kasiglahan Village Senior High School
          </label>
        </div>

        <nav className="w-full h-full mt-5 flex flex-col justify-between">
          <ul className="flex flex-col gap-2">
            <li
              className={`
                text-[clamp(16px,1vw,18px)]
                flex flex-row gap-2  p-2 rounded-md cursor-pointer
                ${tabs === 0 ? 'bg-blue-800 text-white font-semibold' : 'hover:bg-zinc-100'}
              `}
              onClick={() => {
                setTabs(0);
                setShowNav(false); // auto close on mobile
              }}
            >
              <i className={`bi ${tabs === 0 ? 'bi-file-break-fill' : 'bi-file-break'}`} />
              <p>Enrollment Status</p>
            </li>

            <li
              className={`
                text-[clamp(16px,1vw,18px)]
                flex flex-row gap-2 p-2 rounded-md cursor-pointer
                ${tabs === 1 ? 'bg-blue-800 text-white font-semibold' : 'hover:bg-zinc-100'}
              `}
              onClick={() => {
                setTabs(1);
                setShowNav(false); // auto close on mobile
              }}
            >
              <i className={`bi ${tabs === 1 ? 'bi-file-text-fill' : 'bi-file-text'}`} />
              <p>Grades Status</p>
            </li>

            <li
              className={`
                text-[clamp(16px,1vw,18px)]
                flex flex-row gap-2  p-2 rounded-md cursor-pointer
                ${tabs === 2 ? 'bg-blue-800 text-white font-semibold' : 'hover:bg-zinc-100'}
              `}
              onClick={() => {
                setTabs(2);
                setShowNav(false); // auto close on mobile
              }}
            >
              <i className={`bi ${tabs === 2 ? 'bi-clipboard2-fill' : 'bi-clipboard2'}`} />
              <p>Enrollment</p>
            </li>
          </ul>

          <button 
              className='w-full p-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 flex
                        flex-row gap-2 justify-center items-center'
              onClick={() => setLogoutModal(true)}
          >
            <i className="bi bi-box-arrow-left"></i>
            <label>Logout</label>
          </button>
        </nav>
      </div>

      {/* MAIN CONTENT */}
      <div className="relative w-full h-screen bg-white mt-10 lg:mt-0">
        {tabHandler()}
      </div>

      {/* Logout Modal */}

      {logoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" />
          <div className="bg-white p-10 rounded-md z-10">
            <p>Are you sure you want to logout?</p>
            <div className="flex justify-center mt-2 gap-2">
              <button
                className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                onClick={handleLogout}
              >
                Logout
              </button>
              <button
                className="w-full bg-zinc-200 hover:bg-zinc-300 text-black px-4 py-2 mr-2 rounded-md"
                onClick={() => setLogoutModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
