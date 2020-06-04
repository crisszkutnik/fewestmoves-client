import React, {useEffect, useState} from 'react'
import {BrowserRouter, Route, Switch, Link, Redirect, useHistory} from 'react-router-dom';
import DashboardActual from './dashboardActual';
import SubmittedSol from './submitted';
import Navbar from './navbar'
import Navbar_Guido from './navbar'

const Dashboard = () => {
    const [user, setUser] = useState({
        name: '',
        surname: ''
    });
    const history = useHistory();

    useEffect(() => {
        fetch('http://localhost:9000/user/isLogged', {
            method: 'POST',
            credentials: 'include',
            headers: {
            	'Accept': 'application/json',
            	'Content-Type': 'application/json'
			},
			body: ''
        })
        .then(res => {
            if(res.status === 403) 
                history.push('/login');
            else if(res.status === 200) 
                return res.json();
        })
        .then(resUser => {
            setUser({
                name: resUser.name,
                surname: resUser.surname
            });
        })
        .catch(e =>  history.push('/login'));
    }, []);

    return (
        <BrowserRouter>
            <Navbar_Guido user={user} />
            <Switch>
                <Route exact path='/dashboard/actual'>
                    <DashboardActual/>
                </Route>
                <Route exact path ='/dashboard/submitted'>
                    <SubmittedSol />
                </Route>
                <Route exact path ='/dashboard/results'>

                </Route>
                <Redirect to='/dashboard/actual' />
            </Switch>
        </BrowserRouter>
    );
}

export default Dashboard;