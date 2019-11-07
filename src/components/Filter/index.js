import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

import './Filter.scss';

import {filteredTrans, clearFilter} from '../../actions';

const Filter = (props) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [name, setName] = useState('')
    const [amount, setAmount] = useState('');

    useEffect(() => {
        return function cleanup() {
            props.clearFilter();
        };
    },[props])

    const handleDateChange = date => {
        const d = new Date(date);
        setSelectedDate(`${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`);
        props.filteredTrans({date: `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`, username: name, amount})
    }

    const handleReset = () => {
        setSelectedDate(null);
        setName('');
        setAmount('');
        props.clearFilter();
    }

    const handleName = (value) => {
        setName(value);
        props.filteredTrans({date: selectedDate, username: value, amount})
    }

    const handleChange = e => {
        setAmount(e.target.value);
        props.filteredTrans({date: selectedDate, username: name, amount: e.target.value})
    }

    return ( 
        <div className="filter">
            <MuiPickersUtilsProvider utils={DateFnsUtils}> 
            <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                id="date-picker-inline"
                label="Filter by date"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />
            </MuiPickersUtilsProvider>
            <TextField
                label="Filter by name"
                className="filter__input"
                onChange={e => handleName(e.target.value)}
                value={name}
            />

            <FormControl className="filter__select">
                <InputLabel id="demo-simple-select-label">Filter by amount</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={amount}
                    onChange={handleChange}
                >
                    <MenuItem value={'sent'}>Sent PW</MenuItem>
                    <MenuItem value={'received'}>Received PW</MenuItem>

                </Select>
            </FormControl> 
            
            <Button 
                variant="contained" 
                color="primary"
                className="filter__btn"
                onClick={_=> handleReset()}
                >
                Reset
            </Button>
        </div>
     );
}
 
export default connect(null, {filteredTrans, clearFilter})(Filter);