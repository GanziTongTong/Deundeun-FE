import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Previous from '../components/Previous'
import Information from '../components/Information'

const ReviewPage = () => {
  const [images, setImages] = useState<File[]>([])
  const [alertImageMessage, setAlertImageMessage] = useState('')
  const [selectedButtons, setSelectedButtons] = useState<string[]>([])
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  const navigate = useNavigate()

  //사진 등록
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const fileArray = Array.from(files)

    if (images.length + fileArray.length > 5) {
      setAlertImageMessage('최대 5개까지 등록 가능합니다.')
      return
    }
    const updatedImages = [...images, ...fileArray]
    setImages(updatedImages)

    // 업로드 성공 시 경고 메시지 제거
    setAlertImageMessage('')
    e.target.value = ''
  }
  //후기 선택
  const handleButtonClick = (buttonText: string) => {
    if (selectedButtons.includes(buttonText)) {
      setSelectedButtons(selectedButtons.filter((item) => item !== buttonText))
      setAlertMessage('') // 선택 취소 시 메시지 제거
    } else {
      if (selectedButtons.length < 3) {
        setSelectedButtons([...selectedButtons, buttonText])
        setAlertMessage('') // 정상 선택 시 메시지 제거
      } else {
        setAlertMessage('최대 3개까지 선택 가능합니다.')
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
      <div className='mb-6 mt-12'>
        <div className='mb-4'>
          <h2 className='text-xl font-semibold'>후기 선택</h2>
          <h4 className='text-gray-600 text-s'>어떤 점이 좋았나요? ({selectedButtons.length}/3)</h4>
        </div>
        {/* 후기 버튼 임시 디자인 */}
        <div className='space-y-2'>
          {/* 첫 번째 줄 (3열) */}
          <div className='grid grid-cols-3 gap-3 gap-y-4 text-[#444444] text-s'>
            {['맛있었어요', '혼밥하기 좋아요', '양이 많아요'].map((text) => (
              <button
                key={text}
                onClick={() => handleButtonClick(text)}
                className={`border px-4 py-2.5 rounded-md text-center text-sm cursor-pointer sm:text-s
                ${selectedButtons.includes(text) ? 'border-[#FC7E2A] text-[#FC7E2A] bg-white font-semibold' : 'bg-gray-100 border-gray-200 font-semibold'}`}>
                {text}
              </button>
            ))}
          </div>
          {/* 두 번째 줄 (2열) */}
          <div className='grid grid-cols-3 gap-3 gap-y-4 text-[#444444] text-s'>
            {['사장님이 반겨주셨어요', '서비스가 친절해요', '재료가 신선해요'].map((text) => (
              <button
                key={text}
                onClick={() => handleButtonClick(text)}
                className={`border px-4 py-2.5 rounded-md text-center text-sm cursor-pointer sm:text-s
                ${selectedButtons.includes(text) ? 'border-[#FC7E2A] text-[#FC7E2A] bg-white font-semibold' : 'bg-gray-100 border-gray-200 font-semibold'}`}>
                {text}
              </button>
            ))}
          </div>
        </div>
        {alertMessage && <div className='bg-orange-100 text-[#FC7E2A] text-center items-center rounded-md text-sm mt-2 py-1'>{alertMessage}</div>}
      </div>
      {/* 4 */}
      <div className='mb-6 mt-18'>
        <h2 className='text-lg font-semibold'>이미지 등록</h2>
        <p className='text-gray-600 mb-4'>매장 또는 음식 사진을 등록해 주세요 (선택)</p>
        <div className='flex items-start space-x-4 w-full'>
          <label
            htmlFor='image-upload'
            className='flex flex-col items-center border border-gray-500 py-4 px-6 rounded-md cursor-pointer w-28 flex-shrink-0 cursor-pointer'>
            <input
              type='file'
              id='image-upload'
              className='hidden'
              onChange={handleImageUpload}
              multiple
              accept='image/*'
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
            <p className='text-xs text-gray-500'>({images.length}/5)</p>
          </label>

          {/* 이미지 미리보기 부분 임시 구조 */}
          <div className='flex-grow h-28 overflow-x-auto h-full flex gap-3 pb-2'>
            {images.map((image, idx) => (
              <div
                key={idx}
                className='relative w-24 h-24 border border-gray-300 rounded-md overflow-hidden shrink-0'>
                <button
                  onClick={() => {
                    const newImages = images.filter((_, i) => i !== idx)
                    setImages(newImages)

                    // 이미지 개수가 5개 미만이면 경고 메시지 제거
                    if (newImages.length < 5) {
                      setAlertImageMessage('')
                    }
                  }}
                  className='absolute top-1 right-1 bg-black bg-opacity-50 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center z-10'>
                  ✕
                </button>
                <img
                  src={URL.createObjectURL(image)}
                  className='w-24 h-24 object-cover'
                />
              </div>
            ))}
          </div>
        </div>
        {alertImageMessage && <p className='bg-orange-100 text-[#FC7E2A] text-center items-center rounded-md text-sm mt-2 py-1 '>{alertImageMessage}</p>}
      </div>
      {/* 5 */}
      <div className='flex justify-center pt-18'>
        <button
          onClick={handleReviewSubmit}
          className='mt-8 px-6 py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 active:bg-orange-700 transition-colors w-full'>
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
