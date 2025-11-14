/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_KAKAO_MAP_API_KEY: string
  // 다른 env 변수들을 여기에 추가.
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Kakao Maps SDK 타입 정의
interface KakaoStatic {
  maps?: unknown
  [key: string]: unknown
}

interface Window {
  kakao: string | KakaoStatic | maps 
}
