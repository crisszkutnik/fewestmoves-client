import {Nav, Navbar, NavDropdown} from 'react-bootstrap';
import React from 'react'

class PageNavbar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {show: false};
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        fetch('/user/logout', {
            method: 'POST',
            credentials: 'include'
        })
    }

    render() {
        let name;

        if(this.props.user.logged)
            name = (<NavDropdown title={this.props.user.name} id="basic-nav-dropdown">
                        <NavDropdown.Item href="#manage">Manage User</NavDropdown.Item>
                        <NavDropdown.Item href="/login" onClick={this.handleLogout}>Log Out</NavDropdown.Item>
                    </NavDropdown>
            );
        else
            name = (<NavDropdown title="Log in" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#login">Log in</NavDropdown.Item>
                    </NavDropdown>
            );

        return(
            <Navbar variant="dark" expand="lg" style={{backgroundColor: '#2B2D32', position: 'absolute', width: '100vw'}}>
            <Navbar.Brand href="/dashboard/actual">Cubitos</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                    {name}
                    </Nav>
                <Nav className="ml-auto">
                    <Nav.Link href="/dashboard/actual">Compete!</Nav.Link>
                    <Nav.Link href="/dashboard/submitted">This Week</Nav.Link>
                    <Nav.Link href="/dashboard/results">Last Week</Nav.Link>
                </Nav>
            </Navbar.Collapse>
          </Navbar>
        );
    }
}

export default PageNavbar;