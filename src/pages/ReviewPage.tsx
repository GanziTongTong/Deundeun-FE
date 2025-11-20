import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Previous from '../components/Previous'
import Information from '../components/Information'

const ReviewPage = () => {
  const [images, setImages] = useState<File[]>([])
  const [selectedButtons, setSelectedButtons] = useState<string[]>([])
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const navigate = useNavigate()

  //후기선택
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files)
      if (fileList.length + images.length <= 3) {
        setImages([...images, ...fileList])
      } else {
        alert('최대 3개까지 업로드 가능합니다.')
      }
    }
  }
  const handleButtonClick = (buttonText: string) => {
    if (selectedButtons.includes(buttonText)) {
      setSelectedButtons(selectedButtons.filter((item) => item !== buttonText))
    } else {
      if (selectedButtons.length < 3) {
        setSelectedButtons([...selectedButtons, buttonText])
      } else {
        alert('최대 3개까지 선택 가능합니다.')
      }
    }
  }

  //팝업
  const handleReviewSubmit = () => {
    setIsPopupOpen(true)
  }
  const handlePopupConfirm = () => {
    setIsPopupOpen(false)
    alert('리뷰가 등록되었습니다!')
    navigate('/home')
  }
  const handlePopupCancel = () => {
    setIsPopupOpen(false)
  }

  return (
    <div className='container mx-auto p-4 pt-10'>
      {/* 1 */}
      <Previous text='영수증 인증' />
      {/* 2 */}
      <Information />
      {/* 3 */}
      <div className='mb-6 mt-15 '>
        <div className='mb-4'>
          <h2 className='text-lg font-semibold'>후기 선택</h2>
          <h4 className='text-gray-600 '>어떤 점이 좋았나요? ({selectedButtons.length}/3)</h4>
        </div>
        {/* 후기 버튼 임시 디자인 */}
        <div className='space-y-2'>
          {/* 첫 번째 줄 (3열) */}
          <div className='grid grid-cols-3 gap-3 gap-y-4 text-[#444444]'>
            {['맛있었어요', '혼밥하기 좋아요', '양이 많아요'].map((text) => (
              <button
                key={text}
                onClick={() => handleButtonClick(text)}
                className={`border px-4 py-2.5 rounded-md text-center text-sm cursor-pointer
                ${selectedButtons.includes(text) ? 'border-[#FC7E2A] text-[#FC7E2A] bg-white font-semibold' : 'bg-gray-100 border-gray-200 font-semibold'}`}>
                {text}
              </button>
            ))}
          </div>
          {/* 두 번째 줄 (2열) */}
          <div className='grid grid-cols-3 gap-3 gap-y-4 text-[#444444]'>
            {['사장님이 반겨주셨어요', '서비스가 친절해요', '재료가 신선해요'].map((text) => (
              <button
                key={text}
                onClick={() => handleButtonClick(text)}
                className={`border px-4 py-2.5 rounded-md text-center text-sm cursor-pointer
                ${selectedButtons.includes(text) ? 'border-[#FC7E2A] text-[#FC7E2A] bg-white font-semibold' : 'bg-gray-100 border-gray-200 font-semibold'}`}>
                {text}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* 4 */}
      <div className='mb-6 mt-20 '>
        <h2 className='text-lg font-semibold'>이미지 등록</h2>
        <p className='text-gray-600 mb-4'>매장 또는 음식 사진을 등록해 주세요 (선택)</p>
        <div className='flex space-x-4'>
          <div className='flex flex-col items-center border py-4 px-6 rounded-md cursor-pointer'>
            <input
              type='file'
              className='hidden'
              id='image-upload'
              onChange={handleImageUpload}
              multiple
            />
            <div className='relative w-6 h-6'>
              {/* 사진 아이콘 */}
              <svg
                width='18'
                height='18'
                viewBox='0 0 20 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='absolute inset-0 w-full h-full'>
                <path
                  d='M17 1H3C1.89543 1 1 1.89543 1 3V17C1 18.1046 1.89543 19 3 19H17C18.1046 19 19 18.1046 19 17V3C19 1.89543 18.1046 1 17 1Z'
                  stroke='#AAAAAA'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
              </svg>
              <svg
                width='5'
                height='5'
                viewBox='0 0 5 5'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='absolute left-[4px] top-[4px] w-[7px] h-[7px]'>
                <path
                  d='M2.5 4C3.32843 4 4 3.32843 4 2.5C4 1.67157 3.32843 1 2.5 1C1.67157 1 1 1.67157 1 2.5C1 3.32843 1.67157 4 2.5 4Z'
                  stroke='#AAAAAA'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
              </svg>
              <svg
                width='18'
                height='13'
                viewBox='0 0 18 13'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='absolute left-[4px] bottom-[0.5px] w-[20px] h-[14px]'>
                <path
                  d='M17 6L12 1L1 12'
                  stroke='#AAAAAA'
                  stroke-width='2'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
              </svg>
            </div>
            <p className='text-center mt-2 text-md text-gray-500'>사진 등록</p>
            <p className='text-xs text-gray-500'>(2/5)</p>
          </div>

          {/* 이미지 미리보기 부분 임시 구조 */}
          <div className='flex space-x-4'>
            {images.slice(0, 3).map((image, index) => (
              <div
                key={index}
                className='w-24 h-24 border border-gray-300 rounded-md overflow-hidden'>
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Preview ${index}`}
                  className='w-full h-full object-cover'
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* 5 */}
      <div className='text-center'>
        <button
          onClick={handleReviewSubmit}
          className='bg-[#FC7E2A] text-white py-3 px-6 rounded-md font-semibold w-full mt-6 cursor-pointer'>
          리뷰 등록
        </button>
      </div>
      {isPopupOpen && (
        <div
          className='fixed inset-0 flex items-center justify-center z-[999]'
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}>
          <div className='bg-white p-6 rounded-lg w-11/12 max-w-sm shadow-2xl z-[1000]'>
            <h3 className='text-xl font-bold text-center mt-2'>리뷰를 등록할까요?</h3>
            <p className='text-sm text-gray-700 text-center mt-4 mb-6 leading-relaxed'>
              리뷰는 나중에 삭제하거나 수정할 수 없어요.
              <br />
              신중하게 작성해 주세요.
            </p>
            <div className='flex justify-between mt-6 space-x-3'>
              <button
                onClick={handlePopupCancel}
                className='flex-1 bg-white text-gray-700 font-semibold py-3 px-6 rounded-md border border-gray-300 cursor-pointer'>
                취소
              </button>
              <button
                onClick={handlePopupConfirm}
                className='flex-1 bg-orange-400 text-white font-semibold py-3 px-6 rounded-md cursor-pointer'>
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ReviewPage
