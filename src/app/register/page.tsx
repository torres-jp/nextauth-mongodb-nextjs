'use client'
import axios, { AxiosError } from 'axios'
import { useState } from 'react'
import { signIn } from 'next-auth/react'

function RegisterPage() {
  const [error, setError] = useState()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    try {
      const res = await axios.post('/api/auth/signup', {
        email: formData.get('email'),
        password: formData.get('password'),
        fullname: formData.get('fullname'),
      })

      const resAuth = await signIn('credentials', {
        email: res.data.email,
        password: formData.get('password'),
      })

      console.log(resAuth)
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError) {
        setError(error.response?.data.message)
      }
    }
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      <form onSubmit={handleSubmit}>
        {error && (
          <p className='bg-red-500 text-white text-sm p-2 mb-2'>{error}</p>
        )}
        <h1 className='text-4xl font-bold mb-2 block '>Register Page</h1>
        <input
          type='text'
          placeholder='Jhon Doe'
          name='fullname'
          className='bg-zinc-800 px-4 py-2 block mb-2 w-full'
        />

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

        <button className='bg-indigo-500 px-4 py-2 w-full'>Register</button>
      </form>
    </div>
  )
}

export default RegisterPage
