import { CartState } from './'
import { ICartProduct,IOrderSummary } from '@/interfaces';



type CartActionType = 
    |{ type:'[CART] - LoadCart from cookies | storage', payload: ICartProduct[] }
    |{ type:'[CART] - Add Product', payload: ICartProduct[] }
    |{ type:'[CART] - Update Product in cart', payload: ICartProduct[] }
    |{ type:'[CART] - Change cart product quantity', payload: ICartProduct }
    |{ type:'[CART] - Remove product in cart', payload: ICartProduct }
    |{ type:'[CART] - Update order summary', payload: IOrderSummary }
    


export const cartReducer = (state: CartState, action: CartActionType): CartState => {
    switch (action.type) {
        case '[CART] - Update Product in cart':
            return {
                ...state,
                cart:[...action.payload]
            }
        case '[CART] - LoadCart from cookies | storage':
            return {
                ...state,
                cart:[...action.payload]
            }
        case '[CART] - Change cart product quantity':
            return {
                ...state,
                cart:state.cart.map(prod => {

                    if(prod._id !== action.payload._id) return prod;
                    if(prod.size !== action.payload.size) return prod;

                    prod.quantity = action.payload.quantity;
                    return action.payload;

                })
            }
        case '[CART] - Remove product in cart':
            return {
                ...state,
                cart:state.cart.filter(prod => (prod._id !== action.payload._id) || (prod._id === action.payload._id && prod.size !== action.payload.size))
            }
        
        case '[CART] - Update order summary':
            return {
                ...state,
                orderSummary:action.payload
            }
        default:
            return state;
    }}