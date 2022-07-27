import * as React from 'react';
import { useEffect, useState } from 'react';
import Products from './Products';


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
    
    const [productData, setProductData]=useState({test: ''});

  return (
    <div>
      <Products products={productData}></Products>
    </div>
  );
}
