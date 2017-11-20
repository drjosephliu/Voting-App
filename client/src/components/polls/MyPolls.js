import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Loading from '../Loading';
import Poll from './Poll';

class MyPolls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skip: 0,
      isLoading: true,
      isLoadingMore: false,
    };
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

  renderPolls() {
    return this.props.polls.map(poll => {
      return (
        <Poll
          key={poll._id}
          title={poll.title}
          options={poll.options}
        />
      )
    })
  }

  render() {
    console.log(this.props.polls);
    console.log('skip:', this.state.skip);
    return (
      <div className='center-align container'>
        <h2>My Polls</h2>
        {this.state.isLoading ? <Loading size='big' /> :
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            alignContent: 'center'
          }}>
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
