import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { CartItemModel, ItemModel } from '../../Models/Item';
import { ProductObj } from '../Product/Product';
import Products from './Products';

interface ProductsDataObj {
    productsArray: ProductObj[],
}

interface IProductsController {
  items: CartItemModel[],
  setItems: Function
}

export default function ProductsController(props: IProductsController) {

    function getItems() {
      axios.get('/db/getAllItems').then((resp) => {
        const {data} = resp;
        let items = data.resp as ItemModel[];
        let products = items.map((item) => {
          return {
            Name: item.name,
            Rating: item.rating,
            Description: item.description,
            Price: item.price,
          } as ProductObj;
        })
        setProductData({productsArray: products} as ProductsDataObj);
      });
    }

    useEffect(getItems, []);

    const initialProductsObject: ProductsDataObj = {
        productsArray: []
    }
    
    const [productData, setProductData]=useState(initialProductsObject);

  return (
    <div>
      <Products productsData={productData.productsArray} items={props.items} setItems={props.setItems}></Products>
    </div>
  );
}
