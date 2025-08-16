import React from 'react';

interface DiceProps {
  onRoll: (roll: number) => void;
  disabled: boolean;
}

const Dice: React.FC<DiceProps> = ({ onRoll, disabled }) => {
  const handleDiceClick = () => {
    if (disabled) return;
    const roll = Math.floor(Math.random() * 6) + 1;
    onRoll(roll);
  };

  const buttonStyle: React.CSSProperties = {
    padding: '10px 20px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: disabled ? 'not-allowed' : 'pointer',
    marginTop: '20px',
    borderRadius: '8px',
    border: '2px solid #333',
    backgroundColor: disabled ? '#ccc' : '#ffde00',
    color: disabled ? '#666' : '#333',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.1s, background-color 0.2s',
    opacity: disabled ? 0.6 : 1,
  };

  return (
    <button 
      onClick={handleDiceClick} 
      style={buttonStyle}
      disabled={disabled}
      onMouseDown={(e) => !disabled && (e.currentTarget.style.transform = 'scale(0.95)')}
      onMouseUp={(e) => !disabled && (e.currentTarget.style.transform = 'scale(1)')}
    >
      Lanzar Dado
    </button>
  );
};

export default Dice;