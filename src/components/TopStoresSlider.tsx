import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import { useNavigate } from 'react-router-dom'
import StoreCard from './Storecard'
import { storeApi } from '../services/api'
import { useLocationStore } from '../store/useLocationStore'
import { useStoreDetailStore } from '../store/useStoreDetailStore'
import type { Store } from '../types/store'
import SpoonLoader from './SpoonLoader'

// Swiper 스타일 import
// @ts-ignore: CSS side-effect import has no type declarations
import 'swiper/css'
// @ts-ignore: CSS side-effect import has no type declarations
import 'swiper/css/pagination'

export default function TopStoresSlider() {
  const navigate = useNavigate()
  const { selectedDistrict } = useLocationStore()
  const { setSelectedStore } = useStoreDetailStore()
  const [topStores, setTopStores] = useState<Store[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTopStores = async () => {
      try {
        setIsLoading(true)
        const stores = await storeApi.getTopStores(selectedDistrict.lat, selectedDistrict.lng, 3)
        setTopStores(stores)
      } catch (error) {
        console.error('Top5 가게 로드 실패:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTopStores()
  }, [selectedDistrict])
  if (isLoading) {
    return (
      <div>
        <h2 className='text-2xl font-bold mb-2 flex items-center gap-2'>🏆 이번 달 추천 가게</h2>
        <p className='text-base text-gray-600'>{selectedDistrict.name}에서 가장 후기가 좋은 가게에요</p>
        <div className='flex items-center justify-center py-20'>
          <SpoonLoader />
        </div>
      </div>
    )
  }

  if (topStores.length === 0) {
    return (
      <div>
        <h2 className='text-2xl font-bold mb-2 flex items-center gap-2'>🏆 이번 달 추천 가게</h2>
        <p className='text-base text-gray-600'>{selectedDistrict.name}에 추천 가게가 없어요</p>
      </div>
    )
  }

  return (
    <div>
      {/* 헤더 */}
      <div>
        <h2 className='text-2xl font-bold mb-2 flex items-center gap-2'>🏆 이번 달 추천 가게</h2>
        <p className='text-base text-gray-600'>{selectedDistrict.name}에서 가장 후기가 좋은 가게에요</p>
      </div>

      {/* 슬라이더 */}
      <Swiper
        modules={[Pagination]}
        spaceBetween={16}
        slidesPerView={1}
        centeredSlides={true}
        pagination={{
          clickable: true,
          dynamicBullets: false,
        }}>
        {topStores.map((store) => (
          <SwiperSlide
            key={store.storeId}
            className='bg-orange py-10 px-2'
            onClick={() => {
              setSelectedStore({ storeId: store.storeId, distance: store.distance, categories: store.categories })
              navigate('/detail')
            }}>
            <div className='cursor-pointer'>
              <StoreCard
                name={store.name}
                address={store.address}
                category={store.categories}
                foodType='한식'
                distance={`${(store.distance * 1000).toFixed(0)}m`}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .swiper-pagination-bullet {
          background-color: #AAA;
          opacity: 0.3;
        }
        .swiper-pagination-bullet-active {
          background-color: #FC7E2A;
          opacity: 1;
        }
      `}</style>
    </div>
  )
}
