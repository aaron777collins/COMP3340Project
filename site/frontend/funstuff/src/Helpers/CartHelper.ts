import { getLogger } from "../LogConfig";
import { CartItemModel } from "../Models/Item";
import { ShoppingCartSessionStorageModel, SHOPPING_CART_KEY } from "../Models/Keys";

const log = getLogger("service.carthelper");


export function addToQuantity(items: CartItemModel[], setItems: Function, item: CartItemModel, quantity: number) {
  
    let resInd = items.findIndex((foundItem) => foundItem.name === item.name);

    if (resInd === -1) {
      // could not find the item, so add a new one
      const newItems = [item, ...items];
      setItems(newItems);
      localStorage.setItem(SHOPPING_CART_KEY, JSON.stringify({
        items: newItems,
      } as ShoppingCartSessionStorageModel));
    } else {
      const newItems = items.map((item, index) => {
        if (index === resInd) {
          item.quantity+=quantity;
        }
        return item;
      }).filter((item) => item.quantity > 0)
      setItems(newItems);
      localStorage.setItem(SHOPPING_CART_KEY, JSON.stringify({
        items: newItems,
      } as ShoppingCartSessionStorageModel));
    }
}