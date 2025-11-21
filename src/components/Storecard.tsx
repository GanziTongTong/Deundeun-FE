import spoonIcon from '../assets/spoon.svg'

interface StoreCardProps {
  name: string
  address: string
  category: string[]
  phoneNumber: string | null
  openingHours: string | null
  distance: string
}

const categoryLabels: Record<string, string> = {
  CHILD_MEAL_CARD: '아동급식카드',
  GOOD_INFLUENCE_STORE: '선한영향력 가게',
  GOOD_NEIGHBOR_STORE: '좋은이웃가게',
}

export default function StoreCard({ name, address, category, phoneNumber, openingHours = '09:00 - 18:00', distance }: StoreCardProps) {
  return (
    <div className='bg-white px-4 py-3 min-w-[280px] rounded-2xl shadow-[0px_0px_4px_0px_rgba(0,0,0,0.15)] '>
      {/* 헤더 - 랭킹과 아이콘 */}
      <div className='flex items-center mb-3 text-[#222]'>
        {/* {parseInt(distance) > 200 ? <div className='bg-[#FF6B35] text-white text-xs font-bold py-1 px-2 rounded mr-2'>{rank}</div> : null} */}

        <img
          src={spoonIcon}
          alt='spoon'
          className='w-8 h-8'
        />
        <div className='text-xl font-bold'>{name}</div>
      </div>

      {/* 가게명 */}

      {/* 주소와 거리 */}
      <div className='flex items-center justify-between mb-3'>
        <p className='text-sm flex-1 text-[#222]'>{address}</p>
        <div className='text-sm text-[#AAA] font-bold ml-2 whitespace-nowrap cursor-none'>{distance}</div>
      </div>

      {/* 전화번호 */}
      {phoneNumber && (
        <p className='text-sm mb-2 text-[#AAA]'>
          전화번호 <span className='text-[#222]'>{phoneNumber}</span>
        </p>
      )}

      {/* 운영시간 */}
      {openingHours && (
        <p className='text-sm mb-3 text-[#AAA]'>
          운영시간 <span className='text-[#222]'>{openingHours}</span>
        </p>
      )}

      {/* 카테고리 태그들 */}
      <div className='flex flex-wrap gap-2'>
        {category.map((cat, index) => (
          <span
            key={index}
            className='bg-[#FFF4DF] text-[#FF6B35] text-xs py-1.5 px-3 rounded-l  '>
            {categoryLabels[cat] || cat}
          </span>
        ))}
      </div>
    </div>
  )
}
