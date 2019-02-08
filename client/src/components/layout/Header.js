import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';
import { Navbar, Nav, NavDropdown, Container, Image } from 'react-bootstrap';
class Header extends Component {

  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <React.Fragment>
        <Navbar.Brand>
          <Image
            roundedCircle
            src={user.avatar}
            alt={user.name}
            style={{ width: '25px' }}
            title="You must have a Gravatar connected to your email to display an image"
          />
        </Navbar.Brand>
        <NavDropdown
          title={user.name}
          id="collasible-nav-dropdown"
        >
          <NavDropdown.Item
            onClick={this.onLogoutClick.bind(this)}
          >
            Logout
          </NavDropdown.Item>
        </NavDropdown>
      </React.Fragment>
    );

    const guestLinks = (
      <React.Fragment>
        <Nav.Link href="/register">
          Sign Up
        </Nav.Link>
        <Nav.Link href="/login">
          Login
        </Nav.Link>        
      </React.Fragment>      
    );

    return (
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        className="mb-4"
      >
        <Container>
          <Link to="/">
            <Navbar.Brand>
              Logo
            </Navbar.Brand>
          </Link>          
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              {isAuthenticated ? authLinks : guestLinks}
            </Nav>
          </Navbar.Collapse>
        </Container>        
      </Navbar>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(
  Header
);
