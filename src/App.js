import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import Login from "./views/Login";
import Survey from "./views/Survey";
import Thankyou from './views/Thankyou';

const App = () => {
    window.onbeforeunload = function(e) {
      e.returnValue = "このページを離れてもよろしいですか？";
  }

  return (
    <div className='App'>
      <div className="whole">
        <div className="container">
          <BrowserRouter>
            <Routes>
              <Route path={`/`} element={<Login />} />
              <Route path={`/survey/`} element={<Survey />} />
              <Route path={`/thankyou/`} element={<Thankyou />} />
            </Routes>
          </BrowserRouter>
        </div>
        </div>
    </div>
  );
};
export default App;

