import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASS

const AdminLogin = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (sessionStorage.getItem('adminLoggedIn') === 'true') {
      navigate('/Admin', { replace: true })
    }
  }, [navigate])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (email.trim() !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      toast.error('Invalid admin email or password')
      return
    }
    sessionStorage.setItem('adminLoggedIn', 'true')
    navigate('/Admin', { replace: true })
  }

  return (
    <main className='min-h-screen bg-gray-50 flex items-center justify-center px-4'>
      <form onSubmit={handleSubmit} className='bg-white border border-gray-200 w-full max-w-md p-8 shadow-sm'>
        <p className='text-xs tracking-[0.25em] text-gray-500 mb-3'>STORE MANAGEMENT</p>
        <h1 className='text-3xl font-medium mb-2'>Admin Login</h1>
        <p className='text-sm text-gray-500 mb-8'>Sign in to manage orders and products.</p>
        <label className='block text-sm mb-2'>Email</label>
        <input
          required
          type='email'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className='w-full border border-gray-300 px-3 py-2 mb-5 outline-none focus:border-black'
          placeholder='admin@gmail.com'
        />
        <label className='block text-sm mb-2'>Password</label>
        <input
          required
          type='password'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className='w-full border border-gray-300 px-3 py-2 mb-6 outline-none focus:border-black'
          placeholder='admin 123'
        />
        <button type='submit' className='w-full bg-black text-white py-3 text-sm'>
          LOGIN TO ADMIN PANEL
        </button>
      </form>
    </main>
  )
}

export default AdminLogin
