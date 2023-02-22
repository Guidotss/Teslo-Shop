import { createContext } from 'react';
import { ICartProduct,IOrderSummary } from '@/interfaces';





interface CartContextProps {
    cart: ICartProduct[];
    orderSummary:IOrderSummary;


    addProduct: (product:ICartProduct) => void;
    updateCartQuantity:(product:ICartProduct) => void;
    removeProductInCart:(product:ICartProduct) => void;
}

export const CartContext = createContext({} as CartContextProps);