import React, {Component} from 'react';
import {formatDate, croptxt} from '../../Utilities/Services';
import Grid from '@material-ui/core/Grid';
import style from './Diets.style';
import {Link} from 'react-router-dom';

class Diets extends Component{
    constructor(props){
        super(props);
        this.state={}
    }
    
    render(){
        const {clientDiet} = this.props;
        let clientDietArr = [], clientDietKeys = [];
        for(let key in clientDiet)
        {
            clientDietArr.push(clientDiet[key]); 
            clientDietKeys.push(key);
        }
            
        return (
            <ul style={style.dietList}>
                {clientDietArr.map((diet, indx)=>{
                    const {meta} = diet
                    return(
                        <li key={indx} style={style.diet}>
                            <Link to={`diet/${clientDietKeys[indx]}`}>
                                <Grid container direction="row">
                                    <Grid item xs={10}>
                                        <div style={style.bigBold}>{croptxt(meta.name, 16)}</div>
                                        <small style={style.small}>{formatDate(meta.dateStart_db)} - {formatDate(meta.dateEnd_db)}</small>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <div style={style.big}>{meta.calRange}</div>
                                        <small style={style.small}>Calories</small>
                                    </Grid>
                                </Grid>
                            </Link>
                            
                        </li>
                    )
                })}
            </ul>
        )
    }
}
export default Diets;