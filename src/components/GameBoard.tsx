import React, { useState, useEffect } from 'react';
import BoardSquare from './BoardSquare';
import Dice from './Dice';
import QuestionDisplay from './QuestionDisplay';
import InfoPanel from './InfoPanel'; // New import
import data from '../preguntas.json';

// --- TIPOS DE DATOS ---
interface Player {
  name: string;
  color: string;
}

interface Question {
  pregunta: string;
  opciones: string[];
  respuestaCorrecta: string;
}

interface Category {
  id: number;
  nombre: string;
  color: string;
  preguntas: Question[];
}

interface BoardSquareModel {
  id: number;
  type: 'center' | 'outer_ring' | 'quesito' | 'spoke';
  category: Category; // MODIFIED: Now holds the full category object
}

interface GameBoardProps {
  players: Player[];
}

// --- GENERACIÓN DEL TABLERO ---
const categoriesData = data.categorias;
const comodinCategory = categoriesData.find(c => c.nombre === 'Comodín') || categoriesData[0]; // Fallback to first category

const boardLayout: BoardSquareModel[] = [{ id: 0, type: 'center', category: comodinCategory }];
const outerRingSquares: BoardSquareModel[] = [];

for (let i = 1; i <= 42; i++) {
  const square: BoardSquareModel = {
    id: i,
    type: i % 7 === 0 ? 'quesito' : 'outer_ring',
    category: categoriesData[(i - 1) % categoriesData.length], // Assign full category object
  };
  boardLayout.push(square);
  outerRingSquares.push(square);
}

const quesitoSquareIds = [7, 14, 21, 28, 35, 42];
const spokeSquares: BoardSquareModel[] = [];
let currentSpokeId = 43;

quesitoSquareIds.forEach((quesitoId, quesitoIndex) => {
    // Spoke square 1
    spokeSquares.push({
        id: currentSpokeId++,
        type: 'spoke',
        category: categoriesData[(quesitoIndex * 2) % categoriesData.length] // Assign full category object
    });
    // Spoke square 2
    spokeSquares.push({
        id: currentSpokeId++,
        type: 'spoke',
        category: categoriesData[((quesitoIndex * 2) + 1) % categoriesData.length] // Assign full category object
    });
});

boardLayout.push(...spokeSquares);


const generateInitialPlayerPositions = (numPlayers: number): number[] => {
  return Array(numPlayers).fill(7);
};

const GameBoard: React.FC<GameBoardProps> = ({ players }) => {
  const getInitialQuesitos = () => {
    const initialQuesitos = data.categorias.reduce((acc, category) => {
      acc[category.nombre] = false;
      return acc;
    }, {} as Record<string, boolean>);
    return players.map(() => ({ ...initialQuesitos }));
  };

  // --- ESTADO DEL JUEGO ---
  const [playerPositions, setPlayerPositions] = useState(() => generateInitialPlayerPositions(players.length));
  const [playersQuesitos, setPlayersQuesitos] = useState<Record<string, boolean>[]>(() => getInitialQuesitos());
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [lastAnswerWasCorrect, setLastAnswerWasCorrect] = useState<boolean | null>(null);
  
  // --- ESTADO DE FIN DE JUEGO ---
  const [isGameOver, setIsGameOver] = useState(false);
  const [winner, setWinner] = useState<Player | null>(null);

  // --- ESTADO PARA LA SECUENCIA DE TURNO ---
  const [diceResult, setDiceResult] = useState<number | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<number[]>([]); // New state

  // --- LÓGICA DE VICTORIA Y REINICIO ---
  const checkWinCondition = () => {
    const playerHasAllQuesitos = Object.values(playersQuesitos[currentPlayerIndex]).every(q => q === true);
    const playerIsAtCenter = playerPositions[currentPlayerIndex] === 0;

    if (playerHasAllQuesitos && playerIsAtCenter) {
      setIsGameOver(true);
      setWinner(players[currentPlayerIndex]);
    }
  };

  const handlePlayAgain = () => {
    setPlayerPositions(generateInitialPlayerPositions(players.length));
    setPlayersQuesitos(getInitialQuesitos());
    setCurrentPlayerIndex(0);
    setCurrentQuestion(null);
    setCurrentCategory(null);
    setLastAnswerWasCorrect(null);
    setIsGameOver(false);
    setWinner(null);
  };

  // --- LÓGICA DEL JUEGO ---
  const handleDiceRoll = (roll: number) => {
    if (currentQuestion || possibleMoves.length > 0) return; // Evitar múltiples tiradas

    setDiceResult(roll); // Display dice result

    // Calculate possible moves after a short delay to show the dice result
    setTimeout(() => {
        const currentPosition = playerPositions[currentPlayerIndex];
        const moves: number[] = [];

        // If player has all quesitos, the only option is to move to the center (id 0)
        const playerHasAllQuesitos = Object.values(playersQuesitos[currentPlayerIndex]).every(q => q === true);
        if (playerHasAllQuesitos && currentPosition !== 0) {
            setPossibleMoves([0]); // Only option is center
            setDiceResult(null); // Hide dice result immediately after setting possible moves
            return; // Exit early as other moves are irrelevant
        }

        // Option 1: Move Forward on outer ring
        const forwardMove = (currentPosition - 1 + roll) % 42 + 1;
        moves.push(forwardMove);

        // Option 2: Move Backward on outer ring (ensure positive result)
        const backwardMove = (currentPosition - 1 - roll + 42) % 42 + 1;
        moves.push(backwardMove);

        // Option 3: Move towards spoke/center if on a quesito square
        const currentSquare = boardLayout.find(s => s.id === currentPosition);
        if (currentSquare && currentSquare.type === 'quesito') {
            const firstSpokeId = 43 + (quesitoSquareIds.indexOf(currentPosition) * 2);
            if (boardLayout.some(s => s.id === firstSpokeId && s.type === 'spoke')) {
                moves.push(firstSpokeId);
            }
        }
        
        setPossibleMoves(moves);
        setDiceResult(null); // Hide dice result after possible moves are calculated
    }, 1000); // Show dice for 1 second
  };

  const handleMoveSelection = (selectedSquareId: number) => {
    // Update player position
    const newPositions = [...playerPositions];
    newPositions[currentPlayerIndex] = selectedSquareId;
    setPlayerPositions(newPositions);

    // Clear possible moves
    setPossibleMoves([]);

    // Display question
    const currentSquare = boardLayout.find(s => s.id === selectedSquareId);
    if (!currentSquare) return;

    const currentCategory = currentSquare.category; // SIMPLIFIED

    if (currentCategory && currentCategory.preguntas.length > 0) {
        const randomIndex = Math.floor(Math.random() * currentCategory.preguntas.length);
        setCurrentQuestion(currentCategory.preguntas[randomIndex]);
    }
  };

  const handleAnswerResult = (isCorrect: boolean) => {
    setLastAnswerWasCorrect(isCorrect);
    if (isCorrect) {
      const currentSquare = boardLayout.find(s => s.id === playerPositions[currentPlayerIndex]);
      if (currentSquare && currentSquare.type === 'quesito') {
        const newQuesitos = [...playersQuesitos];
        newQuesitos[currentPlayerIndex][currentSquare.category.nombre] = true; // SIMPLIFIED
        setPlayersQuesitos(newQuesitos);
      }
      checkWinCondition(); // Comprobar si ha ganado
    }
  };

  const handleCloseQuestion = () => {
    const currentSquare = boardLayout.find(s => s.id === playerPositions[currentPlayerIndex]);

    if (lastAnswerWasCorrect && currentSquare && currentSquare.type === 'outer_ring') {
      // Player answered correctly on a normal square, they get to roll again.
      // We don't change the player index.
    } else {
      // Otherwise, it's the next player's turn.
      if (!isGameOver) {
        setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
      }
    }

    setCurrentQuestion(null);
    setCurrentCategory(null);
    setLastAnswerWasCorrect(null);
  };

  // REMOVED getCategoryByName function

  // --- ESTILOS ---
  const gameContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row', // Arrange side-by-side
    alignItems: 'flex-start', // Align items to the start of the cross axis
    justifyContent: 'center',
    padding: '20px',
    minHeight: '100vh',
    backgroundColor: '#2c3e50',
    textAlign: 'center',
    gap: '20px', // Add some space between InfoPanel and Board
  };

  const boardContainerStyle: React.CSSProperties = {
    position: 'relative',
    width: '600px',
    height: '600px',
    margin: '40px 0'
  };

  // --- RENDERIZADO ---
  if (isGameOver && winner) {
    return (
      <div style={gameContainerStyle}>
        <h1 style={{ color: 'white', fontSize: '3rem' }}>¡Enhorabuena, <span style={{color: winner.color}}>{winner.name}</span>!</h1>
        <h2 style={{ color: 'white' }}>Has ganado el juego.</h2>
        <button onClick={handlePlayAgain} style={{ padding: '15px 30px', fontSize: '1.5rem', marginTop: '30px', cursor: 'pointer', borderRadius: '10px', border: 'none' }}>
          Jugar de Nuevo
        </button>
      </div>
    );
  }

  return (
    <div style={gameContainerStyle}>
      {/* InfoPanel on the left */}
      <InfoPanel
        players={players}
        playersQuesitos={playersQuesitos}
        categorias={categoriesData} // Use direct data
        currentPlayerIndex={currentPlayerIndex}
      />

      {/* Main game board content on the right */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
          Turno de: <span style={{ color: players[currentPlayerIndex].color }}>{players[currentPlayerIndex].name}</span>
        </h2>
        
        {/* Muestra el resultado del dado */}
        {diceResult !== null && (
          <div style={{ fontSize: '5rem', color: 'white', textShadow: '3px 3px 6px rgba(0,0,0,0.7)', margin: '20px 0' }}>
            {diceResult}
          </div>
        )}

        <div style={boardContainerStyle}>
          {/* Renderizar el anillo de casillas */}
          {outerRingSquares.map((square, index) => {
            // REMOVED getCategoryByName and check
            const playersOnThisSquare = players.filter((p, playerIndex) => playerPositions[playerIndex] === square.id);

            const angle = (index / 42) * 360;
            const squareStyle: React.CSSProperties = {
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(250px) rotate(-${angle}deg)`,
            };

            return (
              <div key={square.id} style={squareStyle}>
                <BoardSquare
                  id={square.id}
                  type={square.type}
                  category={square.category} // SIMPLIFIED
                  playersOnThisSquare={playersOnThisSquare}
                  isPossibleMove={possibleMoves.includes(square.id)}
                  onSelectMove={handleMoveSelection}
                />
              </div>
            );
          })}

          {/* Render the center square */}
          {boardLayout.find(s => s.type === 'center') && (
              <div
                  key={boardLayout.find(s => s.type === 'center')!.id}
                  style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 2,
                  }}
              >
                  <BoardSquare
                    id={0}
                    type={'center'}
                    category={comodinCategory} // SIMPLIFIED
                    playersOnThisSquare={players.filter(p => playerPositions[players.indexOf(p)] === 0)}
                    isPossibleMove={possibleMoves.includes(0)}
                    onSelectMove={handleMoveSelection}
                  />
              </div>
          )}

          {/* Render spoke squares */}
          {spokeSquares.map((square, index) => {
              // REMOVED getCategoryByName and check
              // Determine which quesito this spoke belongs to
              const quesitoIndex = Math.floor(index / 2); // 2 spoke squares per quesito
              const quesitoId = quesitoSquareIds[quesitoIndex];
              const quesitoAngle = (outerRingSquares.findIndex(s => s.id === quesitoId) / 42) * 360;

              // Position along the spoke. First spoke square closer to quesito, second closer to center.
              const distanceFactor = (index % 2 === 0) ? 0.7 : 0.4; // Adjust these factors for visual spacing

              const spokeStyle: React.CSSProperties = {
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) rotate(${quesitoAngle}deg) translateY(${250 * distanceFactor}px) rotate(-${quesitoAngle}deg)`,
                  zIndex: 1,
              };

              const playersOnThisSquare = players.filter((p, playerIndex) => playerPositions[playerIndex] === square.id);

              return (
                  <div key={square.id} style={spokeStyle}>
                      <BoardSquare
                        id={square.id}
                        type={square.type}
                        category={square.category} // SIMPLIFIED
                        playersOnThisSquare={playersOnThisSquare}
                        isPossibleMove={possibleMoves.includes(square.id)}
                        onSelectMove={handleMoveSelection}
                      />
                  </div>
              );
          })}
        </div>

        <Dice onRoll={handleDiceRoll} disabled={!!currentQuestion || possibleMoves.length > 0} />
        
        {currentQuestion && (
          <QuestionDisplay 
            question={currentQuestion} 
            onClose={handleCloseQuestion} 
            onAnswerSubmit={handleAnswerResult} 
          />
        )}
      </div>
    </div>
    );
  };

export default GameBoard;
