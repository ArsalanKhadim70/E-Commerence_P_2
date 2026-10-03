import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ShopContext } from '../context/ShopeContext'
import { addProduct, deleteProduct, getAllOrders, updateOrderStatus } from '../firestore'
import { uploadImageToCloudinary } from '../cloudinary'

const formatDate = (timestamp) => {
  const date = timestamp?.toDate ? timestamp.toDate() : timestamp ? new Date(timestamp) : null
  return date && !Number.isNaN(date.getTime()) ? date.toLocaleString() : 'Just now'
}

const Admin = () => {
  const navigate = useNavigate()
  const { products, currency, refreshProducts } = useContext(ShopContext)
  const [orders, setOrders] = useState([])
  const [activeTab, setActiveTab] = useState('dashboard')
  const [loadingOrders, setLoadingOrders] = useState(true)
  const [savingProduct, setSavingProduct] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [updatingOrder, setUpdatingOrder] = useState('')
  const [form, setForm] = useState({
    name: '', description: '', price: '', image: '', category: '', subCategory: '', sizes: 'S, M, L, XL', bestseller: false,
  })
  const fileInputRef = useRef(null)

  const loadOrders = async () => {
    try {
      setLoadingOrders(true)
      setOrders(await getAllOrders())
    } catch (error) {
      console.error('Admin orders error:', error)
      toast.error('Failed to load orders')
    } finally {
      setLoadingOrders(false)
    }
  }

  useEffect(() => {
    if (sessionStorage.getItem('adminLoggedIn') !== 'true') {
      navigate('/Admin/Login', { replace: true })
      return
    }
    loadOrders()
  }, [navigate])

  // Only show orders that are NOT cancelled
  const activeOrders = useMemo(() => orders.filter((order) => order.status !== 'Cancelled'), [orders])

  const stats = useMemo(() => ({
    totalOrders: activeOrders.length,
    pending: activeOrders.filter((order) => order.status === 'Order Placed').length,
    products: products.length,
  }), [activeOrders, products])

  const handleStatus = async (orderId, status) => {
    try {
      setUpdatingOrder(orderId)
      await updateOrderStatus(orderId, status)
      // If cancelled, remove from list; otherwise update status
      if (status === 'Cancelled') {
        setOrders((current) => current.filter((order) => order._id !== orderId))
      } else {
        setOrders((current) => current.map((order) => order._id === orderId ? { ...order, status } : order))
      }
      toast.success(`Order ${status.toLowerCase()}`)
    } catch (error) {
      console.error('Order status error:', error)
      toast.error('Failed to update order status')
    } finally {
      setUpdatingOrder('')
    }
  }

  const handleImageUpload = async (file) => {
    if (!file) return
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file only')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB')
      return
    }
    try {
      setUploadingImage(true)
      const url = await uploadImageToCloudinary(file)
      setForm((prev) => ({ ...prev, image: url }))
      toast.success('Image uploaded successfully')
    } catch (error) {
      console.error('Image upload error:', error)
      toast.error('Failed to upload image')
    } finally {
      setUploadingImage(false)
    }
  }

  const handleProduct = async (event) => {
    event.preventDefault()
    if (!form.image) {
      toast.error('Product image is required')
      return
    }
    try {
      setSavingProduct(true)
      await addProduct({
        name: form.name.trim(),
        description: form.description.trim(),
        price: Number(form.price),
        image: [form.image],
        category: form.category.trim(),
        subCategory: form.subCategory.trim(),
        sizes: form.sizes.split(',').map((size) => size.trim()).filter(Boolean),
        bestseller: form.bestseller,
      })
      await refreshProducts()
      setForm({ name: '', description: '', price: '', image: '', category: '', subCategory: '', sizes: 'S, M, L, XL', bestseller: false })
      toast.success('Product added successfully')
      setActiveTab('products')
    } catch (error) {
      console.error('Product add error:', error)
      toast.error('Failed to add product')
    } finally {
      setSavingProduct(false)
    }
  }

    const handleDeleteProduct = async (productId) => {
      if (!window.confirm('Kya aap ye product delete karna chahte hain?')) return
      try {
        await deleteProduct(productId)
        await refreshProducts()
        toast.success('Product deleted successfully')
      } catch (error) {
        console.error('Product delete error:', error)
        toast.error('Failed to delete product')
      }
    }

  const logout = () => {
    sessionStorage.removeItem('adminLoggedIn')
    navigate('/Admin/Login', { replace: true })
  }

  return (
    <div className='min-h-screen bg-gray-50 -mx-4 sm:-mx-[5vw] md:-mx-[7vw] lg:-mx-[9vw]'>
      <header className='bg-black text-white px-5 sm:px-[5vw] py-5 flex items-center justify-between'>
        <div>
          <p className='text-xs tracking-[0.25em] text-gray-400'>STORE MANAGEMENT</p>
          <h1 className='text-xl mt-1'>Admin Panel</h1>
        </div>
        <button onClick={logout} className='border border-gray-600 px-4 py-2 text-sm hover:bg-white hover:text-black'>Logout</button>
      </header>
      <div className='flex flex-col md:flex-row max-w-7xl mx-auto w-full overflow-hidden'>
              <aside className='md:w-56 bg-white border-r border-gray-200 p-4 flex md:flex-col gap-2 overflow-x-auto'>
          {['dashboard', 'orders', 'add-product', 'products'].map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)} className={`text-left px-4 py-3 text-sm capitalize whitespace-nowrap ${activeTab === tab ? 'bg-black text-white' : 'hover:bg-gray-100'}`}>
              {tab.replace('-', ' ')}
            </button>
          ))}
        </aside>
              <main className='flex-1 p-4 sm:p-8 min-w-0 overflow-x-hidden'>
          {activeTab === 'dashboard' && (
            <>
                    <h2 className='text-xl sm:text-2xl mb-4 sm:mb-6'>Dashboard</h2>
                    <div className='grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4'>
                {[
                  ['Total Orders', stats.totalOrders],
                  ['Pending Orders', stats.pending],
                  ['Products', stats.products],
                      ].map(([label, value]) => <div key={label} className='bg-white border p-4 sm:p-5'><p className='text-xs sm:text-sm text-gray-500'>{label}</p><p className='text-2xl sm:text-3xl mt-2 sm:mt-3'>{value}</p></div>)}
              </div>
                    <button onClick={() => setActiveTab('orders')} className='mt-6 sm:mt-8 bg-black text-white px-4 sm:px-5 py-2 sm:py-3 text-sm'>VIEW ORDERS</button>
            </>
          )}
          {activeTab === 'orders' && (
            <section>
                        <h2 className='text-xl sm:text-2xl mb-4 sm:mb-6'>Customer Orders</h2>
                        {loadingOrders ? <p className='text-gray-500'>Loading orders...</p> : activeOrders.length === 0 ? <p className='text-gray-500'>Abhi koi order nahi hai.</p> : (
                <div className='space-y-4'>
                            {activeOrders.map((order) => {
                              const orderImages = order.items?.flatMap((item) => {
                                const images = Array.isArray(item.image) ? item.image : [item.image]
                                return images.filter(Boolean)
                              }) ?? []

                              return (
                                <article key={order._id} className='bg-white border p-3 sm:p-5'>
                                  <div className='flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4'>
                                    <div className='flex gap-3 sm:gap-4 min-w-0'>
                                      <div className='flex -space-x-2'>
                                        {orderImages.slice(0, 4).map((image, imageIndex) => (
                                          <img key={`${order._id}-image-${imageIndex}`} className='w-14 h-14 sm:w-16 sm:h-16 object-cover border-2 border-white rounded-sm bg-gray-50' src={image} alt='' />
                                        ))}
                                        {orderImages.length > 4 && (
                                          <div className='w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center border-2 border-white rounded-sm bg-gray-100 text-xs font-medium'>+{orderImages.length - 4}</div>
                                        )}
                                      </div>
                                      <div className='min-w-0'>
                                        <p className='font-medium text-sm sm:text-base break-words'>{order.items?.map((item) => `${item.name} x ${item.quantity}`).join(', ')}</p>
                                        <p className='text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2'>Customer: {order.address?.firstName} {order.address?.lastName}</p>
                                        <p className='text-xs sm:text-sm text-gray-500 break-all'>{order.address?.email} · {order.address?.phone}</p>
                                        <p className='text-xs sm:text-sm text-gray-500 mt-1'>Order date: {formatDate(order.createdAt)}</p>
                                      </div>
                                    </div>
                                    <div className='lg:text-right flex flex-wrap items-center gap-2 lg:flex-col lg:items-end'>
                                      <p className='text-base sm:text-lg font-medium'>{currency}{order.amount}</p>
                                      <p className='text-xs sm:text-sm text-gray-500'>{order.paymentMethod?.toUpperCase()}</p>
                                      <div className='flex gap-2'>
                                        {order.status !== 'Confirmed' && (
                                          <button disabled={updatingOrder === order._id} onClick={() => handleStatus(order._id, 'Confirmed')} className='bg-green-600 text-white px-2 sm:px-3 py-1.5 sm:py-2 text-xs disabled:opacity-50'>CONFIRM</button>
                                        )}
                                        {order.status !== 'Cancelled' && (
                                          <button disabled={updatingOrder === order._id} onClick={() => handleStatus(order._id, 'Cancelled')} className='bg-red-600 text-white px-2 sm:px-3 py-1.5 sm:py-2 text-xs disabled:opacity-50'>CANCEL</button>
                                        )}
                                      </div>
                                      <p className={`text-xs mt-1 ${order.status === 'Cancelled' ? 'text-red-600' : order.status === 'Confirmed' ? 'text-green-600' : 'text-orange-600'}`}>{order.status || 'Order Placed'}</p>
                                    </div>
                                  </div>
                                </article>
                              )
                            })}
                </div>
              )}
            </section>
          )}
          {activeTab === 'add-product' && (
            <section>
                        <h2 className='text-xl sm:text-2xl mb-4 sm:mb-6'>Add Product</h2>
                        <form onSubmit={handleProduct} className='bg-white border p-4 sm:p-5 grid sm:grid-cols-2 gap-4 max-w-3xl'>
                {[
                            ['name', 'Product name', 'text'], ['price', 'Price', 'number'], ['category', 'Category', 'text'], ['subCategory', 'Sub-category', 'text'], ['sizes', 'Sizes (comma separated)', 'text'],
                                    ].map(([key, placeholder, type]) => <input key={key} required={['name', 'price', 'category'].includes(key)} type={type} value={form[key]} onChange={(event) => setForm({ ...form, [key]: event.target.value })} placeholder={placeholder} className='border border-gray-300 px-3 py-2 text-sm' />)}
                <textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder='Description' className='border border-gray-300 px-3 py-2 sm:col-span-2 min-h-24' />
                          {/* Image upload drop zone */}
                          <div className='sm:col-span-2'>
                            <p className='text-sm mb-2'>Product Image</p>
                            <div
                              onClick={() => fileInputRef.current?.click()}
                              onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('border-black') }}
                              onDragLeave={(e) => { e.currentTarget.classList.remove('border-black') }}
                              onDrop={(e) => { e.preventDefault(); e.currentTarget.classList.remove('border-black'); const file = e.dataTransfer.files[0]; if (file) handleImageUpload(file) }}
                              className='border-2 border-dashed border-gray-300 p-6 text-center cursor-pointer hover:border-black transition-colors'
                            >
                              {uploadingImage ? (
                                <p className='text-sm text-gray-500'>Uploading image...</p>
                              ) : form.image ? (
                                                              <div className='relative inline-block'>
                                  <img src={form.image} alt='Preview' className='h-24 object-contain' />
                                                                <button type='button' onClick={() => setForm((prev) => ({ ...prev, image: '' }))} className='absolute -top-2 -right-2 bg-red-600 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center hover:bg-red-700'>&#10005;</button>
                                                                <p className='text-xs text-gray-400 mt-1'>Click ya drag to change</p>
                                                              </div>
                                                            ) : (
                                <p className='text-sm text-gray-500'>Click karo ya image yahan drag karo</p>
                              )}
                            </div>
                            <input
                              ref={fileInputRef}
                              type='file'
                              accept='image/*'
                              className='hidden'
                              onChange={(e) => { const file = e.target.files[0]; if (file) handleImageUpload(file); e.target.value = '' }}
                            />
                          </div>
                          <label className='flex items-center gap-2 text-sm'><input type='checkbox' checked={form.bestseller} onChange={(event) => setForm({ ...form, bestseller: event.target.checked })} /> Mark as bestseller</label>
                          <button disabled={savingProduct || uploadingImage} className='bg-black text-white py-3 text-sm sm:col-span-2 disabled:opacity-50'>{savingProduct ? 'ADDING...' : 'ADD PRODUCT'}</button>
                        </form>
                      </section>
                    )}
          {activeTab === 'products' && (
            <section>
                        <h2 className='text-xl sm:text-2xl mb-4 sm:mb-6'>Products ({products.length})</h2>
                        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4'>{products.map((product) => <div key={product._id} className='bg-white border p-2 sm:p-3 relative group'><button type='button' onClick={() => handleDeleteProduct(product._id)} className='absolute top-1 right-1 bg-red-600 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700 z-10'>&#10005;</button><img src={product.image?.[0] || product.image} alt={product.name} className='w-full aspect-square object-cover' /><p className='text-xs sm:text-sm mt-2 sm:mt-3 truncate'>{product.name}</p><p className='text-xs sm:text-sm text-gray-500'>{currency}{product.price}</p></div>)}</div>
            </section>
          )}
        </main>
      </div>
    </div>
  )
}

export default Admin
