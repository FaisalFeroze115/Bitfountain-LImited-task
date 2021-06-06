import './App.css';
import React from 'react'
import Protected from './components/Protected'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Login from './components/login/Login'
import ModelTypes from './components/medical_devices/ModelTypes'

function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Login}/>
          <Route path="/modeltype" exact>
            <Protected Component={ModelTypes}/>
          </Route>


        </Switch>
      </Router>
    </div>
  );
}

export default App;
