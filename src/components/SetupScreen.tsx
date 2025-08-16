import React, { useState } from 'react';

interface Player {
  name: string;
  color: string;
}

interface SetupScreenProps {
  onGameStart: (players: Player[]) => void;
}

const initialPlayers = [
  { name: 'Jugador 1', color: 'red' },
  { name: 'Jugador 2', color: 'blue' },
  { name: 'Jugador 3', color: 'green' },
  { name: 'Jugador 4', color: 'yellow' }
];

const SetupScreen: React.FC<SetupScreenProps> = ({ onGameStart }) => {
  const [playerNames, setPlayerNames] = useState<string[]>(['Jugador 1', 'Jugador 2', 'Jugador 3', 'Jugador 4']);

  const handleNameChange = (index: number, newName: string) => {
    const updatedNames = [...playerNames];
    updatedNames[index] = newName;
    setPlayerNames(updatedNames);
  };

  const handleStartClick = () => {
    const filteredPlayers: Player[] = [];
    playerNames.forEach((name, index) => {
      if (name.trim() !== '') {
        filteredPlayers.push({
          ...initialPlayers[index],
          name: name.trim()
        });
      }
    });

    if (filteredPlayers.length === 0) {
      onGameStart(initialPlayers);
    } else {
      onGameStart(filteredPlayers);
    }
  };

  // --- STYLES ---

  const screenStyle: React.CSSProperties = {
    backgroundColor: '#2c3e50',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start', // Align to top
  };

  const headerStyle: React.CSSProperties = {
    width: '100%',
    padding: '2rem',
    textAlign: 'center',
    backgroundColor: '#34495e',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
    borderBottom: '4px solid #27ae60'
  };

  const titleStyle: React.CSSProperties = {
    fontFamily: "'Poppins', sans-serif",
    fontSize: '4rem',
    color: 'white',
    textShadow: '2px 2px 8px rgba(0,0,0,0.5)',
    margin: 0
  };

  const formStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    padding: '30px',
    backgroundColor: '#34495e',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
    marginTop: '40px',
    width: '100%',
    maxWidth: '400px'
  };

  const inputStyle: React.CSSProperties = {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc'
  };

  const buttonStyle: React.CSSProperties = {
    padding: '12px',
    fontSize: '1.2rem',
    color: 'white',
    backgroundColor: '#27ae60',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background-color 0.3s ease'
  };

  return (
    <div style={screenStyle}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>Trivial Didáctico</h1>
      </header>
      <main style={{padding: '20px'}}>
        <div style={formStyle}>
          <h2 style={{ color: 'white', textAlign: 'center', marginTop: 0, fontWeight: 300 }}>Configurar Jugadores</h2>
          {playerNames.map((name, index) => (
            <div key={index}>
              <label style={{ color: initialPlayers[index].color, display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                {`Jugador ${index + 1}`}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => handleNameChange(index, e.target.value)}
                style={inputStyle}
                placeholder={`Nombre del Jugador ${index + 1}`}
              />
            </div>
          ))}
          <button
            onClick={handleStartClick}
            style={buttonStyle}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2ecc71'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#27ae60'}
          >
            Empezar Juego
          </button>
        </div>
      </main>
    </div>
  );
};

export default SetupScreen;
