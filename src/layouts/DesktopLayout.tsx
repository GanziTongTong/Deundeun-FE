import MobileLayout from './MobileLayout'

export default function DesktopLayout() {
  return (
    <div className='hidden md:flex h-screen bg-gray-50 justify-center items-center'>
      <div className='max-w-[30%] w-full h-full overflow-y-auto no-scrollbar'>
        <MobileLayout />
      </div>
    </div>
  )
}
