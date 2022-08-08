import { Button, Card, CardActions, CardContent, CardMedia, Rating, Typography } from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { addToQuantity } from '../../Helpers/CartHelper';
import { CurrentItemSelected, CURRENT_ITEM_KEY } from '../../Models/CurrentItem';
import { CartItemModel } from '../../Models/Item';

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

   console.log(currentlySelectedItem);

   return (
    <div>
      <Card variant='outlined'>
      <CardMedia
        component="img"
        height="140"
        image="images/gatorade.jpg"
        alt="gatorade bottle"
      />
      <CardContent>
        <Typography gutterBottom variant="body1" component="div">
            {currentlySelectedItem.currentItemForStorage.currentItem.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
            {currentlySelectedItem.currentItemForStorage.currentItem.description}
            {(currentlySelectedItem.currentItemForStorage.currentItem.price+" $CAD")}
        </Typography>
      </CardContent>
      <CardActions>
        {/* <Button color='success' variant='contained' fullWidth onClick={() => addToQuantity(props.items, props.setItems, getCartItem(product), 1)}>Buy</Button> */}
      </CardActions>
      </Card>
    </div>
  );
}
