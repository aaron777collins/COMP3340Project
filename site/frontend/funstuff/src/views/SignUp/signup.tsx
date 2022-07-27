import React from 'react';
import {Avatar, Box, Checkbox, Grid, Paper, TextField, FormControlLabel, Button, Typography, Link} from '@mui/material'
import PasswordIcon from '@mui/icons-material/Password';


export default function SignUp () {
    
    const styles = {
        paperStyle: {
            padding: '30px 40px', 
            minHeight: '70vh', 
            height: '70vh', 
            width: '40vh', 
            minWidth: '40vh', 
            margin: '20px auto'
        },
        avatarStyle: {
            backgroundColor: 'green'
        },
        margintyle: {
            margin: '10px 10px' 
        },
    }

    return (
        <Grid>
            <Paper elevation={10} sx={styles.paperStyle}>
                <Grid container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    textAlign="center">
                    <Avatar sx={styles.avatarStyle}><PasswordIcon></PasswordIcon></Avatar>
                    <h2>Sign up</h2>
                    <Typography>We need a few details before you can sign up.</Typography>
                    <TextField id="outlined-basic" label="Username" variant="outlined" fullWidth sx={styles.margintyle}/>
                    <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth sx={styles.margintyle}/>
                    <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth sx={styles.margintyle}/>
                    <TextField id="outlined-basic" label="Confirm Password" variant="outlined" fullWidth sx={styles.margintyle}/>
                    <FormControlLabel control={<Checkbox name='rememberMe'/>} label="Remember me" />
                    <Button type='submit' color='primary' variant='contained' fullWidth>Sign up</Button>
                    <Typography sx={styles.margintyle}>Have an account? <Link href="#" >Log in.</Link></Typography>
                </Grid>
            </Paper>
        </Grid>
  );
}
