import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import LoginForm from './login'
import '../css/dashboardActual.css'
import DashboardActual from './dashboardActual';

class Navbar extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
			actual: true
		}
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange() {
        this.setState(state => ({
            actual: !state.actual
        })
    )
    }

    render() {
        if(this.state.actual) {
            return(
                <nav>
                    <Link to='/dashboard/actual' className='selected'>This week</Link>
                    <Link to='/dashboard/results' onClick={this.handleChange}>Results</Link>
                </nav>
            );
        } else {
            return(
                <nav>
                    <Link to='/dashboard/actual' onClick={this.handleChange}>This week</Link>
                    <Link to='/dashboard/results' className='selected'>Results</Link>
                </nav>
            );
        }
    }
}

const App = () => {
	return (
		<BrowserRouter>
			<div>
			<Navbar />
			<Switch>
				<Route exact path="/">
					<LoginForm/>
				</Route>
				<Route path="/dashboard/actual">
					<DashboardActual />
				</Route>
				<Route path="/dashboard/second">

				</Route>
			</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;