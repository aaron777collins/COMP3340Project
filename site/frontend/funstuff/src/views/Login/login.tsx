import React from 'react';
import {Avatar, Box, Checkbox, Grid, Paper, TextField, FormControlLabel, Button, Typography, Link} from '@mui/material'
import FaceIcon from '@mui/icons-material/Face';


export default function Login () {
    
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
            backgroundColor: 'purple'
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
                    <Avatar sx={styles.avatarStyle}><FaceIcon></FaceIcon></Avatar>
                    <h2>Sign in</h2>
                    <TextField id="outlined-basic" label="Username" variant="outlined" fullWidth sx={styles.margintyle}/>
                    <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth sx={styles.margintyle}/>
                    <FormControlLabel control={<Checkbox name='rememberMe'/>} label="Remember me" />
                    <Button type='submit' color='primary' variant='contained' fullWidth>Sign in</Button>
                    <Typography sx={styles.margintyle}><Link href="#" >Forgot Password?</Link></Typography>
                    <Typography sx={styles.margintyle}>Don't have an account? <Link href="#" >Sign up.</Link></Typography>
                </Grid>
            </Paper>
        </Grid>
  );
}
