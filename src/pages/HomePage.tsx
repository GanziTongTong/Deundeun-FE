import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import marker_orange from '../assets/marker_orange.svg'
import setting_icon from '../assets/setting_icon.svg'
import search from '../assets/search.svg'

import TopStoresSlider from '../components/TopStoresSlider'
import LocationModal from '../components/LocationModal'
import Checkbox from '../components/Checkbox'
import StoreCard from '../components/Storecard'
import { useLocationStore } from '../store/useLocationStore'
import { useCategoryStore } from '../store/useCategoryStore'
import { storeApi } from '../services/api'
import type { Store } from '../types/store'

// 상수 정의
const DEFAULT_MAP_LEVEL = 5
const CLUSTER_MIN_LEVEL = 4
const SDK_CHECK_INTERVAL = 100

// 카카오맵 레벨별 반경(km) 매핑
const LEVEL_RADIUS_MAP: { [key: number]: number } = {
  1: 0.08,
  2: 0.1,
  3: 0.2,
  4: 0.3,
  5: 0.8,
  6: 1,
  7: 1.5,
  8: 2,
  9: 4,
  10: 8,
}

const HomePage = () => {
  const navigate = useNavigate()

  // Refs
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<kakao.maps.Map | null>(null)
  const markersRef = useRef<kakao.maps.Marker[]>([])
  const overlaysRef = useRef<kakao.maps.CustomOverlay[]>([])
  const clustererRef = useRef<kakao.maps.MarkerClusterer | null>(null)
  const selectedStoresRef = useRef<HTMLDivElement>(null)

  // States
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedStores, setSelectedStores] = useState<Store[]>([])

  // Store hooks
  const { selectedDistrict } = useLocationStore()
  const { selectedCategories, toggleCategory, hasCategory, toggleAll, isAllSelected } = useCategoryStore()

  // Kakao Maps SDK 동적 로드 (clusterer 라이브러리 포함)
  useEffect(() => {
    const script = document.createElement('script')
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_API_KEY}&autoload=false&libraries=clusterer`
    script.async = true
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  // 사용자 위치 가져오기 (향후 사용)
  useEffect(() => {
    if (!navigator.geolocation) {
      console.warn('브라우저가 위치 서비스를 지원하지 않습니다.')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        console.log('사용자 위치:', latitude, longitude)
      },
      (error) => {
        console.error('위치 정보 가져오기 실패:', error)
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    )
  }, [])

  // 지도 레벨에서 반경(km) 계산
  const getRadiusFromLevel = (level: number): number => {
    return LEVEL_RADIUS_MAP[level] || 0.5
  }

  // API에서 가게 데이터 가져오기
  const fetchStores = useCallback(
    async (lat: number, lng: number, level: number) => {
      const radiusKm = getRadiusFromLevel(level)

      try {
        const promises = selectedCategories.map((category) =>
          storeApi.getNearbyStores({
            user_latitude: lat,
            user_longitude: lng,
            radiusKm,
            category,
          })
        )

        const results = await Promise.all(promises)
        const allStores = results.flat()
        const uniqueStores = Array.from(new Map(allStores.map((store) => [store.storeId, store])).values())

        return uniqueStores
      } catch (error) {
        console.error('가게 데이터 로드 실패:', error)
        return []
      }
    },
    [selectedCategories]
  )

  // 마커 생성 및 클러스터링 표시
  const displayMarkers = useCallback((map: kakao.maps.Map, stores: Store[]) => {
    // 기존 클러스터러 및 마커 제거
    if (clustererRef.current) {
      clustererRef.current.clear()
    }
    markersRef.current.forEach((marker) => marker.setMap(null))
    overlaysRef.current.forEach((overlay) => overlay.setMap(null))
    markersRef.current = []
    overlaysRef.current = []

    // 마커 생성
    const markers = stores.map((store) => {
      const position = new window.kakao.maps.LatLng(store.latitude, store.longitude)

      // 커스텀 오버레이 HTML 생성
      const content = document.createElement('div')
      content.className = 'custom-marker'
      content.innerHTML = `
        <div style="
          position: relative;
          background: white;
          border-radius: 20px;
          padding: 4px 12px;
          font-size: 13px;
          font-weight: bold;
          color: #FF6B35;
          white-space: nowrap;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          cursor: pointer;
          transition: all 0.2s;
        ">
          <div style="display: flex; align-items: center; gap: 1px;">
            <span style="font-size: 16px;"></span>
            <span>${store.name}</span>
          </div>
          <div style="
            position: absolute;
            bottom: -8px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-top: 8px solid #fff;
          "></div>
        </div>
      `

      // 호버 효과
      content.onmouseenter = () => {
        content.style.transform = 'scale(1.05)'
        //background 변경
      }
      content.onmouseleave = () => {
        content.style.transform = 'scale(1)'
        content.style.zIndex = '1'
      }

      // 커스텀 오버레이 생성
      const customOverlay = new window.kakao.maps.CustomOverlay({
        position: position,
        content: content,
        yAnchor: 1.3,
      })

      // 클릭 이벤트
      content.onclick = () => {
        // 같은 위치에 있는 모든 가게 찾기
        const storesAtSameLocation = stores.filter((s) => s.latitude === store.latitude && s.longitude === store.longitude)
        setSelectedStores(storesAtSameLocation)
        map.setCenter(position)

        // 가게 정보로 부드럽게 스크롤
        setTimeout(() => {
          selectedStoresRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
          })
        }, 100)
      }

      overlaysRef.current.push(customOverlay)

      // 클러스터링을 위한 기본 마커도 생성 (투명하게)
      const marker = new window.kakao.maps.Marker({
        position,
        title: store.name,
        image: new window.kakao.maps.MarkerImage('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjwvc3ZnPg==', new window.kakao.maps.Size(1, 1)),
        zIndex: -1,
      })

      markersRef.current.push(marker)
      return marker
    })

    // 클러스터러 적용
    if (window.kakao?.maps?.MarkerClusterer) {
      console.log('✅ 클러스터러 생성:', markers.length, '개 마커, minLevel:', CLUSTER_MIN_LEVEL)
      const clusterer = new window.kakao.maps.MarkerClusterer({
        map: map,
        averageCenter: true,
        minLevel: CLUSTER_MIN_LEVEL,
        disableClickZoom: true,
      })

      clusterer.addMarkers(markers)
      clustererRef.current = clusterer
      console.log('✅ 클러스터러에 마커 추가 완료, 현재 지도 레벨:', map.getLevel())

      // 지도 레벨에 따라 오버레이 표시/숨김
      const currentLevel = map.getLevel()
      if (currentLevel < CLUSTER_MIN_LEVEL) {
        // 확대되어 있으면 커스텀 오버레이 표시
        overlaysRef.current.forEach((overlay) => overlay.setMap(map))
      } else {
        // 축소되어 있으면 커스텀 오버레이 숨김 (클러스터만 표시)
        overlaysRef.current.forEach((overlay) => overlay.setMap(null))
      }

      // 클러스터 클릭 시 1레벨 확대
      window.kakao.maps.event.addListener(clusterer, 'clusterclick', (cluster: kakao.maps.Cluster) => {
        const currentLevel = map.getLevel()
        console.log('🔍 클러스터 클릭, 현재 레벨:', currentLevel, '→', currentLevel - 1)
        map.setLevel(currentLevel - 1, { anchor: cluster.getCenter() })
      })
    } else {
      console.warn('⚠️ MarkerClusterer를 사용할 수 없습니다. 개별 마커 표시')
      // 클러스터러 미지원 시 개별 마커 표시
      markers.forEach((marker) => marker.setMap(map))
      overlaysRef.current.forEach((overlay) => overlay.setMap(map))
    }
  }, [])

  // 지도 초기화 및 이벤트 설정
  useEffect(() => {
    const location = selectedDistrict || { lat: 37.2596, lng: 127.0464 }

    const initializeMap = async () => {
      if (!window.kakao?.maps) {
        console.error('Kakao Maps SDK가 로드되지 않았습니다.')
        return
      }

      window.kakao.maps.load(async () => {
        if (!mapContainer.current) return

        const options = {
          center: new window.kakao.maps.LatLng(location.lat, location.lng),
          level: DEFAULT_MAP_LEVEL,
        }

        const map = new window.kakao.maps.Map(mapContainer.current, options)
        mapInstance.current = map

        // 중심 위치 마커
        new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(location.lat, location.lng),
          map: map,
        })

        // 초기 가게 데이터 로드
        const initialStores = await fetchStores(location.lat, location.lng, DEFAULT_MAP_LEVEL)
        console.log('🏪 초기 가게 데이터:', initialStores.length, '개, 지도 레벨:', map.getLevel())
        displayMarkers(map, initialStores)

        // 줌 변경 이벤트
        window.kakao.maps.event.addListener(map, 'zoom_changed', async () => {
          const level = map.getLevel()
          const center = map.getCenter()
          console.log('🔄 카카오 맵 줌 변경, 새 레벨:', level)

          // 레벨에 따라 커스텀 오버레이 표시/숨김
          if (level < CLUSTER_MIN_LEVEL) {
            // 확대되어 있으면 커스텀 오버레이 표시
            overlaysRef.current.forEach((overlay) => overlay.setMap(map))
          } else {
            // 축소되어 있으면 커스텀 오버레이 숨김
            overlaysRef.current.forEach((overlay) => overlay.setMap(null))
          }

          const newStores = await fetchStores(center.getLat(), center.getLng(), level)
          displayMarkers(map, newStores)
        })
      })
    }

    // SDK 로드 확인 및 초기화
    if (window.kakao?.maps) {
      initializeMap()
    } else {
      const checkInterval = setInterval(() => {
        if (window.kakao?.maps) {
          clearInterval(checkInterval)
          initializeMap()
        }
      }, SDK_CHECK_INTERVAL)

      return () => clearInterval(checkInterval)
    }
  }, [selectedDistrict, selectedCategories, fetchStores, displayMarkers])

  return (
    <motion.div
      className='flex flex-col bg-white min-h-screen'
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.5 }}>
      {/* 헤더 영역 */}
      <header className='bg-white shadow-sm px-4 py-8 shrink-0'>
        <div className='flex justify-between items-center'>
          <button
            className='text-2xl font-bold flex items-center cursor-pointer'
            onClick={() => setIsModalOpen(true)}>
            <img
              src={marker_orange}
              alt='Marker Orange'
              className='mr-2'
            />
            수원시 {selectedDistrict.name}
          </button>
          <button
            className='cursor-pointer'
            onClick={() => navigate('/setting')}>
            <img
              src={setting_icon}
              alt='Setting Icon'
            />
          </button>
        </div>
        <div className='relative mt-8'>
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

      {/* 메인 컨텐츠 */}
      <main className='p-5 flex-1'>
        {/* 이번 달 추천 가게 Top5 */}
        <TopStoresSlider />

        {/* 카테고리 필터 */}
        <div className='my-4'>
          <h3 className='text-2xl font-bold mb-2 flex items-center gap-2'>📍 근처 가게 지도로 보기</h3>
          <div className='grid grid-cols-2 gap-3 m-4'>
            <Checkbox
              checked={isAllSelected()}
              onChange={toggleAll}
              label='전체'
            />
            <Checkbox
              checked={hasCategory('CHILD_MEAL_CARD')}
              onChange={() => toggleCategory('CHILD_MEAL_CARD')}
              label='아동급식카드'
            />
            <Checkbox
              checked={hasCategory('GOOD_NEIGHBOR_STORE')}
              onChange={() => toggleCategory('GOOD_NEIGHBOR_STORE')}
              label='좋은이웃가게'
            />
            <Checkbox
              checked={hasCategory('GOOD_INFLUENCE_STORE')}
              onChange={() => toggleCategory('GOOD_INFLUENCE_STORE')}
              label='선한영향력가게'
            />
          </div>
        </div>

        {/* map */}
        <div className='h-[40vh]'>
          <div className='h-full '>
            <div
              ref={mapContainer}
              className='w-full h-full rounded-2xl'
            />
          </div>
        </div>

        {/* 선택된 가게 정보 */}
        {selectedStores.length > 0 && (
          <motion.div
            ref={selectedStoresRef}
            className='mt-4 space-y-3'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}>
            {selectedStores.length > 1 && <p className='text-sm text-gray-600 font-bold'>이 위치에 {selectedStores.length}개의 가게가 있습니다</p>}
            {selectedStores.map((store) => (
              <div
                key={store.storeId}
                className='cursor-pointer'
                onClick={() => navigate(`/detail?storeId=${store.storeId}`)}>
                <StoreCard
                  rank={0}
                  name={store.name}
                  address={store.address}
                  category={store.categories}
                  foodType='한식'
                  distance={`${(store.distance * 1000).toFixed(0)}m`}
                />
              </div>
            ))}
          </motion.div>
        )}
      </main>

      {/* 위치 선택 모달 */}
      <LocationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </motion.div>
  )
}

export default HomePage
