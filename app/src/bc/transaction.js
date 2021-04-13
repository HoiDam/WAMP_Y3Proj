import React, {useState, useEffect, useRef,Component} from 'react' 

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';

import Warning from '../utils/warning.js'

class TransactionDetail extends Component {
    constructor(props) {
        super(props)
        this.state={
            token:this.props.token,
            userId:this.props.userId,
            alertSeverity:'',
            alertMessage:'',
            showAlert:false 
        }
      }
    //   rows=[{
    //     "id":"1",
    //     "transaction_id": "2",
    //     "from_address": "mm3ipvBgFFZB5sEKCTPAbwNBJt5fhrCBde",
    //     "to_address": "n1S8WSD7rEeRxtxdi6iTPvjpyEAd2aEDQh",
    //     "method": "sell",
    //     "bitcoin_amount": "10",
    //     "fund_amount": "20",
    //     "t_status": "requested",
    //     "from_id": "2",
    //     "to_id": "3",
    //     "start_time": "2021-04-05 16:16:28",
    //     "finish_time": null
    //   }]

      columns = [
            {
              field: 'id',
              hide: true,
              identity: true
            },
            {
                field: 'method',
                headerName: 'Buy / Sell',
                width:150, 
            },
            {
                field: 'from_address',
                headerName: 'From Address',
                width:350, 
            },
            {
                field: 'to_address',
                headerName: 'To Address',
                width:350, 
            },
            {
              field: 'bitcoin_amount',
              headerName: 'Bitcoin (Satoshi)',
              width:100, 
              
            },
            {
                field: 'fund_amount',
                headerName: 'Fund ',
                width:100, 
                
            },
            {
                field: 't_status',
                headerName: 'Status ',
                width:300,
                renderCell: (params) => (
                    <div>
                       { (params.value=="requested" && this.state.userId ==params.row.from_id) ? (
                            <div>
                                Requested
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    size="small"
                                    style={{ marginLeft: 16 }}
                                    onClick={()=>{this.handleOnclick(params,"cancel")}}
                                >
                                    Cancel
                                </Button>
                            </div>
                            ) : (
                                ''
                            )}

                        { (params.value=="requested" && this.state.userId ==params.row.to_id) ? (
                            <div>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    style={{ marginLeft: 16 }}
                                    onClick={()=>{this.handleOnclick(params,"accept")}}
                                >
                                    Accept
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    size="small"
                                    style={{ marginLeft: 16 }}
                                    onClick={()=>{this.handleOnclick(params,"decline")}}
                                >
                                    Decline
                                </Button>
                            </div>
                        ) : (
                            ''
                        )}
                        { (params.value=="transacted" ) ? (
                            <Typography>
                                Transacted
                            </Typography>
                        ) : (
                            ''
                        )}
                        { (params.value=="declined" ) ? (
                            <Typography>
                                Declined
                            </Typography>
                        ) : (
                            ''
                        )}      
                        { (params.value=="canceled" ) ? (
                            <Typography>
                                Canceled
                            </Typography>
                        ) : (
                            ''
                        )}               
                                          
                    </div>
                ) 
            },
            {
                field: 'start_time',
                headerName: 'Start time',
                width:200, 
            },
            {
                field: 'finish_time',
                headerName: 'Finish time',
                width:200, 
            }
            
          
      ];
      handleOnclick = async (params,action)=>{
        const requestOptions={
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({"token":this.state.token,"transaction_id":params.row.transaction_id,"action":action})
          };
        console.log(requestOptions,this.state.token)
        const fetched = await fetch(localStorage.getItem("BackendURL")+"/bc/transaction/action", requestOptions)
        .then(res => res.json())
        .then(data=> {console.log(data) ; return data})
        .catch(error => console.log(error))
        if (fetched.status == "failed"){
            this.setState({showAlert:true , alertMessage:fetched.msg ,alertSeverity:"error"});
        } else{
            this.props.parentCallback();
        }

      }
      

      render(){
          console.log(this.props)
          var rows = this.props.transaction
          for (const row in rows){
              rows[row]["id"]= parseInt(row)+1
          }          
          return (
            <div>
                {this.state.showAlert ? (
                    <Warning severity={this.state.alertSeverity} message={this.state.alertMessage} />
                ) : (
                    ''
                )}
                <div style={{ height: 500, width: '100%' }}>
                 <DataGrid rows={rows} columns={this.columns} />
                </div>
            </div>
          )
      }
}
export default TransactionDetail