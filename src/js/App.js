import React from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Dashboard from './dashboard/dashboard'
import Test from './startChallengeTest'
import '../css/general.css'
import '../css/anim.css'
import '../css/submitted.css'
import '../css/prevResults.css'
import '../css/modifyPanel.css'
import '../css/loadingView.css'
import '../css/userSolutions.css'
import '../css/loginPanel.css'

const App = () => {
	return (
		<BrowserRouter>
			<div>
			<Switch>
				<Route path='/test'>
					<Test />
				</Route>
				<Route path="/dashboard">
					<Dashboard />
				</Route>
				<Route render={() => <Redirect to='/dashboard/actual' />}></Route>
			</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;