import React from 'react'
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import '../css/navbar.css'
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

class Dashboard extends React.Component {
    render() {
        return (
            <BrowserRouter>
            <Navbar />
            <Switch>
                <Route exact path='/dashboard/actual'>
                    <DashboardActual />
                </Route>
            </Switch>
            </BrowserRouter>
        );
    }
}

export default Dashboard;