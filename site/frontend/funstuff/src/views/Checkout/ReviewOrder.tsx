import { Grid, Typography } from "@mui/material";
import * as React from "react";
import { useEffect } from "react";
import { CartItemModel } from "../../Models/Item";
import './ReviewOrder.css'

export interface IReviewOrder {
  items: CartItemModel[];
  setItems: Function;
  setTotalCost: Function;
  setTotalItems: Function;
}

export default function ReviewOrder(props: IReviewOrder) {
  function getSubTotal() {
    let sum = 0;
    props.items.forEach((item) => {
      sum += item.price * item.quantity;
    });
    return sum;
  }

  function getTotalItems() {
    let sum = 0;
    props.items.forEach((item) => {
      sum += item.quantity;
    });
    return sum;
  }

  useEffect(() => {
    props.setTotalCost(getSubTotal());
    props.setTotalItems(getTotalItems());
  }, [props.items]);

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Review Order
      </Typography>
      <Grid item xs={6}>
        <div className="itemsContainer">
        {props.items.map((singleProduct) => (
          <div key={singleProduct.name}>
            <Typography
              sx={{ fontSize: 16, fontWeight: "bold" }}
              id="outputMap"
            >
              {singleProduct.name}
            </Typography>

            <Typography
              sx={{ fontSize: 14, color: "text.secondary" }}
              id="outputMap"
            >
              {"Quantity: " + singleProduct.quantity}
            </Typography>

            <Typography
              gutterBottom
              sx={{ fontSize: 14, color: "text.secondary" }}
              id="outputMap"
            >
              {"CAD$" + singleProduct.price}
            </Typography>
          </div>
        ))}
        </div>
      </Grid>
    </div>
  );
}
