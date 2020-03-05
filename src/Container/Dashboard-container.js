import React, {Component} from 'react';
import Dashboard from '../Screens/Dashboard/Dashboard-view';
import {apiCall, getData} from '../Utilities/Services';
import {isIOS} from 'react-device-detect';
class DashboardContainer extends Component{
    constructor(props){
        super(props);
        this.state={profile: {}, active: 0, inactive: 0,signUp: 0, loggedIn: false};
    }
    updateSignups(data){
        this.setState({signUp: data.data.length})
    }
    updateProfile(data){
        let active = 0, inactive = 0, signUp = 0;
        data.data.map((client)=>{
            const currDt = new Date();
            const clientEndDate = new Date(client.assign_end_date.replace(" ", "T"));
            const clientStartDate = new Date(client.assign_date);
            // if(clientStartDate>=currMnth)
            //     signUp++;
            if(clientEndDate<currDt)
                inactive++;
            else
                active++;
        })
        this.setState({
            loggedIn: true,
            active,
            inactive,
            //signUp
        })
    }
    errLogin(err, props){
        //props.history.push('/')
    }
    componentDidMount(){
        const dt = new Date();
        const today = `${dt.getFullYear()}-${dt.getMonth()+1}-${dt.getDate()}`;
        const monthStart = `${dt.getFullYear()}-${dt.getMonth()+1}-1`;
        const regions = {
            in: 'IND',
            me: 'ME',
            row: 'ROW'
        }
        let region = getData('region');
        region = region || 'in';
        apiCall('clientList', region, this.updateProfile.bind(this), this.errLogin.bind(this), this.props,'get');
        apiCall('transactionlist', 'in', this.updateSignups.bind(this), this.errLogin.bind(this), this.props,'post', {startDate: monthStart, endDate: today, region: regions[region]});
    }
    render(){
        return (
            <div>
                {this.state.loggedIn && <Dashboard active={this.state.active} inactive={this.state.inactive} signUp={this.state.signUp}/>}
                {!this.state.loggedIn && <div>Waiting ...</div>}
            </div>
        )
    }
}
export default DashboardContainer