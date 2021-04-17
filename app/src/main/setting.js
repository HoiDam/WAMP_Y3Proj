import React, {useState, useEffect, useRef} from 'react' 

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Warning from '../utils/warning.js'
import WalletTable from '../bc/wallet.js'

const Setting = (props) =>{ 
    const token = props.token //token hooked
    const [info, setInfo] = useState("")
    const [walletInfo ,setWalletinfo]=useState(null)

    const [alertSeverity, setAlertSeverity] = useState('')
    const [alertMessage, setAlertMessage] = useState('')
    const [showAlert, setShowAlert] = useState(false)

    const useStyles = makeStyles((theme) => ({

        root: {
            minHeight: 400,
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
    const callbackFunction = () => {      
        setWalletinfo(null)
        getWalletInfo(token)
    }
    const getWalletInfo = async (token)=>{
        const requestOptions={
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({"token":token})
          };
          await fetch(localStorage.getItem("BackendURL")+"/bc/wallet/list", requestOptions)
          .then(res => res.json())
          .then(data=> {setWalletinfo(data.msg) })
          .catch(error => console.log(error))
    }

    const handleChange = async(event) =>{
        event.preventDefault();
        let old_password = event.target[0].value
        let new_password = event.target[2].value
        let c_new_password = event.target[4].value
        
        if (c_new_password!=new_password){
            setShowAlert(true)
            setAlertMessage("Your confirm password is not match")
            setAlertSeverity("error")
        }else if (old_password==new_password){
            setShowAlert(true)
            setAlertMessage("new password cant be the same with old password")
            setAlertSeverity("error")
        }else{
            const LOGIN_API_ENDPOINT = localStorage.getItem("BackendURL")+"/user/pw/edit";
            const requestOptions={
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify({"email":info.email,"old_password":old_password,"new_password":new_password})
            };
            const prom  = await fetch(LOGIN_API_ENDPOINT, requestOptions)
            .then(response => {
                return response.json()
            })
            if (prom["status"]=="success"){
                setShowAlert(true)
                setAlertMessage(prom["msg"])
                setAlertSeverity("success")
            }
            else if(prom["status"]=="failed"){
                setShowAlert(true)
                setAlertMessage(prom["msg"])
                setAlertSeverity("error")
            }
        }
    }
    useEffect(() => {
        const getUserInfo = async (token)=>{
            const requestOptions={
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify({"token":token})
              };
              await fetch(localStorage.getItem("BackendURL")+"/user/info", requestOptions)
              .then(res => res.json())
              .then(data=> {setInfo(data.msg) })
              .catch(error => console.log(error))
        }
        
        getUserInfo(token)        
        getWalletInfo(token)
    },[])

    return (
        <Container >
            {showAlert ? (
                        <Warning severity={alertSeverity} message={alertMessage} />
                    ) : (
                        ''
                    )}
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    ⚙️ Setting
                </Typography>
            </div>
            <Grid container spacing={5}>
                
                <Grid item xs={12} sm={6}>
                    <Card className={classes.root} variant="outlined">
                        <CardHeader className={classes.title} title=" 👨 Profile">
                        </CardHeader>
                        <CardContent >
                            <Box border={1} mb={2} borderColor="secondary.main" height="50px">
                                <Typography component="h1" variant="h6">
                                    Nickname : {info.nickname}
                                </Typography>
                            </Box>
                            <Box border={1} mb={2} borderColor="secondary.main" height="50px">
                                <Typography component="h1" variant="h6">
                                    Email: {info.email}
                                </Typography>
                            </Box>
                            <Box border={1} mb={2} borderColor="secondary.main" height="50px">
                                <Typography component="h1" variant="h6">
                                    Created at: {info.created_at}
                                </Typography>
                            </Box>
                            <Box border={1} mb={2} borderColor="secondary.main" height="50px">
                                <Typography component="h1" variant="h6">
                                    Last password time: {info.latest_pw_dt}
                                </Typography>
                            </Box>
                            
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Card className={classes.root} variant="outlined">
                        <CardHeader className={classes.title} title=" 🔑 Change Password">
                        </CardHeader>
                        <CardContent >
                        <form onSubmit={handleChange}>
                                <Grid container direction="row" spacing="2"> 
                                    <Grid item xs={12}>
                                        <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="old_password"
                                        label="Old Password"
                                        name="old_password"
                                        autoFocus
                                        /> 
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="new_password"
                                        label="New Password"
                                        name="new_password"
                                        autoFocus
                                        /> 
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="c_new_password"
                                        label="Confirm New Password"
                                        name="c_new_password"
                                        autoFocus
                                        /> 
                                    </Grid>
                                                                        
                                    <Grid item xs={12} >
                                        <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        size = "large"
                                        fullWidth
                                        className={classes.button}
                                        >
                                            Change
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12}>
                    <Card className={classes.root} variant="outlined">
                        <CardHeader className={classes.title} title=" 👛 Wallet">
                            
                        </CardHeader>
                        <CardContent >
                            {walletInfo==null ? (
                                <div>Loading...</div>
                                            ) : (
                                <WalletTable walletInfo={walletInfo} token={token} parentCallback = {callbackFunction}>

                                </WalletTable>
                                
                            )}
                           
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            
        </Container>
    )
}
export default Setting