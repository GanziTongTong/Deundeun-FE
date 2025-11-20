export interface Store {
  storeId: number
  name: string
  address: string
  categories: string[]
  distance: number
  phoneNumber: string | null
  openingHours: string | null
  latitude: number
  longitude: number
}

export interface ReviewImage {
  imageId: number
  imageUrl: string
}

export interface ReviewKeywords {
  keywords: string[]
}

export interface Review {
  reviewId: number
  images: ReviewImage[]
  keywords: ReviewKeywords
}

export interface StoreDetail {
  storeId: number
  name: string
  category: string
  address: string
  phoneNumber: string | null
  openingHours: string | null
  reviews: Review[]
}

export interface StoreRequest {
  user_latitude: number
  user_longitude: number
  radiusKm: number
  category: 'CHILD_MEAL_CARD' | 'GOOD_NEIGHBOR_STORE' | 'GOOD_INFLUENCE_STORE'
}

export type StoreCategory = 'CHILD_MEAL_CARD' | 'GOOD_NEIGHBOR_STORE' | 'GOOD_INFLUENCE_STORE'
