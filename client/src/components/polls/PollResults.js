import React, { Component } from 'react';

class PollResults extends Component {

  render() {
    const { title, options } = this.props;
    return (
      <div className='card-content'>
        <span className='card-title'>{title}
          <i
            className='material-icons right'
            onClick={this.props.onClick}
            style={{ cursor: 'pointer' }}
            >
            close
          </i>
        </span>
        <p>
          Reveal
        </p>
      </div>
    )
  }
}

export default PollResults;
