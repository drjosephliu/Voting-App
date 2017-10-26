import _ from 'lodash';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { reduxForm, Field } from 'redux-form';
import FormField from './FormField';
import resetPasswordFields from './resetPasswordFields';

class ResetPassword extends Component {
  componentDidMount() {
    const { email,  token } = this.props.match.params;
    this.props.checkResetToken(email, token);
  }

  renderFields() {
    return _.map(resetPasswordFields, ({ label, name, type }) => {
      return <Field key={name} label={label} name={name} type={type} component={FormField} />;
    });
  }

  renderContent() {
    if (!this.props.msg.token) {
      return (
        <form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
          {this.renderFields()}
          <button type='submit' className='btn teal waves-effect waves-light'>Submit</button>
        </form>
      );
    } else {
      return (
        <div>
          <div className='red-text'>
            {this.props.msg.token}
          </div>
        </div>
      );
    }
  }

  onSubmit(values) {
    const loginInfo = {
      email: this.props.match.params.email,
      password: values.confirmPassword
    }
    this.props.resetPassword(loginInfo, this.props.history);
  }


  render() {
    return(
      <div>
        <h2>Reset Password</h2>
        {this.renderContent()}
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (values.newPassword !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords must match';
  }

  _.each(resetPasswordFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = 'You must provide a value';
    }
  });
  return errors;
}

ResetPassword = reduxForm({
  validate,
  form: 'resetPasswordForm'
})(ResetPassword);

function mapStateToProps({ msg }) {
  return { msg };
}

export default connect(mapStateToProps, actions)(withRouter(ResetPassword));
