import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import back from '../assets/back.svg'
import kor from '../assets/img_kor.png'
import chn from '../assets/img_chn.png'
import eng from '../assets/img_eng.png'

const SettingPage = () => {
  const navigate = useNavigate()

  return (
    <motion.div
      className='container mx-auto p-4'
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.5 }}>
      <header className='mb-6 flex items-center justify-center relative'>
        <button
          onClick={() => navigate(-1)}
          className='absolute left-0 cursor-pointer'>
          <img
            src={back}
            alt='Back'
          />
        </button>
        <h1 className='text-xl font-normal'>설정</h1>
      </header>

      <div className='text-xl font-bold my-4'>언어설정</div>
      <div>
        <div className='flex flex-com justify-start py-2'>
          <img
            src={kor}
            alt='kor'
            className='mx-1'
          />
          <div className='text-lg font-normal text-[#FC7E2A]'>한국어</div>
        </div>
        <div className='flex flex-com justify-start py-2'>
          <img
            src={eng}
            alt='eng'
            className='mx-1'></img>
          <div className='text-lg font-normal'>English</div>
        </div>
        <div className='flex flex-com justify-start py-2'>
          <img
            src={chn}
            alt='chn'
            className='mx-1'></img>
          <div className='text-lg font-normal'>中文</div>
        </div>
      </div>

      <div className='bg-gray-100 h-[10px] w-full my-4'></div>

      <div className='text-xl font-bold my-4'>가맹점 등록 정보</div>
      {/* 경기도 아동급식카드 가맹점 신청페이지 */}
      <div className='flex justify-start items-center mb-2'>
        <svg
          width='20'
          height='20'
          viewBox='0 0 20 20'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='mr-1'>
          <path
            d='M11.25 8.75L17.5 2.5M17.5 2.5H13.3333M17.5 2.5V6.66667M17.5 11.6667V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H8.33333'
            stroke='#AAAAAA'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
        </svg>
        <button
          onClick={() => window.open('https://www.gg.go.kr/gdream/view/fma/ordmain/main', '_blank')}
          className='text-[#444444] font-md text-[16px] cursor-pointer'>
          경기도 아동급식카드 가맹점 신청페이지
        </button>
      </div>
      {/* 선한영향력가게 가맹점 신청페이지  */}
      <div className='flex justify-start items-center mb-2 '>
        <svg
          width='20'
          height='20'
          viewBox='0 0 20 20'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='mr-1'>
          <path
            d='M11.25 8.75L17.5 2.5M17.5 2.5H13.3333M17.5 2.5V6.66667M17.5 11.6667V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H8.33333'
            stroke='#AAAAAA'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
        </svg>
        <button
          onClick={() => window.open('https://www.xn--o39akkz01az4ip7f4xzwoa.com/crew/introduce', '_blank')}
          className='text-[#444444] font-md text-[16px] cursor-pointer'>
          선한영향력가게 가맹점 신청페이지
        </button>
      </div>
      {/* 좋은이웃가게 가맹점 신청페이지 */}
      <div className='flex justify-start items-center mb-2'>
        <svg
          width='20'
          height='20'
          viewBox='0 0 20 20'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='mr-1'>
          <path
            d='M11.25 8.75L17.5 2.5M17.5 2.5H13.3333M17.5 2.5V6.66667M17.5 11.6667V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H8.33333'
            stroke='#AAAAAA'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
        </svg>
        <button
          onClick={() => window.open('https://goodshop.gni.kr/goodshop/application', '_blank')}
          className='text-[#444444] font-md text-[16px] cursor-pointer'>
          좋은이웃가게 가맹점 신청페이지
        </button>
      </div>
    </motion.div>
  )
}

export default SettingPage
