import React, {Component} from 'react';
import {formatDate, cmtoinch, GetHt, lbtokg} from '../../Utilities/Services';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import style from './Progress.style';
import ImageS3 from '../../Utilities/ImageS3';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
class Progress extends Component{
    constructor(props){
        super(props);
        this.state={openDialog: false, selected: 0}
    }
    open(indx){
        this.setState({openDialog: true, selected: indx})
    }
    close(){
        this.setState({openDialog: false})
    }
    render(){
        let {progress} = this.props 
        let {selected} = this.state;
        return (<ul style={style.progressContainer}>
            <Dialog fullScreen open={this.state.openDialog} onClose={this.close} color="primary">
                <AppBar style={{backgroundColor: '#1b1b1b', color: '#fff'}}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={this.close.bind(this)} aria-label="close">
                            <i className="material-icons">
                                close
                            </i>
                        </IconButton>                    
                    </Toolbar>
                </AppBar>
                <div style={{height: GetHt()-70, overflowY: 'scroll', paddingTop: '20px', textAlign: 'center'}}>
                    <ImageS3 imgSrc ={progress[selected].pic_1} folder="progress_picture" style={style.imgBig}/>
                    <ImageS3 imgSrc ={progress[selected].pic_2} folder="progress_picture" style={style.imgBig}/>
                    <ImageS3 imgSrc ={progress[selected].pic_3} folder="progress_picture" style={style.imgBig}/>
                    <ImageS3 imgSrc ={progress[selected].pic_4} folder="progress_picture" style={style.imgBig}/>
                </div>
                
            </Dialog>
            {progress.length>0 && progress.map((progress, indx)=>{
            return (<li style={style.progress} onClick={this.open.bind(this, indx)}>
                <div style={style.partitionLine}></div>
                <Grid container direction="column">
                    <Grid item>
                        <Chip label={formatDate(progress.post_date)} variant="outlined" style={style.chip} />
                    </Grid>
                    <Grid item style={style.progressStats}>
                        <Grid container direction="row" alignItems="stretch" justify="space-between">
                            <Grid item>
                                <div style={style.label}>Weight</div>
                                <Grid container direction="row" alignItems="flex-end">
                                    <Grid item>
                                       <div style={style.big}>{lbtokg(progress.weight).toFixed(2)}</div>
                                    </Grid>
                                    <Grid item style={style.unit}>
                                        <small>kg</small>
                                    </Grid>
                                </Grid>                                
                            </Grid>
                            <Grid item>
                                <div style={style.label}>Waist</div>
                                <Grid container direction="row" alignItems="flex-end">
                                    <Grid item>
                                       <div style={style.big}>{cmtoinch(progress.waist).toFixed(2)}</div>
                                    </Grid>
                                    <Grid item style={style.unit}>
                                        <small>in</small>
                                    </Grid>
                                </Grid>                                
                            </Grid>
                            <Grid item>
                                <div style={style.label}>Neck</div>
                                <Grid container direction="row" alignItems="flex-end">
                                    <Grid item>
                                       <div style={style.big}>{cmtoinch(progress.neck).toFixed(2)}</div>
                                    </Grid>
                                    <Grid item style={style.unit}>
                                        <small>in</small>
                                    </Grid>
                                </Grid>                                
                            </Grid>
                            <Grid item>
                                <div style={style.label}>Hips</div>
                                <Grid container direction="row" alignItems="flex-end">
                                    <Grid item>
                                       <div style={style.big}>{cmtoinch(progress.hips).toFixed(2)}</div>
                                    </Grid>
                                    <Grid item style={style.unit}>
                                        <small>in</small>
                                    </Grid>
                                </Grid>                                
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container direction="row" style={style.picContainer}>
                            <Grid item xs={6} style={style.progressPics}>
                                <ImageS3 imgSrc ={progress.pic_1} folder="progress_picture" style={style.img}/>
                            </Grid>
                            <Grid item xs={6} style={style.progressPics}>
                                <ImageS3 imgSrc ={progress.pic_2} folder="progress_picture" style={style.img}/>
                            </Grid>
                            <Grid item xs={6} style={style.progressPics}>
                                <ImageS3 imgSrc ={progress.pic_3} folder="progress_picture" style={style.img}/>
                            </Grid>
                            <Grid item xs={6} style={style.progressPics}>
                                <ImageS3 imgSrc ={progress.pic_4} folder="progress_picture" style={style.img}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                
            </li>)
        })}
        {!(progress.length>0) && <div>Yo! Seems like your client needs a push ;)</div>}
        </ul>
        )
    }
}
export default Progress;