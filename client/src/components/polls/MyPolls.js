import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Loading from '../Loading';

class MyPolls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skip: 0,
      isLoading: true,
      isLoadingMore: false,
      value: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchMyPolls(this.state.skip)
      .then(() => {
        setTimeout(() => {
            this.setState({
            skip: this.state.skip + 4,
            isLoading: false
          });
        }, 1000);
      });
  }

  sumVotes(acc, cur) {
    return acc.votes + cur.votes
  }

  loadMore(skip) {
    this.setState({ isLoadingMore: true });

    setTimeout(() => {
      this.props.fetchMyPolls(skip)
        .then(() => {
          const nextSkip = this.state.skip + 4;
          this.setState({
            skip: nextSkip,
            isLoadingMore: false
          });
        });
    }, 1000);
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  handleChange(event) {
    console.log(event.target.value);
    this.setState({ value: event.target.value });
  }

  renderPolls() {
    return this.props.polls.map(poll => {
      return (
        <div className='card' key={poll._id} style={{ width: '350px', height: '400px' }}>
          <div className='card-content'>
            <span className='card-title'>{poll.title}</span>
            <p>Total votes: {poll.options.reduce((acc, cur) => { return acc + cur.votes }, 0)}</p>
            <form onSubmit={this.handleSubmit}>
              {poll.options.map(option => {
                return (
                  <p key={option._id}>
                    <input
                      name={poll.title}
                      className='with-gap'
                      type='radio'
                      id={option._id}
                      value={option.option}
                      onChange={this.handleChange}
                    />
                    <label htmlFor={option._id}>{option.option}</label>
                  </p>
                )
              })}

              <button
                type='text'
                className='activator teal btn waves-effect waves-light'
                style={{
                  position: 'absolute',
                  bottom: '10%',
                  transform: 'translateX(-50%)'
                }}
                >
                Submit
                <i className='material-icons right'>
                  send
                </i>
              </button>
            </form>
          </div>
          <div className='card-reveal'>
            <span className='card-title'>{poll.title}
              <i className='material-icons right'>close</i>
            </span>
            <p>
              dsfasfasdf
            </p>
          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <div className='center-align container'>
        <h2>My Polls</h2>
        {this.state.isLoading ? <Loading size='big' /> :
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', alignItems: 'center', alignContent: 'center' }}>
          {this.renderPolls()}
        </div>}
        <div className='row'>
          {this.state.isLoadingMore ? <Loading size='small' /> :
          <button
            className='btn red lighten-2 wave-effect waves-light' onClick={() => this.loadMore(this.state.skip)}>
            Load More
          </button>}
        </div>
      </div>

    );
  }
}

function mapStateToProps({ polls }) {
  return { polls }
}

export default connect(mapStateToProps, actions)(MyPolls);
