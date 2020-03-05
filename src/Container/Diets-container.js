import React, {Component} from 'react';
import Diets from '../Screens/Diets/Diets-view';
import {getData} from '../Utilities/Services';

class DietsContainer extends Component{
    constructor(props){
        super(props);
        const clientDiet = JSON.parse(getData('clientDiet'));
        this.state={clientDiet};
        console.log("clientDiet",clientDiet)        
    }
    
    componentDidMount(){
        
    }
    render(){
        let {clientDiet} = this.state;
        return (
            <div>
                <Diets clientDiet={clientDiet}/>                
            </div>
        )
    }
}
export default DietsContainer