import React from 'react';

const display = {
  display: 'block'
};

const hide = {
  display: 'none'
};

const LoginModal = (props) => {
  return (
    <div className='modal' style={props.showLoginModal ? display : hide}>
      <div className='modal-content'>
        Login
      </div>
    </div>
  )
};

export default LoginModal;
