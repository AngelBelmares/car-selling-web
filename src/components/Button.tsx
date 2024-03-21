
interface ButtonProps {
  text: string
}

export function Button (props: ButtonProps): JSX.Element {
  return (
    <div className='flex justify-center bg-gradient-to-r from-logan-400/50 to-transparent p-1 rounded-full'>
      <div className='flex w-full justify-center bg-gradient-to-r from-logan-400 to-transparent p-[2px] rounded-full'>
        <button className='w-full text-white text-lg px-6 bg-neutral-900 rounded-full hover:bg-opacity-60  duration-200'>
          {props.text}
        </button>
      </div>
    </div>
  )
}
