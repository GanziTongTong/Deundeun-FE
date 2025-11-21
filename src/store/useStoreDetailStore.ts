import { create } from 'zustand'

interface SelectedStoreInfo {
  storeId: number
  distance: number
  categories: string[]
}

interface StoreDetailState {
  selectedStore: SelectedStoreInfo | null
  setSelectedStore: (store: SelectedStoreInfo) => void
  clearSelectedStore: () => void
}

export const useStoreDetailStore = create<StoreDetailState>((set) => ({
  selectedStore: null,
  setSelectedStore: (store) => set({ selectedStore: store }),
  clearSelectedStore: () => set({ selectedStore: null }),
}))
