import React, {useState} from 'react';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import './User.scss';

import {getTransHistory, getRecentTrans} from '../../actions';

import Transaction from '../Transaction';
import History from '../History';
import RecentTransaction from '../RecentTransaction';

const User = (props) => {
    const user = props.state.user;
    const [isShow, setIsShow] = useState(false);
    const [isShowHistory, setIsShowHistory] = useState(false);

    const handleTransaction = () => {
        props.getRecentTrans();
        setIsShow(true);
        setIsShowHistory(false);
    }

    const handleHistory = () => {
        props.getTransHistory();
        setIsShow(false);
        setIsShowHistory(true);
    }

    return (  
        <div className="user">
            <h3 className="user__name">{user.name}</h3>
            <Typography className="user__balance" variant="h1" gutterBottom>{user.balance} <span>PW</span></Typography>
            
            <div className="user__actions">
                <Button variant="contained" color="primary" className={'user__btn'} onClick={handleTransaction}>
                    New Transaction
                </Button>
                <Button variant="contained" className={'user__btn'} onClick={handleHistory}>
                    History Transactions
                </Button>
            </div>
            {isShow ?
                <Grid container spacing={3} alignItems="stretch">
                    <Grid item xs={4}><Transaction /></Grid>
                    <Grid item xs={4}><RecentTransaction /></Grid>
                </Grid> : null}
            {isShowHistory?
            <History />:null}
        </div>

    );
}

export default connect(state => ({state}), {getRecentTrans, getTransHistory})(User);