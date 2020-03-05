import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Styles from './Dashboard-style';
import { Link } from "react-router-dom";
import {GetHt} from '../../Utilities/Services';
class Dashboard extends Component{
    constructor(props){
        super(props);
        
    }
    render(){
        let containerStyle = Styles.container||{};
        let {active, signUp} = this.props;
        containerStyle.height = `${GetHt()-50}px`
        return (
            <Grid container direction="row" justify="center" alignItems="center" style={containerStyle}>
                <Grid item xs={11}>
                    <Link to="/pending">
                        <div style={Styles.paper}>
                            <h1 className="primary">11</h1>
                            <small>pending diets</small>
                        </div>
                    </Link>
                    <hr/>
                    <Link to="/clients">
                        <div style={Styles.paper}>
                            <h1 className="primary">{active}</h1>
                            <small>active clients</small>
                        </div>
                    </Link>
                    <hr/>
                    <Link to="/transactions">
                        <div style={Styles.paper}>
                            <h1 className="primary">{signUp}</h1>
                            <small>Signup</small>
                        </div>
                    </Link>
                </Grid>
            </Grid>
        )
    }
}
export default Dashboard