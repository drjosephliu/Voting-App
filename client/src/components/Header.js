import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoginModal: false
    };
    this.toggleLoginModal = this.toggleLoginModal.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    document.addEventListener('click', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false);
  }

  toggleLoginModal() {
    this.setState({ showLoginModal: !this.state.showLoginModal });
  }

  handleClick = e => {
     if(!ReactDOM.findDOMNode(this).contains(e.target)) {
       this.setState({ showLoginModal: false });
     }
   }


  render() {
    return (
    <div>
      <nav>
        <div className='nav-wrapper'>
          <Link to='/' className='left brand-logo'>
            Voting App
          </Link>
          <ul className='right'>
            <li><a onClick={this.toggleLoginModal}>Login</a></li>
            <li><Link to='/signup'>Sign Up</Link></li>
          </ul>
        </div>
      </nav>
      <LoginModal showLoginModal={this.state.showLoginModal} />
    </div>
    )
  }
}

export default Header;
