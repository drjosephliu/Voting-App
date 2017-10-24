import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from './Login';
import ForgotPassword from './ForgotPassword';

const display = {
  display: 'block',
  zIndex: '5000'
};

const hide = {
  display: 'none'
};

class Modal extends Component {

  renderContent() {
    if (this.props.modal) {
      return <ForgotPassword />;
    }
    return <Login />;
  }

  render() {
    return (
      <div className='modal' style={this.props.showLoginModal ? display : hide}>
        <div className='modal-content' style={{ padding: '50px' }}>
          {this.renderContent()}
        </div>
      </div>
    );
  }
};

function mapStateToProps({ modal }) {
  return { modal };
}

export default connect(mapStateToProps, null)(Modal);
