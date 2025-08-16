import React from 'react';

interface PlayerTokenProps {
  color: string;
}

const PlayerToken: React.FC<PlayerTokenProps> = ({ color }) => {
  const tokenStyle: React.CSSProperties = {
    width: '20px',
    height: '20px',
    backgroundColor: color,
    borderRadius: '50%',
    border: '2px solid rgba(0,0,0,0.7)',
    margin: '2px',
    boxShadow: 'inset 0 0 3px rgba(0,0,0,0.5)'
  };

  return <div style={tokenStyle}></div>;
};

export default PlayerToken;