import React from 'react';

export default (props) => {
  return (
    <div>detail
      <button onClick={() => {
        props.history.goBack();
      }}>返回</button>
    </div>
  )
};