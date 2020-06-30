import React, { useState } from 'react';
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import { userData, UserContext } from './context/UserContext';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

function App() {

  const [userData, setUserData] = useState(null);


  return (

    <Router>
      <UserContext.Provider value={{
        userData,
        updateUserData: setUserData
      }}>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Redirect from="/" to="/login" exact /> 
        </Switch>
      </UserContext.Provider>
    </Router >
  );
}

export default App;
