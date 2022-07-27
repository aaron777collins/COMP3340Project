import { Button, Card, CardActions, CardContent, CardMedia, Rating, Typography } from "@mui/material";

export interface ProductObj{
  Name: string,
  Rating: number,
  Price: number,
  Description: string
}

export interface IProductProps {
  product: ProductObj
}

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

  return (
    <div>
      <Card sx={styles.productCard} variant='outlined'>
      <CardMedia
        component="img"
        height="140"
        image="gatorade.jpg"
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
        <Button color='success' variant='contained' fullWidth>Buy</Button>
      </CardActions>
    </Card>
    </div>
  );
}
