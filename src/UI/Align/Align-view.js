import React, {Component} from 'react';
import {GetHt, GetWd} from '../../Utilities/Services';
import Grid from '@material-ui/core/Grid';
console.log("Height",GetHt());
const styles={
    fullPanel: {
        height: `${GetHt()}px`,
        width: `${GetWd()}px`
    }
}
class Align extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const {children} = this.props;
        return (
        <Grid container style={styles.fullPanel} alignItems="center" justify="center">
            {children}
        </Grid>
        )
    }
}
export default Align