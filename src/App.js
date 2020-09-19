import React, { useEffect, useState } from 'react';
import Login from './Components/Login';
import './App.css';
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
import Signup from './Components/Signup';
import { getToken, removeUserSession } from './Utils/Common';
import LoanApplication from './Components/LoanApplication';
import Loan from './Components/Loan';

function App() {
  


  useEffect(() => {
    const token = getToken();
    if(!token){
      removeUserSession();
      
    }

  }, []);


  
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <div className="header">
            <NavLink exact activeClassName="active" to="/">Signup</NavLink>
            <NavLink activeClassName="active" to="/login">Login</NavLink>
            <NavLink activeClassName="active" to="/loanapplication">Loan Application</NavLink>
            <NavLink activeClassName="active" to="/loans">Loans</NavLink>
          </div>
          <div className="content">
            <Switch>
              <Route exact path="/" component={Signup}/>
              <Route exact path="/login" component={Login}/>
              <Route path="/loanapplication" component={LoanApplication} />
              <Route path="/loans" component={Loan} />



            </Switch>
          </div>


        </div>
     

      </BrowserRouter>
    </div>
  );
}

export default App;
