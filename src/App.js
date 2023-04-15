import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import Login from "./views/Login";
import Survey from "./views/Survey";
import Thankyou from './views/Thankyou';
//import Working from './views/Working';
import Notice from './views/Notice';
const App = () => {
    window.onbeforeunload = function(e) {
      e.returnValue = "このページを離れてもよろしいですか？";
  }

  return (
    <div className='App'>
        <div className="container">
          <BrowserRouter>
            <Routes>
              <Route path={`/`} element={<Notice/>} />
              <Route path={`/login/`} element={<Login/>} />
              <Route path={`/survey/`} element={<Survey />} />
              <Route path={`/thankyou/`} element={<Thankyou />} />
            </Routes>
          </BrowserRouter>
        </div>
    </div>
  );
};
export default App;

