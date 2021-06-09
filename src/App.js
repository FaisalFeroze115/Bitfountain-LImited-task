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
import AddModel from './components/add_model/AddModel'
import NotFound from './components/NotFound'

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Login}/>

          <Route path="/modeltype" exact>
            <Protected Component={ModelTypes}/>
          </Route>

          <Route path="/add" exact>
            <Protected Component={AddModel}/>
          </Route>

          <Route component={NotFound}/>


        </Switch>
      </Router>
    </div>
  );
}

export default App;
