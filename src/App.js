import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import Login from "./views/Login";
import Survey from "./views/Survey";

const App = () => {


  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path={`/`} element={<Login />} />
          <Route path={`/survey/`} element={<Survey />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;

