import React, {Component} from 'react';
import {formatDate} from '../../Utilities/Services';
import Grid from '@material-ui/core/Grid';
import style from './Diet.style';
import AppBar from '@material-ui/core/AppBar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

function HideOnScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({ target: window ? window() : undefined });
  
    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
  }
  
  HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
  };
class Diet extends Component{
    constructor(props){
        super(props);
    }
    getActualVal(val, q, ac){
        return parseInt(parseInt(val)*parseInt(ac)/parseInt(q))
    }
    render(){
        const {clientDiet} = this.props;
        let {meta, diet} = clientDiet;
        diet = diet[0];
        console.log(diet);
        return (
            <div>
                <HideOnScroll {...this.props}>
                    <AppBar style={style.appBar}>
                    <Toolbar>
                        <Typography variant="h6">{meta.name}</Typography>
                    </Toolbar>
                    </AppBar>
                </HideOnScroll>
                <Grid container direction="row" justify="space-around" style={style.macros}>
                    <Grid item>
                        Cal: {parseInt(diet.header.actualCal)}
                    </Grid>
                    <Grid item>
                        C: {parseInt(diet.header.actualC)}
                    </Grid>
                    <Grid item>
                        P: {parseInt(diet.header.actualP)}
                    </Grid>
                    <Grid item>
                        F: {parseInt(diet.header.actualF)}
                    </Grid>
                </Grid>
                <Grid container direction="column" style={style.contentContainer}>
                    {diet.units.map((unit, indx)=>{
                        let cal=0, p=0, f=0, c=0;
                        return(
                            <Grid item style={style.dietUnit} key={indx}>
                                {(unit.foods && unit.type=="meal") &&
                                <div style={style.dietUnitFoods}>
                                    <ul style={style.foodContainer}>
                                        <li style={style.labels}>
                                            <Grid container direction="row" justify="space-evenly">
                                                <Grid item xs={5}>Name</Grid>
                                                <Grid item xs={3}>Qnty</Grid>
                                                <Grid item xs={2}>Cals</Grid>
                                                <Grid item xs={2}>P, F, C</Grid>
                                                
                                            </Grid>
                                        </li>
                                        {unit.foods.map((food, indx)=>{
                                            cal += parseInt(food.actualCal); 
                                            p += this.getActualVal(food.protein,food.quantity, food.actualQnty); 
                                            f += this.getActualVal(food.fat,food.quantity, food.actualQnty); 
                                            c += this.getActualVal(food.carbs,food.quantity, food.actualQnty);
                                            return (
                                                <li key={`food${indx}`} style={(indx%2===0)?style.foodUnit:style.foodUnitBG}>
                                                    <Grid container direction="row" justify="space-evenly">
                                                        <Grid item xs={5}>{food.name}</Grid>
                                                        <Grid item xs={3}>{food.actualQnty} {food.unit}</Grid>
                                                        <Grid item xs={2}>{food.actualCal}</Grid>
                                                        <Grid item xs={2}>{this.getActualVal(food.protein,food.quantity, food.actualQnty)}, {this.getActualVal(food.fat,food.quantity, food.actualQnty)}, {this.getActualVal(food.carbs,food.quantity, food.actualQnty)}</Grid>
                                                        {/* <Grid item xs={1}></Grid>
                                                        <Grid item xs={1}></Grid> */}
                                                    </Grid>
                                                </li>
                                            )
                                        })
                                        }
                                        <li style={style.mealMacros}>
                                            <Grid container direction="row" justify="space-evenly">
                                                <Grid item >Cals: {parseInt(cal)}</Grid>
                                                <Grid item >P: {parseInt(p)} <small style={style.small}>|</small> F: {parseInt(f)} <small style={style.small}>|</small> C: {parseInt(c)}</Grid>
                                            </Grid>
                                        </li>                                        
                                    </ul>
                                </div>}
                                {(!unit.foods && unit.type==="workout") && <div style={style.workout}>Workout</div>}
                                {
                                    unit.type==="meal" && 
                                    <Grid container direction="row" style={style.comment}>
                                        <Grid item xs={2}>
                                            <i className="material-icons">
                                                comment
                                            </i>
                                        </Grid>
                                        <Grid item xs={10}>
                                            <small style={style.small}>{unit.note || '--'}</small>
                                        </Grid>
                                    </Grid>
                                }
                            </Grid>
                        )
                        })
                    }
                </Grid>
            </div>
        )
    }
}
export default Diet;