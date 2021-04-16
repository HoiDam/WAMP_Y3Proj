import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getCookie, setCookie } from './utils/cookies';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';

import Copyright from './copyright.js' 

const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(20),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

  },image: {
    backgroundImage: 'url(https://source.unsplash.com/4_41-79dHvE)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  root: {
    height: '100vh',
  },
  submit: {
    margin: theme.spacing(20),
    minWidth: '400px',
    minHeight: '100px',
  },
});


class Welcome extends Component {
  constructor(props) {
    super(props)
    this.state={
      login:false
    }
  }


  render() {
    setCookie('token',"",1)
    const {classes} = this.props;
    this.props.response.login = []
    this.props.response.register = []
    return (
    <Grid container className={classes.root}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5}>
            <div className={classes.paper}>
                
                    <Typography component="h1" variant="h4">
                    ₿itCoin Exchange Platform  💵
                    </Typography>
                
                <Box display="flex">
                    <ButtonGroup size="large" color="secondary" orientation="vertical" variant="text" aria-label="outlined secondary button group " className={classes.submit}>
                        <Button component={Link} to="/login" >Login</Button>
                        <Button component={Link} to="/register"> Register</Button>
                    </ButtonGroup>
                </Box>

                <Box mt={8}>
                    <Copyright />
                </Box>
            </div>
        </Grid>
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        
    </Grid>
    );
  }
}
const mapStateToProps = (response) => ({response});
export default connect(mapStateToProps)((withStyles(useStyles, { withTheme: true })(Welcome)))