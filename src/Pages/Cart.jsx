// import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../context/ShopeContext'
// import Title from '../components/Title'
// import { assets } from '../assets/frontend_assets/assets'
// import CartTotal from '../components/CartTotal'

// const Cart = () => {
//   const { products, currency, cartItems, ubdateQuantity ,navigate} = useContext(ShopContext)
//   const [cartData, setCartData] = useState([])


//   useEffect(() => {
//     const tempData = []

//     for (const items in cartItems) {
//       for (const item in cartItems[items]) {

//         if (cartItems[items][item] > 0) {
//           tempData.push({
//             _id: items,
//             size: item,
//             quantity: cartItems[items][item]
//           })
//         }

//       }
//     }

//     setCartData(tempData)

//   }, [cartItems])

//   return (
//     <div className='border-t pt-14'>

//       <div className="text-2xl mb-3">
//         <Title text1={'YOUR'} text2={'CART'} />
//       </div>

//       <div className="">
//         {
//           cartData.map((item, index) => {
//             const productsData = products.find((products) => products._id === item._id)
//             return (

//               <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr ] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
//                 <div className="flex items-start gap-6">
//                   <img className='w-16 sm:w-20' src={productsData.image[0]} alt="" />
//                   <div>
//                     <p className='text-xs sm:text-lg  font-medium'>{productsData.name}</p>
//                     <div className="flex items-center gap-5 mt-2">
//                       <p>{currency} {productsData.price}</p>
//                       <p className='border px-2 sm:px-3 sm:py-1 bg-slate-50'>{item.size}</p>
//                       {/* <p className='border px-2 sm:px-3 sm:py-1 bg-slate-50'>Quantity: {item.quantity}</p>  */}

//                     </div>
//                   </div>
//                 </div>
//                 <input onChange={(e) => e.target.value === "" || e.target.value === "0" ? null : ubdateQuantity(item._id, item.size, Number(e.target.value))} className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' type="number" min={1} defaultValue={item.quantity} />
//                 <img onClick={() => ubdateQuantity(item._id, item.size, 0)} className='cursor-pointer w-4 mr-4 ms:w-5' src={assets.bin_icon} alt="" />
//               </div>
//             )
//           })}
//       </div>

//       <div className='flex justify-end my-20'>
//         <div className='w-full sm:w-[450px]'>
//           <CartTotal />
//           <div className="w-full text-end">
//             <button onClick={()=>navigate('/PlaceOrders')} className='bg-black text-white text-sm my-8 py-3 px-8 cursor-pointer'>PROCEED TO CHECKOUT</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Cart













import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopeContext'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import CartTotal from '../components/CartTotal'

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext)
  const [cartData, setCartData] = useState([])


  useEffect(() => {
    const tempData = []

    for (const items in cartItems) {
      for (const item in cartItems[items]) {

        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item]
          })
        }

      }
    }

    setCartData(tempData)

  }, [cartItems])

  return (
    <div className='border-t pt-14'>

      <div className="text-2xl mb-3">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div className="">
        {
          cartData.map((item, index) => {
            const productsData = products.find((products) => products._id === item._id)
            return (

              <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr ] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                <div className="flex items-start gap-6">
                  <img className='w-16 sm:w-20' src={productsData.image[0]} alt="" />
                  <div>
                    <p className='text-xs sm:text-lg  font-medium'>{productsData.name}</p>
                    <div className="flex items-center gap-5 mt-2">
                      <p>{currency} {productsData.price}</p>
                      <p className='border px-2 sm:px-3 sm:py-1 bg-slate-50'>{item.size}</p>
                    </div>
                  </div>
                </div>
                <input onChange={(e) => e.target.value === "" || e.target.value === "0" ? null : updateQuantity(item._id, item.size, Number(e.target.value))} className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' type="number" min={1} defaultValue={item.quantity} />
                <img onClick={() => updateQuantity(item._id, item.size, 0)} className='cursor-pointer w-4 mr-4 ms:w-5' src={assets.bin_icon} alt="" />
              </div>
            )
          })}
      </div>

      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className="w-full text-end">
            <button onClick={()=>navigate('/PlaceOrders')} className='bg-black text-white text-sm my-8 py-3 px-8 cursor-pointer'>PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart