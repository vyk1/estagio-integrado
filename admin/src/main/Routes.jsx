import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import { isAuthenticated } from '../components/auth'

import Home from '../components/home/Home'
import UserCrud from '../components/users/UserCrud'
import AllActMembers from '../components/users/AllActMembers'
import AllNotActMembers from '../components/users/AllNotActMembers'
import Login from '../components/login/Login'
import Logout from '../components/logout/Logout'
import NewInternship from '../components/internship/NewInternship'

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                    <Redirect to={{ pathname: '/sign-in', state: { from: props.location } }} />
                )
        }
    />
);

export default props =>
    <Switch>
        <Route path='/sign-in' component={Login} />
        <PrivateRoute exact path='/' component={Home} />
        <PrivateRoute exact path='/admin' component={Home} />
        <PrivateRoute path='/admin/membros' component={AllActMembers} />
        <PrivateRoute path='/admin/editar-membro' component={UserCrud} />
        <PrivateRoute path='/admin/nao-verificados' component={AllNotActMembers} />
        <PrivateRoute path='/admin/novo-estagio' component={NewInternship} />
        <PrivateRoute path='/admin/logout' component={Logout} />
        <Redirect from='/' to='/admin' />
    </Switch>