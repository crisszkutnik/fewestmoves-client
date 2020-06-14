import React, {useEffect, useState} from 'react'
import {BrowserRouter, Route, Switch, Link, Redirect, useHistory} from 'react-router-dom';
import DashboardActual from './dashboardActual';
import SubmittedSol from './submitted';
import PageNavbar from './navbar'
import PrevResults from './prevResults'
import '../css/general.css'

const Dashboard = () => {
    const [user, setUser] = useState({
        name: ''
    });
    const history = useHistory();

    useEffect(() => {
        fetch('/wcalogin/isLogged', {
            method: 'GET',
            credentials: 'include',
            headers: {
            	'Accept': 'application/json',
            	'Content-Type': 'application/json'
			},
        })
        .then(res => res.json())
        .then(resUser => {
            if(resUser.logged)
                setUser({
                    name: resUser.name,
                    logged: true
                });
            else
                setUser({
                    name: "",
                    logged: false
                });
        })
    }, []);

    return (
        <BrowserRouter>
            <PageNavbar user={user} />
            <Switch>
                <Route exact path='/dashboard/actual'>
                    <DashboardActual user={user}/>
                </Route>
                <Route exact path ='/dashboard/submitted'>
                    <SubmittedSol />
                </Route>
                <Route exact path ='/dashboard/results'>
                    <PrevResults />
                </Route>
                <Redirect to='/dashboard/actual' />
            </Switch>
        </BrowserRouter>
    );
}

export default Dashboard;