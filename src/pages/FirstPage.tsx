import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import logo from '../assets/logo.png'

const FirstPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // 2초 후 HomePage로 이동
    const timer = setTimeout(() => {
      navigate('/home')
    }, 2000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <motion.div
      className='flex items-center justify-center min-h-screen bg-white'
      initial={{ opacity: 1 }}
      exit={{ x: '-100%', opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      draggable={false}
      style={{ cursor: 'none', caretColor: 'transparent' }}>
      <motion.img
        src={logo}
        alt='든든 로고'
        className='w-20 h-20 object-contain select-none pointer-events-none'
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        draggable={false}
        style={{ userSelect: 'none' }}
      />
      <style>{`
        * {
          cursor: none !important;
          caret-color: transparent !important;
        }
        input, textarea {
          caret-color: transparent !important;
        }
      `}</style>
    </motion.div>
  )
}

export default FirstPage
