import { motion, AnimatePresence } from 'framer-motion'
import { districts, useLocationStore } from '../store/useLocationStore'

interface LocationModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LocationModal({ isOpen, onClose }: LocationModalProps) {
  const { selectedDistrict, setSelectedDistrict } = useLocationStore()

  const handleSelectDistrict = (district: (typeof districts)[0]) => {
    setSelectedDistrict(district)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 배경 오버레이 */}
          <motion.div
            className='fixed inset-0 bg-black/50 z-40'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* 모달 컨텐츠 */}
          <motion.div
            className='fixed bottom-0 left-1/2 -translate-x-1/2 bg-white rounded-t-3xl z-50 w-full md:max-w-[30%]'
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}>
            <div className='p-6 pt-10'>
              {/* 헤더 */}
              <div className='mb-6'>
                <h2 className='text-xl font-bold mb-1'>지역 설정</h2>
                <p className='text-sm text-gray-500'>지역을 선택해 주세요 (시군구)</p>
              </div>

              {/* 구 목록 */}
              <div className='space-y-2 mb-6'>
                {districts.map((district) => (
                  <button
                    key={district.name}
                    onClick={() => handleSelectDistrict(district)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${selectedDistrict.name === district.name ? 'bg-orange-50 text-orange-600' : 'hover:bg-gray-50 text-gray-700'}`}>
                    <div className='flex items-center justify-between cursor-pointer'>
                      <span className='font-medium'>수원시 {district.name}</span>
                      {selectedDistrict.name === district.name && (
                        <svg
                          className='w-5 h-5 text-orange-600'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke='currentColor'>
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M5 13l4 4L19 7'
                          />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* 선택된 구 표시 */}

              <div className='h-8' />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
