import { Badge, Box, IconButton } from "@mui/material";
import * as React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useEffect, useState } from "react";
import Shoppingcart from "../Shoppingcart/Shoppingcart";
import axios from "axios";
import { getLogger } from "../../LogConfig";
import { CartItemModel } from "../../Models/Item";
import { ShoppingCartSessionStorageModel, SHOPPING_CART_KEY } from "../../Models/Keys";

export interface IShoppingCartManagerProps {
  items: CartItemModel[];
  setItems: Function;
}

const log = getLogger("view.shoppingcartmanager");

export default function ShoppingCartManager(props: IShoppingCartManagerProps) {
  const [shoppingCartOpen, setShoppingCartOpen] = useState(false);

  function getCartQuantity() {
    let sum = 0;
    for (let item of props.items) {
        sum += item.quantity;
    }
    return sum;
  }

  function getIcon() {
    if (props.items.length) {
      return (
        <IconButton
          size="large"
          aria-label={`${getCartQuantity()} items in cart`}
          color="inherit"
        >
          <Badge badgeContent={getCartQuantity()} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      );
    } else {
      return (
        <Badge badgeContent={getCartQuantity()} color="error" sx={{mr: 1.5, mt: -0.5}}>
          <ShoppingCartIcon />
        </Badge>
      );
    }
  }

  return (
    <>
      <Box
        sx={{ flexGrow: 0, mr: 1 }}
        onClick={() => setShoppingCartOpen(true)}
      >
        {getIcon()}
      </Box>
      <Shoppingcart
        open={shoppingCartOpen}
        setOpen={setShoppingCartOpen}
        items={props.items}
        setItems={props.setItems}
      />
    </>
  );
}
