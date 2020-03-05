import React, {Component} from 'react';
import {formatDate} from '../../Utilities/Services';
import Grid from '@material-ui/core/Grid';
import style from './Info.style';

class Info extends Component{
    constructor(props){
        super(props);
        this.state={}
    }
    returnVal(val){
        return val?val:'--';
    }
    render(){
        const {clientData} = this.props;
        console.log("clientData",clientData);
        return(
            <Grid container style={style.container}>
                <Grid item style={style.infoSection}>
                    <h2>General</h2>
                    <ul style={style.infoListContainer}>
                        <li>
                            <small style={style.small}>Name</small>
                            <div style={style.big}>{this.returnVal(clientData.firstname)} {this.returnVal(clientData.lastname)}</div>
                        </li>
                        <li>
                            <small style={style.small}>Email</small>
                            <div style={style.big}>{this.returnVal(clientData.email)}</div>
                        </li>
                        <li>
                            <small style={style.small}>Mobile</small>
                            <div style={style.big}>{this.returnVal(clientData.tel)}</div>
                        </li>
                        <li>
                            <small style={style.small}>Gender</small>
                            <div style={style.big}>{this.returnVal(clientData.sex)}</div>
                        </li>
                        <li>
                            <small style={style.small}>DOB</small>
                            <div style={style.big}>{this.returnVal(formatDate(clientData.birth_date))}</div>
                        </li>
                        <li>
                            <small style={style.small}>Location</small>
                            {clientData.city && <div style={style.big}>{this.returnVal(clientData.city)}, {this.returnVal(clientData.state)}</div>}
                            {!clientData.city && <div>--</div>}
                        </li>
                        <li>
                            <small style={style.small}>Occupation</small>
                            <div style={style.big}>{this.returnVal(clientData.occupation)}</div>
                        </li>
                        <li>
                            <small style={style.small}>Company</small>
                            <div style={style.big}>{this.returnVal(clientData.company)}</div>
                        </li>
                    </ul>
                </Grid>
                <Grid item style={style.infoSection}>
                    <h2>Appearance</h2>
                    <ul style={style.infoListContainer}>
                        <li>
                            <small style={style.small}>Height (cm)</small>
                            <div style={style.big}>{this.returnVal(clientData.height)}</div>
                        </li>
                        <li>
                            <small style={style.small}>Weight (kg)</small>
                            <div style={style.big}>{this.returnVal((clientData.weight * 0.453592).toFixed(2))}</div>
                        </li>
                    </ul>
                </Grid>
                <Grid item style={style.infoSection}>
                    <h2>Lifestyle</h2>
                    <ul style={style.infoListContainer}>
                        <li>
                            <small style={style.small}>Training experience</small>
                            <div style={style.big}>{this.returnVal(clientData.trainingExp)}</div>
                        </li>
                        <li>
                            <small style={style.small}>Activity level</small>
                            <div style={style.big}>{this.returnVal(clientData.activity)}</div>
                        </li>
                        <li>
                            <small style={style.small}>Stress level</small>
                            <div style={style.big}>{this.returnVal(clientData.stress)}</div>
                        </li>
                        <li>
                            <small style={style.small}>Hours of peaceful sleep</small>
                            <div style={style.big}>{this.returnVal(clientData.sleep)}</div>
                        </li>
                        <li>
                            <small style={style.small}>Current diet plan</small>
                            <div style={style.big}>{this.returnVal(clientData.diet)}</div>
                        </li>
                        <li>
                            <small style={style.small}>Current workout</small>
                            <div style={style.big}>{this.returnVal(clientData.workout)}</div>
                        </li>
                    </ul>
                </Grid>
                <Grid item style={style.infoSection}>
                    <h2>Goal</h2>
                    <ul style={style.infoListContainer}>
                        <li>
                            <small style={style.small}>Goal</small>
                            <div style={style.big}>{this.returnVal(clientData.goal)}</div>
                        </li>
                    </ul>
                </Grid>
                <Grid item style={style.infoSection}>
                    <h2>Preferences</h2>
                    <ul style={style.infoListContainer}>
                        <li>
                            <small style={style.small}>Diet preference</small>
                            <div style={style.big}>{this.returnVal(clientData.dietPref)}</div>
                        </li>
                        <li>
                            <small style={style.small}>Diet request</small>
                            <div style={style.big}>{this.returnVal(clientData.dietRequest)}</div>
                        </li>
                        <li>
                            <small style={style.small}>Food you love</small>
                            <div style={style.big}>{this.returnVal(clientData.preferredFoodItems)}</div>
                        </li>
                        <li>
                            <small style={style.small}>Preferred workouts/week</small>
                            <div style={style.big}>{this.returnVal(clientData.noWorkouts)}</div>
                        </li>
                        <li>
                            <small style={style.small}>Workout preference</small>
                            <div style={style.big}>{this.returnVal(clientData.willingGym?'Gym':'Home')}</div>
                        </li>
                        <li>
                            <small style={style.small}>Workout time</small>
                            <div style={style.big}>{this.returnVal(clientData.workoutTime)}</div>
                        </li>
                    </ul>
                </Grid>
                <Grid item style={style.infoSection}>
                    <h2>Injuries</h2>
                    <ul style={style.infoListContainer}>
                        <li>
                            <small style={style.small}>Injuries</small>
                            <div style={style.big}>{this.returnVal(clientData.issues)}</div>
                        </li>
                    </ul>
                </Grid>
                <Grid item style={style.infoSection}>
                    <h2>Questions</h2>
                    <ul style={style.infoListContainer}>
                        <li>
                            <small style={style.small}>Questions?</small>
                            <div style={style.big}>{this.returnVal(clientData.questions)}</div>
                        </li>
                    </ul>
                </Grid>
            </Grid>
        )
    }
}
export default Info;