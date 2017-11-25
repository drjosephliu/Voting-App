import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import PollResults from './PollResults';

class Poll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      error: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(title, e) {
    e.preventDefault();
    const vote = {
      title,
      chosenOption: this.state.value
    };

    if (!this.state.value) {
      this.setState({ error: 'Please select an option' });
    } else {
      this.props.submitVote(vote)
        .then(() => {
          this.setState({ error: this.props.msg.vote });
        });
    }
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    const { title, options } = this.props;

    return (
      <div
        className='card'
        style={{ width: '350px', height: '400px' }}>
        <div className='card-content'>
          <span className='card-title'>{title}</span>
          <p>
            Total votes: {options.reduce((acc, cur) => { return acc + cur.votes }, 0)}
          </p>
          <form onSubmit={e => this.handleSubmit(title, e)}>
            {options.map(option => {
              return (
                <p key={option._id}>
                  <input
                    name={title}
                    className='with-gap'
                    type='radio'
                    id={option._id}
                    value={option.option}
                    onChange={this.handleChange}
                  />
                  <label htmlFor={option._id}>
                    {option.option}
                  </label>
                </p>

              )
            })}
            <div style={{
              position: 'absolute',
              bottom: '10%',
              width: '100%',
              left: '0',
              right: '0'
            }}>
              <div className='red-text'>
                {this.state.error}
              </div>
              <button
                type='text'
                className={`teal btn waves-effect waves-light ${this.state.value && !this.state.error && 'activator'}`}
                style={{ marginBottom: '1rem' }}
                >
                Submit
                <i className='material-icons right'>
                  send
                </i>
              </button>
              <div className='row'>
                <a href='#' className='activator' onClick={e => e.preventDefault()}>Show Results</a>
              </div>

            </div>
          </form>
        </div>
        <div className='card-reveal' style={{ padding: '1rem' }}>
          <PollResults
            title={title}
            options={options}
          />
        </div>
      </div>
    )
  }
}

function mapStateToProps({ msg }) {
  return { msg };
}

export default connect(mapStateToProps, actions)(Poll);
