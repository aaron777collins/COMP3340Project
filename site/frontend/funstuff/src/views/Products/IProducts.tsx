import * as React from 'react';
import { useEffect, useState } from 'react';
import { ProductObj } from '../Product/Product';
import Products from './Products';

interface ProductsDataObj {
    productsArray: ProductObj[]
}

export default function IProducts() {

    const fetchData=()=>{
        fetch('data.json'
        ,{
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
        }
        )
          .then(function(response){
            console.log(response)
            return response.json();
          })
          .then(function(myJson) {
            console.log(myJson);
            setProductData(myJson);
          });
      }
      
    
    useEffect(()=>{
        fetchData()
      },[])

    const initialProductsObject: ProductsDataObj = {
        productsArray: []
    }
    
    const [productData, setProductData]=useState(initialProductsObject);

  return (
    <div>
      <Products productsData={productData.productsArray}></Products>
    </div>
  );
}
