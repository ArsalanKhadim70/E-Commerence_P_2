// import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/frontend_assets/assets.js"
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { onAuthChange, logoutUser } from "../auth";  // ← YE ADD KARO
// import { saveUserCart } from "../firestore"


// export const ShopContext = createContext()


// const ShopContextProvider = (props) => {

//     const currency = "$"
//     const delivery_fee = 10
//     const [search, setSearch] = useState('')
//     const [showSearch, setShowSearch] = useState(false)
//     const [cartItems, setCartItems] = useState({})
//     const [user, setUser] = useState(null)

//     const navigate = useNavigate()


//     // Listen to Firebase auth state
//     useEffect(() => {
//         const unsubscribe = onAuthChange((currentUser) => {
//             setUser(currentUser)
//         })
//         return () => unsubscribe()
//     }, [])

//     const addToCart = async (itemId, size) => {

//         let cartData = structuredClone(cartItems)

//         if (!size) {
//             toast.error('Select Product Size')
//             return
//         }
//         // if (size) {
//         //     toast.success('Product Add Sucess')
//         //     return
//         // }



//         if (cartData[itemId]) {
//             if (cartData[itemId][size]) {
//                 cartData[itemId][size] += 1
//             }
//             else {
//                 cartData[itemId][size] = 1
//             }
//         }
//         else {
//             cartData[itemId] = {}
//             cartData[itemId][size] = 1
//         }
//         setCartItems(cartData)

//     }

//     const getCartCount = () => {
//         let totalCount = 0
//         for (const items in cartItems) {
//             for (const item in cartItems[items]) {
//                 try {
//                     if (cartItems[items][item] > 0) {
//                         totalCount += cartItems[items][item]

//                     }
//                 } catch (error) {
//                     console.log("Error:", error)
//                 }

//             }

//         }
//         return totalCount
//         // console.log(cartItems)
//     }

//     const ubdateQuantity = (itemId, size, quantity) => {

//         let cartData = structuredClone(cartItems)

//         cartData[itemId][size] = quantity;
//         setCartItems(cartData)
//     }


//     const getCartAmount = () => {
//         let totalAmount = 0
//         for (const items in cartItems) {
//             let iteminfo = products.find((products) => products._id === items)
//             for (const item in cartItems[items]) {
//                 try {
//                     if (cartItems[items][item] > 0) {
//                         totalAmount += iteminfo.price * cartItems[items][item]

//                     }
//                 } catch (error) {
//                     console.log("Error:", error)
//                 }
//             }
//         }


//         return totalAmount
//     }
//     const clearCart = async () => {
//         setCartItems({})
//         if (user) {
//             await saveUserCart(user.uid, {})
//         }
//     }

//     const value = {
//         products, currency, delivery_fee,
//         search, setSearch, showSearch, setShowSearch,
//         cartItems, addToCart,
//         getCartCount, ubdateQuantity, getCartAmount, navigate,
//         user,
//         logout: logoutUser,
//          clearCart,
//     }

//     return (

//         <ShopContext.Provider value={value}>
//             {props.children}
//         </ShopContext.Provider>
//     )
// }
// export default ShopContextProvider













import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { onAuthChange, logoutUser } from "../auth";
import { getAllProducts, saveUserCart, getUserData } from "../firestore";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);       // 🔥 Firestore se aayenge
  const [loading, setLoading] = useState(true);        // 🔥 loading state

  const navigate = useNavigate();

  const refreshProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error("Products refresh error:", error);
      toast.error("Failed to refresh products");
      throw error;
    }
  };

  // ============================================
  // 1. Products Firestore se fetch karo
  // ============================================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        await refreshProducts();
      } catch (error) {
        console.error("❌ Products fetch error:", error);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // ============================================
  // 2. Auth listener + User cart load
  // ============================================
  useEffect(() => {
    const unsubscribe = onAuthChange(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const userData = await getUserData(currentUser.uid);
          if (userData?.cart) {
            setCartItems(userData.cart);
          }
        } catch (error) {
          console.error("Cart load error:", error);
        }
      } else {
        setCartItems({});
      }
    });
    return () => unsubscribe();
  }, []);

  // ============================================
  // 3. Cart change hone pe Firestore mein save
  // ============================================
  useEffect(() => {
    if (user && Object.keys(cartItems).length > 0) {
      saveUserCart(user.uid, cartItems).catch((err) =>
        console.error("Cart save error:", err)
      );
    }
  }, [cartItems, user]);

  // ============================================
  // 4. Add to Cart
  // ============================================
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);
    toast.success("Product added to cart");
  };

  // ============================================
  // 5. Cart Count
  // ============================================
  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          console.log("Error:", error);
        }
      }
    }
    return totalCount;
  };

  // ============================================
  // 6. Update Quantity (spelling fix: ubdate → update)
  // ============================================
  const updateQuantity = (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
  };

  // ============================================
  // 7. Cart Amount (Firestore products se)
  // ============================================
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      if (!itemInfo) continue;
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {
          console.log("Error:", error);
        }
      }
    }
    return totalAmount;
  };

  // ============================================
  // 8. Clear Cart
  // ============================================
  const clearCart = async () => {
    setCartItems({});
    if (user) {
      await saveUserCart(user.uid, {});
    }
  };

  // ============================================
  // 9. Logout handler
  // ============================================
  const handleLogout = async () => {
    await logoutUser();
    setCartItems({});
    toast.success("Logged out successfully");
    navigate("/");
  };

  const value = {
    products,
    refreshProducts,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,     // 🔥 naam badla
    getCartAmount,
    navigate,
    user,
    loading,
    logout: handleLogout,
    clearCart,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;