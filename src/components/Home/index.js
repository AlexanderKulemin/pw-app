import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import Container from '@material-ui/core/Container';

import './Home.scss';

import {getTransHistory} from '../../actions';

import User from '../User';


const Home = (props) => {
    const isAuth = props.state.isAuth;

    return (  
        <Container maxWidth={false} className="home">
            {isAuth ?
            <User /> :
            <div className="home__message">
                <h1>Hello, I'm Parrot Wings app</h1>
                Please, <Link to="/login">Login</Link> or <Link to="registration">Registration</Link>
            </div>
        }
        </Container>

    );
}

export default connect(state => ({state}), {getTransHistory})(Home);