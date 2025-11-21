import { useState, useEffect } from 'react'
import { useStoreDetailStore } from '../store/useStoreDetailStore'
import { storeApi } from '../services/api'
import spoon from '../assets/spoon.svg'

const Information = () => {
  const { selectedStore } = useStoreDetailStore()
  const [storeName, setStoreName] = useState('')
  const [storeAddress, setStoreAddress] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStoreInfo = async () => {
      if (!selectedStore?.storeId) {
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        const data = await storeApi.getStoreDetailWithReviews(selectedStore.storeId.toString())
        setStoreName(data.name)
        setStoreAddress(data.address)
      } catch (error) {
        console.error('가게 정보 로드 실패:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStoreInfo()
  }, [selectedStore])

  return (
    <div className='bg-gray-100 w-full min-h-20 p-4 rounded-md'>
      {isLoading ? (
        <p className='text-gray-500'>가게 정보를 불러오는 중...</p>
      ) : !storeName ? (
        <p className='text-gray-500'>가게 정보가 없습니다.</p>
      ) : (
        <>
          <div className='flex items-center gap-2'>
            <img
              src={spoon}
              alt='spoon'
              className='w-6 h-6'
            />
            <h5 className='font-bold text-lg text-[#444444]'>{storeName}</h5>
          </div>
          <p className='pt-2 text-sm text-[#444444]'>{storeAddress}</p>
        </>
      )}
    </div>
  )
}

export default Information
