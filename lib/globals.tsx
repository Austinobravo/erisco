import { Cart } from "@prisma/client"

     export const allProducts = [
        {
            "id": 1,
            "image": "/erisco.jpg",
            "title": "Erisco Packet Sugar Cubes",
            "previousPrice": 250.00,
            "currentPrice": 200.00,
            "details": "The packet sugar cubes that supersedes other cubes."
        },
        {
            "id": 2,
            "image": "/nagiko.jpg",
            "title": "Nagiko Tin Tomato",
            "previousPrice": 150.00,
            "currentPrice": 100.00,
            "details": "The tin tomato that supersedes other tomato paste."
        },
        {
            "id": 3,
            "image": "/ricgiko.jpg",
            "title": "Ricgiko Sachet Tomato ",
            "previousPrice": "",
            "currentPrice": 200.00,
            "details": "The sachet tomato that supersedes other tomato paste."
        },
        {
            "id": 4,
            "image": "/erisco.jpg",
            "title": "Erisco Packet Sugar Cubes",
            "previousPrice": 250.00,
            "currentPrice": 200.00,
            "details": "The packet sugar cubes that supersedes other cubes."
        },
        {
            "id": 5,
            "image": "/nagiko.jpg",
            "title": "Nagiko Tin Tomato",
            "previousPrice": 150.00,
            "currentPrice": 100.00,
            "details": "The tin tomato that supersedes other tomato paste."
        },
        {
            "id": 6,
            "image": "/ricgiko.jpg",
            "title": "Ricgiko Sachet Tomato ",
            "previousPrice": "",
            "currentPrice": 200.00,
            "details": "The sachet tomato that supersedes other tomato paste."
        }
    ]
    

export const selectedCartProduct = [{
    
} as Cart]

export const addProductToCart = (id:number) => {
    const isProductInCart = findProductInCart(id)
    if (isProductInCart){
        isProductInCart.quantity += 1
        console.log("increment",id, isProductInCart.quantity)
    }else{
        selectedCartProduct.push({
            id: id,
            quantity: 1,
        })
        console.log("id",id)
    }
    updateProductQuantityInCart(id)
}
export const subtractProductToCart = (id:number) => {
    const isProductInCart = findProductInCart(id)
    if (isProductInCart?.quantity === 0){
        return;
    }else{
        isProductInCart!.quantity -= 1
        
    }

    updateProductQuantityInCart(id)

}
export const updateProductQuantityInCart = (id:number) => {
    calculateTotalItemsInCart()
    const isProductInCart = findProductInCart(id)
    return isProductInCart?.quantity

}

export const calculateTotalItemsInCart = () => {
    const totalValue = selectedCartProduct.map((product) => product.quantity).reduce((total, nextNumber) => nextNumber + total, 0)
    console.log("value", totalValue)
    return totalValue
}

export const findProductInCart = (id:number) =>{
    return selectedCartProduct.find((eachProduct) => eachProduct.id === id)
}