import React from 'react'
import {BrowserRouter, Route, Switch, Link, Redirect} from 'react-router-dom'
import LoginForm from './login'
import Dashboard from './dashboard'
import RegisterForm from './register'

const App = () => {
	return (
		<BrowserRouter>
			<div>
			<Switch>
				<Route exact path="/login">
					<LoginForm />
				</Route>
				<Route exact path="/register">
					<RegisterForm />
				</Route>
				<Route path="/dashboard">
					<Dashboard />
				</Route>
				<Route render={() => <Redirect to='/login' />}></Route>
			</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;