import React, {Component} from 'react';
import Pending from '../Screens/Pending/Pending-view';
class PendingContainer extends Component{
    constructor(props){
        super(props);
        this.a = 10;
    }
    render(){
        return (
            <Pending/>
        )
    }
}
export default PendingContainer