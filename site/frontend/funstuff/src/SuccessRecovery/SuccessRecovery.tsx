import { Alert, AlertTitle, Grid, Paper } from "@mui/material";


export default function ErrorPage () {

  const styles = {
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

  return (
        <>
            <Grid>
                <Paper elevation={10} sx={styles.paperStyle}>
                    <Alert severity="success">
                        <AlertTitle>Success Recovery Email Sent</AlertTitle>
                        <strong>Follow the instructions on the recovery email to reset your password.</strong>
                    </Alert>
                </Paper>
            </Grid>
        </>
  );
}