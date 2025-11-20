import spoon from '../assets/spoon.svg'

interface InformationProps {
  storeName: string
  storeAddress: string
}

const Information = ({ storeName, storeAddress }: InformationProps) => {
  // useEffect(() => {
  //     const fetchStore = async () => {
  //         try {
  //             const res = await fetch('http://localhost:8080/api/store/detail?storeId=1')
  //             const data = await res.json()
  //             setStore(data)
  //         } catch (err) {
  //             console.error('가게 정보 불러오기 실패:', err)
  //         }
  //     }

  //         fetchStore()
  //     }, [])

  return (
    // <div className='bg-gray-300 w-full h-[80px] rounded-md'>
    //     {!store ? (
    //     <p>가게 정보 불러오는 중...</p>
    //     ) : (
    //     <>
    //         <div className='flex justify-center '>
    //             <img src={spoon} alt='spoon'></img>
    //             <h5 className='font-bold'>{store.name}</h5>
    //         </div>
    //         <p className='pt-[5px] text-sm text-gray-700'>운영시간: {store.operatingTime}</p>
    //     </>
    //     )}
    // </div>
    <div className='flex  flex-col justify-center itmes-center bg-gray-100 w-full h-[85px] p-2 rounded-md'>
      <div className='flex justify-start items-center'>
        <img
          src={spoon}
          alt='spoon'></img>
        <h5 className='text-xl font-bold text-[#444444]'>&nbsp;{storeName || '가게명 없음'}</h5>
      </div>
      <p className='pt-[5px] text-[#444444]'>{storeAddress || '주소 정보 없음'}</p>
    </div>
  )
}

export default Information
