import { Button, Grid, Link, Paper, TextField, Typography } from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

export default function ErrorPage () {  // export the function by defualt

  const styles = {  // define the styling
    paperStyle: {
        padding: '30px 40px', 
        minHeight: '60vh', 
        height: '60vh', 
        width: '60vh', 
        minWidth: '60vh', 
        margin: '20px auto',
        display: 'flex',
        'flex-direction': 'column',
        'align-content': 'center'
    },
    avatarStyle: {
        backgroundColor: 'purple'
    },
    margintyle: {
        margin: '10px 10px' 
    },
  }

  const navigate = useNavigate(); // set the usuerNavigate function

  const validationSchema = Yup.object({ // define the validation schema
    email: Yup
      .string()
      .email('Invalid email')
      .required('Email is required'),
  });

  const formik = useFormik({  // define the formik data
    initialValues: {
      email:'',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      navigate('/successRecovery'); 
       
    },
});

  return (  // html code
    <form onSubmit={formik.handleSubmit}>
        <Grid>
            <Paper elevation={10} sx={styles.paperStyle}>
              <Typography gutterBottom sx = {{fontSize:'calc(5vmin)'}}>
              😕Forgot your password?
              </Typography>
              <Typography gutterBottom sx = {{fontSize:'calc(3vmin)'}}>
                  Don't worry it happens to the best of us 😀. Enter your email below and we'll 
                  send a link for a password reset.
              </Typography>
              <TextField 
                  name="email" 
                  type="email" 
                  label="Recovery Email" 
                  variant="outlined"      
                  sx = {{marginBottom: '10px'}}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
              >
              </TextField>
              <Button 
                  type='submit' 
                  color='success' 
                  variant='contained' 
                  fullWidth>
                  Submit recovery email
              </Button>
            </Paper>
        </Grid>
      </form>
  );
}
