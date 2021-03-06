import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { loginUserAction } from '../actions/authenticationActions';
import { getCookie, setCookie } from '../utils/cookies';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Recap from "./recap.js";

import Warning from '../utils/warning.js'
import Copyright from '../copyright.js' 
const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});


class Login extends Component {
  constructor(props) {
    super(props)
    this.state={
      login:false,
      alertSeverity:'',
      alertMessage:'',
      showAlert:false ,
      recapValue:false,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    document.title = 'BitCoin Exchange Platform';
  }

  handleSubmit = (event) =>{
    event.preventDefault();

    let email = event.target.email.value;
    let password = event.target.password.value;

    const data = {
      email, password
    };
    // console.log(this.state.recapValue)
    if (this.state.recapValue==false){
      this.setState({showAlert:true,alertMessage:"Wrong recaptcha. You are a bot.",alertSeverity:"error"})
    }else{
      this.props.dispatch(loginUserAction(data));
    }
    
  }

  callbackFunction = async () =>{
    this.setState({recapValue:true})
  }

  render() {
    setCookie('token',"",1)
    let isSuccess, message;
    if (this.props.response.login.hasOwnProperty('response')) {
      isSuccess = this.props.response.login.response.status;
      message = this.props.response.login.response.msg;
      if (isSuccess=="success") {
        this.state.login=true
        setCookie('token', this.props.response.login.response.msg, 2);
        
      }else if (isSuccess=="failed"){
        this.state.showAlert=true; 
        this.state.alertMessage=message;
        this.state.alertSeverity="error";
      }
    }
    const {classes} = this.props;

    return (
      <div>
        {!this.state.login ? <div></div> : <Redirect to='/main' />}
          <Container component="main" maxWidth="xs">
              <CssBaseline />
              {this.state.showAlert ? (
                        <Warning severity={this.state.alertSeverity} message={this.state.alertMessage} />
                    ) : (
                        ''
                    )}
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                </Avatar>
                <Typography component="h1" variant="h5">
                  Log in
                </Typography>
                <form className={classes.form} onSubmit={this.handleSubmit}> 
                
                  <TextField
                    type="email"
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Box mt={2} mb={2}>
                      <Recap parentCallback = {this.callbackFunction}>

                      </Recap>
                  </Box>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Log In
                  </Button>
                  
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="/app/register" variant="body2">
                        {"Don't have an account? Sign Up"}
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
    );
  }
}

const mapStateToProps = (response) => ({response});
export default connect(mapStateToProps)((withStyles(useStyles, { withTheme: true })(Login)));