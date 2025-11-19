import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Previous from './Previous'

const Review_result = () => {
  const navigate = useNavigate()
  const handleNext = () => {
    navigate('/review')
  }
  const handleBack = () => {
    navigate('/receipt')
  }

  const [isUploadSuccess, setIsUploadSuccess] = useState(true) // 임시로 true값으로 주어 성공화면만 보일 수 있도록!

  setIsUploadSuccess(true)

  // 예를 들어 업로드가 끝나면 호출해서 성공 상태 지정
  // 실제로는 파일 업로드 후 결과에 따라 setIsUploadSuccess(true/false) 호출
  // 지금은 임시로 성공 화면 보여주도록 설정

  return (
    <div className='container mx-auto p-4 pt-10'>
      {/* 1 */}
      <Previous />
      {/* 2 */}
      {isUploadSuccess === null ? (
        <p className='text-center text-gray-500'>인증 결과를 기다리는 중입니다...</p>
      ) : isUploadSuccess ? (
        // 업로드 성공 화면
        <div className='flex flex-col justify-between py-40'>
          <div className='flex flex-col items-center justify-center pt-16'>
            <div className='relative w-28 h-28'>
              <svg
                width='102'
                height='102'
                viewBox='0 0 72 72'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='absolute top-0 left-0 z-10'>
                <path
                  d='M35.8334 69.1667C40.2115 69.1721 44.5476 68.3123 48.5925 66.6368C52.6374 64.9613 56.3114 62.5031 59.4034 59.4034C62.5031 56.3114 64.9613 52.6374 66.6368 48.5925C68.3123 44.5476 69.1721 40.2115 69.1667 35.8334C69.1721 31.4552 68.3123 27.1191 66.6368 23.0742C64.9613 19.0293 62.5031 15.3553 59.4034 12.2634C56.3114 9.16363 52.6374 6.70539 48.5925 5.02988C44.5476 3.35438 40.2115 2.49463 35.8334 2.50003C31.4552 2.49463 27.1191 3.35438 23.0742 5.02988C19.0293 6.70539 15.3553 9.16363 12.2634 12.2634C9.16363 15.3553 6.70539 19.0293 5.02988 23.0742C3.35438 27.1191 2.49463 31.4552 2.50003 35.8334C2.49463 40.2115 3.35438 44.5476 5.02988 48.5925C6.70539 52.6374 9.16363 56.3114 12.2634 59.4034C15.3553 62.5031 19.0293 64.9613 23.0742 66.6368C27.1191 68.3123 31.4552 69.1721 35.8334 69.1667Z'
                  fill='#FC7E2A'
                  stroke='#FC7E2A'
                  strokeWidth='5'
                  strokeLinejoin='round'
                />
              </svg>
              <svg
                width='48'
                height='36'
                viewBox='0 0 35 25'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='absolute top-8 left-7 z-20'>
                <path
                  d='M2.5 12.5L12.5 22.5L32.5 2.5'
                  stroke='#FFFFFF'
                  strokeWidth='5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
            <p className='text-xl pb-16'>영수증 인증 완료!</p>
          </div>
          <div className='flex justify-center pt-60'>
            <button
              className='w-[430px] h-[50px] bg-[#FC7E2A] rounded-md p-2 text-white text-center'
              onClick={handleNext}>
              리뷰 작성하기
            </button>
          </div>
        </div>
      ) : (
        // 업로드 실패 화면
        <div className='flex flex-col justify-between py-40'>
          <div className='flex flex-col items-center justify-center pt-16'>
            <div className='relative w-28 h-28'>
              <svg
                width='102'
                height='102'
                viewBox='0 0 70 70'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M34.833 0.75C53.6566 0.75 68.9168 16.0095 68.917 34.833C68.917 53.6567 53.6567 68.917 34.833 68.917C16.0095 68.9168 0.75 53.6566 0.75 34.833C0.750175 16.0096 16.0096 0.750175 34.833 0.75Z'
                  fill='#D6D6D6'
                  stroke='#D6D6D6'
                  strokeWidth='1.5'
                />
              </svg>
              <svg
                width='48'
                height='48'
                viewBox='0 0 21 21'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='absolute top-8 left-7 z-20'>
                <path
                  d='M18.6667 2L2 18.6667L18.6667 2ZM2 2L18.6667 18.6667L2 2Z'
                  fill='#ffffff'
                />
                <path
                  d='M18.6667 2L2 18.6667M2 2L18.6667 18.6667'
                  stroke='white'
                  strokeWidth='4'
                  strokeLinecap='round'
                />
              </svg>
            </div>
            <p className='text-xl'>영수증 인증 실패</p>
            <p className='pb-16'>상호명과 결제카드를 확인해주세요.</p>
          </div>
          <div className='flex justify-center pt-60'>
            <button
              className='w-[430px] h-[50px] bg-[#FC7E2A] rounded-md p-2 text-white text-center'
              onClick={handleBack}>
              다시 인증하기
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Review_result
