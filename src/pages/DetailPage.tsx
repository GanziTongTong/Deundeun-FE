import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { storeApi } from '../services/api'
import type { StoreDetail } from '../types/store'
import { useStoreDetailStore } from '../store/useStoreDetailStore'
import Previous from '../components/Previous'
import spoonIcon from '../assets/spoon.svg'
import clockIcon from '../assets/clock_icon.png'
import callIcon from '../assets/call_icon.png'
import moveIcon from '../assets/move_icon.png'
import SpoonLoader from '../components/SpoonLoader'

const DetailPage = () => {
  const navigate = useNavigate()
  const { selectedStore } = useStoreDetailStore()
  const storeId = selectedStore?.storeId.toString()
  const distanceParam = selectedStore?.distance
  const storeCategories = selectedStore?.categories || []
  const [storeDetail, setStoreDetail] = useState<StoreDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    const fetchStoreDetail = async () => {
      if (!storeId) return

      try {
        setIsLoading(true)
        const data = await storeApi.getStoreDetailWithReviews(storeId)
        setStoreDetail(data)
      } catch (error) {
        console.error('가게 정보 로드 실패:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStoreDetail()
  }, [storeId])

  const handleWriteReview = () => {
    if (storeDetail) {
      navigate(`/receipt?storeName=${encodeURIComponent(storeDetail.name)}&storeAddress=${encodeURIComponent(storeDetail.address)}&storeId=${storeDetail.storeId}`)
    }
  }

  if (isLoading) {
    return (
      <div className='container mx-auto p-4 pt-10'>
        <Previous text='' />
        <div className='flex flex-col items-center justify-center min-h-[70vh]'>
          <SpoonLoader />
          <p className='mt-4 text-gray-600'>가게 정보를 불러오는 중이에요...</p>
        </div>
      </div>
    )
  }

  if (!storeDetail) {
    return (
      <div className='container mx-auto p-4 pt-10'>
        <Previous text='가게 정보' />
        <p className='mt-4 text-gray-500'>가게 정보를 찾을 수 없습니다.</p>
      </div>
    )
  }

  // 카테고리 한글 변환
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'CHILD_MEAL_CARD':
        return '아동급식카드'
      case 'GOOD_NEIGHBOR_STORE':
        return '선한영향력가게'
      case 'GOOD_INFLUENCE_STORE':
        return '선한영향력가게'
      default:
        return category
    }
  }

  // 키워드 한글 변환
  const getKeywordLabel = (keyword: string) => {
    const labels: { [key: string]: string } = {
      TASTY: '맛있어요',
      GOOD_FOR_SOLO: '혼밥하기 좋아요',
      LARGE_PORTION: '양이 많아요',
      OWNER_KINDNESS: '사장님이 반겨주셨어요',
      SERVICE_GOOD: '서비스가 친절해요',
      FRESH_INGREDIENTS: '재료가 신선해요',
    }
    return labels[keyword] || keyword
  }

  // 모든 리뷰에서 키워드 집계
  const keywordCounts: { [key: string]: number } = {}
  const allKeywords = ['TASTY', 'GOOD_FOR_SOLO', 'LARGE_PORTION', 'OWNER_KINDNESS', 'SERVICE_GOOD', 'FRESH_INGREDIENTS']

  storeDetail.reviews.forEach((review) => {
    review.keywords.keywords.forEach((keyword) => {
      keywordCounts[keyword] = (keywordCounts[keyword] || 0) + 1
    })
  })

  // 모든 이미지 수집
  const allImages = storeDetail.reviews.flatMap((review) => review.images.map((img) => img.imageUrl))

  // 거리 표시 (state에서 가져옴)
  const distance = distanceParam ? `${(distanceParam * 1000).toFixed(0)}m` : '정보 없음'

  return (
    <motion.div
      className='min-h-screen bg-white'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}>
      <div className='container mx-auto pt-10 pb-20'>
        <Previous text='가게 정보' />

        {/* 가게 이름 */}
        <div className='mt-6 p-4'>
          <div className='flex items-center gap-2 mb-4'>
            <img
              src={spoonIcon}
              alt='spoon'
              className='w-6 h-6'
            />
            <h1 className='text-2xl font-bold'>{storeDetail.name}</h1>
          </div>
          {/* 주소 */}
          <div className='text-xl text-gray-700'>{storeDetail.address}</div>

          {/* 가게 상세 정보 */}
          <div className='space-y-4 mt-6'>
            {/* 영업시간 */}
            <div className='flex items-start gap-3'>
              <img
                src={clockIcon}
                alt='time'
                className='w-5 h-5 mt-1'
              />
              <div className='flex-1'>
                <p className='text-gray-700'>{storeDetail.openingHours || '정보 없음'}</p>
              </div>
            </div>

            {/* 전화번호 */}
            <div className='flex items-start gap-3'>
              <img
                src={callIcon}
                alt='phone'
                className='w-5 h-5 mt-1'
              />
              <div className='flex-1'>
                {storeDetail.phoneNumber ? (
                  <a
                    href={`tel:${storeDetail.phoneNumber}`}
                    className='text-gray-700 hover:text-orange-500 transition-colors'>
                    {storeDetail.phoneNumber}
                  </a>
                ) : (
                  <p className='text-gray-700'>정보 없음</p>
                )}
              </div>
            </div>

            <div className='flex items-start gap-3'>
              <img
                src={moveIcon}
                alt='location'
                className='w-5 h-5 mt-1'
              />
              <div className='flex-1'>
                <p className='text-sm text-gray-700 mt-1'>{distance}</p>
              </div>
            </div>

            {/* 제공 음식 */}
            {/* <div className='flex items-start gap-3'>
              <img
                src={spoonIcon}
                alt='food'
                className='w-5 h-5 mt-1'
              />
              <div className='flex-1'>
                <p className='text-gray-700'>밥</p>
              </div>
            </div> */}
          </div>

          {/* 카테고리 태그 */}
          <div className='flex flex-wrap gap-2 mt-6'>
            {storeCategories.map((category, index) => (
              <span
                key={index}
                className='bg-[#FFF4DF] text-[#FF6B35] text-xs py-1.5 px-3 rounded-lg'>
                {getCategoryLabel(category)}
              </span>
            ))}
          </div>

          <div className='bg-[#F5F5F5] h-2 my-6 -mx-4' />

          {/* 영수증 리뷰 후기 섹션 */}
          <div className='mt-8 p-6 rounded-lg'>
            <h2 className='text-lg font-bold mb-2'>영수증 리뷰 후기</h2>
            <p className='text-sm text-gray-600 mb-4'>방문한 유저들이 영수증을 인증한 날짜 후기에요</p>

            {/* 키워드 통계 */}
            <div className='grid grid-cols-2 gap-2 mb-4'>
              {allKeywords.map((keyword) => (
                <div
                  key={keyword}
                  className='bg-white px-3 py-2 rounded-lg text-sm'>
                  <span className='text-gray-700'>{getKeywordLabel(keyword)}</span>
                  <span className='ml-2 text-orange-500 font-bold'>{keywordCounts[keyword] || 0}</span>
                </div>
              ))}
            </div>

            {/* 리뷰 이미지 갤러리 */}
            {allImages.length > 0 ? (
              <div className='grid grid-cols-4 gap-2'>
                {allImages.slice(0, 3).map((imageUrl, idx) => (
                  <div
                    key={idx}
                    className='aspect-square bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity'
                    onClick={() => setSelectedImage(imageUrl)}>
                    <img
                      src={imageUrl}
                      alt={`리뷰 이미지 ${idx + 1}`}
                      className='w-full h-full object-cover'
                    />
                  </div>
                ))}
                {allImages.length > 3 && (
                  <div
                    className='aspect-square bg-gray-800 rounded-lg flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity'
                    onClick={() => setSelectedImage(allImages[3])}>
                    <span className='text-white font-bold text-lg'>+{allImages.length - 3}</span>
                  </div>
                )}
              </div>
            ) : (
              <p className='text-gray-500 text-sm text-center py-4'>아직 등록된 리뷰 사진이 없습니다</p>
            )}
          </div>

          {/* 리뷰 작성 버튼 */}
          <button
            onClick={handleWriteReview}
            className='mt-8 px-6 py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 active:bg-orange-700 transition-colors w-full'>
            리뷰 작성하기
          </button>
        </div>
      </div>

      {/* 이미지 모달 */}
      {selectedImage && (
        <div
          className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4'
          onClick={() => setSelectedImage(null)}>
          <div className='relative max-w-4xl w-full'>
            <button
              className='absolute top-4 right-4 text-white text-3xl font-bold hover:text-gray-300'
              onClick={() => setSelectedImage(null)}>
              ×
            </button>
            <img
              src={selectedImage}
              alt='리뷰 이미지 크게 보기'
              className='w-full h-auto rounded-lg'
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default DetailPage
