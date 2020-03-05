import React, {Component} from 'react';
import {Align} from '../../UI/';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Logo from '../../img/logo.png';
import Styles from './Login-style'
class Login extends Component{
    constructor(props){
        super(props);
        this.state={form: {uname: '', pass: ''}};
    }
    changeInp(e, stateVar){
        let tempObj = {...this.state.form};
        tempObj[stateVar] = e.target.value;
        this.setState({form: tempObj})
    }
    createInput(stateVar, type){
        return (<input className="rounded" type={type} value={this.state.form[stateVar]} onChange={(e)=>this.changeInp(e, stateVar)}/>)
    }
    render(){
        const {loginStatus, loginfn, startingLogin, invalidCredentials, resetState} = this.props;
        return (
        <Align>
            {!(startingLogin || invalidCredentials) && <Grid item xs={8}>
                <form onSubmit={(e)=>loginfn(e, this.state.form)}>
                    <Grid container direction="column" justify="center" alignItems="center">
                        <Grid item style={Styles.logoContainer}>
                            <img src={Logo} style={Styles.logo}/>
                        </Grid>
                        <Grid item>
                           {this.createInput("uname", "text")} 
                        </Grid>
                        <Grid item>
                           {this.createInput("pass", "password")}  
                        </Grid>
                        <Grid item>
                           <button className="primary">Login</button> 
                        </Grid>
                    </Grid>
                </form>
            </Grid>}
            {
                (startingLogin && !invalidCredentials) && 
                <Grid item xs={8}>
                    <Grid container direction="column" justify="center" alignItems="center">
                        <Grid item>
                            IN login status: {loginStatus.in}
                        </Grid>
                        <Grid item>
                            ME login status: {loginStatus.me}
                        </Grid>
                        <Grid item>
                            ROW login status: {loginStatus.row}
                        </Grid>
                    </Grid>
                </Grid>
            }
            {
                (!startingLogin && invalidCredentials) && 
                <Grid item xs={8}>
                    <Grid container direction="column" justify="center" alignItems="center">
                        <Grid item>
                            Invalid credentials
                        </Grid>
                        <Grid item>
                            <Button onClick={()=>{resetState()}} variant="outlined" color="primary">
                                Try again
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            }
        </Align>
        )
    }
}
export default Login