import React, {Component} from 'react';
import style from './Transactions-style';
import Grid from '@material-ui/core/Grid';
import {formatDate} from '../../Utilities/Services'

class Transactions extends Component{
    constructor(props){
        super(props);
        
    }
    
    render(){
        const {transactions} = this.props;
        return (
            <ul style={style.transactionsContainer}>
                {transactions.map((transaction, indx)=>{
                    console.log("transactions view",transaction)
                return(
                    <li style={style.transaction} key={indx+transaction.customer_name}>
                        <Grid container>
                            <Grid item xs={5}>{transaction.customer_name}</Grid>
                            <Grid item xs={4}>{formatDate(transaction.tran_date)}</Grid>
                            <Grid item xs={3}>₹ {transaction.amount}/-</Grid>
                            
                        </Grid>
                    </li>
                )
                })}
            </ul>
        )
    }
}
export default Transactions