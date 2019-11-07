import React, {useState} from 'react';
import {connect} from 'react-redux';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {getRecentTrans, sendTransaction} from '../../actions';

import './RecentTransactions.scss';

const RecentTransactions = (props) => {
    const items = props.state.recentTrans;
    const [open, setOpen] = useState(false);
    const [name, setName] = useState(null);
    const [amount, setAmount] = useState(null);

    const getValue = (item) => {
        return(
            <>
             <span className="list__name">{item.username}</span> <span className="list__value">{item.amount}</span>
            </>
        )
    }

    const handleClick = (item) => {
        setOpen(true);
        setName(item.username);
        setAmount(item.amount);
    }

    const handleForm = () => {
        const obj = {name, amount: Math.abs(amount)};
        props.sendTransaction(obj);
        setOpen(false);
    }

    return items.length ? (
        <div className="recent-trans">
            <h4>Recent transactions</h4>

            <List dense={true} className="list">
                {items.map(item => (
                    <ListItem key={item.id}>
                        <ListItemText
                            primary={getValue(item)}
                            secondary={item.date}
                        />
                        <ListItemSecondaryAction onClick={_ => handleClick(item)}>
                            <IconButton edge="end" aria-label="delete">
                                <RefreshIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>

            <Dialog
                open={open}
                // onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{`Do you want repeat transaction?`}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Name: <b>{name}.</b> Amount: <b>{Math.abs(amount)}</b> PW
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button 
                    onClick={_=> setOpen(false)} 
                    color="secondary"
                    variant="contained"
                    >
                    Cancel
                </Button>
                <Button 
                    onClick={handleForm} 
                    color="primary"
                    >
                    Yes I Agree
                </Button>
                </DialogActions>
            </Dialog>
        </div> ) : null;
}
 
export default connect(state=>({state}), {getRecentTrans, sendTransaction})(RecentTransactions);