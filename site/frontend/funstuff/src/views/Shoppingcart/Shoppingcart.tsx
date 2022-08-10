import { SettingsPowerRounded } from "@mui/icons-material";
import {
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  Drawer,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { CartItemModel } from "../../Models/Item";
import "./Shoppingcart.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import { addToQuantity } from "../../Helpers/CartHelper";

export interface IShoppingcartProps {
  open: boolean;
  setOpen: Function;
  items: CartItemModel[];
  setItems: Function;
}

export default function Shoppingcart(props: IShoppingcartProps) {
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

  function getBottomContent() {
    if (props.items.length === 0) {
      return <></>;
    } else {
      return (
        <Card variant="outlined" sx={{ pb: 1, pr: 1 }}>
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "right",
              WebkitJustifyContent: "right",
              pr: -1,
            }}
          >
            <Button variant="contained" sx={{ width: 180 }} href="checkout">
              Checkout
            </Button>
          </Box>
        </Card>
      );
    }
  }

  function getCards() {
    if (props.items.length === 0) {
      return (
        <div id="emptyCart">
          <Typography
            sx={{
              fontSize: 20,
              fontWeight: "bold",
              pt: 5,
              textAlign: "center",
            }}
            id="outputMap"
          >
            No items in cart!
          </Typography>
        </div>
      );
    }
    return props.items.map((item) => (
      <Card className="card" variant="outlined" key={item.name}>
        <CardContent className="cardContent">
          <Grid container>
            <Grid item xs={6}>
              <Typography
                sx={{ fontSize: 16, fontWeight: "bold" }}
                id="outputMap"
              >
                {item.name}
              </Typography>
              <Typography
                sx={{ fontSize: 14, color: "text.secondary" }}
                id="outputMap"
              >
                {"CAD$" + item.price}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Grid container>
                <Grid item xs={4}>
                  <Tooltip title="Increase quantity">
                    <IconButton
                      size="large"
                      color="inherit"
                      onClick={() =>
                        addToQuantity(props.items, props.setItems, item, 1)
                      }
                    >
                      <Badge>
                        <AddIcon />
                      </Badge>
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item xs={4}>
                  <Tooltip title="Descrease quantity">
                    <IconButton
                      size="large"
                      color="inherit"
                      onClick={() =>
                        addToQuantity(props.items, props.setItems, item, -1)
                      }
                    >
                      <Badge>
                        <RemoveIcon />
                      </Badge>
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item xs={4}>
                  <Typography
                    sx={{ fontSize: 16, textAlign: "center", lineHeight: 3 }}
                    id="outputMap"
                  >
                    {item.quantity}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
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
        <div className="sidebarContainer">
          <div className="topBanner">
            <Typography
              sx={{
                fontSize: 24,
                fontWeight: "bold",
                textAlign: "center",
                lineHeight: 3,
              }}
              id="outputMap"
            >
              Shopping Cart
            </Typography>
            <Tooltip title="Close">
              <IconButton
                size="medium"
                color="inherit"
                onClick={() => props.setOpen(false)}
                sx={{ position: "absolute", width: 40, right: 5, top: 16 }}
              >
                <Badge>
                  <CloseIcon />
                </Badge>
              </IconButton>
            </Tooltip>
          </div>
          <div className="elementContainer">
            <div className="cardContainer">{getCards()}</div>
            <div className="bottomCheckoutContent">{getBottomContent()}</div>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
