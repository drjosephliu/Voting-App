import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class MyPolls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skip: 0
    };
  }

  componentDidMount() {
    this.props.fetchMyPolls(this.state.skip);
    this.setState({ skip: this.state.skip + 5 });
  }

  sumVotes(polls) {
    return polls.reduce((a, b) => {
      return a.votes + b.votes;
    });
  }

  loadMore(skip) {
    this.props.fetchMyPolls(skip);
    const nextSkip = this.state.skip + 5;
    this.setState({ skip: nextSkip });
  }

  renderPolls() {
    return this.props.polls.map(poll => {
      return (
        <div className='card' key={poll._id}>
          <div className='card-content'>
            <span className='card-title'>{poll.title}</span>
            <p>Votes: {this.sumVotes(poll.options)}</p>
          </div>
        </div>
      )
    })
  }

  render() {
    console.log('polls', this.props.polls);
    console.log('skip:', this.state.skip);
    return (
      <div>
        <h2>My Polls</h2>
        {this.renderPolls()}
        <a href='#' onClick={() => this.loadMore(this.state.skip)}>Load More</a>
      </div>

    );
  }
}

function mapStateToProps({ polls }) {
  return { polls }
}

export default connect(mapStateToProps, actions)(MyPolls);
