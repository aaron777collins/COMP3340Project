import { Grid, Typography } from "@mui/material";
import * as React from "react";
import { CartItemModel } from "../../Models/Item";

export interface IReviewOrder {
  items: CartItemModel[];
  setItems: Function;
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

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Review Order
      </Typography>
      <Grid item xs={6}>
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

        <Typography
          sx={{ fontSize: 18, textAlign: "right", pt: 1 }}
          id="outputMap"
        >
          {`Sub Total (${getTotalItems()}): CAD$${getSubTotal().toFixed(2)}`}
        </Typography>
        <Typography
          sx={{ fontSize: 18, textAlign: "right", fontWeight: "bold" }}
          id="outputMap"
        >
          {`Total: CAD$${(getSubTotal() * 1.13).toFixed(2)}`}
        </Typography>
      </Grid>
    </div>
  );
}
