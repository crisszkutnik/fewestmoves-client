import React from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import LoginForm from './login'
import Dashboard from './dashboard'
import RegisterForm from './register'
import checkEmail from './checkEmail'

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
				<Route exact path='/verifyEmail/:token' component={checkEmail}/> 
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