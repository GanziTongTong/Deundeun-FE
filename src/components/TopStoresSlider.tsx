import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import StoreCard from './Storecard'

// Swiper 스타일 import
// @ts-ignore: CSS side-effect import has no type declarations
import 'swiper/css'
// @ts-ignore: CSS side-effect import has no type declarations
import 'swiper/css/pagination'

// 더미 데이터
const dummyStores = [
  {
    storeId: 1,
    name: '동동빵집',
    category: ['CHILD_MEAL_CARD', 'GOOD_INFLUENCE_STORE', 'GOOD_NEIGHBOR_STORE'],
    operatingTime: '07:00-21:30',
    items: '소금빵, 단팥빵',
    address: '경기 수원시 영통구 영통로 391 2층',
    distance: '6분',
  },
  {
    storeId: 2,
    name: '삼성분식',
    category: ['CHILD_MEAL_CARD'],
    operatingTime: '09:00-20:00',
    items: '떡볶이, 김밥',
    address: '경기 수원시 영통구 영통로 385',
    distance: '5분',
  },
  {
    storeId: 3,
    name: '상호명',
    category: ['CHILD_MEAL_CARD', 'GOOD_INFLUENCE_STORE'],
    operatingTime: '10:00-22:00',
    items: '제공 음식명',
    address: '경기 수원시 영통구 영통로 391 2층',
    distance: '6분',
  },
  {
    storeId: 4,
    name: '행복식당',
    category: ['GOOD_NEIGHBOR_STORE'],
    operatingTime: '11:00-20:00',
    items: '한식 백반',
    address: '경기 수원시 영통구 영통로 400',
    distance: '8분',
  },
  {
    storeId: 5,
    name: '착한카페',
    category: ['CHILD_MEAL_CARD', 'GOOD_INFLUENCE_STORE'],
    operatingTime: '08:00-22:00',
    items: '음료, 샌드위치',
    address: '경기 수원시 영통구 영통로 410',
    distance: '10분',
  },
]

export default function TopStoresSlider() {
  return (
    <div>
      {/* 헤더 */}
      <div>
        <h2 className='text-2xl font-bold mb-2 flex items-center gap-2'>🏆 이번 달 추천 가게 Top5</h2>
        <p className='text-base text-gray-600'>망포동에서 가장 후기가 좋은 가게예요</p>
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
        {dummyStores.map((store, index) => (
          <SwiperSlide
            key={store.storeId}
            className='bg-orange py-10 px-2'>
            <StoreCard
              rank={index + 1}
              name={store.name}
              address={store.address}
              category={store.category}
              foodType={store.items}
              distance={store.distance}
            />
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
