import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import { isAuthenticated } from '../components/auth'

import Home from '../components/home/Home'
import UserCrud from '../components/users/UserCrud'
import AllActMembers from '../components/users/AllActMembers'
import AllNotActMembers from '../components/users/AllNotActMembers'
import Logout from '../components/logout/Logout'
import NewInternship from '../components/internship/NewInternship'
import { BrowserRouter } from 'react-router-dom'

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
    <BrowserRouter>
        <Switch>
            <PrivateRoute exact path={`/`} component={Home} />
            <PrivateRoute path={`/membros`} component={AllActMembers} />
            <PrivateRoute path={`/editar-membro`} component={UserCrud} />
            <PrivateRoute path={`/nao-verificados`} component={AllNotActMembers} />
            <PrivateRoute path={`/novo-estagio`} component={NewInternship} />
            <PrivateRoute path={`/logout`} component={Logout} />
        </Switch>
    </BrowserRouter>