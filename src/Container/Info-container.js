import React, {Component} from 'react';
import Info from '../Screens/Info/Info-view';
import {getData} from '../Utilities/Services';

class InfoContainer extends Component{
    constructor(props){
        super(props);
        const clientData = JSON.parse(getData('clientData'));
        this.state={clientData};        
    }
    
    componentDidMount(){
        
    }
    render(){
        let {clientData} = this.state;
        return (
            <div>
                <Info clientData={clientData}/>                
            </div>
        )
    }
}
export default InfoContainer