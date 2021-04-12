import React, {useState, useEffect, useRef} from 'react' 

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import WalletTable from '../bc/wallet.js'

const Setting = (props) =>{ 
    const token = props.token //token hooked
    const [info, setInfo] = useState("")
    const [walletInfo ,setWalletinfo]=useState(null)
    const useStyles = makeStyles((theme) => ({
        addw:{
            width:200
        },
        root: {
            minHeight: 300,
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
              .then(data=> {console.log(data) ; setInfo(data) })
              .catch(error => console.log(error))
        }
        const getWalletInfo = async (token)=>{
            const requestOptions={
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify({"token":token})
              };
              await fetch(localStorage.getItem("BackendURL")+"/bc/wallet/list", requestOptions)
              .then(res => res.json())
              .then(data=> {console.log(data) ; setWalletinfo(data.msg) })
              .catch(error => console.log(error))
        }
        getUserInfo(token)        
        getWalletInfo(token)
    },[])

    return (
        <Container >
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Setting
                </Typography>
            </div>
            <Grid container spacing={5}>
                
                <Grid item xs={12} sm={6}>
                    <Card className={classes.root} variant="outlined">
                        <CardHeader className={classes.title} title=" 👨 Icon">
                        </CardHeader>
                        <CardContent >
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Card className={classes.root} variant="outlined">
                        <CardHeader className={classes.title} title=" 🔑 Change Password">
                        </CardHeader>
                        <CardContent >
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12}>
                    <Card className={classes.root} variant="outlined">
                        <CardHeader className={classes.title} title=" 👛 Wallet">
                            
                        </CardHeader>
                        <CardContent >
                            <Grid container >
                                <Grid item xs={12} mb={2} >
                                    <Grid container justify="flex-end">
                                        <Button 
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.addw}
                                        >
                                        Add Wallet
                                        </Button>
                                    </Grid>
                                </Grid>
                                {walletInfo==null ? (
                                            <div></div>
                                        ) : (
                                            <Grid item mt={2} xs={12} >
                                                <WalletTable walletInfo={walletInfo} token={token}>
            
                                                </WalletTable>
                                             </Grid>
                                        )}
                                
                            </Grid>
                            
                            
                            
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            
        </Container>
    )
}
export default Setting