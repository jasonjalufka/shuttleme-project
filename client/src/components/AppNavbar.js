import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../img/bus.png";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import RegisterModal from "./auth/RegisterModal";
import LoginModal from "./auth/LoginModal";
import Logout from "../components/auth/Logout";

class AppNavbar extends Component {
  state = {
    isOpen: false
  };

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <>
        <NavItem>
          <NavLink tag={Link} to="/map">
            Map
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/dashboard">
            Dashboard
          </NavLink>
        </NavItem>
        <NavItem>
          <Logout />
        </NavItem>
        <NavItem>
          <span className="navbar-text mr-3">
            <strong style={{ marginLeft: "10px" }}>
              {user ? `${user.name}` : ""}
            </strong>
          </span>
        </NavItem>
      </>
    );

    const guestLinks = (
      <>
        <NavItem>
          <RegisterModal />
        </NavItem>
        <NavItem>
          <LoginModal />
        </NavItem>
      </>
    );
    return (
      <div>
        <Navbar color="light" light expand="sm" className="mb-5">
          <Container>
            <NavbarBrand href="/">
              <img
                src={logo}
                style={{
                  width: "50px",
                  height: "auto",
                  backgroundColor: "#c5eff7",
                  borderRadius: "20%",
                  padding: "8px"
                }}
                alt="Logo"
              />
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {isAuthenticated ? authLinks : guestLinks}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(AppNavbar);
