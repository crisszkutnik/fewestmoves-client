import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import React from "react";
import LoginPanel from "./loginPanel";
import MarkdownRead from './markdownRead'

class PageNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = { showLogin: false };
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    fetch("/user/logout", {
      method: "POST",
      credentials: "include",
    });
  }

  render() {
    let name;

    let extraDropdown = (
      <>
        <NavDropdown.Item>About the contest</NavDropdown.Item>
        <NavDropdown.Item>Report an error</NavDropdown.Item>
      </>
    );

    if(this.props.user.logged)
      name = (
        <NavDropdown title={this.props.user.name} id="basic-nav-dropdown">
          <NavDropdown.Item
            href="/dashboard/actual"
            onClick={this.handleLogout}
          >
            Log Out
          </NavDropdown.Item>
          {extraDropdown}
        </NavDropdown>
      );
    else
      name = (
        <NavDropdown title="Log in" id="basic-nav-dropdown">
          <NavDropdown.Item onClick={() => this.setState({ showLogin: true })}>
            Log in
          </NavDropdown.Item>
          {extraDropdown}
        </NavDropdown>
      );

    return (
      <>
        <Navbar
          variant="dark"
          expand="lg"
          style={{
            backgroundColor: "#2B2D32",
            position: "absolute",
            width: "100%",
            zIndex: "3",
          }}
        >
          <Navbar.Brand href="/dashboard/actual">Fewest Moves</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>{name}</Nav>
            <Nav className="ml-auto">
              <Nav.Link href="/dashboard/actual">Compete!</Nav.Link>
              <Nav.Link href="/dashboard/submitted">This Week</Nav.Link>
              <Nav.Link href="/dashboard/results">Last Week</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <MarkdownRead />
        {this.state.showLogin && (
          <LoginPanel closePanel={() => this.setState({ showLogin: false })} />
        )}
      </>
    );
  }
}

export default PageNavbar;
