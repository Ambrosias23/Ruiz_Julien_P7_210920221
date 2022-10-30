import React from "react";
import {Route, Routes} from 'react-router-dom';
import "./styles/App.css";

// pages
import Home from './pages/Home'
import Create from './pages/Create'
import Update from './pages/Update'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Error from './pages/Error';

// components
import Header from './components/Header'
import Footer from './components/Footer'

function App() {

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<logout />} />
        <Route path="*" element={<Error/>} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
