import MobileLayout from './MobileLayout'

export default function DesktopLayout() {
  return (
    <div className='md:flex h-screen bg-gray-50 justify-center items-center'>
      <div className='max-w-[30%] w-full h-full no-scrollbar'>
        <MobileLayout />
      </div>
    </div>
  )
}
