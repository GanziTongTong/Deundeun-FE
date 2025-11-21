import { useNavigate } from 'react-router-dom'

interface PreviousProps {
  text?: string
  navigateTo?: string
}

const Previous = ({ text, navigateTo = '-1' }: PreviousProps) => {
  const navigate = useNavigate()
  const handleBack = () => {
    // 숫자 문자열이면 뒤로가기, 경로 문자열이면 해당 경로로 이동
    if (navigateTo.startsWith('/')) {
      navigate(navigateTo)
    } else {
      navigate(parseInt(navigateTo))
    }
  }
  return (
    <div className='relative flex mb-12 items-center '>
      <button
        onClick={handleBack}
        className=' absolute px-2 text-gray-300 left-0 cursor-pointer'>
        <svg
          width='30'
          height='30'
          viewBox='0 0 32 32'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M20 24L12 16L20 8'
            stroke='black'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>
      {text && <h1 className='text-2xl text-center mx-auto font-bold'>{text}</h1>}
    </div>
  )
}

export default Previous
