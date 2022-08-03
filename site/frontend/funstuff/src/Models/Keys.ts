import { CartItemModel } from "./Item"

export const SHOPPING_CART_KEY = "funstuff-shoppingcart"; 
export const USER_AUTH_KEY = "funstuff-auth"; 


export type ShoppingCartSessionStorageModel = {
    items: CartItemModel[],
}