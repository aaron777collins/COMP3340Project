import { Button, Grid, Paper, Typography } from '@mui/material';

export interface IAppProps {
}

export default function ErrorPage (props: IAppProps) {

  const styles = {
    paperStyle: {
        padding: '30px 40px', 
        minHeight: '30vh', 
        height: '30vh', 
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

  return (
        <Grid >
            <Paper elevation={10} sx={styles.paperStyle}>
              <Typography gutterBottom sx = {{fontSize:'calc(5vmin)'}}>
              🤔 Uh oh, how'd you end up here?
              </Typography>
              <Typography gutterBottom sx = {{fontSize:'calc(3vmin)'}}>
                  This page doesn't exist. 
              </Typography>
              <Button href='/' variant="contained" color='success'>
                    Take me home!
              </Button>
            </Paper>
        </Grid>
  );
}
