import React from 'react';

const Item = ({ style, children, src }) => {
  const image = src ? <img style={{ width: "100%", height: "100%" }} src={src} alt="" /> : null;

  return (
    <div style={style}>
      {image}
      {children}
    </div>
  );
};

export default Item;