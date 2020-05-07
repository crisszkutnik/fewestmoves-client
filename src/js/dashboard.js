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

/*class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {logged: false};
    }

    componentDidMount() {
        fetch('http://localhost:9000/user/isLogged', {
            method: 'POST',
			credentials: 'include',
			body: ''
        })
        .then(res => {
            if(res.status == 403)
                this.setState({logged: false});
            else
                this.setState({logged: true});
        });
    }

    render() {
        return (
            <BrowserRouter>
            <Navbar />
            <Switch>
                <Route exact path='/dashboard/actual'>
                    <DashboardActual checkLogin={this.checkLogin}/>
                </Route>
                <Redirect to='/dashboard/actual' />
            </Switch>
            </BrowserRouter>
        );
    }
}*/

const Dashboard = () => {
    const [logged, setLogged] = useState(false);
    const history = useHistory();

    useEffect(() => {
        fetch('http://localhost:9000/user/isLogged', {
            method: 'POST',
			credentials: 'include',
			body: ''
        })
        .then(res => {
            if(res.status == 403) {
                history.push('/login');
                setLogged(false);
            } else
                setLogged(true);
        });
    });

    return (
        <BrowserRouter>
            <Navbar />
            <Switch>
                <Route exact path='/dashboard/actual'>
                    <DashboardActual/>
                </Route>
                <Redirect to='/dashboard/actual' />
            </Switch>
        </BrowserRouter>
    );
}

export default Dashboard;