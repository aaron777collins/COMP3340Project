import { Button, Card, CardActions, CardContent, CardMedia, Paper, Rating, Typography } from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { addToQuantity } from '../../Helpers/CartHelper';
import { CurrentItemSelected, CURRENT_ITEM_KEY } from '../../Models/CurrentItem';
import { CartItemModel } from '../../Models/Item';
import "./ProductDesc.css";

export interface IProductDesc {
  items: CartItemModel[];
  setItems: Function;
}

export default function ProductDesc (props: IProductDesc) {

   const data = localStorage.getItem(CURRENT_ITEM_KEY); 

   const defaultCurrentItemSelected = {
        currentItemForStorage: {
            currentItem: {
                name: 'noItemSelected',
                description: 'This item is a placeholder',
                price: 1,
                quantity: 1,
                rating: 1
            }
        }
   }

   const [currentlySelectedItem, setCurrentlySelectedItem] = useState(defaultCurrentItemSelected);

    /*
   On page load get the item selected from the products page from local storage 
   */
   useEffect (() => {

        if(data){
            const currentItemData = JSON.parse(data)
            if (currentItemData.currentItemForStorage.currentItem.name != currentlySelectedItem.currentItemForStorage.currentItem.name){
                setCurrentlySelectedItem(currentItemData);  
            }
        }

        console.log('refreshed products')
   }, [])

   console.log(currentlySelectedItem.currentItemForStorage.currentItem.rating);

   return (
    <>
      <Paper elevation={10} className='productMainPaper'>
        <div className='productMainCard'>
            <div className='firstRow'>
                <CardMedia
                    component="img"
                    sx = {{
                        width: '30vmin',
                        height: '30vmin'
                    }}
                    image="images/gatorade.jpg"
                    alt="gatorade bottle"
                />
                <CardContent sx={{elevation:'10'}} className='descriptionInfo'>
                    
                    <Typography gutterBottom  component="div" className='productTitle'>
                        {currentlySelectedItem.currentItemForStorage.currentItem.name}
                    </Typography>
                    
                    <Typography gutterBottom className='productCost'>
                        {(currentlySelectedItem.currentItemForStorage.currentItem.price+"$ CAD")}
                    </Typography>

                    <Typography gutterBottom className='productRating'>
                        {"Rating: "}  
                        <Rating name="read-only" value={currentlySelectedItem.currentItemForStorage.currentItem.rating} readOnly/>
                    </Typography>
                    
                    <Typography gutterBottom className='productDescription'>
                        {currentlySelectedItem.currentItemForStorage.currentItem.description}
                    </Typography>
                    
                    
                    <CardActions>
                        <Button fullWidth onClick={() => addToQuantity(props.items, props.setItems, currentlySelectedItem.currentItemForStorage.currentItem, 1)} color='success' variant='contained'>Add to cart</Button>
                    </CardActions>
                </CardContent>
            </div>
        </div>
      </Paper>
    </>
  );
}
