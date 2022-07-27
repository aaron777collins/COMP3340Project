import { SettingsPowerRounded } from "@mui/icons-material";
import { Card, CardContent, Drawer, Typography } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { ItemModel } from "../../Models/Item";
import "./Shoppingcart.css";

export interface IShoppingcartProps {
  open: boolean;
  setOpen: Function;
  items: ItemModel[];
  setItems: Function;
}

export default function Shoppingcart(props: IShoppingcartProps) {
  function getCards() {
    if (!props.items) {
      return <></>;
    }
    return props.items.map((item) => (
      <Card variant="outlined" sx={{ width: 300 }} key={item.name}>
        <CardContent>
          <Typography sx={{ fontSize: 16, fontWeight: "bold" }} id="outputMap">
            {item.name}
          </Typography>
          <Typography sx={{ fontSize: 14, color: "text.secondary"}} id="outputMap">
            {'$' + item.price}
          </Typography>
        </CardContent>
      </Card>
    ));
  }

  return (
    <div>
      <Drawer
        anchor="right"
        open={props.open}
        onClose={() => props.setOpen(!props.open)}
      >
        {getCards()}
      </Drawer>
    </div>
  );
}
