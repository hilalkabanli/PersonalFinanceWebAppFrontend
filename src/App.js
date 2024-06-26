import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Transaction from './pages/Transaction';
import Transfer from './pages/Transfer';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';





function App() {

  return (
    <>

      <Router>
        <Navbar />
        <Switch >
        <Route path='/' exact component={Login} /> 
          <Route path='/home' exact component={Home} />
          <Route path='/profile' component={Profile} />
          <Route path='/transaction' component={Transaction} />
          <Route path='/transfer' component={Transfer} />
          <Route path='/register' component={Register} /> 
          
        </Switch>
    
      </Router>


    </>
  );
}

export default App;