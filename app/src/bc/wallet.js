import React, {useState, useEffect, useRef} from 'react' 
import Button from '@material-ui/core/Button';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import AddressModal from '../bc/address.js'

export default function WalletTable(props) {
    const useStyles = makeStyles((theme) => ({
        addw:{
            width:200
        },
    }))
    const classes = useStyles();

    const [walletID,setWalletID]=useState(null)
    const [isopen,setIsopen]=useState(false)

    async function handleCreate(token){
        const requestOptions={
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({"token":token})
          };
        await fetch(localStorage.getItem("BackendURL")+"/bc/wallet/add", requestOptions)
        .then(res => res.json())
        .then(data=> {console.log(data) ;})
        .catch(error => console.log(error))
        props.parentCallback();
    }
    function handleOnclick (id) {
        setWalletID(id)
        setIsopen(true)
    } 
    async function handleDelete(token,wid){
        const requestOptions={
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({"token":token,"wallet_user_count":wid})
        };
        await fetch(localStorage.getItem("BackendURL")+"/bc/wallet/delete", requestOptions)
        .then(res => res.json())
        .then(data=> {console.log(data) ;})
        .catch(error => console.log(error))
        props.parentCallback();
          
    }

    const callbackFunction = () => {      
        setWalletID(null)
        setIsopen(false)
    }

    var walletInfo = props.walletInfo
    for (const row in walletInfo){
        walletInfo[row]["id"]=parseInt(row)+1
    }
    const columns = [

        {
            field: 'id',
            hide: true,
            identity: true
        },
        {
            field: 'wallet_user_count',
            headerName: 'Wallet ID',
            width:400,
            renderCell: (params) => (
                <strong>
                   {(params.value)}
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ marginLeft: 64 }}
                    onClick = {()=>{handleOnclick(params.value)}}
                  >
                    Details
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    style={{ marginLeft: 64 }}
                    onClick = {()=>{handleDelete(token,params.value)}}
                  >
                    Delete
                  </Button>
                </strong>
            )
        },
        {
            field: 'custom_desc', headerName: 'Description',width:400
        },
          
    ];
    const token = props.token

  return (
    <div>
        <Grid container >
            <Grid item xs={12}  >
                <Grid container justify="flex-end" mb={2}>
                    <Button 
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.addw}
                    onClick = {()=>{handleCreate(token)}}
                    >
                    Add Wallet
                    </Button>
                </Grid>
            </Grid>
                <Grid item xs={12} >
                    <div style={{ height:500, width: '100%' }}>
                        <DataGrid rows={walletInfo} columns={columns} />
                    </div>
                </Grid>
        </Grid>
        {walletID ==null ? <div></div> : <AddressModal walletID={walletID} open={isopen} token={token} parentCallback = {callbackFunction}/>}
    </div>
  );
}
