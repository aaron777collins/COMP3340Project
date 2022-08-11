import React from 'react';
import {Avatar, Box, Checkbox, Grid, Paper, TextField, FormControlLabel, Button, Typography, Link} from '@mui/material'
import PasswordIcon from '@mui/icons-material/Password';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
import axios from 'axios';
import { loginToUser } from '../Login/login';
import { UserAuth } from '../../Models/Auths';
YupPassword(Yup);

export interface ISignUp {
    userAuth: UserAuth;
    setUserAuth: Function;
  }
  

export default function SignUp (props: ISignUp) {

    //Yup validation schema. Look at yup docs if confused
    const validationSchema = Yup.object({
        user: Yup.string()
         .min(2, 'Too Short!')
         .max(30, 'Too Long!')
         .required('Required'),
        email: Yup
          .string()
          .email('Invalid email')
          .required('Email is required'),
        password: Yup
          .string()
          .required('Password is required')
          .min(8,'password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special')
          .minLowercase(1, 'password must contain at least 1 lower case letter')
          .minUppercase(1, 'password must contain at least 1 upper case letter')
          .minNumbers(1, 'password must contain at least 1 number')
          .minSymbols(1, 'password must contain at least 1 special character'),
        passwordConfirmation: Yup.string()
         .oneOf([Yup.ref('password'), null], 'Passwords must match')
      });

      //formik object for site validation. Look at formik docs if confused
    const formik: any = useFormik({
        initialValues: {
          user:'',
          email: '',
          password: '',
          passwordConfirmation: '',
          rememberMe: false
        },
        validationSchema: validationSchema,
        //on submit function to handle form submission. Hit backend on form submission and update db
        onSubmit: (values) => {
        //   alert(JSON.stringify(values, null, 2));
            axios.post(process.env.REACT_APP_DBAPI_ADDRESS_BEGINNING+"findUser", {username: values.user, password: "FunStuffPass123!"})
            .then((res) => {
                const {data} = res;
                if (data && data.resp.username !== values.user) {
                    axios.post(process.env.REACT_APP_DBAPI_ADDRESS_BEGINNING+"insertUser", {username: values.user, password: values.password, email: values.email})
                    .then((res2) => {
                        const {data} = res2;
                        if (data && data.resp.username === values.user && data.resp.password === values.password && data.resp.email === values.email) {
                            // user added!
                            loginToUser(values.user, values.password, false, props.setUserAuth);
                        } else {
                            // failed to add user
                            alert("Failed to create your account!");
                        }
                    });
                } else {
                    alert(JSON.stringify(data));
                    alert(`${values.user} is taken!`);
                }
            });
        },
    });
    
    const styles = {
        paperStyle: {
            padding: '30px 40px', 
            minHeight: '70vh', 
            height: '80vh', 
            width: '40vh', 
            minWidth: '40vh', 
            margin: '20px auto'
        },
        avatarStyle: {
            backgroundColor: 'green'
        },
        margintyle: {
            margin: '10px 0px' 
        },
    }

    return (
        <div>
            <Grid >
                <Paper elevation={10} sx={styles.paperStyle}>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            textAlign="center">
                            <Avatar sx={styles.avatarStyle}><PasswordIcon></PasswordIcon></Avatar>
                            <h2>Sign up</h2>
                            <Typography>We need a few details before you can sign up.</Typography>
                            <TextField 
                                id="outlined-basic" 
                                name="user" 
                                label="Username" 
                                variant="outlined" 
                                fullWidth 
                                sx={styles.margintyle}
                                value={formik.values.user}
                                onChange={formik.handleChange}
                                error={formik.touched.user && Boolean(formik.errors.user)}
                                helperText={formik.touched.user && formik.errors.user}
                            />
                            <TextField 
                            id="outlined-basic" 
                                name="email" 
                                label="Email" 
                                variant="outlined" 
                                fullWidth sx={styles.margintyle}
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                            <TextField 
                                id="outlined-basic" 
                                name="password" 
                                type="password" 
                                label="Password" 
                                variant="outlined" 
                                fullWidth sx={styles.margintyle}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                            <TextField 
                                id="outlined-basic" 
                                name="passwordConfirmation" 
                                type="password" 
                                label="Confirm Password" 
                                variant="outlined" 
                                fullWidth sx={styles.margintyle}
                                value={formik.values.passwordConfirmation}
                                onChange={formik.handleChange}
                                error={formik.touched.passwordConfirmation && Boolean(formik.errors.passwordConfirmation)}
                                helperText={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
                            />
                            <FormControlLabel control={
                                <Checkbox 
                                    checked={formik.values.rememberMe}
                                    name='rememberMe'
                                    onChange={formik.handleChange}
                                />
                            } label="Remember me" />
                            <Button 
                                type='submit' 
                                color='primary' 
                                variant='contained' 
                                fullWidth>
                                Sign up
                            </Button>
                            <Typography 
                                sx={styles.margintyle}>
                                    Have an account? 
                                <Link href="login" sx={{color: 'purple'}}>
                                    Log in.
                                </Link>
                            </Typography> 
                        </Grid>
                    </form>
                </Paper>
            </Grid>
        </div>
  );
}
