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
