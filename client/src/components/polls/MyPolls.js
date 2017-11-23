import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Loading from '../Loading';
import PollResults from './PollResults';

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
          this.setState({
          skip: this.state.skip + 4,
          isLoading: false
        });
      });
  }



  loadMore(skip) {
    this.setState({ isLoadingMore: true });

    this.props.fetchMoreMyPolls(skip)
      .then(() => {
        const nextSkip = this.state.skip + 4;
        this.setState({
          skip: nextSkip,
          isLoadingMore: false
        });
      });
  }

  confirmDelete(id) {
    if (window.confirm('Are you sure?')) {
      this.props.deletePoll(id);
    }

  }

  renderPolls() {
    return this.props.myPolls.map(poll => {
      return (
        <div
          key={poll._id}
          className='card'
          style={{ width: '350px', height: '400px' }}>
          <PollResults
            key={poll._id}
            title={poll.title}
            options={poll.options}
            onClick={() => this.confirmDelete(poll._id)}
          />
        </div>
      )
    })
  }

  render() {
    const displayButton = this.props.noMore.myPolls ? { display: 'none' } : { display: 'inline-block' }

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
            className='btn red lighten-2 wave-effect waves-light'
            onClick={() => this.loadMore(this.state.skip)}
            style={displayButton}
            >
            Load More
          </button>}
        </div>
      </div>

    );
  }
}

function mapStateToProps({ myPolls, noMore }) {
  return { myPolls, noMore }
}

export default connect(mapStateToProps, actions)(MyPolls);
