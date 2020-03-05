import React, {Component} from 'react';
import Diet from '../Screens/Diet/Diet-view';
import {getData} from '../Utilities/Services';

class DietContainer extends Component{
    constructor(props){
        super(props);
        const dietId = this.props.match.params.id;
        const clientDiet = (JSON.parse(getData('clientDiet')))[dietId];
        this.state={clientDiet};        
    }
    
    render(){
        let {clientDiet} = this.state;
        return (
            <div>
                <Diet clientDiet={clientDiet}/>                
            </div>
        )
    }
}
export default DietContainer