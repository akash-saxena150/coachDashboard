import React, {Component} from 'react';
import ImageS3 from '../../Utilities/ImageS3';
import style from './Clients-style';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Drawer from '@material-ui/core/Drawer';
import {croptxt, compareDate} from '../../Utilities/Services'
import {Link} from 'react-router-dom';
function keyboard_arrow_down(){
    return (
    <i className="material-icons">
        keyboard_arrow_down
    </i>)
}
class Clients extends Component{
    constructor(props){
        super(props);
        this.state={searchTerm: '', 
            showFilters: false, 
            filters: {
                searchTerm: '',
                status: 'active',
                region: 'in'
            }
        }
    }
    handleDelete(){
        return 0
    }
    toggleDrawer(){
        this.setState({
            showFilters: !this.state.ShowFilters
        })
    }
    applyFilters(key, val){
        let tempObj = Object.assign({}, this.state.filters);
        tempObj[key] = val;
        this.setState({filters: tempObj});
    }
    closeDrawer(){
        this.setState({showFilters: false})
    }
    checkFilters(client){
        const {searchTerm, status, region} = this.state.filters;
        return (
            (searchTerm=='' || (client.clientFirstname+client.clientLastname+client.clientEmail+client.clientPhone).indexOf(searchTerm)>-1)
            &&
            (function(){
                const currDt = new Date();
                const currMnth = new Date(currDt.getFullYear(), currDt.getMonth(), 1);
                console.log("end date",client.assign_end_date)
                const clientEndDate = new Date(client.assign_end_date.replace(" ","T"));
                if(status=='active')
                    return (compareDate(clientEndDate))
                else
                return (!compareDate(clientEndDate))
            }())
            )
    }
    
    render(){
        const profilePicStyle={};
        const {status, region} = this.state.filters;
        const {location} = this.props.history;
        return (
        <Grid container direction="column" alignItems="stretch">
            <Drawer anchor="bottom" open={this.state.showFilters} onClose={()=>{this.closeDrawer()}}>
                <Grid container direction="column" style={{flex: 1, padding: '10%', width: '100%'}} alignItems="stretch">
                    <Grid item>
                        <h2>Status</h2>
                        <Grid container direction="row">
                            <Grid item style={style.filter}>
                                <div style={status==='active'?style.activeFilter:style.inactiveFilter} onClick={()=>this.applyFilters("status", "active")}>Active</div>
                            </Grid>
                            <Grid item style={style.filter}>
                                <div style={status==='inactive'?style.activeFilter:style.inactiveFilter} onClick={()=>this.applyFilters("status", "inactive")}>Inactive</div>
                            </Grid>
                        </Grid>
                        {/* <hr/>
                        <h2>Region</h2>
                        <Grid container direction="row">
                            <Grid item style={style.filter}>
                                <div style={region==='in'?style.activeFilter:style.inactiveFilter}>IN</div>
                            </Grid>
                            <Grid item style={style.filter}>
                                <div style={region==='me'?style.activeFilter:style.inactiveFilter}>ME</div>
                            </Grid>
                            <Grid item style={style.filter}>
                                <div style={region==='row'?style.activeFilter:style.inactiveFilter}>ROW</div>
                            </Grid>
                        </Grid> */}
                    </Grid>
                </Grid>
            </Drawer>
            <Grid item style={style.cockpit}>
                <Grid container direction="row" alignItems="center">
                    <Grid item style={style.searchContainer} xs={9}>
                        <input className="rounded" type="text" placeholder="search" value={this.state.filters.searchTerm} onChange={(e)=>{this.applyFilters('searchTerm', e.target.value)}} style={style.searchInp}/>
                        {this.state.filters.searchTerm.length>0 && <span style={style.clearSearch} onClick={()=>{this.applyFilters('searchTerm', '')}}>x</span>}
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
            <div style={style.clientList}></div>
            {this.props.clients.map((client, indx)=>{
                return(
                    <div key={client.clientId+client.clientEmail+indx}>
                    {this.checkFilters(client) &&
                        <Paper style={style.client}>
                            <Grid container direction="row" alignItems="center">
                                <Grid item xs={4}>
                                    <Grid container direction="column">
                                        <Grid item>
                                            <div style={style.clientImg}>
                                                <Link to={{pathname:`/client/${client.clientId}`}}>
                                                    <ImageS3 imgSrc ={client.clientId} folder="profile_picture"/>
                                                </Link>
                                            </div> 
                                        </Grid>
                                        <Grid item style={style.clientName}>
                                            {client.clientFirstname}
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={8}>
                                    <Grid container direction="column" justify="flex-start" alignItems="stretch">
                                        <Grid item style={style.clientInfo}>
                                            <Grid container direction="row" justify="flex-start" alignItems="flex-start" style={style.infoField}>
                                                <Grid item>
                                                    <i className="material-icons">
                                                        email
                                                    </i>
                                                </Grid>
                                                <Grid item style={style.email}>
                                                    {croptxt(client.clientEmail, 20)}
                                                </Grid>
                                            </Grid>
                                            <Grid container direction="row" justify="flex-start" alignItems="flex-start" style={style.infoField}>
                                                <Grid item>
                                                    <i className="material-icons">
                                                        phone
                                                    </i>
                                                </Grid>
                                                <Grid item style={style.email}>
                                                    {client.clientPhone}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item style={style.actions}>
                                            <i className="material-icons">
                                                send
                                            </i>
                                        </Grid>
                                        
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    }
                    </div>
                )
            })}
            <div style={style.bottomPadding}></div>
        </Grid>
        )
    }
}
export default Clients