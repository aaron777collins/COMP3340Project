import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./Checkout.css";
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import { CartItemModel } from '../../Models/Item';
import ReviewOrder from './ReviewOrder';
import { ShoppingCartSessionStorageModel, SHOPPING_CART_KEY } from '../../Models/Keys';

const steps = ['Shipping Info', 'Payment Info', 'Checkout'];


const theme = createTheme();

export interface ICheckout {
  items: CartItemModel[];
  setItems: Function;
}

//Checkout class
export default function Checkout(props: ICheckout) {

  //step through material stepper and call right class
  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <AddressForm />;
      case 1:
        return <PaymentForm />;
      case 2:
        return <ReviewOrder items={props.items} setItems={props.setItems}></ReviewOrder>
      default:
        throw new Error('Unknown step');
    }
  }
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);

    if (activeStep === steps.length - 1){
      props.setItems([]);

      const emptyShoppingCart: ShoppingCartSessionStorageModel = {
        items: []
      }

      localStorage.setItem(SHOPPING_CART_KEY, JSON.stringify(emptyShoppingCart));
    }
  };

  return (
    <div className='main'>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #{Math.floor(Math.random() * 20000)}. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
    </div>
  );
}