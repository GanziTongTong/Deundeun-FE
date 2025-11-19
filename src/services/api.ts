import axios from 'axios'
import type { Store, StoreRequest } from '../types/store'

const BASE_URL = 'http://localhost:8080/api'

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
    const response = await apiClient.post<Store[]>('/store', params)
    return response.data
  },

  // 가게 상세 정보 조회
  getStoreDetail: async (storeId: string): Promise<Store> => {
    const response = await apiClient.get<Store>(`/store/detail?storeId=${storeId}`)
    return response.data
  },
}

export default apiClient
