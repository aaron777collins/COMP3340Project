import { CartItemModel } from "./Item"

export const SHOPPING_CART_KEY = "funstuff-shoppingcart"; 

export type ShoppingCartSessionStorageModel = {
    items: CartItemModel[],
}