import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import Previous from './Previous'
import StoreCard from '../components/Storecard'
import { storeApi } from '../services/api'
import type { Store } from '../types/store'
import search from '../assets/search.svg'
import SpoonLoader from '../components/SpoonLoader'

type SortType = 'distance' | 'popular'

const ITEMS_PER_PAGE = 5

const SearchPage = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const keyword = searchParams.get('keyword') || ''

  const [stores, setStores] = useState<Store[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [sortType, setSortType] = useState<SortType>('distance')
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE)
  const [searchKeyword, setSearchKeyword] = useState(keyword)

  useEffect(() => {
    setSearchKeyword(keyword)
  }, [keyword])

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!keyword) return

      try {
        setIsLoading(true)
        const results = await storeApi.searchStores(keyword)
        setStores(results)
        setDisplayCount(ITEMS_PER_PAGE) // 검색 시 표시 개수 초기화
      } catch (error) {
        console.error('검색 실패:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSearchResults()
  }, [keyword])

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchKeyword.trim()) {
      setSearchParams({ keyword: searchKeyword.trim() })
    }
  }

  // 정렬 변경 시 표시 개수 초기화
  useEffect(() => {
    setDisplayCount(ITEMS_PER_PAGE)
  }, [sortType])

  // 정렬된 가게 목록
  const sortedStores = [...stores].sort((a, b) => {
    if (sortType === 'distance') {
      return a.distance - b.distance
    } else {
      // 인기순 (리뷰 개수) - 현재는 거리 역순으로 임시 처리 (백엔드에서 reviewCount 필드 추가 필요)
      // TODO: store.reviewCount가 추가되면 return b.reviewCount - a.reviewCount로 변경
      return a.distance - b.distance
    }
  })

  // 현재 표시할 가게 목록
  const displayedStores = sortedStores.slice(0, displayCount)
  const hasMore = displayCount < sortedStores.length

  // 무한 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight
      const scrollTop = document.documentElement.scrollTop
      const clientHeight = document.documentElement.clientHeight

      // 스크롤이 하단 근처에 도달하면 더 로드
      if (scrollTop + clientHeight >= scrollHeight - 100 && hasMore) {
        setDisplayCount((prev) => Math.min(prev + ITEMS_PER_PAGE, sortedStores.length))
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [displayCount, hasMore, sortedStores.length])

  return (
    <motion.div
      className='container mx-auto p-4 pt-10 min-h-screen'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}>
      <Previous
        text='검색 결과'
        navigateTo='/home'
      />

      {/* 검색바 */}
      <div className='relative my-6'>
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

      <div className='mb-6'>
        <h2 className='text-xl font-bold mb-2'>"{keyword}" 검색 결과</h2>
        <div className='flex items-center justify-between'>
          <p className='text-gray-600'>총 {stores.length}개의 가게를 찾았어요</p>

          {/* 정렬 토글 */}
          <div className='flex gap-2'>
            <button
              onClick={() => setSortType('distance')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${sortType === 'distance' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              가까운순
            </button>
            <button
              onClick={() => setSortType('popular')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${sortType === 'popular' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              인기순
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className='flex flex-col items-center justify-center py-20'>
          <SpoonLoader />
          <p className='mt-4 text-gray-600'>검색 중...</p>
        </div>
      ) : stores.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-20'>
          <p className='text-gray-500 text-center'>
            "{keyword}"에 대한 검색 결과가 없습니다.
            <br />
            다른 키워드로 검색해보세요.
          </p>
        </div>
      ) : (
        <>
          <div className='space-y-3'>
            {displayedStores.map((store, idx) => (
              <div
                key={store.storeId}
                className='cursor-pointer'
                onClick={() => navigate(`/detail?storeId=${store.storeId}`)}>
                <StoreCard
                  rank={idx + 1}
                  name={store.name}
                  address={store.address}
                  category={store.categories}
                  foodType=''
                  distance={`${(store.distance * 1000).toFixed(0)}m`}
                />
              </div>
            ))}
          </div>

          {/* 더보기 표시 */}
          {hasMore && (
            <div className='flex justify-center py-8'>
              <p className='text-sm text-gray-500'>
                스크롤하여 더 보기 ({displayCount}/{sortedStores.length})
              </p>
            </div>
          )}
        </>
      )}
    </motion.div>
  )
}

export default SearchPage
