import { useNavigate } from "react-router-dom"

const ReceiptPage = () => {
  const navigate = useNavigate();

  const handleBack = () =>{
      navigate(-1);
  };

  const handleNext =() => {
    navigate("/review_result")
  }

  return (
    <div className='container mx-auto p-4 pt-10'>
      {/* 1 */}
      <div className="relative flex mb-12 items-center ">
        <button onClick={handleBack}
          className=" absolute px-2 text-gray-300 left-0">
          <svg width="30" height="30" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 24L12 16L20 8" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <h1 className='text-2xl text-center mx-auto'>영수증 인증</h1>
      </div>
      {/* 2 */}
      <div className="bg-gray-300 mx-[17px] w-[450px] h-[80px] p-2 rounded-md">
        <h5>통통빵집</h5>
        <p className="pt-[5px]">경기 수원시 영통구 영통로 344 1층</p>
      </div>
      {/* 3 */}
      <h5 className="pt-[28px] p-2 mx-[13px] font-bold text-xl ">구매 인증 방식</h5>
      <div className="grid grid-cols-2 gap-10 text-center mx-[20px] pt-[5px]">
        {/* 카드 결제 버튼 */}
        <button className="group flex flex-col items-center justify-center bg-gray-100 p-4 rounded-md border-2 border-gray-300 w-[200px]
            hover:bg-[#FC7E2A]
            hover:border-[#FC7E2A]
            transition-colors duration-300">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="mb-2 text-gray-500 group-hover:text-white transition-colors duration-300">
            <path 
              fillRule="evenodd" 
              clipRule="evenodd" 
              d="M2.5 29.375C2.5 30.5353 2.96094 31.6481 3.78141 32.4686C4.60188 33.2891 5.71468 33.75 6.875 33.75H33.125C34.2853 33.75 35.3981 33.2891 36.2186 32.4686C37.0391 31.6481 37.5 30.5353 37.5 29.375V17.3438H2.5V29.375ZM7.65625 23.4375C7.65625 22.8159 7.90318 22.2198 8.34272 21.7802C8.78226 21.3407 9.3784 21.0938 10 21.0938H13.75C14.3716 21.0938 14.9677 21.3407 15.4073 21.7802C15.8468 22.2198 16.0938 22.8159 16.0938 23.4375V25C16.0938 25.6216 15.8468 26.2177 15.4073 26.6573C14.9677 27.0968 14.3716 27.3438 13.75 27.3438H10C9.3784 27.3438 8.78226 27.0968 8.34272 26.6573C7.90318 26.2177 7.65625 25.6216 7.65625 25V23.4375ZM33.125 6.25H6.875C5.71468 6.25 4.60188 6.71094 3.78141 7.53141C2.96094 8.35188 2.5 9.46468 2.5 10.625V12.6562H37.5V10.625C37.5 9.46468 37.0391 8.35188 36.2186 7.53141C35.3981 6.71094 34.2853 6.25 33.125 6.25Z"/>
          </svg>
          <p className="text-center text-gray-700 group-hover:text-white transition-colors duration-300">
            카드 결제내역<br/>인증하기
          </p>
        </button>
        {/* 영수증 버튼 */}
        <button className="group flex flex-col items-center justify-center bg-gray-100 p-4 rounded-md border-2 border-gray-300 w-[200px]
            hover:bg-[#FC7E2A]
            hover:border-[#FC7E2A]
            transition-colors duration-300"
            onClick={handleNext}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="mb-2 text-gray-500 group-hover:text-white transition-colors duration-300">
            <path 
              fillRule="evenodd" 
              clipRule="evenodd" 
              d="M16.2966 35H23.7033C28.9049 35 31.5066 35 33.3749 33.775C34.1813 33.2469 34.8756 32.565 35.4183 31.7683C36.6666 29.935 36.6666 27.38 36.6666 22.2733C36.6666 17.1667 36.6666 14.6117 35.4183 12.7783C34.8756 11.9817 34.1813 11.2998 33.3749 10.7717C32.1749 9.98333 30.6716 9.70167 28.3699 9.60167C27.2716 9.60167 26.3266 8.785 26.1116 7.72667C25.9473 6.95145 25.5204 6.25673 24.903 5.75992C24.2856 5.26311 23.5157 4.99468 22.7233 5H17.2766C15.6299 5 14.2116 6.14167 13.8883 7.72667C13.6733 8.785 12.7283 9.60167 11.6299 9.60167C9.32992 9.70167 7.82659 9.985 6.62492 10.7717C5.81915 11.2999 5.12537 11.9818 4.58325 12.7783C3.33325 14.6117 3.33325 17.165 3.33325 22.2733C3.33325 27.3817 3.33325 29.9333 4.58159 31.7683C5.12159 32.5617 5.81492 33.2433 6.62492 33.775C8.49325 35 11.0949 35 16.2966 35ZM19.9999 15.455C16.1649 15.455 13.0549 18.5067 13.0549 22.2717C13.0549 26.0367 16.1666 29.0933 19.9999 29.0933C23.8333 29.0933 26.9449 26.04 26.9449 22.275C26.9449 18.51 23.8333 15.455 19.9999 15.455ZM19.9999 18.1817C17.6999 18.1817 15.8333 20.0133 15.8333 22.2733C15.8333 24.5317 17.6999 26.3633 19.9999 26.3633C22.2999 26.3633 24.1666 24.5317 24.1666 22.2733C24.1666 20.015 22.2999 18.1817 19.9999 18.1817ZM27.8699 16.8183C27.8699 16.065 28.4916 15.455 29.2599 15.455H31.1099C31.8766 15.455 32.4999 16.065 32.4999 16.8183C32.4964 17.1832 32.3482 17.5317 32.0879 17.7873C31.8276 18.0429 31.4764 18.1848 31.1116 18.1817H29.2599C29.0791 18.1834 28.8998 18.1496 28.7321 18.082C28.5644 18.0144 28.4116 17.9145 28.2825 17.7879C28.1535 17.6613 28.0506 17.5105 27.9798 17.3442C27.909 17.1778 27.8717 16.9991 27.8699 16.8183Z"/>
          </svg>
          <p className="text-center text-gray-700 group-hover:text-white transition-colors duration-300">
            영수증으로<br/>인증하기
          </p>
        </button>
      </div>
    </div>
    
  )
}

export default ReceiptPage
