import axios from 'axios'
import type { Store, StoreRequest } from '../types/store'

const BASE_URL = 'https://deundeun.duckdns.org/api'

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

export const storeApi = {
  // 주변 가게 검색
  getNearbyStores: async (params: StoreRequest): Promise<Store[]> => {
    const response = await apiClient.post<{ stores: Store[] }>('/store', params)
    return response.data.stores
  },

  // 가게 상세 정보 조회
  getStoreDetail: async (storeId: string): Promise<Store> => {
    const response = await apiClient.get<Store>(`/store/detail?storeId=${storeId}`)
    return response.data
  },

  // 가게 상세 정보 + 리뷰 조회
  getStoreDetailWithReviews: async (storeId: string) => {
    const response = await apiClient.get(`/store/detail?storeId=${storeId}`)
    return response.data
  },

  // 이번 달 추천 가게 Top5 (리뷰 많은 순)
  getTopStores: async (lat: number, lng: number, radiusKm: number = 5): Promise<Store[]> => {
    const response = await apiClient.post<{ stores: Store[] }>('/store', {
      user_latitude: lat,
      user_longitude: lng,
      radiusKm,
      category: 'CHILD_MEAL_CARD',
    })
    // 리뷰 많은 순으로 정렬 후 상위 5개 반환 (현재는 거리순으로 임시 처리)
    return response.data.stores.slice(0, 5)
  },

  // 가게명 검색
  searchStores: async (keyword: string): Promise<Store[]> => {
    // 사용자 위치 가져오기
    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    })

    const response = await apiClient.post<{ stores: Store[] }>(`/store/search?keyword=${encodeURIComponent(keyword)}`, {
      user_latitude: position.coords.latitude,
      user_longitude: position.coords.longitude,
      radiusKm: 5,
    })
    return response.data.stores
  },
  //https://deundeun.duckdns.org/api/reviews 가게 리뷰 등록
  //   {
  // 	"storeId": 1,
  // 	"keyword": [1, 2, 3],
  // 	"imgUrl": // Form 데이터 형식
  // }
  postStoreReview: async (storeId: string, keyword: number, imgUrl: FormData): Promise<void> => {
    await apiClient.post('/reviews', {
      storeId,
      keyword,
      imgUrl,
    })
  },
}

export default apiClient
