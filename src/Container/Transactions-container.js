import React, {Component} from 'react';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import Transactions from '../Screens/Transactions/Transactions-view';
import {apiCall, getData} from '../Utilities/Services';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
function keyboard_arrow_down(){
    return (
    <i className="material-icons">
        keyboard_arrow_down
    </i>)
}
const style={
    cockpit:{
        background: '#f1f1f1',
        padding: '5px 5px 0',
        marginBottom: '10px',
        position:'fixed',
        top:0,
        left:0,
        width:'100%',
        height:'50px'
    },
    filter: {
        padding: '5px 10px',
        marginRight: '10px',
        fontSize: '1.2em'
    },
    activeFilter:{
        color: '#31b455',
        fontWeight: 'bold'
    },
    inactiveFilter:{
        color: '#ccc'
    }
}
class TransactionsContainer extends Component{
    constructor(props){
        super(props);
        this.state={
            showFilters: false, 
            transactions: [],
            filters: {
                startDate: null,
                endDate: null,
                region: 'in'
            }
        };    
    }
    componentDidMount(){
        this.thisMonth();
    }
    handleDelete(){
        return 0
    }
    toggleDrawer(){
        this.setState({
            showFilters: !this.state.ShowFilters
        })
    }
    closeDrawer(){
        this.setState({showFilters: false})
    }
    fetchTransactions(startDate, endDate){
        const regions = {
            in: 'IND',
            me: 'ME',
            row: 'ROW'
        }
        const region = getData('region')
        apiCall('transactionlist', region, this.updateTransactions.bind(this), this.errFetch.bind(this), this.props,'post', {startDate: startDate, endDate: endDate, region: regions[region]});
    }
    updateTransactions(data){
        this.setState({transactions: data.data});
    }
    errFetch(err){
        console.log(err)
    }
    setStartDate(date) {
        const startDate = date;
        const endDate = this.state.filters.endDate;
        this.setDates(startDate, endDate);
        
    }
    setEndDate(date) {
        const endDate = date;
        const startDate = this.state.filters.startDate;
        this.setDates(startDate, endDate);
        
    }
    setDates(startDate, endDate){
        let tempObj = Object.assign({}, this.state.filters);
        tempObj.endDate = endDate;
        tempObj.startDate = startDate;
        this.setState({filters: tempObj});
        if(new Date(startDate)<new Date(endDate))
            this.fetchTransactions(startDate, endDate);
    }
    thisMonth(){
        const dt = new Date();
        const today = `${dt.getFullYear()}-${dt.getMonth()+1}-${dt.getDate()}`;
        const monthStart = `${dt.getFullYear()}-${dt.getMonth()+1}-1`;
        this.setDates(monthStart, today);
        
    }
    lastMonth(){
        const dt = new Date();
        const lastDay = new Date(dt.getFullYear(), dt.getMonth() +1, 0).getDate();
        const endDate = `${dt.getFullYear()}-${dt.getMonth()}-${lastDay}`;
        const startDate = `${dt.getFullYear()}-${dt.getMonth()}-1`;
        this.setDates(startDate, endDate);
        
    }
    render(){
        let {filters} = this.state;
        return (
            <Grid container>
                <Drawer anchor="bottom" open={this.state.showFilters} onClose={()=>{this.closeDrawer()}}>
                    <Grid container direction="column" style={{flex: 1, padding: '10%', width: '100%'}} alignItems="stretch">
                        <Grid item>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="start-date"
                                    label="Start date"
                                    format="yyyy-dd-MM"
                                    value={filters.startDate}
                                    onChange={this.setStartDate.bind(this)}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                    style={{border: 'none'}}
                                />
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="start-date"
                                    label="End date"
                                    format="yyyy-dd-MM"
                                    value={filters.endDate}
                                    onChange={this.setEndDate.bind(this)}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                    style={{border: 'none'}}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        {/* <Grid item>
                            <h2>Region</h2>
                            <Grid container direction="row">
                                <Grid item style={style.filter}>
                                    <div style={filters.region==='in'?style.activeFilter:style.inactiveFilter}>IN</div>
                                </Grid>
                                <Grid item style={style.filter}>
                                    <div style={filters.region==='me'?style.activeFilter:style.inactiveFilter}>ME</div>
                                </Grid>
                                <Grid item style={style.filter}>
                                    <div style={filters.region==='row'?style.activeFilter:style.inactiveFilter}>ROW</div>
                                </Grid>
                            </Grid>
                        </Grid> */}
                    </Grid>
                </Drawer>
                <Grid item style={style.cockpit}>
                <Grid container direction="row" alignItems="center">
                    <Grid item style={style.searchContainer} xs={9}>
                        <Grid container direction="row">
                            <Button variant="outlined" color="primary" className="rounded" style={{textTransform: 'none'}} onClick={this.thisMonth.bind(this)}>
                                This month
                            </Button>
                            <Button variant="outlined" color="primary" className="rounded" style={{textTransform: 'none', marginLeft: '5px'}} onClick={this.lastMonth.bind(this)}>
                                Last month
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item style={style.chips} xs={3}>
                        <Chip
                            deleteIcon={keyboard_arrow_down()}
                            onClick={()=>{this.toggleDrawer()}}
                            onDelete={this.handleDelete}
                            label="Filters"                        
                        />
                    </Grid>
                </Grid>
                
            </Grid>
                
                <Transactions transactions={this.state.transactions}/>                
                
            </Grid>
        )
    }
}
export default TransactionsContainer