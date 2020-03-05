import React, {Component} from 'react';
import Login from '../Screens/Login/Login-view';
import {apiCall, setData, getData} from '../Utilities/Services';
class LoginContainer extends Component{
    constructor(props){
        super(props);
        this.state={
            currentRegion: 'in',
            loginStatus: {
                in: 'logging in ...',
                me: 'not logged in',
                row: 'not logged in'
            },
            startingLogin: false,
            invalidCredentials: false
        }
    }
    updateState(key, data){
        let tempObj = Object.assign(this.state.loginStatus);
        tempObj[key] = data;
        this.setState({loginStatus: tempObj});
    }
    updateAuth(region, data){
        if(data.data)
        {
            let currentAuthData = getData('auth');
            currentAuthData = currentAuthData?JSON.parse(currentAuthData):{};
            currentAuthData[region] = data.data.token;
            setData('auth', JSON.stringify(currentAuthData));
            this.updateState(region, 'logged in');
            setData('isAuthenticated', true);
        } 
        else{
            this.updateState(region, 'failed')
        }       
        setData('region', 'in');        
    }
    updateROW(data){
        const {loginStatus} = this.state;
        this.updateAuth('row', data);
        if(loginStatus.in === 'logged in' || loginStatus.me === 'logged in' || loginStatus.row === 'logged in')
        {
            this.proceedToDashboard();
        }
        else{
            this.setState({invalidCredentials: true});
            this.setState({startingLogin: false});
        }        
    }
    resetState(){
        this.setState({invalidCredentials: false});
        this.updateState('in', 'logging in ...');
        this.updateState('me', 'not logged in');
        this.updateState('row', 'not logged in');
    }
    updateME(data){
        this.updateAuth('me', data);
        setData('region','row');
        apiCall('signin', 'row', this.updateROW.bind(this), this.updateROW.bind(this), this.props.props,'post', this.tempObj);
    }
    updateIN(data){
        this.updateAuth('in', data);
        setData('region','me');
        apiCall('signin', 'me', this.updateME.bind(this), this.updateME.bind(this), this.props.props,'post', this.tempObj);
    }
    proceedToDashboard(){
        console.log(getData('auth'));
        this.props.props.history.push('/');
    }
    loginFn(e, f){
        e.preventDefault();
        this.setState({startingLogin: true});
        const tempObj = {
            user_email: f.uname,
            user_password: f.pass,
            user_type: "consultant"
        }
        this.tempObj = tempObj;
        setData('region','in');
        apiCall('signin', 'in', this.updateIN.bind(this), this.updateIN.bind(this), this.props.props,'post', tempObj);
    }
    render(){
        let {loginStatus, startingLogin, invalidCredentials} = this.state;
        return (
        <Login loginfn = {this.loginFn.bind(this)} loginStatus= {loginStatus} startingLogin = {startingLogin} invalidCredentials = {invalidCredentials} resetState = {this.resetState.bind(this)}/>
        )
    }
}
export default LoginContainer