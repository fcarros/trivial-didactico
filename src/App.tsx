import React, { useState } from 'react';
import GameBoard from './components/GameBoard';
import SetupScreen from './components/SetupScreen';
import './App.css';

// Definimos el tipo Player para consistencia
interface Player {
  name: string;
  color: string;
}

function App() {
  // El juego no ha empezado por defecto
  const [gameStarted, setGameStarted] = useState(false);
  // La lista de jugadores empieza vacía
  const [players, setPlayers] = useState<Player[]>([]);

  // Esta función se pasa a SetupScreen y se llama cuando el usuario hace clic en "Empezar Juego"
  const handleGameStart = (configuredPlayers: Player[]) => {
    setPlayers(configuredPlayers); // Guardamos los jugadores configurados
    setGameStarted(true); // Marcamos que el juego ha comenzado
  };

  return (
    <div className="App">
      <main className="App-main">
        {!gameStarted ? (
          // Si el juego no ha empezado, muestra la pantalla de configuración
          <SetupScreen onGameStart={handleGameStart} />
        ) : (
          // Si el juego ha empezado, muestra el tablero y pásale los jugadores
          <GameBoard players={players} />
        )}
      </main>
    </div>
  );
}

export default App;