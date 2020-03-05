import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Logo from '../../img/logo.png';
import Styles from './Footer-style';
import { Link } from "react-router-dom";
import Avatar from '../Avatar/Avatar-view';
import {getData, apiCall, setData} from '../../Utilities/Services';
import config from '../../config.json'
import Drawer from '@material-ui/core/Drawer';
import { Button } from '@material-ui/core';


function goBack(props){
    props.history.goBack();
}
function logout(props){
    apiCall('logout', 'in', redirect, err, props,'get')
}
function redirect(data,props){
    localStorage.clear();
    window.location.href="/"
}
function err(){return 0}
function switchRegion(region, props){
    setData('region',region);
    console.log("path", props.history);
    if(props.history.location.pathname==='/dashboard')
        props.history.push('/')
    else
        props.history.push('/dashboard')
}
export default function Login(props){
    const userId = getData('userId');
    const regionData = JSON.parse(getData('auth'));
    const [openDrawer, setOpenDrawer] = useState(false);
    const coachImage = `${config.S3BucketURL}/img/coaches/smallPic/${userId}.jpg`;
    return (
        <Grid container direction="row" alignItems="center" justify="space-between" style={Styles.root}>
            <Drawer open={openDrawer} onClose={()=>{setOpenDrawer(false)}}>
                <Grid container direction="column" style={Styles.drawer} alignItems="center" justify="center">
                    <Grid item>
                        <Avatar img = {coachImage} style={{width: '80px', height: '80px'}}/>
                    </Grid>
                    <Grid item>
                        <Grid container>
                            {regionData.in && <Grid item>
                                <Button onClick={()=>{setOpenDrawer(false);switchRegion('in',props)}}>IN</Button>       
                            </Grid>}
                            {regionData.me && <Grid item>
                                <Button onClick={()=>{setOpenDrawer(false);switchRegion('me',props)}}>ME</Button>       
                            </Grid>}
                            {regionData.row && <Grid item>
                                <Button onClick={()=>{setOpenDrawer(false);switchRegion('row',props)}}>ROW</Button> 
                            </Grid>}
                        </Grid>
                    </Grid>
                </Grid>
                <div style={Styles.footer}>
                    <Button onClick={()=>{setOpenDrawer(false);logout(props)}} variant="outlined">Logout</Button>
                </div>
            </Drawer>
            <Grid item>
                <i className="material-icons" onClick={()=>{goBack(props)}}>
                    keyboard_arrow_left
                </i>
            </Grid>
            <Grid item>
                <Link to="/dashboard">
                    <Avatar img = {coachImage}/>
                </Link>
            </Grid>
            <Grid item>
                <i className="material-icons" onClick={()=>{setOpenDrawer(true)}}>
                    menu
                </i>
            </Grid>
        </Grid>
    )
}