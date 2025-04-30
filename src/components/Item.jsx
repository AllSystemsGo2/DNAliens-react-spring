import React from 'react';

const Item = ({ style, children }) => {
  return (
    <div style={style}>
      {children}
    </div>
  );
};

export default Item;