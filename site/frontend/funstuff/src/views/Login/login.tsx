import React from 'react';
import {Avatar, Box, Checkbox, Grid, Paper, TextField, FormControlLabel, Button, Typography, Link} from '@mui/material'
import FaceIcon from '@mui/icons-material/Face';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(Yup);

const validationSchema = Yup.object({
    email: Yup
      .string()
      .email()
      .required('Email is required'),
    password: Yup
      .string()
      .required('Password is required')
      .min(8,'password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special')
      .minLowercase(1, 'password must contain at least 1 lower case letter')
      .minUppercase(1, 'password must contain at least 1 upper case letter')
      .minNumbers(1, 'password must contain at least 1 number')
      .minSymbols(1, 'password must contain at least 1 special character'),
  });


export default function Login () {
    
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
            backgroundColor: 'purple'
        },
        margintyle: {
            margin: '10px 10px' 
        },
    }

    const validationSchema = Yup.object({
      user: Yup.string()
       .min(2, 'Too Short!')
       .max(30, 'Too Long!')
       .required('Required'),
      password: Yup
        .string()
        .required('Password is required')
        .min(8,'password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special')
        .minLowercase(1, 'password must contain at least 1 lower case letter')
        .minUppercase(1, 'password must contain at least 1 upper case letter')
        .minNumbers(1, 'password must contain at least 1 number')
        .minSymbols(1, 'password must contain at least 1 special character'),
    });

  const formik: any = useFormik({
      initialValues: {
        user:'',
        password: '',
        rememberMe: false,
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        alert(JSON.stringify(values, null, 2));
      },
  });

    return (
        <Grid>
            <Paper elevation={10} sx={styles.paperStyle}>
              <form onSubmit={formik.handleSubmit}>
                <Grid container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    textAlign="center">
                    <Avatar sx={styles.avatarStyle}><FaceIcon></FaceIcon></Avatar>
                    <h2>Sign in</h2>
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
                      fullWidth
                    >
                      Sign in
                    </Button>
                    <Typography sx={styles.margintyle}><Link href="#" >Forgot Password?</Link></Typography>
                    <Typography sx={styles.margintyle}>Don't have an account? <Link href="#" >Sign up.</Link></Typography>
                </Grid>
              </form>
            </Paper>
        </Grid>
  );
}
