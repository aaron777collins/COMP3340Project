import { Badge, Box, IconButton } from "@mui/material";
import * as React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useEffect, useState } from "react";
import Shoppingcart from "../Shoppingcart/Shoppingcart";
import axios from "axios";
import { getLogger } from "../../LogConfig";

export interface IShoppingCartManagerProps {}

const log = getLogger("view.shoppingcartmanager");

export default function ShoppingCartManager(props: IShoppingCartManagerProps) {
  const [shoppingCartOpen, setShoppingCartOpen] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('/db/getAllItems').then((resp) => {
        const {data} = resp;
        setItems(data.resp);
    });
  }, []);

  return (
    <>
    <Box sx={{ flexGrow: 0, mr: 1 }} onClick={() => setShoppingCartOpen(true)}>
      <IconButton size="large" aria-label="17 items in cart" color="inherit">
        <Badge badgeContent={17} color="error">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Box>
    <Shoppingcart open={shoppingCartOpen} setOpen={setShoppingCartOpen} items={items} setItems={setItems}/>
    </>
  );
}
