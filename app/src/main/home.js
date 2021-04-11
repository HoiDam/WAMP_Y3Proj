import React, {useState, useEffect, useRef} from 'react' 

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const Home = () =>{ 
    const useStyles = makeStyles({
        root: {
          minWidth: 300,
          height: 600
        },    
        title: {
            fontSize: 14,
            textAlign: 'center'
        },
        content:{
            width:"100%",
            height:"100%"
        }
          });
    const classes = useStyles();
    return (
        <Card className={classes.root} variant="outlined">
            <CardHeader className={classes.title} title="Welcome">
                
            </CardHeader>
            <CardContent >
            
            </CardContent>
        </Card>
    )
}
export default Home