import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 36
    },
    billTo: {
        marginTop: 20,
        paddingBottom: 3,
        fontFamily: 'Helvetica-Oblique'
    },
  });


  const BillTo = (props) => {
    // console.log(props)
    return(

    <View style={styles.headerContainer}>
        <Text style={styles.billTo}>Withdrawl To:</Text>
        <Text>Email :{props.invoice.invoice.email}</Text>
        <Text>Name :{props.invoice.invoice.nickname}</Text>
        <Text>Address :{props.invoice.invoice.address}</Text>
        <Text>Withdrawled Funds :{props.invoice.amount}</Text>
        <Text>Current Funds Left :{props.invoice.invoice.funds}</Text>
    </View>
  );
}   
  export default BillTo