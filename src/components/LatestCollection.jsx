import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopeContext'
import Title from './Title';
import ProdactItem from './ProdactItem';

const LatestCollection = () => {
    const { products } = useContext(ShopContext)
    // console.log(products);
    const [latestProdect, setLatestProdect] = useState([])

    useEffect(() => {
        setLatestProdect(products.slice(0, 10))
    }, [])



    return (
        <div className='my-10'>
            <div className='text-center py-8 text-3xl'>
                <Title text1={"Latest"} text2={"Collection"} />
                <p className='w-3/4 m-auto text-xs sm:text-sm  md:text-base text-gray-600'>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit neque in blanditiis quam laboriosam quos commodi, natus, nemo temporibus molestiae optio cum non, repellat soluta culpa exercitationem provident obcaecati quis.
                </p>
            </div>
{/* Rendering Prodect */}
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
            latestProdect.map((item,index)=>(

                <ProdactItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/> 
            )
            
                
            )
        }
    </div>
        </div>
    )
}

export default LatestCollection