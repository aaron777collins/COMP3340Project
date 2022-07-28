import { SettingsRemoteSharp } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, CardMedia, ListItemSecondaryAction, Rating, Typography } from "@mui/material";
import { getLogger } from "../../LogConfig";
import { CartItemModel } from "../../Models/Item";
import { addToQuantity } from "../../Helpers/CartHelper";

export interface ProductObj{
  Name: string,
  Rating: number,
  Price: number,
  Description: string
}

export interface IProductProps {
  product: ProductObj,
  items: CartItemModel[],
  setItems: Function
}

const log = getLogger("view.product");

export default function Product (props: IProductProps) {

  const styles = {
   
    productCard: {
        margin: '10px 20px' ,
        maxWidth: 350,
        maxHeight: 350,
        minWidth: 220,
        minHeight: 250
    },
  }

  const product = props.product; 

  function getCartItem(product: ProductObj) {
    return {
      name: product.Name,
      description: product.Description,
      price: product.Price,
      quantity: 1
    } as CartItemModel
  }

  return (
    <div>
      <Card sx={styles.productCard} variant='outlined'>
      <CardMedia
        component="img"
        height="140"
        image="images/gatorade.jpg"
        alt="gatorade bottle"
      />
      <CardContent>
        <Typography gutterBottom variant="body1" component="div">
          {product.Name}
        </Typography>
        <Rating name="read-only" value={product.Rating} readOnly />
        <Typography variant="body1" color="text.secondary">
        {(product.Price+" $CAD")}
        </Typography>
      </CardContent>
      <CardActions>
        <Button color='success' variant='contained' fullWidth onClick={() => addToQuantity(props.items, props.setItems, getCartItem(product), 1)}>Buy</Button>
      </CardActions>
    </Card>
    </div>
  );
}
