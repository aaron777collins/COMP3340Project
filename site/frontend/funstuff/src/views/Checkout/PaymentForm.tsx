import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UserPaymentInfo } from "../../Models/User";
import { USER_PAYMENT_INFO } from "../../Models/Keys";

interface IPaymentForm {
  // formikObj: {handleSubmit: Function, uninitialized?: boolean, initialValues?: any};
  setFormikObj: Function;
  handleNext: Function;
}

export default function PaymentForm(props: IPaymentForm) {
  // Payment form that is required for the customer to checkout products from the website

  const validationSchema = Yup.object({
    cardName: Yup.string()
      .min(2, "Too Short!")
      .max(30, "Too Long!")
      .required("Required"),
    cardNumber: Yup.string()
      .min(10, "Too Short! Must be 10 characters.")
      .max(10, "Too Long! Must be 10 characters.")
      .required("Required"),
    expDate: Yup.string()
      .typeError("Not a valid expiration date. Required format: MM/YY")
      .min(5, "Not enough digits. Required format: MM/YY")
      .max(5, "Too many digits. Required format: MM/YY")
      .matches(
        /([0-9]{2})\/([0-9]{2})/,
        "Not a valid expiration date. Example: MM/YY"
      )
      .required("Expiration date is required"),
    cvv: Yup.string()
      .min(3, "Not enough digits. Must be 3 characters. Example: 108")
      .max(3, "Too many digits. Must be 3 characters. Example: 108")
      .required("The CVV is required"),
  });

  let initialValues = {
    cardName: "",
    cardNumber: "",
    expDate: "",
    cvv: "",
  } as UserPaymentInfo;

  function getInitialValues(): UserPaymentInfo {
    // checks if there is some items in the local storage
    let data = localStorage.getItem(USER_PAYMENT_INFO);
    if (data) {
      let paymentInfo = JSON.parse(data) as UserPaymentInfo;
      // if so, it sets the items to the local storage's items
      return paymentInfo;
    }
    return initialValues;
  }


  const formik = useFormik({
    initialValues: getInitialValues(),
    validationSchema: validationSchema,
    onSubmit: (values) => {
      localStorage.setItem(USER_PAYMENT_INFO, JSON.stringify(formik.values));
      props.handleNext();
    },
  });

  useEffect(() => {
    props.setFormikObj(formik);
  }, []);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            id="cardName"
            label="Full Name"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            value={formik.values.cardName}
            onChange={formik.handleChange}
            error={formik.touched.cardName && Boolean(formik.errors.cardName)}
            helperText={formik.touched.cardName && formik.errors.cardName}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            value={formik.values.cardNumber}
            onChange={formik.handleChange}
            error={
              formik.touched.cardNumber && Boolean(formik.errors.cardNumber)
            }
            helperText={formik.touched.cardNumber && formik.errors.cardNumber}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
            value={formik.values.expDate}
            onChange={formik.handleChange}
            error={formik.touched.expDate && Boolean(formik.errors.expDate)}
            helperText={formik.touched.expDate && formik.errors.expDate}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="cvv"
            label="CVV"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
            value={formik.values.cvv}
            onChange={formik.handleChange}
            error={formik.touched.cvv && Boolean(formik.errors.cvv)}
            helperText={formik.touched.cvv && formik.errors.cvv}
          />
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    </React.Fragment>
  );
}
