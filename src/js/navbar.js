import React from 'react'
import {BrowserRouter, Route, Switch, Link, Redirect, useHistory} from 'react-router-dom';
import '../css/navbar.css';

class Navbar extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
            actual: 0,
            mobileNav: false,
            showNav: {display: 'flex'}
        };
        
        this.handleLogout = this.handleLogout.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateNav = this.updateNav.bind(this);
    }

    componentWillMount() {
        this.updateNav();
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
      }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
      }

	handleChange(newState) {
        this.setState({actual: newState});
    }

    updateNav() {
        if(window.innerWidth < 700)
            if(this.state.mobileNav) //If showing nav
                this.setState({showNav: {display: 'none'}, mobileNav: false})
            else
                this.setState({showNav: {display: 'flex'}, mobileNav: true})
        else
            this.setState({showNav: {display: 'flex'}})
    }

    handleLogout(e) {
        fetch('http://localhost:9000/user/logout', {
            method: 'POST',
            credentials: 'include',
        })
    }


    render() {
        return (
            <nav>
                <i class="fa fa-bars" aria-hidden="true" onClick={this.updateNav}></i>
                <div id='big-screen' style={this.state.showNav}>
                    <div id='user-nav'>
                        <div id='user-name'><span>{this.props.user.name} {this.props.user.surname}</span><i className="fas fa-angle-down"></i></div>
                        <div id='user-options'>
                            <a>Manage user</a>
                            <a href='/login' onClick={this.props.handleLogout}>Logout</a>
                        </div>
                    </div>
                    <div id='nav-links'>
                        {this.state.actual === 0 ?
                        <Link to='/dashboard/actual' className='selected'>This week</Link>:
                        <Link to='/dashboard/actual' onClick={() => this.handleChange(0)}>This week</Link>}
                        {this.state.actual === 1 ?
                        <Link to='/dashboard/submitted' className='selected'>Submitted</Link>:
                        <Link to='/dashboard/submitted' onClick={() => this.handleChange(1)}>Submitted</Link>}
                        {this.state.actual === 2 ?
                        <Link to='/dashboard/results' className='selected'>Results</Link>:
                        <Link to='/dashboard/results' onClick={() => this.handleChange(2)}>Results</Link>} 
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;