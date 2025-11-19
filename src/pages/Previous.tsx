import { useNavigate } from "react-router-dom";

const Previous = () => {
    const navigate = useNavigate();
    const handleBack = () => {navigate(-1)};
    return (
        <div className='relative flex mb-12 items-center '>
            <button
            onClick={handleBack}
            className=' absolute px-2 text-gray-300 left-0'>
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
            <h1 className='text-2xl text-center mx-auto'>영수증 인증</h1>
        </div>
    );
};

export default Previous;