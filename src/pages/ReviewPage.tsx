import { useNavigate } from "react-router-dom";
const ReviewPage = () => {
  const navigate = useNavigate();

  const handleBack = () =>{
      navigate("/receipt");
  };
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
    </div>
  )
}

export default ReviewPage
