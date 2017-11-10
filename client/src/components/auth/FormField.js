import React from 'react';

export default ({ input, label, type, placeholder, style, meta: { error, touched }}) => {
  return (
    <div>
      <label>{label}</label>
      <input {...input} type={type} placeholder={placeholder} style={style} />
      <div className='red-text'>
        {touched && error}
      </div>
    </div>
  )
}
