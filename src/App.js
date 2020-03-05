import React, {useState} from 'react';
//import logo from './logo.svg';
import './App.css';
import LoginContainer from './Container/Login-container';
import Dashboard from './Container/Dashboard-container';
import Clients from './Container/Clients-container';
import Progress from './Container/Progress-container';
import Info from './Container/Info-container';
import Client from './Container/Client-container';
import Diets from './Container/Diets-container';
import Transactions from './Container/Transactions-container';
import Slider from './UI/Slider/Slider-view';
import Diet from './Container/Diet-container';
import Pending from './Container/Pending-container';
import Error from './Screens/Error/Error-view'
import {Footer} from './UI/';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Auth from './Utilities/Auth';
import {setData, getData} from './Utilities/Services';
//import {setData} from './Utilities/Services';
// import { ApolloClient } from 'apollo-client';
// import { InMemoryCache } from 'apollo-cache-inmemory';

// const  client = new ApolloClient({
//   cache: new InMemoryCache(),
//   resolvers: {
//     Mutation: {
//       toggleLoggedIn:({cache})=>{
//         cache.writeData({
//           loggedIn: true
//         })
//       }
//     }
//   }
// })
//setData('auth', 'test');
const empty = ()=>{
  return(<div></div>)
}
const App = (props) => {
  const [loggedIn, setLoggedIn] = useState(getData('isAuthenticated')||false);
  function changeLoginStatus(status, data){
    if(status)
    {
      setData('profilePic', data.data.profile_pic);
      setData('userId', data.data.user_id);
      setData('coachData', data.data)
    }
    setLoggedIn(status);
    
  }
  return (
    
      <div className="App">
        <Router>
          <div>
          <Route path="/" exact render={(routeProps)=><Auth props={routeProps} children={<Dashboard/>} childrenNoAuth = {<LoginContainer/>} changeLoginStatus={changeLoginStatus}/>}/>
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/pending" component={Pending} />
            <Route path="/clients" component={Clients} />
            <Route path="/client/:id" component={Client} />
            <Route path="/progress" component={Progress} />
            <Route path="/info" component={Info} />
            <Route path="/diets" component={Diets} />
            <Route path="/transactions" component={Transactions} />
            <Route path="/diet/:id" component={Diet} />
            <Route path="/error" component={Error} />
            <Route path="/" component={loggedIn?Footer:empty}/>
          </div>
        </Router>
      </div>
  );
}

export default App;
