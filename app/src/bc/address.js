import React, {useState, useEffect, useRef,Component} from 'react' 

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { DataGrid } from '@material-ui/data-grid';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = ((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

const columns = [
    {
        field: 'id',
        hide: true,
        identity: true
    },
    {
        field: 'addressData',
        headerName: 'Address',
        width:200,
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

const rows=[
    {
      "addressData": "mtNBJv8Z2U9BTTWJs9SCZiUDojABotZccA",
      "unconfirmed_balance": 0,
      "balance": 0,
      "id": 1
    },
    {
      "addressData": "n1Ggh99KvgWoTqdv1ff1t4a3KEb8k3udgh",
      "unconfirmed_balance": 0,
      "balance": 0,
      "id": 2
    }
  ]

class AddressModal extends Component {
    
    constructor(props) {
      super(props)
      this.state={
          open:false,
          addressInfo:null
      }
      this.handleOpen = this.handleOpen.bind(this)
      this.handleClose = this.handleClose.bind(this)
      
    }

    addAddress = async (token,walletID)=>{
        const requestOptions={
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({"token":token,"wallet_user_count":walletID})
          };
          await fetch(localStorage.getItem("BackendURL")+"/bc/address/add", requestOptions)
          .then(res => res.json())
          .then(data=> {console.log(data) ;})
          .catch(error => console.log(error))
    }
    
     
    getAddressDetail = async (address)=>{
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

    // this.setState({addressInfo:data.msg}) 
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
            var detail = await this.getAddressDetail(a_array[row]["addressData"])
            // console.log(detail)
            a_array[row]["unconfirmed_balance"] = detail["unconfirmed_balance"]
            a_array[row]["balance"] = detail["balance"]
            a_array[row]["id"]=parseInt(row)+1
        }
        // console.log(a_array)
        this.setState({addressInfo:a_array});
        console.log(this.state.addressInfo)
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

    render(){
        return(
            <Dialog
                open={this.props.open}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                contentStyle={{width: "100%", maxWidth: "none"}}
            >
                <DialogTitle id="alert-dialog-title">{`📋 Address ${this.props.walletID}  List`}</DialogTitle>
                <div style={{width: 800}}>
                <DialogContent>
                    <Grid container fixed >
                        <Grid item xs={12} mb={2} >
                            <Grid container justify="flex-end">
                                <Button 
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick = {()=>{this.addAddress(this.props.token,this.props.walletID)}}
                                >
                                Add Address
                                </Button>
                            </Grid>
                        </Grid>
                        
                        <Grid item mt={2} xs={12} >
                        {/* <div style={{ height: 500, width: '100%' }}>
                                <DataGrid rows={rows} columns={columns} />
                        </div> */}
                        {this.state.addressInfo==null? <div></div> :
                            <div style={{ height: 500, width: '100%' }}>
                                <DataGrid rows={this.state.addressInfo} columns={columns} />
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
        )
    }
}
export default withStyles(useStyles, { withTheme: true })(AddressModal)
