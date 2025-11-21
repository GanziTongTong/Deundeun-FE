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
import { useStoreDetailStore } from '../store/useStoreDetailStore'
import { storeApi } from '../services/api'
import type { Store } from '../types/store'

/**
 * =============================
 * Map / Clustering Configuration
 * =============================
 */
const DEFAULT_MAP_LEVEL = 5
const CLUSTER_MIN_LEVEL = 4
const SDK_CHECK_INTERVAL = 100
const LEVEL_RADIUS_MAP: Record<number, number> = {
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

/**
 * 지도 레벨에서 탐색 반경(km) 계산 (fallback 0.5km)
 */
const getRadiusFromLevel = (level: number) => LEVEL_RADIUS_MAP[level] ?? 0.5

/** 커스텀 오버레이 DOM 생성 */
const createOverlayContent = (storeName: string) => {
  const wrapper = document.createElement('div')
  wrapper.className = 'custom-marker'
  wrapper.innerHTML = `
    <div style="position:relative;background:#fff;border-radius:20px;padding:4px 12px;font-size:13px;font-weight:bold;color:#FF6B35;white-space:nowrap;box-shadow:0 2px 6px rgba(0,0,0,0.3);cursor:pointer;transition:all .2s;">
      <div style="display:flex;align-items:center;gap:1px;">
        <span style="font-size:16px;"></span>
        <span>${storeName}</span>
      </div>
      <div style="position:absolute;bottom:-8px;left:50%;transform:translateX(-50%);width:0;height:0;border-left:8px solid transparent;border-right:8px solid transparent;border-top:8px solid #fff;"></div>
    </div>
  `
  return wrapper
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
  const [searchKeyword, setSearchKeyword] = useState('')

  // Store hooks
  const { selectedDistrict } = useLocationStore()
  const { selectedCategories, toggleCategory, hasCategory, toggleAll, isAllSelected } = useCategoryStore()
  const { setSelectedStore } = useStoreDetailStore()

  // Kakao Maps SDK 동적 로드 (clusterer 라이브러리)
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

  /** 검색바 엔터 처리 */
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return
    const keyword = searchKeyword.trim()
    if (!keyword) return
    navigate(`/search?keyword=${encodeURIComponent(keyword)}`)
  }

  /** 선택된 카테고리에 대해 반경 내 가게 데이터 로드 */
  const fetchStores = useCallback(
    async (lat: number, lng: number, level: number) => {
      const radiusKm = getRadiusFromLevel(level)
      try {
        const categoryRequests = selectedCategories.map((category) => storeApi.getNearbyStores({ user_latitude: lat, user_longitude: lng, radiusKm, category }))
        const results = await Promise.all(categoryRequests)
        // storeId 기준 중복 제거
        return Array.from(new Map(results.flat().map((s) => [s.storeId, s])).values())
      } catch (err) {
        console.error('가게 데이터 로드 실패:', err)
        return []
      }
    },
    [selectedCategories]
  )

  /** 마커 / 오버레이 / 클러스터 표시 */
  const displayMarkers = useCallback((map: kakao.maps.Map, stores: Store[]) => {
    // 정리
    if (clustererRef.current) clustererRef.current.clear()
    markersRef.current.forEach((m) => m.setMap(null))
    overlaysRef.current.forEach((o) => o.setMap(null))
    markersRef.current = []
    overlaysRef.current = []

    const markers = stores.map((store) => {
      const position = new window.kakao.maps.LatLng(store.latitude, store.longitude)
      const content = createOverlayContent(store.name)

      // Hover 효과
      content.onmouseenter = () => {
        content.style.transform = 'scale(1.05)'
      }
      content.onmouseleave = () => {
        content.style.transform = 'scale(1)'
        content.style.zIndex = '1'
      }

      // Overlay 생성
      const customOverlay = new window.kakao.maps.CustomOverlay({ position, content, yAnchor: 1.3 })
      overlaysRef.current.push(customOverlay)

      // 클릭 시 동일 좌표 가게 그룹 선택 + 스크롤 이동
      content.onclick = () => {
        const sameLocationStores = stores.filter((s) => s.latitude === store.latitude && s.longitude === store.longitude)
        setSelectedStores(sameLocationStores)
        map.setCenter(position)
        setTimeout(() => {
          selectedStoresRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
        }, 100)
      }

      // 클러스터러를 위한 투명 마커 (표시용)
      const marker = new window.kakao.maps.Marker({
        position,
        title: store.name,
        image: new window.kakao.maps.MarkerImage('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjwvc3ZnPg==', new window.kakao.maps.Size(1, 1)),
        zIndex: -1,
      })
      markersRef.current.push(marker)
      return marker
    })

    // 클러스터러 지원 시 적용
    if (window.kakao?.maps?.MarkerClusterer) {
      const clusterer = new window.kakao.maps.MarkerClusterer({
        map,
        averageCenter: true,
        minLevel: CLUSTER_MIN_LEVEL,
        disableClickZoom: true,
      })
      clusterer.addMarkers(markers)
      clustererRef.current = clusterer

      const currentLevel = map.getLevel()
      const showOverlays = currentLevel < CLUSTER_MIN_LEVEL
      overlaysRef.current.forEach((overlay) => overlay.setMap(showOverlays ? map : null))

      window.kakao.maps.event.addListener(clusterer, 'clusterclick', (cluster: kakao.maps.Cluster) => {
        const lvl = map.getLevel()
        map.setLevel(lvl - 1, { anchor: cluster.getCenter() })
      })
      return
    }

    // 클러스터러 미지원 → 개별 마커 및 오버레이 표시
    markers.forEach((m) => m.setMap(map))
    overlaysRef.current.forEach((o) => o.setMap(map))
  }, [])

  /** 지도 초기화 및 이벤트 바인딩 */
  useEffect(() => {
    const center = selectedDistrict || { lat: 37.2596, lng: 127.0464 }

    const init = async () => {
      if (!window.kakao?.maps || !mapContainer.current) return

      window.kakao.maps.load(async () => {
        if (!mapContainer.current) return
        const map = new window.kakao.maps.Map(mapContainer.current, {
          center: new window.kakao.maps.LatLng(center.lat, center.lng),
          level: DEFAULT_MAP_LEVEL,
        })
        mapInstance.current = map

        new window.kakao.maps.Marker({ position: new window.kakao.maps.LatLng(center.lat, center.lng), map })

        const initialStores = await fetchStores(center.lat, center.lng, DEFAULT_MAP_LEVEL)
        displayMarkers(map, initialStores)

        window.kakao.maps.event.addListener(map, 'zoom_changed', async () => {
          const lvl = map.getLevel()
          const c = map.getCenter()
          const newStores = await fetchStores(c.getLat(), c.getLng(), lvl)
          displayMarkers(map, newStores)
        })
      })
    }

    if (window.kakao?.maps) {
      init()
      return
    }

    const interval = setInterval(() => {
      if (window.kakao?.maps) {
        clearInterval(interval)
        init()
      }
    }, SDK_CHECK_INTERVAL)
    return () => clearInterval(interval)
  }, [selectedDistrict, selectedCategories, fetchStores, displayMarkers])

  return (
    <motion.div
      className='flex flex-col bg-white min-h-screen'
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.5 }}>
      {/* 헤더 영역 */}
      <header className='bg-white px-4 py-8 shrink-0'>
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
            placeholder='매장명으로 검색해보세요'
            className='w-full py-3 pl-12 pr-4 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-400'
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>
      </header>
      <div className='bg-[#F5F5F5] h-2 my-2'></div>

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

        {/* 지도 영역 */}
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
            transition={{ duration: 0.8 }}>
            {selectedStores.length > 1 && <p className='text-sm text-center text-gray-600 bg-'>이 위치에 {selectedStores.length}개의 가게가 있어요</p>}
            {selectedStores.map((store) => (
              <div
                key={store.storeId}
                className='cursor-pointer'
                onClick={() => {
                  setSelectedStore({
                    storeId: store.storeId,
                    distance: store.distance,
                    categories: store.categories,
                    phoneNumber: store.phoneNumber,
                    openingHours: store.openingHours,
                  })
                  navigate('/detail')
                }}>
                <StoreCard
                  name={store.name}
                  address={store.address}
                  category={store.categories}
                  phoneNumber={store.phoneNumber}
                  openingHours={store.openingHours}
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
