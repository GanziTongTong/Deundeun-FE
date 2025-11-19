declare namespace kakao.maps {
  class LatLng {
    constructor(latitude: number, longitude: number)
    getLat(): number
    getLng(): number
  }

  class Map {
    constructor(container: HTMLElement, options: MapOptions)
    setCenter(latlng: LatLng): void
    getCenter(): LatLng
    setLevel(level: number, options?: { anchor?: LatLng; animate?: boolean }): void
    getLevel(): number
  }

  interface MapOptions {
    center: LatLng
    level: number
  }

  class Marker {
    constructor(options: MarkerOptions)
    setMap(map: Map | null): void
    getPosition(): LatLng
  }

  interface MarkerOptions {
    position: LatLng
    map?: Map
    title?: string
  }

  class MarkerClusterer {
    constructor(options: MarkerClustererOptions)
    addMarkers(markers: Marker[]): void
    clear(): void
  }

  interface MarkerClustererOptions {
    map: Map
    averageCenter?: boolean
    minLevel?: number
    disableClickZoom?: boolean
  }

  class Cluster {
    getCenter(): LatLng
  }

  class CustomOverlay {
    constructor(options: CustomOverlayOptions)
    setMap(map: Map | null): void
    getPosition(): LatLng
  }

  interface CustomOverlayOptions {
    position: LatLng
    content: HTMLElement | string
    map?: Map
    xAnchor?: number
    yAnchor?: number
    zIndex?: number
    clickable?: boolean
  }

  namespace event {
    function addListener(target: Map | Marker | MarkerClusterer, type: string, handler: (...args: unknown[]) => void): void
  }

  function load(callback: () => void): void
}

interface Window {
  kakao: {
    maps: typeof kakao.maps
  }
}
