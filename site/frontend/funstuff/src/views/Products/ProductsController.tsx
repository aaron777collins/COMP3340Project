import { Backdrop, CircularProgress } from "@mui/material";
import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import { CartItemModel, ItemModel } from "../../Models/Item";
import { ProductObj } from "../Product/Product";
import Products from "./Products";

interface ProductsDataObj {
  productsArray: ProductObj[];
}

interface IProductsController {
  items: CartItemModel[];
  setItems: Function;
}

export default function ProductsController(props: IProductsController) {

  const [loading, setLoading] = useState(false);

  function getItems() {
    setLoading(true);
    axios
      .get(process.env.REACT_APP_DBAPI_ADDRESS_BEGINNING + "getAllItems")
      .then((resp) => {
        const { data } = resp;
        let items = data.resp as ItemModel[];
        let products = items.map((item) => {
          return {
            Name: item.name,
            Rating: item.rating,
            Description: item.description,
            Price: item.price,
          } as ProductObj;
        });
        setProductData({ productsArray: products } as ProductsDataObj);
        setLoading(false);
      });
  }

  useEffect(getItems, []);

  const initialProductsObject: ProductsDataObj = {
    productsArray: [],
  };

  const [productData, setProductData] = useState(initialProductsObject);

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Products
        productsData={productData.productsArray}
        items={props.items}
        setItems={props.setItems}
      ></Products>
    </div>
  );
}
