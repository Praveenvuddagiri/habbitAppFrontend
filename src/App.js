import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from 'react';
import Login from './components/Login';
import Register from './components/Register';
import HomePage from './components/Home';
import Profile from './components/Profile';
function App() {
  return (
      <Router>
      <div className="app">
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
