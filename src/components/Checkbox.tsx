interface CheckboxProps {
  checked: boolean
  onChange: () => void
  label: string
}

export default function Checkbox({ checked, onChange, label }: CheckboxProps) {
  return (
    <label className='flex items-center gap-2 cursor-pointer'>
      <div className='relative flex items-center justify-center'>
        <input
          type='checkbox'
          checked={checked}
          onChange={onChange}
          className='sr-only peer'
        />
        <div className={`w-5 h-5 border-2 rounded transition-all ${checked ? 'border-orange-500 ' : 'border-gray-300 bg-white'}`}>
          {checked && (
            <svg
              className='w-full h-full text-orange-500'
              viewBox='0 0 20 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M6 10L9 13L14 7'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          )}
        </div>
      </div>
      <span className={`text-s text-[#444444]`}>{label}</span>
    </label>
  )
}
