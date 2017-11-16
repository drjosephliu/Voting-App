import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, FieldArray, arrayPush } from 'redux-form';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';
// import renderOption from './renderOption';
// import Loading from '../Loading';

const cardStyle = {
  width: '500px',
  height: '75px',
  margin: '10px auto',
  display: 'flex',
  alignItems: 'center',
  padding: '10px'
};

class NewPoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showOptions: false,
      option: '',
      title: ''
    };
    this.onOptionInputChange = this.onOptionInputChange.bind(this);
    this.onAddOption = this.onAddOption.bind(this);
    this.renderOption = this.renderOption.bind(this);
    this.renderOptionCard = this.renderOptionCard.bind(this);
    this.renderTitle = this.renderTitle.bind(this);
    this.renderTitleCard = this.renderTitleCard.bind(this);
  }

  onOptionInputChange(event) {
    this.setState({ option: event.target.value });
  }

  onAddOption() {
    const { dispatch } = this.props;

    dispatch(arrayPush('newPollForm', 'options', this.state.option));
    this.setState({ option: '' });
  }

  renderOption(props) {
    return (
      <ul>
        {props.fields.map((option, index) => (
            <li key={index}>
              <div
                className='card'
                style={cardStyle}>
                <Field
                  type='text'
                  name={option}
                  index={index}
                  component={this.renderOptionCard}
                />
                <i
                  className='material-icons right'
                  onClick={() => props.fields.remove(index)}
                >
                  delete
                </i>
              </div>
              <div className='red-text'>
                {props.meta.error }
              </div>
            </li>
        ))}
      </ul>
    );
  }

  renderOptionCard({ index, input }) {
    return (
        <span className='card-title'
          style={{ flex: '1' }}>
          {`${index + 1})`} {input.value}
        </span>
    );
  }

  renderTitle({ input, type, placeholder, meta: { touched, error }}) {
    return (
      <div>
        <div className='input-field inline'>
          <input {...input}
            type={type}
            placeholder={placeholder}
            style={{ width: '350px' }}
          />
          <div className='red-text'>
            {touched && error}
          </div>
        </div>
          <button
            type='text'
            className='red lighten-2 btn waves-effect waves-light'
            onClick={() => {
              this.setState({ title: input.value });
              input.value = '';
            }}
            disabled={!input.value}>
            Add Title
            <i className='material-icons right'>
              add
            </i>
          </button>
      </div>
    )
  }

  renderTitleCard({ input }) {
    return (
      <div
        className='card'
        style={cardStyle}>
        <span className='card-title' style={{ flex: '1' }}>
          <strong><u>{input.value}</u></strong>
        </span>
        <i className='material-icons right' onClick={() => this.setState({ title: '' })}>
          delete
        </i>
      </div>
    )
  }

  onPollSubmit(values) {
    const { history } = this.props;
    this.props.submitPoll(values, history);
  }

  render() {
    return (
      <div className='center-align'>
        <h3>Create a new poll:</h3>
        <form onSubmit={this.props.handleSubmit(this.onPollSubmit.bind(this))}>
          <Field
            type='text'
            placeholder='Title'
            name='title'
            component={this.state.title ? this.renderTitleCard : this.renderTitle}
          />
          <FieldArray
            name='options' component={this.renderOption}
          />
          <div className='row'>
            <div className='inline input-field'>
              <input
                value={this.state.option} onChange={this.onOptionInputChange}
                placeholder='Option'
                style={{ width: '300px' }}
              />
            </div>
            <button
              type='text'
              className='red lighten-2 btn waves-effect waves-light'
              onClick={this.onAddOption}
              disabled={!this.state.option}
            >
              Add Option
              <i className='material-icons right'>
                add
              </i>
            </button>
          </div>

          <button
            type='submit'
            className='teal btn-large waves-effect waves-light'
          >
            Submit
            <i className='material-icons right'>
              send
            </i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = 'You must provide a title';
  }

  if (!values.options || values.options.length < 2) {
    errors.options = { _error: 'You must provide at least 2 options' };
  }
  return errors;
}

NewPoll = reduxForm({
  form: 'newPollForm',
  validate
})(NewPoll);


export default connect(null, actions)(withRouter(NewPoll));
