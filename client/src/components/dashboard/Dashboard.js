import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Dashboard extends Component {

  render() {

    const { user } = this.props.auth;

    return (
      <div className="dashboard">
        {
          user.role === 0 && 
          <div>
            Welcome Admin!
            <br/>
            Here is Customer dashboard
          </div>
        }
        {
          user.role === 1 && 
          <div>
            Welcome {user.name}!
            <br/>
            Here is Customer dashboard
          </div>
        }
        
      </div>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Dashboard);