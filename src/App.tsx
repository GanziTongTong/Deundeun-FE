import { use } from 'react'
import AppRouter from './router'

function App() {
  return (
    <div className='h-screen bg-white md:bg-gray-50 md:flex md:justify-center md:items-center'>
      <div
        className='h-full w-full md:max-w-[30%] md:bg-white overflow-y-auto no-scrollbar'
        style={{ WebkitOverflowScrolling: 'touch', userSelect: 'none' }}>
        <AppRouter />
      </div>
    </div>
  )
}

export default App
