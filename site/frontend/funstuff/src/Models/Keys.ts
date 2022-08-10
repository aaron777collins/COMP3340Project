import { CartItemModel } from "./Item"

export const SHOPPING_CART_KEY = "funstuff-shoppingcart"; 
export const USER_AUTH_KEY = "funstuff-auth"; 
export const USER_SHIPPING_INFO = "funstuff-shipping";
export const USER_PAYMENT_INFO = "funstuff-payment";


export type ShoppingCartSessionStorageModel = {
    items: CartItemModel[],
}