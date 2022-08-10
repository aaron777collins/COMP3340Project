import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./Checkout.css";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import { CartItemModel } from "../../Models/Item";
import ReviewOrder from "./ReviewOrder";
import {
  ShoppingCartSessionStorageModel,
  SHOPPING_CART_KEY,
} from "../../Models/Keys";
import { useEffect, useState } from "react";
import { getLogger } from "../../LogConfig";

const log = getLogger("view.checkout");

const steps = ["Shipping Info", "Payment Info", "Checkout"];

const theme = createTheme();

export interface ICheckout {
  items: CartItemModel[];
  setItems: Function;
}

//Checkout class
export default function Checkout(props: ICheckout) {
  const [activeStep, setActiveStep] = useState(0);
  const [formikAddrObj, setFormikAddrObj] = useState({
    handleSubmit: () => log.debug("Object not set"),
  });
  const [formikPayObj, setFormikPayObj] = useState({
    handleSubmit: () => log.debug("Object not set"),
  });

  const [totalItems, setTotalItems] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  //step through material stepper and call right class
  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return (
          <AddressForm
            handleNext={handleNext}
            setFormikObj={setFormikAddrObj}
          />
        );
      case 1:
        return (
          <PaymentForm handleNext={handleNext} setFormikObj={setFormikPayObj} />
        );
      case 2:
        return (
          <ReviewOrder
            items={props.items}
            setItems={props.setItems}
            setTotalItems={setTotalItems}
            setTotalCost={setTotalCost}
          ></ReviewOrder>
        );
      default:
        throw new Error("Unknown step");
    }
  }

  function handleCancel() {
    if (activeStep === 0) {
      window.location.href = "products";
    } else {
      setActiveStep(Math.max(activeStep - 1, 0));
    }
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);

    if (activeStep === steps.length - 1) {
      props.setItems([]);

      const emptyShoppingCart: ShoppingCartSessionStorageModel = {
        items: [],
      };

      sessionStorage.setItem(
        SHOPPING_CART_KEY,
        JSON.stringify(emptyShoppingCart)
      );
      localStorage.setItem(
        SHOPPING_CART_KEY,
        JSON.stringify(emptyShoppingCart)
      );
    }
  };

  function getTotalsText() {
    if(activeStep === steps.length-1) {
      return (
        <div className="totalsContainer">
              <Typography
                sx={{ fontSize: 18, textAlign: "right", pt: 1 }}
                id="outputMap"
              >
                {`Sub Total (${totalItems}): CAD$${totalCost.toFixed(2)}`}
              </Typography>
              <Typography
                sx={{ fontSize: 18, textAlign: "right", fontWeight: "bold" }}
                id="outputMap"
              >
                {`Total: CAD$${(totalCost * 1.13).toFixed(2)}`}
              </Typography>
        </div>
      );
    } else return <></>;
  }

  return (
    <div className="main">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar
          position="absolute"
          color="default"
          elevation={0}
          sx={{
            position: "relative",
          }}
        ></AppBar>
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step
                  key={label}
                  sx={{
                    "& .MuiStepLabel-root .Mui-completed": {
                      color: "grey.900",
                    },
                    "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
                      {
                        color: "grey.500",
                      },
                    "& .MuiStepLabel-root .Mui-active": {
                      color: "grey.900",
                    },
                    "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel":
                      {
                        color: "common.white",
                      },
                    "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                      fill: "white",
                    },
                  }}
                >
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
                    Your order number is #{Math.floor(Math.random() * 20000)}.
                    We have emailed your order confirmation, and will send you
                    an update when your order has shipped.
                  </Typography>
                </React.Fragment>
              ) : (
                <form
                  onSubmit={
                    (activeStep === 0 ? formikAddrObj : formikPayObj)
                      .handleSubmit
                  }
                >
                  <React.Fragment>
                    <div className="contentContainer">
                      {getStepContent(activeStep)}
                    </div>
                    <Box sx={{ display: "flex", justifyContent: "flex-end", height: '40px'}}>
                    {getTotalsText()}
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <Button
                        variant="outlined"
                        sx={{ mt: 3, ml: 1 }}
                        onClick={handleCancel}
                      >
                        {activeStep === 0 ? "Cancel" : "Back"}
                      </Button>
                      <Button
                        variant="contained"
                        color="success"
                        sx={{ mt: 3, ml: 1 }}
                        type="submit"
                        onClick={() => {
                          if (activeStep === steps.length - 1) {
                            handleNext();
                          }
                        }}
                      >
                        {activeStep === steps.length - 1
                          ? "Place order"
                          : "Next"}
                      </Button>
                    </Box>
                  </React.Fragment>
                </form>
              )}
            </React.Fragment>
          </Paper>
        </Container>
      </ThemeProvider>
    </div>
  );
}
