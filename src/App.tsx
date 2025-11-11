import DesktopLayout from './layouts/DesktopLayout'
import MobileLayout from './layouts/MobileLayout'

function App() {
  return (
    <>
      {/* 모바일 레이아웃 (기본) */}
      <div className='md:hidden h-screen'>
        <MobileLayout />
      </div>

      {/* 데스크탑 레이아웃 (중앙 정렬) */}
      <DesktopLayout />
    </>
  )
}

export default App
