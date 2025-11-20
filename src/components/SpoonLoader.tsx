import spoonLoader from '../assets/Spoon Loader.gif'

const SpoonLoader = () => {
  return (
    <div
      className='flex items-center justify-center cursor-none'
      draggable={false}
      style={{ cursor: 'none', caretColor: 'transparent' }}>
      <img
        src={spoonLoader}
        alt='Loading...'
        className='w-16 h-16 '
        draggable={false}
        style={{ userSelect: 'none' }}
      />
    </div>
  )
}

export default SpoonLoader
