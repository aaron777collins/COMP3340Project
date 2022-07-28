import { CartItemModel } from "../Models/Item";

export function addToQuantity(items: CartItemModel[], setItems: Function, item: CartItemModel, quantity: number) {
    let resInd = items.findIndex((foundItem) => foundItem.name === item.name);

    if (resInd === -1) {
      // could not find the item, so add a new one
      setItems([item, ...items])
    } else {
      setItems(items.map((item, index) => {
        if (index === resInd) {
          item.quantity+=quantity;
        }
        return item;
      }).filter((item) => item.quantity > 0));
    }
}