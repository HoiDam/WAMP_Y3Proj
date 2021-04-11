import React, {useState, useEffect, useRef} from 'react' 

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const Daw = (props) =>{ 
    const token = props.token //token hooked

    const [funds , setFunds] = useState(0)

    const useStyles = makeStyles((theme) => ({
        root: {
            minWidth: 300,
            height: 600,
            marginBottom: theme.spacing(2),
          },    
          title: {
              fontSize: 30,
              textAlign: 'center'
          },
          content:{
              width:"100%",
              height:"100%"
          },
          paper: {
              marginTop: theme.spacing(2),
              marginBottom: theme.spacing(2),
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            },
      }));
    const classes = useStyles();
    
    useEffect(() => {
        const getUserInfo = async (token)=>{
            const requestOptions={
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify({"token":token})
              };
              await fetch(localStorage.getItem("BackendURL")+"/user/info", requestOptions)
              .then(res => res.json())
              .then(data=> {console.log(data) ;setFunds(data.msg.funds);})
              .catch(error => console.log(error))
        }
        getUserInfo(token)        
    },[])

    return (
        <Container >
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                💰 Balance := ${funds}
                </Typography>
            </div>
            <Grid container spacing={3}>
                <Grid item xs>
                    <Card className={classes.root} variant="outlined">
                        <CardHeader className={classes.title} title=" ⎆ Deposit">
                            
                        </CardHeader>
                        <CardContent >

                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs>
                    <Card className={classes.root} variant="outlined">
                        <CardHeader className={classes.title} title=" ⏎ Withdrawl">
                            
                        </CardHeader>
                        <CardContent >

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}
export default Daw