import { useSearchParams } from 'react-router-dom'
import { useStoreDetailStore } from '../store/useStoreDetailStore'
import { useEffect, useState } from 'react'
import { storeApi } from '../services/api'
import spoon from '../assets/spoon.svg'

const Information = () => {
  const [searchParams] = useSearchParams()
  const { selectedStore } = useStoreDetailStore()
  const [storeName, setStoreName] = useState('')
  const [storeAddress, setStoreAddress] = useState('')

  useEffect(() => {
    // URL 파라미터에서 먼저 확인 (ReceiptPage에서 사용)
    const nameFromUrl = searchParams.get('storeName')
    const addressFromUrl = searchParams.get('storeAddress')

    if (nameFromUrl && addressFromUrl) {
      setStoreName(nameFromUrl)
      setStoreAddress(addressFromUrl)
    } else if (selectedStore?.storeId) {
      // useStoreDetailStore에서 가져오기 (ReviewPage에서 사용)
      const fetchStoreInfo = async () => {
        try {
          const data = await storeApi.getStoreDetailWithReviews(selectedStore.storeId.toString())
          setStoreName(data.name)
          setStoreAddress(data.address)
        } catch (error) {
          console.error('가게 정보 로드 실패:', error)
        }
      }
      fetchStoreInfo()
    }
  }, [searchParams, selectedStore])

  return (
    <div className='bg-gray-100 w-full min-h-[80px] p-4 rounded-md'>
      {!storeName ? (
        <p className='text-gray-500'>가게 정보를 불러오는 중...</p>
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
    //     <div className="flex  flex-col justify-center itmes-center bg-gray-100 w-full h-[85px] p-2 rounded-md">
    //         <div className='flex justify-start items-center'>
    //             <img src={spoon} alt='spoon' ></img>
    //             <h5 className='text-xl font-bold text-[#444444]'>&nbsp;통통빵집</h5>
    //         </div>
    //         <p className="pt-[5px] text-[#444444]">경기 수원시 영통구 영통로 344 1층</p>
    //   </div>
  )
}

export default Information
