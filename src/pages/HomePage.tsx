import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import marker_orange from '../assets/marker_orange.svg'
import setting_icon from '../assets/setting_icon.svg'
// import spoon from '../assets/spoon.svg'
import search from '../assets/search.svg'

const HomePage = () => {
  const navigate = useNavigate()
  const mapContainer = useRef<HTMLDivElement>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [locationError, setLocationError] = useState<string | null>(null)

  // Kakao Maps SDK 동적 로드
  useEffect(() => {
    const script = document.createElement('script')
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_API_KEY}&autoload=false`
    script.async = true
    document.head.appendChild(script)

    console.log(import.meta.env.VITE_KAKAO_MAP_API_KEY)

    return () => {
      // cleanup
      document.head.removeChild(script)
    }
  }, [])

  useEffect(() => {
    // 사용자 위치 가져오기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setUserLocation({ lat: latitude, lng: longitude })
          console.log('사용자 위치 획득:', latitude, longitude)
        },
        (error) => {
          console.error('위치 정보 가져오기 실패:', error)
          setLocationError('위치 정보를 가져올 수 없습니다.')
          console.log(locationError)
          // 위치 실패 시 서울시청으로 기본 설정
          setUserLocation({ lat: 37.5665, lng: 126.978 })
        },
        {
          enableHighAccuracy: true, // 높은 정확도 요청
          timeout: 5000, // 5초 타임아웃
          maximumAge: 0, // 캐시된 위치 사용 안 함
        }
      )
    } else {
      setLocationError('브라우저가 위치 서비스를 지원하지 않습니다.')
      setUserLocation({ lat: 37.5665, lng: 126.978 })
    }
  }, [])

  useEffect(() => {
    // 사용자 위치를 얻은 후에만 지도 초기화
    if (!userLocation) return

    // Kakao Maps SDK 로드 확인 및 초기화
    const initializeMap = () => {
      if (!window.kakao || !window.kakao.maps) {
        console.error('Kakao Maps SDK가 로드되지 않았습니다.')
        return
      }

      window.kakao.maps.load(() => {
        if (!mapContainer.current) return

        const options = {
          center: new window.kakao.maps.LatLng(userLocation.lat, userLocation.lng),
          level: 3, // 지도 확대 레벨
        }

        const map = new window.kakao.maps.Map(mapContainer.current, options)

        // 현재 위치에 마커 추가
        const markerPosition = new window.kakao.maps.LatLng(userLocation.lat, userLocation.lng)
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        })
        marker.setMap(map)

        console.log('카카오맵 초기화 완료 - 사용자 위치:', userLocation)
      })
    }

    // SDK 로드 체크 (이미 로드되었으면 바로 실행, 아니면 대기)
    if (window.kakao && window.kakao.maps) {
      initializeMap()
    } else {
      const checkKakaoLoaded = setInterval(() => {
        if (window.kakao && window.kakao.maps) {
          clearInterval(checkKakaoLoaded)
          initializeMap()
        }
      }, 100)

      return () => clearInterval(checkKakaoLoaded)
    }
  }, [userLocation])

  return (
    <motion.div
      className='flex flex-col h-screen'
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.5 }}>
      {/* 헤더 영역 - 20% */}
      <header className='h-[20%] bg-white shadow-sm px-4 flex flex-col justify-center'>
        <div className='flex justify-between items-center'>
          <div className='text-2xl font-bold flex items-center cursor-pointer'>
            <img
              src={marker_orange}
              alt='Marker Orange'
              className='mr-2'
            />
            위치선택
          </div>
          <button
            className='cursor-pointer'
            onClick={() => navigate('/setting')}>
            <img
              src={setting_icon}
              alt='Setting Icon'
            />
          </button>
        </div>
        <div className='relative mt-4'>
          <img
            src={search}
            alt='Search Icon'
            className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5'
          />
          <input
            type='text'
            placeholder='메뉴 또는 가게명으로 검색해보세요'
            className='w-full py-3 pl-12 pr-4 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-400'
          />
        </div>
      </header>

      {/* 메인 컨텐츠: 80% */}
      <main className='h-[80vh] relative'>
        <div className='h-[50vh] relative '>
          <div className='p-5 h-full '>
            <div
              ref={mapContainer}
              className='w-full h-full rounded-2xl'
            />
          </div>
        </div>
      </main>
    </motion.div>
  )
}

export default HomePage
