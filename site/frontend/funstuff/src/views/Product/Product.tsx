import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";

export default function Product () {

  const styles = {
   
    productCard: {
        margin: '10px 20px' ,
        maxWidth: 245,
        maxHeight: 345
    },
}

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
        <Typography gutterBottom variant="h5" component="div">
          Gatorade Bottle
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This is some sample test 1.99$
        </Typography>
      </CardContent>
      <CardActions>
        <Button color='success' variant='contained' fullWidth>Buy</Button>
      </CardActions>
    </Card>
    </div>
  );
}
