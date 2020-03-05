import React, {Component} from 'react';
import Client from '../Screens/Client/Client-view';
import {apiCall, firebaseLogin, setData, getData} from '../Utilities/Services';
import Firebase from 'firebase';
import config from '../config.json';
class ClientContainer extends Component{
    constructor(props){
        super(props);
        this.state={waiting: true, dietDue: '...'};
        const region = getData('region')||'in';
        let regionStr = '';
        switch(region)
        {
            case 'in':
                regionStr = 'in_region';
            break;
            case 'me':
                    regionStr = 'ae_region'
            break;
            case 'row':
                    regionStr = 'us_region'
            break;

        }
        if (!Firebase.apps.length)
            Firebase.initializeApp(config.firebaseConfig[regionStr].config);
    }
    errLogin(err){
        this.props.history.push('/')
    }
    updateProfile(data){
        setData('clientData', JSON.stringify(data.data));
        let dietDue = 1;
        if((new Date(data.data.renewalDate)<=new Date()))
            dietDue = 'NA'
        this.setState({
            clientData: data.data,
            waiting: false,
            dietDue: dietDue==='NA'?'NA':this.state.dietDue
        })
    }
    componentDidMount(){
        console.log("this.props",this.props.match.params.id);
        const region = getData('region');
        apiCall('clientDetails', region, this.updateProfile.bind(this), this.errLogin.bind(this), this.props,'post', {clientId: this.props.match.params.id});
        firebaseLogin(Firebase)
            .then(response=>{
                let firebaseRef = Firebase.database().ref(`clientDiet/${this.props.match.params.id}`);
                firebaseRef.once('value')
                .then((data)=>{
                    let clientDiets = data.val(), lastDietDate = null;
                    setData('clientDiet', JSON.stringify(clientDiets));
                    for(let key in clientDiets)
                    {
                        lastDietDate = !lastDietDate?clientDiets[key].meta.dateEnd_db:((new Date(lastDietDate)>new Date(clientDiets[key].meta.dateEnd_db)?lastDietDate:clientDiets[key].meta.dateEnd_db))
                    }
                    let dietDue = parseInt(((new Date(lastDietDate)).getTime()-(new Date()).getTime())/(1000*60*60*24));
                    console.log(dietDue);
                    if(!(this.state.dietDue==='NA'))
                    {
                        this.setState({dietDue: dietDue});
                    }
                });
            })
    }
    render(){
        let {waiting, clientData, dietDue} = this.state;
        return (
            <div>
                {!waiting && <Client clientData = {clientData} dietDue={dietDue}/>}
                {waiting && <div>Waiting ...</div>}
                
            </div>
        )
    }
}
export default ClientContainer