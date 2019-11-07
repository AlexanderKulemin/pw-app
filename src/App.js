import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import './App.scss';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import Registration from './components/Registration';
import Login from './components/Login';
import Home from './components/Home';

import {getCurrentUser, logOut, hideMessage} from './actions';

function App(props) {
  const isAuth = props.state.isAuth;
  const error = props.state.errors;

  useEffect(() => {
    props.getCurrentUser();
  }, []);
  
  const handleLogout = (e) => {
    e.preventDefault();
    props.logOut();
  }

  return (
    <Router>
      <div className="app">
      <AppBar position="static">
        <Toolbar>
          <div className="controls">
            {isAuth?
            <Button variant="contained" onClick={handleLogout}>Log out</Button>:null}
          </div>
        </Toolbar>
        </AppBar>
        <Switch>

          {/* <Route exact path="/">
              {isAuth ? <Home /> : <Login />}
          </Route> */}
          <Route exact path="/" component={Home}/>
          <Route path="/login" component={Login}/>
          <Route path="/registration" component={Registration}/>
        </Switch>

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={error.isShow}
          autoHideDuration={6000}
          className={'error'}
          onClose={_=> props.hideMessage()}
        >
          <SnackbarContent
            className={'error'}
            aria-describedby="client-snackbar"
            message={
              <span id="client-snackbar">
                {/* <Icon className={'clsx(classes.icon, classes.iconVariant)'} /> */}
                {error.message}
              </span>
            }
            action={[
              <IconButton key="close" aria-label="close" color="inherit" onClick={_=> props.hideMessage()}>
                <CloseIcon />
              </IconButton>,
            ]}
          />
        </Snackbar>
      </div>
    </Router>
  );
}

export default connect(state => ({state}), {getCurrentUser, logOut, hideMessage})(App);
