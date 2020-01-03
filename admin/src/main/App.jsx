import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './App.css'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import Routes from './Routes'
import { isAuthenticated } from '../components/auth'
import Login from '../components/login/Login'

export default props =>
    !isAuthenticated ? <Login /> :
        <BrowserRouter>
            <Routes />
        </BrowserRouter>