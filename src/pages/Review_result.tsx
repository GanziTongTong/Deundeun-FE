import { useNavigate } from "react-router-dom";

const Review_result = () => {
    const navigate = useNavigate();

    const handleBack = () =>{
        navigate(-1);
    };
    
    const handleNext = () => {
        navigate("/review");
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
            {/* 인증완료 보여질 화면 */}
            <div>
                <div className="flex flex-col items-center justify-cente pt-65">
                    <div className="relative w-28 h-28">
                        <svg width="102" height="102" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg"
                            className="absolute top-0 left-0 z-10">
                            <path d="M35.8334 69.1667C40.2115 69.1721 44.5476 68.3123 48.5925 66.6368C52.6374 64.9613 56.3114 62.5031 59.4034 59.4034C62.5031 56.3114 64.9613 52.6374 66.6368 48.5925C68.3123 44.5476 69.1721 40.2115 69.1667 35.8334C69.1721 31.4552 68.3123 27.1191 66.6368 23.0742C64.9613 19.0293 62.5031 15.3553 59.4034 12.2634C56.3114 9.16363 52.6374 6.70539 48.5925 5.02988C44.5476 3.35438 40.2115 2.49463 35.8334 2.50003C31.4552 2.49463 27.1191 3.35438 23.0742 5.02988C19.0293 6.70539 15.3553 9.16363 12.2634 12.2634C9.16363 15.3553 6.70539 19.0293 5.02988 23.0742C3.35438 27.1191 2.49463 31.4552 2.50003 35.8334C2.49463 40.2115 3.35438 44.5476 5.02988 48.5925C6.70539 52.6374 9.16363 56.3114 12.2634 59.4034C15.3553 62.5031 19.0293 64.9613 23.0742 66.6368C27.1191 68.3123 31.4552 69.1721 35.8334 69.1667Z"
                                fill="#FC7E2A" stroke="#FC7E2A" strokeWidth="5" strokeLinejoin="round"/>
                        </svg>
                        <svg width="48" height="36" viewBox="0 0 35 25" fill="none" xmlns="http://www.w3.org/2000/svg"
                            className="absolute top-8 left-7 z-20">
                            <path d="M2.5 12.5L12.5 22.5L32.5 2.5"
                                stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <p className="text-xl">영수증 인증 완료!</p>
                </div>
                <div className="flex justify-center pt-75">
                    <button className="w-[430px] h-[50px] bg-[#FC7E2A] rounded-md p-2 text-white twxt-center"
                    onClick={handleNext}>
                    리뷰 작성하기
                    </button>
                </div>
            </div>
            {/* 인증실패시 보여질 화면 */}
        </div>
    );
};

export default Review_result;