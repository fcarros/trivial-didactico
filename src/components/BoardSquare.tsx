import React from 'react';
import PlayerToken from './PlayerToken';
import { FaCheckCircle } from 'react-icons/fa';

interface Player {
  color: string;
  name: string;
}

interface BoardSquareProps {
  id: number;
  type: 'center' | 'outer_ring' | 'quesito' | 'spoke';
  category: {
    nombre: string;
    color: string;
  };
  playersOnThisSquare: Player[];
  isPossibleMove: boolean;
  onSelectMove?: (squareId: number) => void;
}

const BoardSquare: React.FC<BoardSquareProps> = ({ id, type, category, playersOnThisSquare, isPossibleMove, onSelectMove }) => {
  const squareStyle: React.CSSProperties = {
    width: '60px',
    height: '40px',
    backgroundColor: category.color,
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    boxSizing: 'border-box',
    border: isPossibleMove ? '3px solid yellow' : '2px solid rgba(0,0,0,0.3)',
    padding: '2px',
    gap: '4px',
    cursor: isPossibleMove ? 'pointer' : 'default',
    boxShadow: isPossibleMove ? '0 0 15px yellow' : (type === 'quesito' ? '0 0 10px #fff' : 'none'),
    transition: 'all 0.2s ease-in-out',
  };

  const iconStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '24px',
    pointerEvents: 'none', // Make sure icon doesn't interfere with clicks
  };

  return (
    <div
      style={squareStyle}
      onClick={isPossibleMove ? () => onSelectMove && onSelectMove(id) : undefined}
    >
      {type === 'quesito' && <div style={iconStyle}><FaCheckCircle /></div>}
      {playersOnThisSquare.map((player) => (
        <PlayerToken key={player.name} color={player.color} />
      ))}
    </div>
  );
};

export default BoardSquare;
