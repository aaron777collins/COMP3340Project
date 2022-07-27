import * as React from "react";
import { useEffect, useState } from "react";
import { getLogger } from "../../LogConfig";
import logo from "../../logo.svg";
import Product from "../Product/Product";
import "./Products.css";

// Used for adding parameters to the products tag
export interface IProductsProps {}

const log = getLogger("view.products");

interface testProject{
    test: string
}

export interface IProductsProps {
  products: testProject
}

export default function Products(props: IProductsProps) {
  type responseType = {
    resp: string;
  };

  const [response, setResponse] = React.useState({} as responseType);
  
  function getData(event: React.MouseEvent<HTMLButtonElement>) {
    log.debug("This is a test from products");
    event.stopPropagation();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "React POST Request Example" }),
    };
    fetch(process.env.REACT_APP_API_ADDRESS as string, requestOptions)
    .then((resp) => resp.json())
    .then((data: responseType) =>
    setResponse({
      resp: data.resp + " " + (response.resp ? response.resp : ""),
    })
    );
  }
  
  return (
    <div className="products">
      <h1>Products</h1>
      <p>{props.products.test}</p>
      <div className="productsList">
        <Product></Product>
        <Product></Product>
        <Product></Product>
        <Product></Product>
        <Product></Product>
        <Product></Product>
        <Product></Product>
        <Product></Product>
        <Product></Product>
        <Product></Product>
      </div>
    </div>
  );
}
