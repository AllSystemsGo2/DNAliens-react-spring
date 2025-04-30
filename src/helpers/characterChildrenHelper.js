import React from 'react';

export const characterChildrenHelper = (children) => {
  const childrenArray = React.Children.toArray(children);
  const speechBubbles = childrenArray.filter(child => child.type?.name === 'SpeechBubble');
  const itemChildren = childrenArray.filter(child => child.type?.name === 'Item');
  const otherChildren = childrenArray.filter(child => !itemChildren.includes(child) && !speechBubbles.includes(child));
  
  return { speechBubbles, itemChildren, otherChildren };
}