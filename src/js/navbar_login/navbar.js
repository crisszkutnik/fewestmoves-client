import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import React from "react";
import LoginPanel from "./loginPanel";
import MarkdownRead from "./markdownRead";

class PageNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = { showPanel: 0 };
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
        <NavDropdown.Item onClick={() =>  this.setState({ showPanel: 2 })}>About the contest</NavDropdown.Item>
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
          <NavDropdown.Item onClick={() => this.setState({ showPanel: 1 })}>
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
        {this.state.showPanel === 1 && (
          <LoginPanel closePanel={() => this.setState({ showPanel: 0 })} />
        )}
        {this.state.showPanel === 2 &&
          <MarkdownRead closePanel={() => this.setState({ showPanel: 0 })} />
        }
      </>
    );
  }
}

export default PageNavbar;
