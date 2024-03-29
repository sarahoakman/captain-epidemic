import React from "react";
import "./App.css";
import Landing from "./Landing.js";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import SignUp from "./login_signup/Signup.js";
import Login from "./login_signup/Login.js";
import MapContainer from "./map/Map.js";
import Home from "./Home";
import Game from "./Games/Game";
import Profile from "./Profile";
import Quiz from "./Games/Quiz";
import Info from "./Info";
import SearchResult from "./category/SearchResult";
import Country from "./category/Country";
import Disease from "./category/Disease";
import Location from "./Location";
import axios from 'axios';
import Hangman from "./Games/Hangman"
import Error from "./Error"

// updates map db daily to get current data from calmclams
var CronJob = require('cron').CronJob;
var job = new CronJob('0 0 * * *', function() {
  axios.post('/map')
  axios.post('/location')
}, null, true, 'Australia/Sydney');
job.start();

function App() {
  return (
    <Router>
    <div className="App">
        <Switch>
          <Route exact path="/" component={Landing}/>
          <Route path="/home" component={Home}/>
          <Route path="/game" 
          render={(props)=>{
              if(localStorage.getItem('username')) return <Game/>;
              else return <Login/>;
          }} />
          <Route path="/profile"
          render={(props)=>{
            if(localStorage.getItem('username')) return <Profile/>;
            else return <Login/>;
        }} />
          <Route path="/info" component={Info}/>
          <Route path="/quiz"
          render={(props)=>{
              if(localStorage.getItem('username')) return <Quiz/>;
              else return <Login/>;
          }} />
          <Route path = "/map" component = {MapContainer}/>
          <Route path="/login"
          render={(props)=>{
                if(localStorage.getItem('username')) return <Home/>;
                else return <Login/>;
            }} />
          <Route path = "/signup"
          render={(props)=>{
              if(localStorage.getItem('username')) return <Home/>;
              else return <SignUp/>;
          }} />
          <Route path="/searchResult" component={SearchResult} />
          <Route path="/country" component={Country} />
          <Route path="/disease" component={Disease} />
          <Route path="/location" component={Location}/>
          <Route path="/hangman"
            render={(props)=>{
              if(localStorage.getItem('username')) return <Hangman/>;
              else return <Login/>;
          }} />
          <Route path ="*"component={Error}/>
          </Switch>
    </div>
    
    </Router>
  );
}
export default App;
