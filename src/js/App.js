import React from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Dashboard from './dashboard'

const App = () => {
	return (
		<BrowserRouter>
			<div>
			<Switch>
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