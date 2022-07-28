import { Container, Grid, TextField } from "@mui/material";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { getLogger } from "../../LogConfig";
import logo from "../../logo.svg";
import { CartItemModel } from "../../Models/Item";
import Product, { ProductObj } from "../Product/Product";
import "./Products.css";

// Used for adding parameters to the products tag
export interface IProductsProps {}

const log = getLogger("view.products");

export interface IProductsProps {
  productsData: ProductObj[];
  items: CartItemModel[];
  setItems: Function;
}

export default function Products(props: IProductsProps) {
  const [filteredProducts, setFilteredProducts] = useState(props.productsData);

  function filterItems(event: any) {
    if (event?.target?.value != null || event?.target?.value !== undefined) {
      setFilteredProducts(
        props.productsData.filter((item) =>
          item.Name.toLowerCase()
            .trim()
            .includes(event.target.value.toLowerCase().trim())
        )
      );
    } else {
      setFilteredProducts(props.productsData);
    }
  }

  // On receiving the product data, it sets filtered products equal to the product data
  useEffect(() => setFilteredProducts(props.productsData), [props.productsData]);

  return (
    <>
      <div className="productsTitleContainer">
        <h1>Products🛍️</h1>
        <TextField
          id="productSearchBar"
          label="Search for a product🛒"
          variant="outlined"
          sx={{ width: "75%" }}
          onChange={filterItems}
        />
      </div>
      <div className="products">
        <div className="productsListBody">
          <div className="productsList">
            {filteredProducts?.map((singleProduct) => (
              <Product
                key={singleProduct.Name}
                product={singleProduct}
                items={props.items}
                setItems={props.setItems}
              ></Product>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
