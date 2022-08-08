import { Button, Card, CardActions, CardContent, CardMedia, Rating, Typography } from '@mui/material';
import * as React from 'react';
import { useEffect } from 'react';
import { addToQuantity } from '../../Helpers/CartHelper';
import { CurrentItem, CURRENT_ITEM_KEY } from '../../Models/CurrentItem';
import { CartItemModel } from '../../Models/Item';

export interface IProductDesc {
  items: CartItemModel[];
  setItems: Function;
}



export default function ProductDesc (props: IProductDesc) {

   let data = localStorage.getItem(CURRENT_ITEM_KEY); 

   let currentItemSelected: CurrentItem = 
    {
        currentItem: {
            name: 'noItemSelected',
            description: 'This item is a placeholder',
            price: 1,
            quantity: 1,
        }
    }

   useEffect ( () => { 

        console.log(data);

        if(data){
            currentItemSelected =  JSON.parse(data) as CurrentItem;
        }
        
   }, [])


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
            {currentItemSelected.currentItem.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
            {currentItemSelected.currentItem.description}
            {(currentItemSelected.currentItem.price+" $CAD")}
        </Typography>
      </CardContent>
      <CardActions>
        {/* <Button color='success' variant='contained' fullWidth onClick={() => addToQuantity(props.items, props.setItems, getCartItem(product), 1)}>Buy</Button> */}
      </CardActions>
      </Card>
    </div>
  );
}
