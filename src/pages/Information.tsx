import { useState,useEffect } from 'react'
import spoon from '../assets/spoon.svg'

interface StoreDetail {
  storeId: number
  name: string
  category: string
  operatingTime: string
  mainItems: string
}
const Information = () => {
    const [store, setStore] = useState<StoreDetail | null>(null)
    
    useEffect(() => {
        const fetchStore = async () => {
            try {
                const res = await fetch('http://localhost:8080/api/store/detail?storeId=1')
                const data = await res.json()
                setStore(data)
            } catch (err) {
                console.error('가게 정보 불러오기 실패:', err)
            }
        }
    
            fetchStore()
        }, [])

    return (
        <div className='bg-gray-300 w-full h-[80px] rounded-md'>
            {!store ? (
            <p>가게 정보 불러오는 중...</p>
            ) : (
            <>
                <div className='flex justify-center '>
                    <img src={spoon} alt='spoon'></img>
                    <h5 className='font-bold'>{store.name}</h5>
                </div>
                <p className='pt-[5px] text-sm text-gray-700'>운영시간: {store.operatingTime}</p>
            </>
            )}
        </div>
    //     <div className="flex  flex-col justify-center itmes-center bg-gray-100 w-full h-[85px] p-2 rounded-md">
    //         <div className='flex justify-start items-center'>
    //             <img src={spoon} alt='spoon' ></img>
    //             <h5 className='text-xl font-bold text-[#444444]'>&nbsp;통통빵집</h5>
    //         </div>
    //         <p className="pt-[5px] text-[#444444]">경기 수원시 영통구 영통로 344 1층</p>
    //   </div>
    );
};

export default Information;