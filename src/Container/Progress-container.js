import React, {Component} from 'react';
import Progress from '../Screens/Progress/Progress-view';
import {getData} from '../Utilities/Services';

class ProgressContainer extends Component{
    constructor(props){
        super(props);
        const progress = JSON.parse(getData('clientData')).clientProgress;
        this.state={progress};
        
    }
    
    componentDidMount(){
        
    }
    render(){
        let {progress} = this.state;
        return (
            <div>
                <Progress progress={progress}/>                
            </div>
        )
    }
}
export default ProgressContainer