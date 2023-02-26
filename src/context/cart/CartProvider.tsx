import { FC, useEffect, useReducer } from 'react';
import { CartContext, cartReducer } from './';
import { ICartProduct,IOrderSummary } from '@/interfaces';
import Cookie from 'js-cookie';


interface CartProviderProps {
    children: React.ReactNode;
}


export interface CartState {
    cart:ICartProduct[];
    orderSummary:IOrderSummary;
    isLoaded:boolean
}


const CART_INITIAL_STATE: CartState = {
    isLoaded:false,
    cart:[],
    orderSummary:{
        numberOfItems:0,
        subTotal:0,
        tax:0,
        total:0,
        taxRate:0
    }
}



export const CartProvider:FC<CartProviderProps> = ({ children }) => {

    const [ state, dispatch ] = useReducer(cartReducer, CART_INITIAL_STATE);

    useEffect(() => {
        try{
            const cart = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : [];
            dispatch({type:'[CART] - LoadCart from cookies | storage', payload:cart});
        }catch{
            Cookie.remove('cart');
            dispatch({type:'[CART] - LoadCart from cookies | storage', payload:[]});
        }
    },[]);

    useEffect(() => {
        Cookie.set('cart', JSON.stringify(state.cart));
    },[state.cart]);

    useEffect(() => {

        const numberOfItems = state.cart.reduce(( prev,current ) => current.quantity + prev,0);
        const subTotal = state.cart.reduce((prev,current) => current.price * current.quantity + prev,0);
        const taxRate  = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

        const OrderSummary = { 
            numberOfItems,
            subTotal,
            tax: subTotal * taxRate,
            total: subTotal * (1 + taxRate),
            taxRate
        }

        dispatch({type:'[CART] - Update order summary', payload:OrderSummary});
        
    },[state.cart])






    const addProduct = (product:ICartProduct) => {
       
        const productInCart = state.cart.some(prod => prod._id === product._id);
        if(!productInCart) return dispatch({type:'[CART] - Update Product in cart', payload:[...state.cart, product]});

        const productInCartButDifferentSize = state.cart.some(prod => prod._id === product._id && prod.size === product.size);
        if(!productInCartButDifferentSize) return dispatch({type:'[CART] - Update Product in cart', payload:[...state.cart, product]});

        const updatedProduct = state.cart.map(prod => {

            if(prod._id !== product._id) return prod;
            if(prod.size !== product.size) return prod;

            prod.quantity += product.quantity;
            return prod;
        
        });

        dispatch({type:'[CART] - Update Product in cart', payload:updatedProduct});
    }

    const updateCartQuantity = ( product:ICartProduct ) => {
        dispatch({type:'[CART] - Change cart product quantity', payload:product});
    }

    const removeProductInCart = (product:ICartProduct) => {
        dispatch({type:'[CART] - Remove product in cart', payload:product});
    }

    return (
        <CartContext.Provider value={{
            ...state,

            addProduct,
            updateCartQuantity,
            removeProductInCart
        }}>
            { children }
        </CartContext.Provider>
    )
}