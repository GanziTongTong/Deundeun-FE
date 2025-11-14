import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import back from '../assets/back.svg'

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
      <div className='text-lg font-normal'>한국어</div>
      <div className='text-lg font-normal'>English</div>
      <div className='text-lg font-normal'>中文</div>
    </motion.div>
  )
}

export default SettingPage
