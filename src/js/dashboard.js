import React, {useEffect, useState} from 'react'
import {BrowserRouter, Route, Switch, Link, Redirect, useHistory} from 'react-router-dom';
import '../css/navbar.css'
import DashboardActual from './dashboardActual';

class Navbar extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
            actual: true,
		}
        this.handleChange = this.handleChange.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

	handleChange() {
        this.setState(state => ({
            actual: !state.actual
        }))
    }

    handleLogout(e) {
        fetch('http://localhost:9000/user/logout', {
            method: 'POST',
            credentials: 'include',
        })
    }

    render() {
        if(this.state.actual) {
            return(
                <nav>
                    <div id='user-nav'>
                        <p>{this.props.user.name} {this.props.user.surname}<i className="fas fa-angle-down"></i></p>
                        <div id='user-options'>
                            <a>Manage user</a>
                            <a href='/login' onClick={this.handleLogout}>Logout</a>
                        </div>
                    </div>
                    <div id='nav-links'>
                        <Link to='/dashboard/actual' className='selected'>This week</Link>
                        <Link to='/dashboard/results' onClick={this.handleChange}>Results</Link>
                    </div>
                </nav>
            );
        } else {
            return(
                <nav>
                    <div id='user-nav'>
                        <p>{this.props.user.name} {this.props.user.surname}<i className="fas fa-angle-down"></i></p>
                        <div id='user-options'>
                            <a>Manage user</a>
                            <a href='/login' onClick={this.handleLogout}>Logout</a>
                        </div>
                    </div>
                    <div id='nav-links'>
                        <Link to='/dashboard/actual' onClick={this.handleChange}>This week</Link>
                        <Link to='/dashboard/results' className='selected'>Results</Link>
                    </div>
                </nav>
            );
        }
    }
}

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
            <Navbar user={user} />
            <Switch>
                <Route exact path='/dashboard/actual'>
                    <DashboardActual/>
                </Route>
                <Route exact path ='/dashboard/results'>

                </Route>
                <Redirect to='/dashboard/actual' />
            </Switch>
        </BrowserRouter>
    );
}

export default Dashboard;