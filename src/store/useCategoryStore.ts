import { create } from 'zustand'
import { StoreCategory } from '../types/store'

const ALL_CATEGORIES: StoreCategory[] = ['CHILD_MEAL_CARD', 'GOOD_NEIGHBOR_STORE', 'GOOD_INFLUENCE_STORE']

interface CategoryFilterState {
  selectedCategories: StoreCategory[]
  toggleCategory: (category: StoreCategory) => void
  hasCategory: (category: StoreCategory) => boolean
  toggleAll: () => void
  isAllSelected: () => boolean
}

export const useCategoryStore = create<CategoryFilterState>((set, get) => ({
  selectedCategories: ALL_CATEGORIES, // 기본값: 전체 선택

  toggleCategory: (category) =>
    set((state) => ({
      selectedCategories: state.selectedCategories.includes(category) ? state.selectedCategories.filter((c) => c !== category) : [...state.selectedCategories, category],
    })),

  hasCategory: (category) => get().selectedCategories.includes(category),

  toggleAll: () => {
    const current = get().selectedCategories
    // 전체가 선택되어 있으면 모두 해제, 아니면 모두 선택
    if (current.length === ALL_CATEGORIES.length) {
      set({ selectedCategories: [] })
    } else {
      set({ selectedCategories: ALL_CATEGORIES })
    }
  },

  isAllSelected: () => get().selectedCategories.length === ALL_CATEGORIES.length,
}))
