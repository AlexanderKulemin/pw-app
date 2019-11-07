import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

import {connect} from 'react-redux';

import './Registration.scss';
import {Link} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {create} from '../../actions/';

const mapStateToProps = state => {
    return {
        state
    }
}

const Registration = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const [confPass, setConfPass] = useState('');

    const [isNameValid, setNameValid] = useState(true);
    const [isEmailValid, setEmailValid] = useState(true);
    const [isPassValid, setPassValid] = useState(true);
    const [isConfPassValid, setConfPassValid] = useState(true);

    const disabledForm = !isNameValid || !isEmailValid || !isPassValid || !isConfPassValid || !name.length || !email.length || !confPass.length;

    let history = useHistory();

    useEffect(_=>{
        if(props.state.isAuth) {
            history.push('/');
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const value = {name, email, password};

        if(!disabledForm) {
            props.create(value);
        }
    }

    const handleName = (e) => {
        setName(e.target.value);
        setNameValid( e.target.value.length > 0 && e.target.value !== ' ')
    }
    const handleEmail = (e) => {
        setEmail(e.target.value)
        setEmailValid(!!(e.target.value.match('[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')));
    }

    const handlePass = (e) => {
        setPass(e.target.value);
        setPassValid(e.target.value.length > 3);
        setConfPassValid(e.target.value === confPass);
    }

    const confirmPass = (e) => {
        setConfPass(e.target.value)
        setConfPassValid(e.target.value === password);
    }

    return ( 
        <Card style={{margin: '20px auto', width: 400}}>
            <CardContent>
                <h3>Registraion or <Link to="/login">Login</Link></h3>

                <form onSubmit={handleSubmit} noValidate>
                    <div className="registration__item">
                        <TextField
                            label="Name"
                            fullWidth
                            value={name}
                            onChange={handleName}
                            margin="normal"
                            variant="outlined"
                            error={!isNameValid}
                            required
                            helperText={!isNameValid ? 'Field is not be empty':''}
                        />
                    </div>

                    <div className="registration__item">
                        <TextField
                            label="Email"
                            type="email"
                            fullWidth
                            value={email}
                            onChange={handleEmail}
                            margin="normal"
                            variant="outlined"
                            error={!isEmailValid}
                            required
                            helperText={!isEmailValid ? 'Incorrect email format':''}
                        />
                    </div>

                    <div className="registration__item">
                        <TextField
                            label="Password"
                            type="password"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            onChange={handlePass}
                            error={!isPassValid}
                            required
                            helperText={!isPassValid ? 'Minimum 3 symbol':''}
                        />
                    </div>
                    <div className="registration__item">
                        <TextField
                            value={confPass}
                            label="Confirm Password"
                            type="password"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            onChange={confirmPass}
                            error={!isConfPassValid}
                            required
                            helperText={!isConfPassValid ? "Password doesn't match" :''}
                        />
                    </div>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        type="submit" 
                        className={'registration__btn'}
                        disabled={disabledForm}
                        >
                        Registration
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}

export default connect(mapStateToProps, {create})(Registration);