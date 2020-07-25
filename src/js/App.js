import React, {useEffect, useState} from 'react'
import PageNavbar from './navbar_login/navbar'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import DashboardActual from './dashboard/dashboardActual';
import SubmittedSol from './general_purpose/submitted';
import PrevResults from './general_purpose/prevResults';
import ModifySection from './modify_section/modifyChallenge'
import '../css/general.css'
import '../css/anim.css'
import '../css/submitted.css'
import '../css/prevResults.css'
import '../css/loadingView.css'
import '../css/userSolutions.css'
import '../css/loginPanel.css'
import '../css/modifyChallenge.css'

const App = () => {
	const [user, setUser] = useState({
        name: ''
    });

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
			<div>
			<PageNavbar user={user} />
			<Switch>
				<Route exact path='/modifySolution/:comb' component={ModifySection} />
				<Route exact path='/dashboard/actual'>
                    <DashboardActual user={user}/>
                </Route>
                <Route exact path ='/dashboard/submitted'>
                    <SubmittedSol />
                </Route>
                <Route exact path ='/dashboard/results'>
                    <PrevResults />
                </Route>
				<Route render={() => <Redirect to='/dashboard/actual' />}></Route>
			</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;