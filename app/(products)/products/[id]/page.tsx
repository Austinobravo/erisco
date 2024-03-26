'use client'

import Image from 'next/image'
import React from 'react'
import RelatedProducts from './_components/RelatedProducts'
import { allProducts } from '@/lib/globals'
import AddToCart from '../_components/AddToCart'
import { deleteUniqueItemFromCart, ifUSerhasProductInCart } from '@/lib/getDetails'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

const page = ({params}: {params:{id:string}}) => {
    const {data:session} = useSession()
    const userId = session?.user.id

    const productId = parseInt(params.id)
    const getProductDataById = (id:number) =>{
        const gottenProduct = allProducts.filter(eachProductId => eachProductId.id === id)
        return gottenProduct
    }
    const parsedSelectedProducts = JSON.parse(localStorage.getItem('selectedProductsInCart') as any) ;
    const checkIfIdIsInLocalStorage = (id:number) => {
        const gottenProduct = parsedSelectedProducts.find((eachProduct:any) => eachProduct.productId === id)
        return gottenProduct
    }

    const [selectedProductsInCart, setSelectedProductsInCart] = React.useState<any[]>(parsedSelectedProducts);

    const productsInCart = allProducts.filter((product) => selectedProductsInCart.find((cartProduct) => product.id === cartProduct.productId))

     const updateProductQuantityInCart = (id:number) => {
        calculateTotalValueInUniqueProduct()
        const isProductInCart = findProductInCart(id)
        if(isProductInCart){
            return isProductInCart?.quantity
        }else{
            return 1
        }
        
    }

    const addProductToCart = (id:number) => {
        const existingProduct = findProductInCart(id)
        if(existingProduct === undefined){
            setSelectedProductsInCart(prevSelectedProductsInCart => [...prevSelectedProductsInCart, {id, quantity: 1} ])  
        }else{
            console.log("console", selectedProductsInCart)
            setSelectedProductsInCart(prevSelectedProducts =>
                prevSelectedProducts.map(product =>
                    product.productId === id ? {...product, quantity: product.quantity + 1} : product
                )
            );
        }
        updateProductQuantityInCart(existingProduct.id)
        localStorage.setItem("selectedProductsInCart", JSON.stringify(selectedProductsInCart))
        
    };
    
    const subtractProductToCart = (id:number) => {
        const existingProduct= findProductInCart(id)
        if (existingProduct.quantity === 0){
            deleteItemInCart(id);
        }else{
            setSelectedProductsInCart(prevSelectedProducts =>
                prevSelectedProducts.map(product =>
                    product.productId === id ? {...product, quantity: product.quantity - 1} : product
                )
            );
        }
        
        localStorage.setItem("selectedProductsInCart", JSON.stringify(selectedProductsInCart))
        updateProductQuantityInCart(existingProduct.id)
        
    
    }
    
     const calculateTotalValueInUniqueProduct = () => {
         const totalValue = productsInCart.map((product) => product.currentPrice).reduce((total, nextNumber) => nextNumber + total, 0)
        return totalValue.toFixed(2)
    }

    
     const findProductInCart = (id:number) =>{
        return selectedProductsInCart.find((eachProduct) => eachProduct.productId === id)
    }

    const deleteItemInCart = async (id:number) => {
        try{
            const response = await deleteUniqueItemFromCart(userId, id)
            removeUniqueProductFromLocalStorage(id)
            location.reload()

        }catch(error:any){
            toast.error(`An error occured`)
        }
    }

    const removeUniqueProductFromLocalStorage = (id: number) => {
        const storedSelectedProducts = JSON.parse(localStorage.getItem('selectedProductsInCart') as any);
        const newData = storedSelectedProducts.filter((product:any) => product.productId !== id)
        localStorage.setItem("selectedProductsInCart", JSON.stringify(newData))
    } 

    const [productDetail, setProductDetail] = React.useState<any[]>([])
    React.useEffect(() => {
        const fetchData = () => {
            const confirmIfIdIsInLocalStorage = checkIfIdIsInLocalStorage(productId)
            if(confirmIfIdIsInLocalStorage === undefined){
                const productDetail = getProductDataById(productId)
                setProductDetail(productDetail)     
            }else{
                setProductDetail(productsInCart)    
            }
        }
        fetchData()
    },[])

    const [isAdded,setIsAdded] = React.useState<boolean>(false)
    React.useEffect(()=> {
        const fetchData = async () => {
            const response = await ifUSerhasProductInCart(userId, productId)
            setIsAdded(response)
        }
        fetchData()
    },[])

    React.useEffect(() => {
        localStorage.setItem("selectedProductsInCart", JSON.stringify(selectedProductsInCart));
    }, [selectedProductsInCart]);


  return (
    <section className='py-7'>
        {productDetail.length > 0 ? 
        <div className='flex px-10 gap-10 md:flex-nowrap flex-wrap'>
            <div className='md:basis-1/2 w-full'>
                <Image src={productDetail[0].image} width={500} height={100} alt='product' className='w-full'/>
            </div>
            <div className='md:basis-1/2 space-y-5 pr-10'>
                <h2 className='text-3xl font-bold'>{productDetail[0].title}</h2>
                <div className='text-sm'>
                    <span className='mr-1 line-through opacity-60'>{productDetail[0].previousPrice ? 'N' + productDetail[0].previousPrice.toFixed(2) : ''}</span>
                    <span className='text-blue-500'>N{productDetail[0].currentPrice.toFixed(2)}</span>
                </div>
                <div className='flex items-center gap-x-3'>
                    {isAdded && 
                        <div className=' space-x-2'>
                            <button className='border rounded-full px-1' onClick={()=>subtractProductToCart(productDetail[0].id)}>-</button>
                            <span>{updateProductQuantityInCart(productDetail[0].id)} </span>
                            <button className='border rounded-full px-1' onClick={()=>addProductToCart(productDetail[0].id)}>+</button>
                        </div>
                    }
                    <AddToCart productId={productDetail[0].id} quantity={1}/>
                </div>
                <div>
                    <p className='leading-relaxed'>{productDetail[0].details}.</p>
                </div>
            </div>
        
        </div>
        :
        <p>Loading...</p>
        }
        <div>
            <RelatedProducts/>
        </div>

    </section>
  )
}

export default page
