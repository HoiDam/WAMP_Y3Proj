import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link ,Redirect } from 'react-router-dom'

import { registerUserAction } from '../actions/authenticationActions';
import { getCookie, setCookie } from '../utils/cookies';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';

import Warning from '../utils/warning.js'
import Copyright from '../copyright.js' 


const useStyles = theme => ({
    paper: {
      marginTop: theme.spacing(6),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '150%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  });

class Register extends Component {
    constructor(props) {
        super(props);
        this.state={
            alertSeverity:'',
            alertMessage:'',
            showAlert:false ,
            emailC:""
          }
      }
  onHandleRegistration = (event) => {
    event.preventDefault();
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let nickname = event.target[2].value;
    let email = event.target[0].value;
    let password = event.target[4].value;
    let c_password = event.target[6].value;
    let address = event.target[8].value;

    if (password!=c_password){
        this.setState({  showAlert:true ,alertMessage:"Password not match", alertSeverity:"error",emailC:email});
    }
    else if (!re.test(email)){
        this.setState({  showAlert:true ,alertMessage:"Wrong Email Format", alertSeverity:"error"});
    }
    else{
        this.setState({  showAlert:false });
        const data = {
        email,nickname, password ,address
        };
        this.props.dispatch(registerUserAction(data));
    
    }
  }

  render() {
    setCookie('token',"",1)
    let message, isSuccess;
    if (this.props.response.register.hasOwnProperty('response')) {
        isSuccess = this.props.response.register.response.status;
        message = this.props.response.register.response.msg;
        if (isSuccess=="failed") {
            this.state={
                alertSeverity:'error',
                alertMessage:message,
                showAlert:true 
              }
        }
        else if (isSuccess=="success") {
            this.state={
                alertSeverity:'success',
                alertMessage:message,
                showAlert:true 
              }
            
        }
      }
    const {classes} = this.props;
    return (
      <div>
        <Container component="main" maxWidth="xs">

            <CssBaseline />
            {this.state.emailC=="" ? <div></div> : 
            <div>
                <Redirect to={{
                pathname: '/register/confirm',
                state: { emailC: this.state.emailC }
                }} />
            </div>
            }
            {this.state.showAlert ? (
                        <Warning severity={this.state.alertSeverity} message={this.state.alertMessage} />
                    ) : (
                        ''
                    )}
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                </Avatar>
                <Typography component="h1" variant="h5">
                Sign up
                </Typography>
                <form className={classes.form} onSubmit={this.onHandleRegistration}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="nickname"
                        label="Nick Name"
                        name="nickname"
                        autoComplete="nickname"
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />                   
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="c_password"
                        label="Confirm Password"
                        type="password"
                        id="c_password"
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="address"
                        label="Address"
                        name="address"
                        autoComplete="address"
                    />
                    </Grid>
                    
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Sign Up
                </Button>
                <Grid container justify="flex-end">
                    <Grid item>
                    <Link href="/app/login" variant="body2">
                        Already have an account? Log in
                    </Link>
                    </Grid>
                </Grid>
                </form>
            </div>
            <Box mt={20}>
                <Copyright />
            </Box>
            </Container>
      </div>
    )
  }
}

const mapStateToProps = (response) => ({response});
export default connect(mapStateToProps)((withStyles(useStyles, { withTheme: true })(Register)));