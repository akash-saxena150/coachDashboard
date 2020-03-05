import React, {Component} from 'react';
import ImageS3 from '../../Utilities/ImageS3';
import style from './Client-style';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import {formatDate} from '../../Utilities/Services'
import {Link} from 'react-router-dom';

class Client extends Component{
    constructor(props){
        super(props);  
    }    
    render(){
        const {clientData, dietDue} =  this.props;
        const {clientProgress} = clientData;
        return (
            <Grid container alignItems="stretch" justify="center" direction="column">
                <Grid style={style.profilePicContainer}>
                    <Grid container direction="column" alignItems="stretch">
                        <Grid item style={style.picContainer}>
                            <ImageS3 imgSrc ={clientData.user_id} folder="profile_picture" style={style.profilePic}/>
                        </Grid>
                        <Grid item style={style.infoContainer} onScroll={(e)=>{console.log("Yo!",e)}}>
                            <Grid container direction="column">
                                <Grid item>
                                    <Grid style={style.info} container alignItems="center" justify="space-between" direction="row">
                                        <Grid item>
                                            <Link to="/info"><h3 style={style.name}>{clientData.firstname} {clientData.lastname}</h3></Link>
                                        </Grid>
                                        <Grid item>                                    
                                            <IconButton aria-label="message" size="small" style={style.actionItems}>
                                                <a href={`tel:${clientData.tel}`}><i className="material-icons" style={style.msgIcn}>call</i></a>
                                            </IconButton>
                                            <IconButton aria-label="message" size="small">
                                                <i className="material-icons" style={style.msgIcn}>message</i>
                                            </IconButton>                                    
                                        </Grid>                                
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    {clientProgress.length>0 && <Link to="/progress"><Grid container style={style.progressContainer} direction="row" alignItems="stretch" >
                                        <Grid item style={{textAlign: 'center'}} xs={6}>
                                            <h1 style={(clientProgress[0].waist - clientProgress[clientProgress.length-1].waist)>0?style.red:style.green}>
                                                {parseInt(clientProgress[0].waist - clientProgress[clientProgress.length-1].waist)}
                                            </h1>
                                            <small>Waist</small>                                            
                                        </Grid>
                                        <Grid item style={{textAlign: 'center'}} xs={6}>
                                            <h1 style={(clientProgress[0].weight - clientProgress[clientProgress.length-1].weight)>0?style.red:style.green}>
                                                {parseInt(clientProgress[0].weight - clientProgress[clientProgress.length-1].weight)}
                                            </h1>
                                            <small>Weight</small>                                            
                                        </Grid>
                                    </Grid>
                                    </Link>}
                                    {!(clientProgress.length>0) && <Grid container style={style.progressContainer} direction="row" alignItems="stretch" >No progress update yet :(</Grid>}
                                </Grid>
                                <Grid item>
                                    <Grid container style={style.dietDue} direction="row" alignItems="stretch" >
                                        
                                            <Grid item style={{textAlign: 'center'}} xs={12}>
                                                <Link to="/diets">
                                                    <h1 style={(dietDue<=0||dietDue==='NA')?style.red:style.green}>
                                                        {dietDue}
                                                    </h1>
                                                    <small>Diet due</small>
                                                </Link>
                                            </Grid>
                                        
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Grid container style={style.endDate} direction="row" alignItems="stretch" >
                                        <Grid item style={{textAlign: 'center'}} xs={12}>
                                            <h2 style={(new Date(clientData.renewalDate)<new Date())?style.red:style.green}>
                                                {formatDate((clientData.renewalDate).replace(" ","T"))}
                                            </h2>
                                            <small>End date</small>                                            
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}
export default Client