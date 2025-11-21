import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import spoon from '../assets/spoon.svg'

interface StoreDetail {
  storeId: number
  name: string
  category: string
  operatingTime: string
  mainItems: string
}

const Information = () => {
  const [store, setStore] = useState<StoreDetail | null>(null)
  const [searchParams] = useSearchParams()
  const storeId = searchParams.get('storeId') // URL에서 storeId 가져오기

  useEffect(() => {
    const fetchStore = async () => {
      if (!storeId) return
      try {
        const res = await fetch(`http://localhost:8080/api/store/detail?storeId=${storeId}`)
        if (!res.ok) throw new Error('API 요청 실패')
        const data = await res.json()
        setStore(data)
      } catch (err) {
        console.error('가게 정보 불러오기 실패:', err)
      }
    }

    fetchStore()
  }, [storeId])

  return (
    <div className='bg-gray-300 w-full h-[80px] rounded-md p-4 flex flex-col justify-center'>
      {!store ? (
        <p>가게 정보 불러오는 중...</p>
      ) : (
        <>
          <div className='flex items-center gap-2'>
            <img src={spoon} alt='spoon' className='w-6 h-6' />
            <h5 className='font-bold'>{store.name}</h5>
          </div>
          <p className='pt-1 text-sm text-gray-700'>운영시간: {store.operatingTime}</p>
        </>
      )}
    </div>
  )
}

export default Information
