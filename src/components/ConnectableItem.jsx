// ConnectableItem.jsx
import React from 'react';

const ConnectableItem = ({ id, type, text, onSelect, isSelected, isCorrect, isIncorrect }) => {
  const handleClick = () => {
    onSelect(id, type);
  };
  
  return (
    <div 
      onClick={handleClick}
      style={{
        border: '1px solid #333',
        padding: '10px',
        backgroundColor: isSelected ? '#e6f7ff' : 
                         isCorrect ? '#d4edda' : 
                         isIncorrect ? '#f8d7da' : '#fff',
        cursor: 'pointer',
        position: 'relative',
        width: type === 'organelle' ? '30%' : '60%'
      }}
    >
      {text}
      <div 
        style={{
          position: 'absolute',
          right: type === 'organelle' ? '-10px' : 'auto',
          left: type === 'function' ? '-10px' : 'auto',
          top: '50%',
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          backgroundColor: isSelected ? '#1890ff' : '#ddd',
          transform: 'translateY(-50%)',
          zIndex: 2
        }}
      />
    </div>
  );
};

export default ConnectableItem;