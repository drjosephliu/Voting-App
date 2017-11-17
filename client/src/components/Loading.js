import React from 'react';

const Loading = ({ size }) => {
  return (
    <div className={`preloader-wrapper ${size} active`}>
      <div className="spinner-layer spinner-red">
        <div className="circle-clipper left">
          <div className="circle"></div>
        </div>
        <div className="gap-patch">
          <div className="circle"></div>
        </div>
        <div className="circle-clipper right">
          <div className="circle"></div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
