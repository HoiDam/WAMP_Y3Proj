import React, {useState, useEffect, useRef,Component} from 'react' 

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const ObjectsToCsv = require('objects-to-csv');

class AddressModal extends Component {
    
    constructor(props) {
      super(props)
      this.state={
          open:false,
          addressInfo:null,
          addOpen:false
      }
      this.handleOpen = this.handleOpen.bind(this)
      this.handleClose = this.handleClose.bind(this)
      
    }
    columns = [
        {
            field: 'id',
            hide: true,
            identity: true
        },
        {
            field: 'addressData',
            headerName: 'Address',
            width:420, 
            renderCell: (params) => (
                <strong>
                   {(params.value)}
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    style={{ marginLeft: 16 }}
                    onClick = {()=>{this.deleteAddress(params.value)}}
                  >
                    Delete
                  </Button>
                  
                </strong>
            )
        },
        {
            field: 'unconfirmed_balance',
            headerName: 'Unconfirmed Balance',
            width:200
        },
        {
            field: 'balance',
            headerName: 'Current Balance',
            width:200
        },
    ];

  
    deleteAddress = async (address)=>{
        const requestOptions={
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({"token":this.props.token,"address":address,'wallet_user_count':this.props.walletID})
          };
        await fetch(localStorage.getItem("BackendURL")+"/bc/address/delete", requestOptions)
        .then(res => res.json())
        .then(data=> {console.log(data) ;})
        .catch(error => console.log(error))
        await this.getAddressInfo(this.props.token,this.props.walletID)
    }
    // detailAddress = async (address)=>{
    //     const requestOptions={
    //         method: "POST",
    //         headers: {'Content-Type': 'application/json'},
    //         body:JSON.stringify({"token":this.props.token,"address":address,'wallet_user_count':this.props.walletID})
    //       };
    //     const fetched = await fetch(localStorage.getItem("BackendURL")+"/bc/address/detail", requestOptions)
    //     .then(res => res.json())
    //     .then(data=> {console.log(data) ;})
    //     .catch(error => console.log(error))
    //     const f_array = [fetched]
    //     const csv = new ObjectsToCsv(f_array);
    //     await csv.toDisk('./test.csv');
    // }
     
    getAddressBalance = async (address)=>{
        const requestOptions={
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({"address":address})
          };
        const fetched = await fetch(localStorage.getItem("BackendURL")+"/bc/address/detail", requestOptions)
          .then(res => res.json())
          .then(data=> {return(data.msg) ; })
          .catch(error => console.log(error))
        return fetched
    }

    getAddressInfo = async (token,walletID)=>{
        const requestOptions={
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({"token":token,"wallet_user_count":walletID})
          };
        var a_array = await fetch(localStorage.getItem("BackendURL")+"/bc/address/list", requestOptions)
          .then(res => res.json())
          .then(data=> {console.log(data) ; return data.msg; })
          .catch(error => console.log(error))
        for (const row in a_array){
            var detail = await this.getAddressBalance(a_array[row]["addressData"])
            // console.log(detail)
            a_array[row]["unconfirmed_balance"] = detail["unconfirmed_balance"]
            a_array[row]["balance"] = detail["balance"]
            a_array[row]["id"]=parseInt(row)+1
        }
        // console.log(a_array)
        this.setState({addressInfo:a_array});
        // console.log(this.state.addressInfo)
    }

    async componentDidMount() {
        console.log(this.props)
        await this.getAddressInfo(this.props.token,this.props.walletID)
    }
    handleOpen = () => {
        this.setState({open:true});
      };

    handleClose = () => {
        this.setState({open:false});
        this.props.parentCallback();
    };

    addClose = ()=>{
        this.setState({addOpen:false});
    }
    handleSubmit =async(event)=>{
        event.preventDefault();
        const requestOptions={
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({"token":this.props.token , "wallet_user_count":this.props.walletID , "address":event.target[0].value , "private":event.target[2].value , "public":event.target[4].value , "wif":event.target[6].value})
          };
        await fetch(localStorage.getItem("BackendURL")+"/bc/address/add", requestOptions)
        .then(res => res.json())
        .then(data=> {console.log(data) ;})
        .catch(error => console.log(error))
        await this.getAddressInfo(this.props.token,this.props.walletID)
        this.setState({addOpen:false})
    }

    render(){
        return(
            <div>
            <Dialog
                open={this.props.open}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                width="100%"
            >
                <DialogTitle id="alert-dialog-title">{`📋 Address ${this.props.walletID}  List`}</DialogTitle>
                <div style={{width: 800}}>
                <DialogContent>
                    <Grid container  >
                        <Grid item xs={12}>
                            <Grid container justify="flex-end">
                                <Button 
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick = {()=>{this.setState({addOpen:true})}}
                                >
                                Add Address
                                </Button>
                            </Grid>
                        </Grid>
                        
                        <Grid item xs={12} >
                        {this.state.addressInfo==null? <div>Loading...</div> :
                            <div style={{ height: 500, width: '100%' }}>
                                <DataGrid rows={this.state.addressInfo} columns={this.columns} />
                            </div>
                        }
                        
                        </Grid>
                    </Grid>
                </DialogContent>
                </div>
                <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                    Close
                </Button>
                
                </DialogActions>
            </Dialog>
            <Dialog
                open={this.state.addOpen}
                onClose={this.addClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <DialogTitle id="simple-modal-title">{`Add Address`}</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <Grid container direction="row" spacing="2"> 
                                <Grid item xs={12}>
                                    <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="address"
                                    label="Bitcoin Address"
                                    name="address"
                                    autoFocus
                                    /> 
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="private"
                                    label="Private key"
                                    name="private"
                                    autoFocus
                                    /> 
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="public"
                                    label="Public key"
                                    name="public"
                                    autoFocus
                                    /> 
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="wif"
                                    label="WIF"
                                    name="wif"
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
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </DialogContent>
            </Dialog>
            </div>
        )
    }
}
export default AddressModal

// ()=>{this.addAddress(this.props.token,this.props.walletID)}