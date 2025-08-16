import React from 'react';

interface Player {
  name: string;
  color: string;
}

interface Category {
  id: number;
  nombre: string;
  color: string;
  preguntas: any[]; // Simplified for this component
}

interface InfoPanelProps {
  players: Player[];
  playersQuesitos: Record<string, boolean>[];
  categorias: Category[];
  currentPlayerIndex: number;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ players, playersQuesitos, categorias, currentPlayerIndex }) => {
  const panelStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    padding: '20px',
    backgroundColor: '#34495e',
    borderRadius: '10px',
    color: 'white',
    boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
    minWidth: '250px',
  };

  const playerEntryStyle: React.CSSProperties = {
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '5px',
    border: '1px solid transparent',
    transition: 'all 0.2s ease-in-out',
  };

  const currentPlayerStyle: React.CSSProperties = {
    border: '2px solid yellow',
    backgroundColor: '#2c3e50',
    fontWeight: 'bold',
  };

  const quesitoStyle: React.CSSProperties = {
    width: '15px',
    height: '15px',
    borderRadius: '50%',
    display: 'inline-block',
    margin: '0 3px',
    border: '1px solid rgba(255,255,255,0.5)',
  };

  const legendItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '5px',
  };

  return (
    <div style={panelStyle}>
      <h2>Marcador</h2>
      <div>
        {players.map((player, pIndex) => (
          <div
            key={pIndex}
            style={{
              ...playerEntryStyle,
              ...(pIndex === currentPlayerIndex ? currentPlayerStyle : {}),
            }}
          >
            <h3 style={{ color: player.color, margin: '0 0 5px 0' }}>{player.name}</h3>
            <div>
              {categorias.map((category) => {
                const hasQuesito = playersQuesitos[pIndex] && playersQuesitos[pIndex][category.nombre];
                return (
                  <span
                    key={category.id}
                    style={{
                      ...quesitoStyle,
                      backgroundColor: hasQuesito ? category.color : 'transparent',
                    }}
                    title={category.nombre}
                  ></span>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <h2>Categorías</h2>
      <div>
        {categorias.map((category) => (
          <div key={category.id} style={legendItemStyle}>
            <span
              style={{
                ...quesitoStyle,
                backgroundColor: category.color,
                marginRight: '10px',
              }}
            ></span>
            {category.nombre}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoPanel;
