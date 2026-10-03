// import React, { useState } from 'react'

// const Login = () => {

//   const [currentState, setCurrentState] = useState('Login')

//   const onSubmitHandler = async(event) => {
//    event.preventDefault()
//   }

//   return (
//     <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
//       <div className="inline-flex items-center gap-2 mb-2 mt-10">
//         <p className='prata-regular text-3xl'>{currentState}</p>
//         <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
//       </div>
//       {currentState === 'Login' ? '' : <input className='w-full px-3 py-2 border border-gray-800' type="text" placeholder='Enter Your Name' required />}
//       <input className='w-full px-3 py-2 border border-gray-800' type="email" placeholder='Enter Your Email' required />
//       <input className='w-full px-3 py-2 border border-gray-800' type="password" placeholder='Enter Your Password' required />

//       <div className="w-full flex justify-between text-sm mt-[-8px]">
//         <p className='cursor-pointer'>Forgert your password ?</p>
//         {
//           currentState === 'Login'
//             ? <p onClick={() => setCurrentState('Sign up')} className='cursor-pointer '>Create Account Here</p>
//             : <p onClick={() => setCurrentState('Login')} className='cursor-pointer '>Login Here</p>
//         }
//       </div>
//       <button className='bg-black text-white font-light w-full px-8 py-2 mt-4 cursor-pointer'>{currentState === 'Login' ? 'Sign up' : 'Login'}</button>
//     </form>
//   )
// }

// export default Login











import React, { useState, useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopeContext'
import { signupUser, loginUser, getAuthErrorMessage } from '../auth'
import { toast } from 'react-toastify'

const Login = () => {
  const { navigate, user } = useContext(ShopContext)

  const [currentState, setCurrentState] = useState('Sign up')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  // Agar user already logged in hai, to home pe bhejo
  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    setLoading(true)

    try {
      if (currentState === 'Sign up') {
        await signupUser(name, email, password)
        toast.success('Account created! Welcome 🎉')
      } else {
        await loginUser(email, password)
        toast.success('Login successful! Welcome back 👋')
      }
      navigate('/')
    } catch (error) {
      const message = getAuthErrorMessage(error.code)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>

      {currentState === 'Login' ? '' : (
        <input
          className='w-full px-3 py-2 border border-gray-800'
          type="text"
          placeholder='Enter Your Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      )}

      <input
        className='w-full px-3 py-2 border border-gray-800'
        type="email"
        placeholder='Enter Your Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        className='w-full px-3 py-2 border border-gray-800'
        type="password"
        placeholder='Enter Your Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={6}
      />

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className='cursor-pointer'>Forgot your password?</p>
        {currentState === 'Login' ? (
          <p onClick={() => setCurrentState('Sign up')} className='cursor-pointer'>
            Create Account Here
          </p>
        ) : (
          <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>
            Login Here
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className='bg-black text-white font-light w-full px-8 py-2 mt-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
      >
        {loading ? 'Please wait...' : currentState === 'Login' ? 'Login' : 'Sign up'}
      </button>
    </form>
  )
}

export default Login