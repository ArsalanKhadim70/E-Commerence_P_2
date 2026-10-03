import React, { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { assets } from "../assets/frontend_assets/assets.js"
import { ShopContext } from '../context/ShopeContext.jsx'
import { toast } from 'react-toastify'


const Navbar = () => {
    const [visible, setVisible] = useState(false)
    const { setShowSearch, getCartCount, user, logout } = useContext(ShopContext)

    const navigate = useNavigate()



    const handleLogout = async () => {
  try {
    await logout()
    toast.success('Logged out successfully')
    navigate('/')
  } catch (error) {
    toast.error('Logout failed')
  }
}

    return (
        <div className='flex items-center justify-between py-5 fond-medium'>
            <Link to="/">  <img src={assets.logo} className='w-36' alt="" /></Link>
            <ul className='hidden sm:flex gap-5 text-sm text-grey-700'>

                <NavLink to={'/'} className='flex flex-col items-center gap-1'>
                    <p>Home</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to={'/Collection'} className='flex flex-col items-center gap-1'>
                    <p>Collection</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to={'/About'} className='flex flex-col items-center gap-1'>
                    <p>About</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to={'/Contact'} className='flex flex-col items-center gap-1'>
                    <p>Contact</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
            </ul>
            <div className='flex items-center gap-6'>
                <img onClick={() => setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt="" />

                                {/* Admin Login Icon */}
                                                <Link to={'/Admin/Login'} className='group relative'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className='w-5 cursor-pointer hover:text-gray-700 transition-colors' viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                                                        <path d="M2 17l10 5 10-5"/>
                                                        <path d="M2 12l10 5 10-5"/>
                                                        <circle cx="12" cy="12" r="3"/>
                                                    </svg>
                                                    <div className='group-hover:block hidden absolute dropdown-menu -left-7 pt-2 z-50'>
                                                        <div className='flex flex-col gap-2 w-32 py-2 px-3 bg-slate-100 text-gray-500 text-xs text-center rounded shadow-md'>
                                                            <p className='cursor-pointer hover:text-black font-medium'>Admin Login</p>
                                                        </div>
                                                    </div>
                                                </Link>

                                {/* Deep Seek code */}
                <div className='group relative'>
                    {user ? (
                        <p className='w-5 h-5 rounded-full bg-black text-white text-xs flex items-center justify-center cursor-pointer'>
                            {user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                        </p>
                    ) : (
                        <Link to={'/Login'}>
                            <img src={assets.profile_icon} className='w-5 cursor-pointer' alt="" />
                        </Link>
                    )}
                    <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-50'>
                        <div className='flex flex-col gap-2 w-40 py-3 px-5 bg-slate-100 text-gray-500'>
                            {user ? (
                                <>
                                    <p className='text-xs text-gray-400 truncate'>{user.email}</p>
                                    <p onClick={() => navigate('/Orders')} className='cursor-pointer hover:text-black'>Orders</p>
                                    <p onClick={handleLogout} className='cursor-pointer hover:text-black'>Log Out</p>
                                </>
                            ) : (
                                <p onClick={() => navigate('/Login')} className='cursor-pointer hover:text-black'>Login</p>
                            )}
                        </div>
                    </div>
                </div>





                <Link to={'/Cart'} className='relative'>
                    <img src={assets.cart_icon} className='w-5 min-w-5 cursor-pointer' alt="" />
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
                </Link>
                <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />
            </div>
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-gray-600'>
                    <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer hover:text-black'>
                        <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="" />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={() => setVisible(false)} className='text-center hover:text-black py-4 pl-6' to='/'>Home</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='text-center hover:text-black py-4 pl-6' to='/Collection'>Collection</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='text-center hover:text-black py-4 pl-6' to='/About'>About</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='text-center hover:text-black py-4 pl-6' to='/Contact'>Contact</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Navbar