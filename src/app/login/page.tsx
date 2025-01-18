'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

function LoginPage() {
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const res = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    })

    if (res?.error) return setError(res.error as string)

    console.log(res)
    if (res?.ok) return router.push('/dashboard/profile')
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      <form onSubmit={handleSubmit}>
        {error && (
          <p className='bg-red-500 text-white text-sm p-2 mb-2'>{error}</p>
        )}
        <h1 className='text-4xl font-bold mb-2 block '>Login Page</h1>

        <input
          type='email'
          placeholder='JhonD@email.com'
          name='email'
          className='bg-zinc-800 px-4 py-2 block mb-2 w-full'
        />

        <input
          type='password'
          placeholder='********'
          name='password'
          className='bg-zinc-800 px-4 py-2 block mb-2 w-full'
        />

        <button className='bg-indigo-500 px-4 py-2 w-full'>Login</button>
      </form>
    </div>
  )
}

export default LoginPage
