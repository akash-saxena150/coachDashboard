import React, {Component} from 'react';
import Clients from '../Screens/Clients/Clients-view';
import {apiCall} from '../Utilities/Services'
class ClientsContainer extends Component{
    constructor(props){
        super(props);
        this.a = 10;
        this.state={clients:[], waiting: true};
    }
    updateClients(data){
        this.setState({clients: data.data, waiting: false})
    }
    errLogin(err){
        this.props.history.push('/')
    }
    componentDidMount(){
        apiCall('clientList', 'in', this.updateClients.bind(this), this.errLogin.bind(this), this.props,'get')
    }
    render(){
        let {waiting, clients} = this.state;
        return (
            <div>
                {!waiting && <Clients clients={clients} history={this.props.history}/>}
                {waiting && <div>Waiting ...</div>}
            </div>
        )
    }
}
export default ClientsContainer