import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class VerifyAccount extends Component {
  componentDidMount() {
    const { email, token } = this.props.match.params;
    const { history } = this.props;

    this.props.checkVerificationToken(email, token, history);
  }

  render() {
    const { email } = this.props.match.params;
    return (
      <div>
        {this.props.msg.token &&
          <div>
            <div className='red-text'>
              {this.props.msg.token}
            </div>
            <button
              className='teal btn waves-effect waves-light'
              onClick={() => this.props.resendVerificationToken({ email })}
              >Resend
            </button>
          </div>
        }
      </div>
    );
  }
}

function mapStateToProps({ msg }) {
  return { msg };
}

export default connect(mapStateToProps, actions)(withRouter(VerifyAccount));
