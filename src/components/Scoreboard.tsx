import React from 'react';

interface Player {
  name: string;
  color: string;
}

interface Category {
  nombre: string;
  color: string;
}

interface ScoreboardProps {
  players: Player[];
  playersQuesitos: Record<string, boolean>[];
  categories: Category[];
}

const Scoreboard: React.FC<ScoreboardProps> = ({ players, playersQuesitos, categories }) => {
  const scoreboardStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: '600px',
    padding: '10px',
    backgroundColor: '#e0e0e0',
    borderRadius: '8px',
    marginBottom: '20px',
  };

  const playerStyle: React.CSSProperties = {
    textAlign: 'center',
  };

  const quesitoContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '5px',
  };

  const quesitoStyle: React.CSSProperties = {
    width: '15px',
    height: '15px',
    borderRadius: '50%',
    margin: '0 2px',
    border: '1px solid #555',
  };

  const getCategoryColor = (categoryName: string) => {
    const category = categories.find(c => c.nombre === categoryName);
    return category ? category.color : '#fff';
  };

  return (
    <div style={scoreboardStyle}>
      {players.map((player, index) => (
        <div key={player.name} style={playerStyle}>
          <h4 style={{ color: player.color, margin: 0 }}>{player.name}</h4>
          <div style={quesitoContainerStyle}>
            {playersQuesitos[index] && Object.keys(playersQuesitos[index]).map(categoryName => (
              playersQuesitos[index][categoryName] ? (
                <div 
                  key={categoryName} 
                  style={{ ...quesitoStyle, backgroundColor: getCategoryColor(categoryName) }}
                  title={categoryName}
                ></div>
              ) : null
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Scoreboard;