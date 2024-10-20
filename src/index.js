import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './Home'
import Login from './Login'
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Navigate, Route, Routes, redirect} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/login/success" element={<Home/>}/>
        <Route path="*" element={<Navigate to={"/login"} replace/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
