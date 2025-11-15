import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import card_icon from '../assets/card_icon.svg'
import camera_icon from '../assets/camera_icon.svg'

interface StoreDetail {
  storeId: number
  name: string
  category: string
  operatingTime: string
  mainItems: string
}

const ReceiptPage = () => {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }

  const handleNext = () => {
    navigate('/review_result')
  }

  const [store, setStore] = useState<StoreDetail | null>(null)

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/store/detail?storeId=1')
        const data = await res.json()
        setStore(data)
      } catch (err) {
        console.error('가게 정보 불러오기 실패:', err)
      }
    }

    fetchStore()
  }, [])

  return (
    <div className='container mx-auto p-4 pt-10'>
      {/* 1 */}
      <div className='relative flex mb-12 items-center '>
        <button
          onClick={handleBack}
          className=' absolute px-2 text-gray-300 left-0'>
          <svg
            width='30'
            height='30'
            viewBox='0 0 32 32'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M20 24L12 16L20 8'
              stroke='black'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
          </svg>
        </button>
        <h1 className='text-2xl text-center mx-auto'>영수증 인증</h1>
      </div>
      {/* 2 */}
      <div className='bg-gray-300 w-full h-[80px] rounded-md'>
        {!store ? (
          <p>가게 정보 불러오는 중...</p>
        ) : (
          <>
            <h5 className='font-bold'>{store.name}</h5>
            <p className='pt-[5px] text-sm text-gray-700'>운영시간: {store.operatingTime}</p>
          </>
        )}
      </div>
      {/* 3 */}
      <h5 className='pt-[28px] p-2 mx-[13px] font-bold text-xl '>구매 인증 방식</h5>
      <div className='grid grid-cols-2 gap-10 text-center mx-[20px] pt-[5px]'>
        {/* 카드 결제 버튼 */}
        <button
          className='group flex flex-col items-center justify-center bg-gray-100 p-4 rounded-md border-2 border-gray-300 w-[200px]
            hover:bg-[#FC7E2A]
            hover:border-[#FC7E2A]
            transition-colors duration-300'>
          <img
            src={card_icon}
            alt='card icon'
            className='mb-2 w-10 h-10 group-hover:filter group-hover:invert transition-colors duration-300'
          />

          <p className='text-center text-gray-700 group-hover:text-white transition-colors duration-300'>
            카드 결제내역
            <br />
            인증하기
          </p>
        </button>
        {/* 영수증 버튼 */}
        <button
          className='group flex flex-col items-center justify-center bg-gray-100 p-4 rounded-md border-2 border-gray-300 w-[200px]
          hover:text-[#FC7E2A]
            hover:border-[#FC7E2A]
            transition-colors duration-300'
          onClick={handleNext}>
          <img
            src={camera_icon}
            alt='camera icon'
            className='mb-2 w-10 h-10 group-hover:filter group-hover:invert transition-colors duration-300'
          />
          <p className='text-center text-gray-700 group-hover:text-white transition-colors duration-300'>
            영수증으로
            <br />
            인증하기
          </p>
        </button>
      </div>
    </div>
  )
}

export default ReceiptPage
