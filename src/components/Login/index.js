import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom';

import {login} from '../../actions'
import './Login.scss';


const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    let history = useHistory();

    const isAuth = props.state.isAuth;

    useEffect(_=>{
        if(isAuth) {
            history.push('/');
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        props.login({email, password});
    }

    return ( 
        <Card style={{margin: '20px auto', width: 400}} className="login">
            <CardContent>
                <h3>Login or <Link to="/registration">registration</Link></h3>
                <form onSubmit={handleSubmit} noValidate>
                    <div className="login__item">
                        <TextField
                            label="Email"
                            fullWidth
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            margin="normal"
                            variant="outlined"
                            error={email.length <= 0}
                            required
                        />
                    </div>
                    <div className="login__item">
                        <TextField
                            label="Password"
                            fullWidth
                            value={password}
                            onChange={e => setPass(e.target.value)}
                            type="password"
                            margin="normal"
                            variant="outlined"
                            error={password.length <= 0}
                            required
                        />
                    </div>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        type="submit" 
                        className={'login__btn'}
                        disabled={password.length <= 0 || email.length <= 0}
                        >
                        Login
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}

export default connect(state=>({state}), {login})(Login)