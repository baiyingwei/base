import React from 'react';
import { Link } from './react-router-dom';
export default (props) => {
  console.log('props', props)
  return (
    <div>
      <div onClick={() => {
        props.history.push('/detail');
      }}>home
    </div>
      <Link to={{
        pathname: '/detail'
      }}>link</Link>
    </div>
  )
};