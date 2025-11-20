import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { storeApi } from '../services/api'
import type { Store } from '../types/store'
import Previous from './Previous'
import spoonIcon from '../assets/spoon.svg'
import SpoonLoader from '../components/SpoonLoader'

const DetailPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const storeId = searchParams.get('storeId')
  const [storeDetail, setStoreDetail] = useState<Store | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStoreDetail = async () => {
      if (!storeId) return

      try {
        setIsLoading(true)
        // await new Promise(resolve => setTimeout(resolve, 100000)) // 100초 대기
        const data = await storeApi.getStoreDetail(storeId)
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
      navigate(`/receipt?storeName=${encodeURIComponent(storeDetail.name)}`)
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
        <Previous text='영수증 인증' />
        <p className='mt-4'>가게 정보를 찾을 수 없습니다.</p>
      </div>
    )
  }

  return (
    <div className='container mx-auto p-4 pt-10'>
      {/* 1 */}
      <Previous text='가게 정보' />
      {/* 3 */}
      <div className='mt-6'>
        <h1 className='text-3xl font-bold mb-4'>
          <img
            src={spoonIcon}
            alt='spoon'
            className='w-8 h-8'
          />

          {storeDetail.name}
        </h1>
        <p className='text-gray-600 mb-2'>{storeDetail.address}</p>
        <p className='text-sm text-gray-500 mb-4'>카테고리: {storeDetail.categories.join(', ')}</p>

        <button
          onClick={handleWriteReview}
          className='mt-4 px-6 py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors w-full cursor-pointer'>
          리뷰 작성하기
        </button>
      </div>
    </div>
  )
}

export default DetailPage
