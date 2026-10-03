// import React, { useEffect, useState } from 'react'
// import { ShopContext } from '../context/ShopeContext'
// import Title from '../components/Title'
// import { getUserOrders } from '../firestore'

// const Orders = () => {

//   const { products, currency } = useContext(ShopContext)


//   const [orders, setOrders] = useState([])

//   useEffect(() => {
//     if (user) {
//       getUserOrders(user.uid).then(setOrders)
//     }
//   }, [user])


//   return (
//     <div className='border-t pt-16'>

//       <div className="text-2xl">
//         <Title text1={'MY'} text2={'ORDERS'} />
//       </div>

//       <div >

//         {
//           products.slice(1, 4).map((item, index) => (
//             <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col  md:flex-row md:items-center md:justify-between gap-4'>

//               <div className='flex items-start gap-6 text-sm'>
//                 <img className='w-16 sm:w-20 ' src={item.image[0]} alt="" />
//                 <div>
//                   <p className='sm:text-base font-medium'>{item.name}</p>
//                   <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
//                     <p className='text-lg'>{currency}{item.price}</p>
//                     <p>Quantity: 1</p>
//                     <p>Size : M</p>
//                   </div>
//                   <p className='mt-2'>Date: <span className='text-gray-400'> 14,augest,2026</span></p>

//                 </div>

//               </div>


//               <div className='md:w-1/2 flex justify-between'>
//                 <div className="flex items-center gap-2">
//                   <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
//                   <p className='text-sm  md:text-base '>Ready to ship</p>
//                 </div>
//                 <button className='border px-4 py-2 text-sm font-medium rounded-sm '>Track Order</button>
//               </div>
//             </div>

//           ))
//         }
//       </div>

//     </div>
//   )
// }

// export default Orders














// import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../context/ShopeContext'
// import Title from '../components/Title'
// import { getUserOrders } from '../firestore'

// const Orders = () => {

//   const { currency, user } = useContext(ShopContext)
//   const [orders, setOrders] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     if (user) {
//       setLoading(true)
//       getUserOrders(user.uid)
//         .then((data) => setOrders(data))
//         .catch((err) => console.error("Orders fetch error:", err))
//         .finally(() => setLoading(false))
//     } else {
//       setOrders([])
//       setLoading(false)
//     }
//   }, [user])

//   return (
//     <div className='border-t pt-16'>

//       <div className="text-2xl">
//         <Title text1={'MY'} text2={'ORDERS'} />
//       </div>

//       <div>
//         {loading ? (
//           <p className='text-center py-10 text-gray-500'>Loading orders...</p>
//         ) : orders.length === 0 ? (
//           <p className='text-center py-10 text-gray-500'>Koi order nahi mila</p>
//         ) : (
//           orders.map((order, index) => (
//             <div
//               key={index}
//               className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'
//             >
//               <div className='flex items-start gap-6 text-sm'>
//                 <img
//                   className='w-16 sm:w-20'
//                   src={order.items?.[0]?.image?.[0] || order.items?.[0]?.image}
//                   alt=""
//                 />
//                 <div>
//                   <p className='sm:text-base font-medium'>
//                     {order.items?.map((item) => `${item.name} x ${item.quantity}`).join(', ')}
//                   </p>
//                   <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
//                     <p className='text-lg'>{currency}{order.amount}</p>
//                     <p>Items: {order.items?.length}</p>
//                   </div>
//                   <p className='mt-2'>
//                     Date:{' '}
//                     <span className='text-gray-400'>
//                       {order.createdAt?.toDate
//                         ? order.createdAt.toDate().toDateString()
//                         : 'Just now'}
//                     </span>
//                   </p>
//                 </div>
//               </div>

//               <div className='md:w-1/2 flex justify-between'>
//                 <div className="flex items-center gap-2">
//                   <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
//                   <p className='text-sm md:text-base'>{order.status || 'Order Placed'}</p>
//                 </div>
//                 <button className='border px-4 py-2 text-sm font-medium rounded-sm'>
//                   Track Order
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//     </div>
//   )
// }

// export default Orders






















import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopeContext'
import Title from '../components/Title'
import { getUserOrders, deleteOrder } from '../firestore'
import { toast } from 'react-toastify'

const Orders = () => {

  const { currency, user } = useContext(ShopContext)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = () => {
    if (user) {
      setLoading(true)
      getUserOrders(user.uid)
        .then((data) => setOrders(data))
        .catch((err) => console.error("Orders fetch error:", err))
        .finally(() => setLoading(false))
    } else {
      setOrders([])
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [user])

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return
    try {
      await deleteOrder(orderId)
      setOrders((prev) => prev.filter((o) => o._id !== orderId))
      toast.success('Order deleted successfully')
    } catch (error) {
      console.error('Delete order error:', error)
      toast.error('Failed to delete order')
    }
  }

  return (
    <div className='border-t pt-16'>

      <div className="text-2xl">
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div>
        {loading ? (
          <p className='text-center py-10 text-gray-500'>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className='text-center py-10 text-gray-500'>Koi order nahi mila</p>
        ) : (
          orders.map((order, index) => {
            const orderImages = order.items?.flatMap((item) => {
              const images = Array.isArray(item.image) ? item.image : [item.image]
              return images.filter(Boolean)
            }) ?? []

            return (
              <div
                key={order._id || index}
                className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4 relative'
              >
                {order.status === 'Cancelled' && (
                  <button
                    onClick={() => handleDeleteOrder(order._id)}
                    className='absolute top-2 right-2 bg-red-600 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center hover:bg-red-700 z-10'
                  >
                    &#10005;
                  </button>
                )}
                <div className='flex items-start gap-6 text-sm'>
                  <div className='flex -space-x-2'>
                    {orderImages.slice(0, 4).map((image, imageIndex) => (
                      <img
                        key={`${order._id || index}-image-${imageIndex}`}
                        className='w-14 h-14 sm:w-16 sm:h-16 object-cover border-2 border-white rounded-sm bg-gray-50'
                        src={image}
                        alt=''
                      />
                    ))}
                    {orderImages.length > 4 && (
                      <div className='w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center border-2 border-white rounded-sm bg-gray-100 text-xs font-medium'>+{orderImages.length - 4}</div>
                    )}
                  </div>
                  <div>
                    <p className='sm:text-base font-medium'>
                      {order.items?.map((item) => `${item.name} x ${item.quantity}`).join(', ')}
                    </p>
                    <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                      <p className='text-lg'>{currency}{order.amount}</p>
                      <p>Items: {order.items?.length}</p>
                    </div>
                    <p className='mt-2'>
                      Date:{' '}
                      <span className='text-gray-400'>
                        {order.createdAt?.toDate
                          ? order.createdAt.toDate().toDateString()
                          : 'Just now'}
                      </span>
                    </p>
                  </div>
                </div>

                <div className='md:w-1/2 flex justify-between'>
                  <div className="flex items-center gap-2">
                    <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                    <p className='text-sm md:text-base'>{order.status || 'Order Placed'}</p>
                  </div>
                  <button className='border px-4 py-2 text-sm font-medium rounded-sm'>
                    Track Order
                  </button>
                </div>
              </div>
            )
          })
        )}
      </div>

    </div>
  )
}

export default Orders