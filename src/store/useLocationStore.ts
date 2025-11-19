import { create } from 'zustand'

interface District {
  name: string
  lat: number
  lng: number
}

interface LocationState {
  selectedDistrict: District
  setSelectedDistrict: (district: District) => void
}

// 수원시 구청 위치 데이터
export const districts: District[] = [
  { name: '장안구', lat: 37.304, lng: 127.0107 },
  { name: '권선구', lat: 37.2577, lng: 126.9723 },
  { name: '팔달구', lat: 37.2808, lng: 127.0165 },
  { name: '영통구', lat: 37.2596, lng: 127.0464 },
]

// 기본값: 수원시 영통구
const defaultDistrict = districts[3]

export const useLocationStore = create<LocationState>((set) => ({
  selectedDistrict: defaultDistrict,
  setSelectedDistrict: (district) => set({ selectedDistrict: district }),
}))
