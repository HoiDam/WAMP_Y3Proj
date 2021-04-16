import React, {useState, useEffect, useRef} from 'react' 

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import Warning from '../utils/warning.js'
import AddressDetail from '../bc/addressdetail.js'
import TransactionDetail from '../bc/transaction.js'

const Bas = (props) =>{ 
    const token = props.token //token hooked

    const [infod , setInfod] = useState(0)
    const [transaction , setTransaction] = useState(null)
    const [qbitcoin , setQbitcoin] = useState(null)

    const [alertSeverity, setAlertSeverity] = useState('')
    const [alertMessage, setAlertMessage] = useState('')
    const [showAlert, setShowAlert] = useState(false)

    const [method, setMethod] = useState('');

    const handleChange = (event) => {
        setMethod(event.target.value);
    };

    const useStyles = makeStyles((theme) => ({
        root: {
           marginBottom: theme.spacing(2),
           minHeight :500
         },
         title: {
            fontSize: 30,
            textAlign: 'center'
        },paper: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          },
          input: {
            height: 60
          },
          button: {
            height: 60
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
        .then(data=> { setInfod(data.msg)})
        .catch(error => console.log(error))
    }
    const getTransactionInfo = async (token)=>{
        const requestOptions={
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify({"token":token})
        };
        await fetch(localStorage.getItem("BackendURL")+"/bc/transaction/list", requestOptions)
        .then(res => res.json())
        .then(data=> { setTransaction(data.msg)})
        .catch(error => console.log(error))
    }

    useEffect(() => {
        getUserInfo(token)      
        getTransactionInfo(token)  
    },[])

    const handleQuery = async (event) =>{
        event.preventDefault();
        
        let address = event.target.address.value;
        
        const requestOptions={
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({"address":address})
        };
        const fetched = await fetch(localStorage.getItem("BackendURL")+"/bc/address/detail", requestOptions)
        .then(res => res.json())
        .then(data=> { return data})
        .catch(error => console.log(error))
        if (fetched.msg.hasOwnProperty('balance')) {
            setShowAlert(false)
            setQbitcoin(fetched.msg)
        }
        else if(fetched.status=="success"){
            setShowAlert(true)
            setAlertMessage(fetched.msg.error)
            setAlertSeverity("error")
        }
        else {
            setShowAlert(true)
            setAlertMessage(fetched.msg)
            setAlertSeverity("error")
        }
    }

    const callbackFunction = () => {  
        getTransactionInfo(token)    
    }

    const handleSubmit = async(event) =>{
        event.preventDefault();
        let from_address = event.target[1].value
        let to_address = event.target[3].value
        let bitcoin_amount = parseInt(event.target[5].value)
        let fund_amount = parseInt(event.target[7].value)

        const requestSetting={
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({"token":token,"from_address":from_address,"to_address":to_address,"bitcoin_amount":bitcoin_amount,"fund_amount":fund_amount,"method":method})
        };
        const fetched = await fetch(localStorage.getItem("BackendURL")+"/bc/transaction/create", requestSetting)
        .then(res => res.json())
        .then(data=> {return data})
        .catch(error => console.log(error))
        if(fetched.status=="success"){
            setShowAlert(false)
            getTransactionInfo(token) 
        }
        else {
            setShowAlert(true)
            setAlertMessage(fetched.msg)
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
                    💻  Buy and Sell
                </Typography>
            </div>
            <Grid container spacing={5}>
                <Grid item xs={12} >
                    <Card className={classes.root} variant="outlined">
                        <CardHeader className={classes.title} title=" Transaction History">
                        </CardHeader>
                        <CardContent >
                            {transaction==null?(<div>Loading...</div>):
                                    (
                                        <TransactionDetail transaction={transaction} token={token} userId={infod.id} parentCallback = {callbackFunction}> </TransactionDetail>
                                    )
                                    }
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card className={classes.root} variant="outlined">
                        <CardHeader className={classes.title} title=" Create Transaction ">
                        </CardHeader>
                        <CardContent >
                            <form onSubmit={handleSubmit}>
                                <Grid container direction="row" spacing="2"> 
                                    <Grid item xs={12}>
                                    <FormControl fullWidth >
                                        <InputLabel id="method">Method</InputLabel>
                                        <Select
                                        labelId="method"
                                        id="method"
                                        value={method}
                                        onChange={handleChange}
                                        required
                                        >
                                            <MenuItem value={"buy"}>Buy</MenuItem>
                                            <MenuItem value={"sell"}>Sell</MenuItem>
                                        </Select>
                                    </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="from_address"
                                        label="Your Bitcoin Address"
                                        name="from_address"
                                        autoComplete="bitcoin_address"
                                        autoFocus
                                        InputProps={{
                                            className: classes.input
                                        }}
                                        /> 
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="to_address"
                                        label="Target Bitcoin Address"
                                        name="to_address"
                                        autoComplete="bitcoin_address"
                                        autoFocus
                                        InputProps={{
                                            className: classes.input
                                        }}
                                        /> 
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="bitcoin_amount"
                                            label="Bitcoin"
                                            name="bitcoin_amount"
                                            autoComplete="bitcoin_amount"
                                            autoFocus
                                            type="number"
                                            inputProps={{ min: "1", step: "1" }}
                                            />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="fund_amount"
                                            label="Funds"
                                            name="fund_amount"
                                            autoComplete="fund_amount"
                                            autoFocus   
                                            type="number"
                                            inputProps={{ min: "0", step: "1" }}
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
                                            Create 
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card className={classes.root} variant="outlined">
                        <CardHeader className={classes.title} title="Current Balance">
                        </CardHeader>
                        <CardContent >
                            <Grid container direction="column" spacing="2" >
                                <Grid item xs={12} >
                                    <Typography variant="h6">
                                    💰 Funds Balance := ${infod.funds}
                                    </Typography>
                                </Grid>
                                <Grid container item xs={12} direction="column" spacing="2">
                                    <Grid item>
                                        <Typography variant="h6">
                                        ₿ Query Address Balance :
                                        </Typography>
                                    </Grid>
                                    {qbitcoin==null?(<div></div>):
                                    (
                                        <AddressDetail qbitcoin={qbitcoin}></AddressDetail>
                                    )
                                    }
                                    <Grid item>
                                        <form onSubmit = {handleQuery}>
                                            <Grid container direction="row" spacing="4"> 
                                                <Grid item sm={9}>
                                                    <TextField
                                                    variant="outlined"
                                                    required
                                                    fullWidth
                                                    id="address"
                                                    label="Bitcoin Address"
                                                    name="address"
                                                    autoComplete="address"
                                                    autoFocus
                                                    InputProps={{
                                                        className: classes.input
                                                    }}
                                                    /> 
                                                </Grid>
                                                <Grid item sm={3}>
                                                    <Button
                                                    type="submit"
                                                    variant="contained"
                                                    color="primary"
                                                    size = "large"
                                                    fullWidth
                                                    className={classes.button}
                                                    >
                                                        Query
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </form>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
               
            </Grid>
            
        </Container>
    )
}
export default Bas