import React, {useState, useEffect, useRef} from 'react' 
import Button from '@material-ui/core/Button';
import { DataGrid } from '@material-ui/data-grid';

import AddressModal from '../bc/address.js'

export default function WalletTable(props) {
    const [walletID,setWalletID]=useState(null)
    const [isopen,setIsopen]=useState(false)
    function handleOnclick (id) {
        // console.log(id)
        setWalletID(id)
        setIsopen(true)
        // setWalletID(null)
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
                    id={(params)}
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ marginLeft: 32 }}
                    onClick = {()=>{handleOnclick(params.value)}}
                  >
                    Details
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
        <div style={{ height: 500, width: '100%' }}>
            <DataGrid rows={walletInfo} columns={columns} />
        </div>
        {walletID ==null ? <div></div> : <AddressModal walletID={walletID} open={isopen} token={token} parentCallback = {callbackFunction}/>}
    </div>
  );
}
