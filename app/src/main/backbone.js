import React from "react";
import clsx from "clsx";
import { Route, Link ,Redirect} from "react-router-dom";
import { getCookie } from '../utils/cookies';

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Home from './home.js'
import Bas from './bas.js'
import Daw from './daw.js'
import Setting from './setting.js'

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  title:{
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    backgroundColor: "#315f42" //Grey
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
    
  },
  drawerPaper: {
    width: drawerWidth,
    background: "#eed59a" //Grey
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(8),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth,
    Color: "#424242" //Grey
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  main:{
    display:"flex"
  },
 
}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const token = getCookie('token')

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  // console.log(localStorage.getItem("BackendToken"))
  // if (localStorage.getItem("BackendToken")=="" ){
  //   return <Redirect to="/login" />
  // }
  // else{
    return (
      <div className={classes.main}>
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              ☰
            </IconButton>
            <Typography variant="h6" noWrap className={classes.title}>
              BitCoin Exchange Platform
            </Typography>
            <Typography variant="h6">
              today
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper
          }
        }
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? <div>☰</div> : <div>☰</div>}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem component={Link} to="/main/home">
              <ListItemText>👨 Home</ListItemText>
            </ListItem>
            <Divider />
            <ListItem component={Link} to="/main/daw">
              <ListItemText>📚 Deposit and Withdrawl</ListItemText>
            </ListItem>
            <ListItem component={Link} to="/main/bas">
              <ListItemText>💻 Buy and Sell</ListItemText>
            </ListItem>
            <ListItem component={Link} to="/main/setting">
              <ListItemText>🎮 Setting</ListItemText>
            </ListItem>
            <Divider />
            <ListItem >
              <ListItemText> 2021 March </ListItemText>
            </ListItem>
          </List>
        </Drawer>

        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />

          <Route exact path="/main">
            <Redirect to="/main/home" />
          </Route>
          <Route path="/main/home">
            <Home/>
          </Route>
          <Route path="/main/daw">
            <Daw/>
          </Route>
          <Route path="/main/bas">
            <Bas/>
          </Route>
          <Route path="/main/setting">
            <Setting/>
          </Route>
          
          {/* <Redirect from="/main/*" to="/main" /> */}
          
        </main>
      </div>
    );
  // }
}
