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

import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'


import Warning from '../utils/warning.js'
import Invoice from '../utils/invoice.js'
import {PDFDownloadLink } from '@react-pdf/renderer'

const Daw = (props) =>{ 
    const token = props.token //token hooked

    const [infod , setInfod] = useState(0)
    const [picproof , setPicproof] = useState(null)
    const [wdsuccess , setWdsuccess] = useState(false)
    const [withdrawled, setWithdrawled] = useState(0)

    const [alertSeverity, setAlertSeverity] = useState('')
    const [alertMessage, setAlertMessage] = useState('')
    const [showAlert, setShowAlert] = useState(false)

    

    const useStyles = makeStyles((theme) => ({
         root: {
            minWidth: 300,
            marginBottom: theme.spacing(2),
            minHeight :600
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
    
    const getUserInfo = async (token)=>{
        const requestOptions={
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({"token":token})
          };
          await fetch(localStorage.getItem("BackendURL")+"/user/info", requestOptions)
          .then(res => res.json())
          .then(data=> {setInfod(data.msg)})
          .catch(error => console.log(error))
    }

    useEffect(() => {
        getUserInfo(token)        
    },[])

    const handleChangeStatus = ({ meta, file }, status) => { setPicproof(file) } //dropzone
    const handleDeposit = async(event) =>{
        event.preventDefault();

        if (picproof == null){
            
            alertMessage="Please upload photo proof"
            alertSeverity="error"
            setShowAlert(true)
        }
        else{
            let amount = parseInt(event.target.amount.value);
            let method = "add"
            const data = {
            token,amount,method
            };

            const LOGIN_API_ENDPOINT = localStorage.getItem("BackendURL")+"/user/funds/edit";
            const requestOptions={
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(data)
            };
            const prom  = await fetch(LOGIN_API_ENDPOINT, requestOptions)
                .then(response => {
                    return response.json()
                })

            if (prom["status"]=="success"){
                setShowAlert(true)
                setAlertMessage(prom["msg"])
                setAlertSeverity("success")
                getUserInfo(token) 
            }
            else if(prom["status"]=="failed"){
                setShowAlert(true)
                setAlertMessage(prom["msg"])
                setAlertSeverity("error")
            }
        }   
    }
    const handleWithdrawl = async(event) =>{
        event.preventDefault();
        
        let amount = parseInt(event.target.amount.value);
        let method = "minus"
        const data = {
        token,amount,method
        };

        setWithdrawled(amount)

        const LOGIN_API_ENDPOINT = localStorage.getItem("BackendURL")+"/user/funds/edit";
        const requestOptions={
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(data)
        };
        const prom  = await fetch(LOGIN_API_ENDPOINT, requestOptions)
            .then(response => {
                return response.json()
            })

        if (prom["status"]=="success"){
            setShowAlert(true)
            setAlertMessage(prom["msg"])
            setAlertSeverity("success")
            getUserInfo(token) 
            setWdsuccess(true)
        }
        else if(prom["status"]=="failed"){
            setShowAlert(true)
            setAlertMessage(prom["msg"])
            setAlertSeverity("error")
        }
        
    }
    
    return (
        <Container >
            {showAlert ? (
                        <Warning severity={alertSeverity} message={alertMessage} />
                    ) : (
                        ''
                    )}
            <div className={classes.paper}>
                <Typography component="h1" variant="h4">
                💰 Funds Balance := ${infod.funds}
                </Typography>
            </div>
            <Grid container spacing={3}>
                <Grid item xs>
                    <Card className={classes.root} variant="outlined" >
                        <CardHeader className={classes.title} title=" ⎆ Deposit">
                        </CardHeader>
                        <CardContent >
                        <form className={classes.form} onSubmit={handleDeposit} > 
                            <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="amount"
                            label="Amount"
                            name="amount"
                            autoComplete="amount"
                            autoFocus
                            type="number"
                            inputProps={{ min: "0", step: "1" }}
                            />
                            <Box mt={2} mb={2}>
                                <Dropzone
                                    onChangeStatus={handleChangeStatus}
                                    accept="image/*"
                                    maxFiles="1"
                                    />
                            </Box>
                            <Button 
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            >
                            Deposit
                            
                            </Button>
                        </form>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs>
                    <Card className={classes.root} variant="outlined">
                        <CardHeader className={classes.title} title=" ⏎ Withdrawl">
                            
                        </CardHeader>
                        <CardContent >
                        <form className={classes.form} onSubmit={handleWithdrawl} > 
                            <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="amount"
                            label="Amount"
                            name="amount"
                            autoComplete="amount"
                            autoFocus
                            type="number"
                            inputProps={{ min: "0", step: "1" }}
                            />
                            
                            <Button 
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            >
                            Withdrawl
                            
                            </Button>
                        </form>
                        
                        {wdsuccess ? (
                        <Box  mt={2}>
                                                   
                            <Button 
                            fullWidth
                            variant="contained"
                            color="success"
                            className={classes.submit}>
                                <PDFDownloadLink document={<Invoice invoice={infod} amount={withdrawled}></Invoice>} fileName="invoice.pdf">
                                {({ blob, url, loading, error }) =>
                                    loading ? 'Loading document...' : 'Download Invoice!'
                                }
                                </PDFDownloadLink>
                            </Button>
                        </Box>
                                        ) : (
                                            ''
                                        )}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

        </Container>
    )
}
export default Daw