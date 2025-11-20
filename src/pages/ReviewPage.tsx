import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Previous from '../components/Previous'
import Information from './Information'

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
      <Previous />
      {/* 2 */}
      <Information storeName=''/>
      {/* 3 */}
      <div className='mb-6 mt-6'>
        <div className='mb-4'>
          <h2 className='text-lg font-semibold'>후기 선택</h2>
          <h4 className='text-gray-600 '>어떤 점이 좋았나요? ({selectedButtons.length}/3)</h4>
        </div>
        {/* 후기 버튼 임시 디자인 */}
        <div className='grid grid-cols-3 gap-4 text-[#444444]'>
          {['맛있었어요', '혼밥하기 좋아요', '양이 많아요', '사장님이 반겨주셨어요', '서비스가 친절해요', '재료가 신선해요'].map((text) => (
            <button
              key={text}
              onClick={() => handleButtonClick(text)}
              className={`border p-2 rounded-md text-center text-sm ${selectedButtons.includes(text) ? 'border-[#FC7E2A] text-[#FC7E2A] bg-white font-semibold' : 'bg-gray-100 border-gray-100 font-semibold'}`}>
              {text}
            </button>
          ))}
        </div>
      </div>
      {/* 4 */}
      <div className='mb-6'>
        <h2 className='text-lg font-semibold'>이미지 등록</h2>
        <p className='text-gray-600 mb-4'>매장 또는 음식 사진을 등록해 주세요 (선택)</p>
        <div className='flex space-x-4'>
          <div className='flex items-center'>
            <input
              type='file'
              className='hidden'
              id='image-upload'
              onChange={handleImageUpload}
              multiple
            />
            {/* 사진 등록 버튼 임시 디자인 */}
            <label
              htmlFor='image-upload'
              className='border border-gray-300 p-4 rounded-md cursor-pointer'>
              <p className='text-center mt-2 text-sm'>사진 등록</p>
            </label>
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
          className='bg-[#FC7E2A] text-white py-3 px-6 rounded-md font-semibold w-full mt-6'>
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
                className='flex-1 bg-white text-gray-700 font-semibold py-3 px-6 rounded-md border border-gray-300'>
                취소
              </button>
              <button
                onClick={handlePopupConfirm}
                className='flex-1 bg-orange-400 text-white font-semibold py-3 px-6 rounded-md'>
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
