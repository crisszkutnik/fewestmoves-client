import React from 'react'
import {Link} from 'react-router-dom';
import '../css/navbar.css';

const HTMLGeneral = (props) => {
    return (
        <div id='big-screen'>
            <div id='user-nav'>
                <div id='user-name'><span>{props.user.name} {props.user.surname}</span><i className="fas fa-angle-down"></i></div>
                <div id='user-options'>
                    <a>Manage user</a>
                    <a href='/login' onClick={props.handleLogout}>Logout</a>
                </div>
            </div>
            <div id='nav-links'>
                {props.actual === 0 ?
                <Link to='/dashboard/actual' className='selected'>This week</Link>:
                <Link to='/dashboard/actual' onClick={() => props.handleChange(0)}>This week</Link>}
                {props.actual === 1 ?
                <Link to='/dashboard/submitted' className='selected'>Submitted</Link>:
                <Link to='/dashboard/submitted' onClick={() => props.handleChange(1)}>Submitted</Link>}
                {props.actual === 2 ?
                <Link to='/dashboard/results' className='selected'>Results</Link>:
                <Link to='/dashboard/results' onClick={() => props.handleChange(2)}>Results</Link>} 
            </div>
        </div>
    );
}

class MobileNavbar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {show: false};
        this.updateShow = this.updateShow.bind(this);
    }

    updateShow() {
        this.setState({show: !this.state.show});
    }

    render() {
        return (
            <nav>
                <i class="fa fa-bars" aria-hidden="true" onClick={this.updateShow}></i>
                {this.state.show &&
                    <HTMLGeneral actual={this.props.actual} user={this.props.user} handleChange={this.props.handleChange} handleLogout={this.props.handleLogout}/>
                }
            </nav>
        );
    }
}

class Navbar extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
            actual: 0
        };
        
        this.handleLogout = this.handleLogout.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateDimensions = this.updateDimensions.bind(this);
    }

    componentWillMount() {
        this.updateDimensions();
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    updateDimensions() {
        this.setState({pageWidth: window.innerWidth});
    }

	handleChange(newState) {
        this.setState({actual: newState});
    }

    handleLogout(e) {
        fetch('http://localhost:9000/user/logout', {
            method: 'POST',
            credentials: 'include',
        })
    }


    render() {
        if(this.state.pageWidth >= 700)
            return (
            <nav>
                <i className="fa fa-bars" aria-hidden="true"></i>
                <HTMLGeneral actual={this.state.actual} user={this.props.user} handleChange={(n) => this.handleChange(n)} handleLogout={this.handleLogout}/>
            </nav>
            );
        else
            return (<MobileNavbar actual={this.state.actual} user={this.props.user} handleChange={(n) => this.handleChange(n)} handleLogout={this.handleLogout}/>);
    }
}

export default Navbar;