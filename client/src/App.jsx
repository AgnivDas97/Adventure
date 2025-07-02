import {BrowserRouter, Router, Route, Routes} from 'react-router-dom'
import './App.css'
import React from 'react'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Service from './pages/Service'
import Register from './pages/Register'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import ErrorPage from './pages/ErrorPage'

function App() {


  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          {/* void element- <home/> doesn't have any closing tab*/}
          <Route path="/" element={<Home/>} /> 
          <Route path="/about" element={<About/>} />
          <Route path="/service" element={<Service/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="*" element={<ErrorPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
