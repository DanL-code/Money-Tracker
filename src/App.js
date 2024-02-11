import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import CreateAccountScreen from './screens/CreateAccountScreen';
import LoginScreen from './screens/LoginScreen';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/create-account" element={<CreateAccountScreen />} />
        <Route path="/home/:username" element={<HomeScreen />} />
        <Route path="/" element={<LoginScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
