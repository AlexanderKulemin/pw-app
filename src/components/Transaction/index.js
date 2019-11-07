import React, {useState} from 'react';
import {connect} from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import {getListUsers, sendTransaction} from '../../actions';

import './Transaction.scss';

const Transaction = (props) => {
    const state = props.state;
    const balance = state.user.balance;
    const recipient = props.state.users;
    const [value, setValue] = useState(null);
    const [amount, setAmount] = useState();

    const handleChange = (e) => {
        const string = e.target.value;
        if(string) {
            props.getListUsers(string);
        }
    }

    const hendleClick = (e) => {
        e.preventDefault();

        const data = {name: value.name, amount: +amount}
        props.sendTransaction(data);

        setValue(null);
    }

    return ( 
        <>
        <h4 className="card__title">New transaction</h4>
        <Paper className={'card'}>
            
            <div className="card__form">
                 <Autocomplete
                    className="card__input"
                    clearOnEscape
                    options={recipient}
                    getOptionLabel={recipient => recipient.name}
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    renderInput={params => (
                        <TextField {...params} label="Name Recipient" fullWidth onChange={handleChange} />
                    )}
                /> 

                <TextField 
                    label="Amount pw" 
                    disabled={!value} 
                    type="number" 
                    className="card__input" 
                    error={amount > balance}
                    helperText={amount > balance ? "Please, enter correct value":""}
                    onChange={e => setAmount(e.target.value)} 
                />
                <Button className="card__btn" 
                        variant="contained" 
                        color="primary" 
                        disabled={!amount || (amount > balance) || !value} 
                        onClick={e => hendleClick(e)}>
                    Send
                </Button>
            </div>
        </Paper>
        </>
    );
}
 
export default connect(state=>({state}), {getListUsers, sendTransaction})(Transaction);

