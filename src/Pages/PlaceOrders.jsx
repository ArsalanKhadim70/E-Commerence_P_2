// import React, { useContext, useState } from 'react'
// import Title from '../components/Title'
// import CartTotal from '../components/CartTotal'
// import { assets } from '../assets/frontend_assets/assets'
// import { ShopContext } from '../context/ShopeContext'
// import { createOrder } from '../firestore'
// import { toast } from 'react-toastify'

// const PlaceOrders = () => {

//     const { navigate } = useContext(ShopContext)

//     const [method, setMethod] = useState('cod')


//     const handlePlaceOrder = async () => {
//         if (!user) {
//       toast.error('Please login first')
//             navigate('/Login')
//             return
//         }

//         const orderData = {
//             userId: user.uid,
//             items: cartItemsArray, // cartItems ko array mein convert karo
//             amount: getCartAmount() + delivery_fee,
//             address: { firstName, lastName, email, street, city, state, zip, country, phone },
//             paymentMethod: method,
//             status: 'Order Placed',
//         }

//         await createOrder(orderData)
//         toast.success('Order placed successfully!')
//         // cart clear karo
//         navigate('/Orders')
//     }

//     return (
//         <div className='flex flex-col  sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
//             {/* Left Side */}
//             <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
//                 <div className="text-xl sm:text-2xl my-3">
//                     <Title text1={'DELIVERY'} text2={'INFORMATION'} />
//                 </div>
//                 <div className="flex gap-3">
//                     <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First Name' />
//                     <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last Name' />
//                 </div>
//                 <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email Address' />
//                 <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' />
//                 <div className="flex gap-3">
//                     <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
//                     <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />
//                 </div>
//                 <div className="flex gap-3">
//                     <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zip Code' />
//                     <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />
//                 </div>
//                 <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone' />
//             </div>
//             {/* Right Side */}
//             <div className="mt-8">
//                 <div className="mt-8 min-w-80">
//                     <CartTotal />
//                 </div>

//                 <div className="mt-12">
//                     <Title text1={'PAYMENT'} text2={'METHOD '} />
//                     {/* Payment meythod Selection */}
//                     <div className="flex gap-3 flex-col lg:flex-row">
//                         <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
//                             <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
//                             <img className='h-5 mx-4 ' src={assets.stripe_logo} alt="" />
//                         </div>
//                         <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
//                             <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
//                             <img className='h-5 mx-4 ' src={assets.razorpay_logo} alt="" />
//                         </div>
//                         <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
//                             <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
//                             <p className='text-gray-500 text-sm font-medium mx-4 '>CASH ON DELIVERY</p>
//                         </div>
//                     </div>
//                     <div className="w-full text-end mt-8">
//                         <button onClick={() => navigate('/Orders')} className='bg-black text-white  text-sm py-3 px-16 cursor-pointer'>PLACE ORDER</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default PlaceOrders















// import React, { useContext, useState } from 'react'
// import Title from '../components/Title'
// import CartTotal from '../components/CartTotal'
// import { assets } from '../assets/frontend_assets/assets'
// import { ShopContext } from '../context/ShopeContext'
// import { createOrder } from '../firestore'
// import { toast } from 'react-toastify'

// const PlaceOrders = () => {

//   const {
//     navigate,
//     user,
//     cartItems,
//     getCartAmount,
//     delivery_fee,
//     products,
//     currency,
//     clearCart,       // 👈 ye ShopeContext mein add karna padega
//   } = useContext(ShopContext)

//   const [method, setMethod] = useState('cod')
//   const [loading, setLoading] = useState(false)

//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     street: '',
//     city: '',
//     state: '',
//     zip: '',
//     country: '',
//     phone: '',
//   })

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value })
//   }

//   // cartItems object ko array mein convert karo
//   const getCartItemsArray = () => {
//     const arr = []
//     for (const itemId in cartItems) {
//       for (const size in cartItems[itemId]) {
//         if (cartItems[itemId][size] > 0) {
//           const product = products.find((p) => p._id === itemId)
//           if (product) {
//             arr.push({
//               _id: itemId,
//               name: product.name,
//               price: product.price,
//               image: product.image,
//               size,
//               quantity: cartItems[itemId][size],
//             })
//           }
//         }
//       }
//     }
//     return arr
//   }

//   const handlePlaceOrder = async () => {
//     if (!user) {
//       toast.error('Please login first')
//       navigate('/Login')
//       return
//     }

//     const items = getCartItemsArray()
//     if (items.length === 0) {
//       toast.error('Your cart is empty')
//       return
//     }

//     // Address validation
//     const required = ['firstName', 'lastName', 'email', 'street', 'city', 'state', 'zip', 'country', 'phone']
//     for (const field of required) {
//       if (!formData[field].trim()) {
//         toast.error(`Please fill ${field}`)
//         return
//       }
//     }

//     try {
//       setLoading(true)

//       const orderData = {
//         userId: user.uid,
//         items,
//         amount: getCartAmount() + delivery_fee,
//         address: formData,
//         paymentMethod: method,
//         status: 'Order Placed',
//       }

//       await createOrder(orderData)

//       // cart clear karo (Firestore + local)
//       await clearCart()

//       toast.success('Order placed successfully! 🎉')
//       navigate('/Orders')
//     } catch (error) {
//       console.error('Order error:', error)
//       toast.error('Failed to place order. Please try again.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
//       {/* Left Side */}
//       <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
//         <div className="text-xl sm:text-2xl my-3">
//           <Title text1={'DELIVERY'} text2={'INFORMATION'} />
//         </div>
//         <div className="flex gap-3">
//           <input name="firstName" value={formData.firstName} onChange={handleChange} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First Name' />
//           <input name="lastName" value={formData.lastName} onChange={handleChange} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last Name' />
//         </div>
//         <input name="email" value={formData.email} onChange={handleChange} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email Address' />
//         <input name="street" value={formData.street} onChange={handleChange} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' />
//         <div className="flex gap-3">
//           <input name="city" value={formData.city} onChange={handleChange} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
//           <input name="state" value={formData.state} onChange={handleChange} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />
//         </div>
//         <div className="flex gap-3">
//           <input name="zip" value={formData.zip} onChange={handleChange} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Zip Code' />
//           <input name="country" value={formData.country} onChange={handleChange} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />
//         </div>
//         <input name="phone" value={formData.phone} onChange={handleChange} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Phone' />
//       </div>

//       {/* Right Side */}
//       <div className="mt-8">
//         <div className="mt-8 min-w-80">
//           <CartTotal />
//         </div>

//         <div className="mt-12">
//           <Title text1={'PAYMENT'} text2={'METHOD'} />
//           <div className="flex gap-3 flex-col lg:flex-row">
//             <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
//               <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
//               <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
//             </div>
//             <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
//               <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
//               <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
//             </div>
//             <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
//               <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
//               <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
//             </div>
//           </div>

//           <div className="w-full text-end mt-8">
//             <button
//               onClick={handlePlaceOrder}
//               disabled={loading}
//               className='bg-black text-white text-sm py-3 px-16 cursor-pointer disabled:opacity-50'
//             >
//               {loading ? 'Placing...' : 'PLACE ORDER'}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default PlaceOrders























import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/frontend_assets/assets'
import { ShopContext } from '../context/ShopeContext'
import { createOrder } from '../firestore'
import { toast } from 'react-toastify'

const PlaceOrders = () => {

  const {
    navigate,
    user,
    cartItems,
    getCartAmount,
    delivery_fee,
    products,
    clearCart,
  } = useContext(ShopContext)

  const [method, setMethod] = useState('cod')
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    phone: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const getCartItemsArray = () => {
    const arr = []
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          const product = products.find((p) => p._id === itemId)
          if (product) {
            arr.push({
              _id: itemId,
              name: product.name,
              price: product.price,
              image: product.image,
              size,
              quantity: cartItems[itemId][size],
            })
          }
        }
      }
    }
    return arr
  }

  const handlePlaceOrder = async () => {
    if (!user) {
      toast.error('Please login first')
      navigate('/Login')
      return
    }

    const items = getCartItemsArray()
    if (items.length === 0) {
      toast.error('Your cart is empty')
      return
    }

    const required = ['firstName', 'lastName', 'email', 'street', 'city', 'state', 'zip', 'country', 'phone']
    for (const field of required) {
      if (!formData[field].trim()) {
        toast.error(`Please fill ${field}`)
        return
      }
    }

    try {
      setLoading(true)

      const orderData = {
        userId: user.uid,
        items,
        amount: getCartAmount() + delivery_fee,
        address: formData,
        paymentMethod: method,
        status: 'Order Placed',
      }

      await createOrder(orderData)
      await clearCart()

      toast.success('Order placed successfully! 🎉')
      navigate('/Orders')
    } catch (error) {
      console.error('Order error:', error)
      toast.error('Failed to place order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* Left Side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className="flex gap-3">
          <input name="firstName" value={formData.firstName} onChange={handleChange} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First Name' />
          <input name="lastName" value={formData.lastName} onChange={handleChange} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last Name' />
        </div>
        <input name="email" value={formData.email} onChange={handleChange} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email Address' />
        <input name="street" value={formData.street} onChange={handleChange} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' />
        <div className="flex gap-3">
          <input name="city" value={formData.city} onChange={handleChange} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
          <input name="state" value={formData.state} onChange={handleChange} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='State' />
        </div>
        <div className="flex gap-3">
          <input name="zip" value={formData.zip} onChange={handleChange} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Zip Code' />
          <input name="country" value={formData.country} onChange={handleChange} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />
        </div>
        <input name="phone" value={formData.phone} onChange={handleChange} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Phone' />
      </div>

      {/* Right Side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          <div className="flex gap-3 flex-col lg:flex-row">
            <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
            </div>
            <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
            </div>
            <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className='bg-black text-white text-sm py-3 px-16 cursor-pointer disabled:opacity-50'
            >
              {loading ? 'Placing...' : 'PLACE ORDER'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrders