import { Button } from './Button'

export function LoginForm (): JSX.Element {
  return (
    <section className='flex flex-col h-auto w-full max-w-screen-sm items-center justify-center text-lg bg-neutral-900 rounded-md py-5 relative'>
      <div className='absolute -z-10 -inset-[2px] w-auto h-auto bg-gradient-to-br from-logan-300/80 via-transparent to-logan-300/80 rounded-md shadow-md' />
      <h1 className='text-3xl font-medium '>Login</h1>
      <form action='/login' method='post' className='flex flex-col items-center w-full px-10 gap-y-10 mt-10 mb-2'>
        <div className='relative w-full py-1 px-3 ring-2 ring-logan-300 rounded-full focus-within:shadow-[0px_0px_4px_4px_rgba(188,176,217,0.76)]'>
          <label htmlFor='username' className='absolute -top-4 left-5 z-10 bg-neutral-900 px-3 text-base'>Username</label>
          <input type='text' id='username' name='username' required className='relative z-0 rounded-full focus:outline-none border-2 border-none bg-inherit w-full px-1' />
        </div>
        <div className='relative w-full py-1 px-3 ring-2 ring-logan-300 rounded-full focus-within:shadow-[0px_0px_4px_4px_rgba(188,176,217,0.76)]'>
          <label htmlFor='password' className='absolute -top-4 left-5 z-10 bg-neutral-900 px-3 text-base'>Password</label>
          <input type='password' id='password' name='password' required className='relative z-0 rounded-full focus:outline-none border-none bg-inherit w-full px-1' />
        </div>
        <Button text='Login' type='submit' showBackgroundLine />
      </form>
    </section>
  )
}
