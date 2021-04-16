import React, { Component } from 'react';
import {Link } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';

import Copyright from '../copyright.js' 

const useStyles = theme => ({
    paper: {
      marginTop: theme.spacing(6),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }

  });

class ConfirmRegister extends Component {
    constructor(props) {
        super(props);
    }
  

  render() {
    const {classes} = this.props;
    return (
      <div>
        <Container maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Box mt={4}>
                    <Typography component="h1" variant="h5">
                    Success !
                    </Typography>
                </Box>
                <Box mt={4}>
                    <Typography component="h1" variant="h2">
                        ✓
                    </Typography>
                </Box>
                <Box mt={4}>
                <Typography component="h1" variant="h6">
                Nice Your account is ready to use. 
                </Typography>
                <Typography component="h1" variant="h6">
                Press the button below to continue !
                </Typography>
                </Box>
                <Box mt={2}>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        component={Link} to="/login"
                    >
                        Lets GO !
                    </Button>
                </Box>
            </div>
            <Box mt={20}>
                <Copyright />
            </Box>
            </Container>
      </div>
    )
  }
}


export default (withStyles(useStyles, { withTheme: true })(ConfirmRegister))