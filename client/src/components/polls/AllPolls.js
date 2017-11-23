import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Loading from '../Loading';
import Poll from './Poll';

class AllPolls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skip: 0,
      isLoading: true,
      isLoadingMore: false,
    };
  }

  componentDidMount() {
    this.props.fetchAllPolls(this.state.skip)
      .then(() => {
          this.setState({
          skip: this.state.skip + 4,
          isLoading: false
        });
      });
  }



  loadMore(skip) {
    this.setState({ isLoadingMore: true });

    this.props.fetchMoreAllPolls(skip)
      .then(() => {
        const nextSkip = this.state.skip + 4;
        this.setState({
          skip: nextSkip,
          isLoadingMore: false
        });
      });

  }

  renderPolls() {
    return this.props.allPolls.map(poll => {
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
    const displayButton = this.props.noMore.allPolls ? { display: 'none' } : { display: 'inline-block' }

    return (
      <div className='center-align container'>
        <h2>All Polls</h2>
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

function mapStateToProps({ allPolls, noMore }) {
  return { allPolls, noMore }
}

export default connect(mapStateToProps, actions)(AllPolls);
