import React, {useState, useEffect, useRef,Component} from 'react' 

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';

class AddressDetail extends Component {
    constructor(props) {
        super(props)
      }
    //   rows = [{
    //     "id":1,
    //     "address": "n4eSSGKgW5DPb4D4JtcJK9r5Cv3zBZLJRU",
    //     "total_received": 0,
    //     "total_sent": 0,
    //     "balance": 0,
    //     "unconfirmed_balance": 0,
    //     "final_balance": 0,
    //     "n_tx": 0,
    //     "unconfirmed_n_tx": 0,
    //     "final_n_tx": 0
    //   }]
      columns = [
          {
              field: 'id',
              hide: true,
              identity: true
          },
          {
              field: 'address',
              headerName: 'Address',
              width:400, 
              
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
          {
            field: 'final_balance',
            headerName: 'Final Balance',
            width:200
            },
          {
            field: 'total_received',
            headerName: 'Total Received',
            width:200
            },
            {
                field: 'total_sent',
                headerName: 'Total Sent',
                width:200
                },
      ];

      render(){
        //   console.log(this.props)
          var rows = []
          rows.push(this.props.qbitcoin)
          rows[0]["id"]=1
          return (
            <div style={{ height: 200, width: '100%' }}>
            <DataGrid rows={rows} columns={this.columns} />
            </div>
          )
      }
}
export default AddressDetail
