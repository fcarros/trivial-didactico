import React, { useState } from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap';
import { Player, Question, CategoryName } from '../types/types';
import QuestionCard from './QuestionCard'; // Import QuestionCard

interface BoardProps {
  players: Player[];
  currentPlayerIndex: number;
  questions: Question[];
  onAnswerCorrect: (playerId: number, category: string) => void;
  onAnswerIncorrect: (playerId: number) => void;
  onNextTurn: () => void;
}

const Board: React.FC<BoardProps> = ({
  players,
  currentPlayerIndex,
  questions,
  onAnswerCorrect,
  onAnswerIncorrect,
  onNextTurn,
}) => {
  const currentPlayer = players[currentPlayerIndex];
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [showQuestion, setShowQuestion] = useState(false);

  const handleMove = () => {
    // For now, just increment position. Later, this will involve dice roll.
    // Need to update player position in App.tsx state.
    // For now, let's just trigger a question.

    // Find categories the current player hasn't completed
    const uncompletedCategories = Object.keys(currentPlayer.score).filter(
      (category) => !currentPlayer.score[category as CategoryName]
    ) as CategoryName[];

    if (uncompletedCategories.length > 0) {
      // Pick a random uncompleted category
      const randomCategory = uncompletedCategories[Math.floor(Math.random() * uncompletedCategories.length)];
      
      // Filter questions by the random category
      const categoryQuestions = questions.filter(q => q.category === randomCategory);

      if (categoryQuestions.length > 0) {
        // Pick a random question from that category
        const randomQuestion = categoryQuestions[Math.floor(Math.random() * categoryQuestions.length)];
        setCurrentQuestion(randomQuestion);
        setShowQuestion(true);
      } else {
        alert(`No hay preguntas disponibles para la categoría: ${randomCategory}`);
        onNextTurn(); // Move to next turn if no questions
      }
    } else {
      alert("¡Todas las categorías completadas! El juego ha terminado.");
      // Implement game end logic here
      onNextTurn(); // For now, just move to next turn
    }
  };

  const handleAnswer = (isCorrect: boolean) => {
    setShowQuestion(false);
    if (currentQuestion) {
      if (isCorrect) {
        onAnswerCorrect(currentPlayer.id, currentQuestion.category);
      } else {
        onAnswerIncorrect(currentPlayer.id);
      }
    }
    onNextTurn(); // Always move to next turn after answering
  };

  return (
    <Card className="p-4">
      <h2>Tablero de Juego</h2>
      <p>Turno de: <strong>{currentPlayer.name}</strong></p>
      <Row className="mt-3">
        <Col>
          {/* Placeholder for game board squares */}
          <div style={{ border: '1px solid black', minHeight: '200px', padding: '10px' }}>
            <p>Posición actual del jugador {currentPlayer.name}: {currentPlayer.position}</p>
          </div>
        </Col>
      </Row>
      {!showQuestion && (
        <Button onClick={handleMove} className="mt-3">Mover y Preguntar</Button>
      )}
      {showQuestion && currentQuestion && (
        <QuestionCard question={currentQuestion} onAnswer={handleAnswer} />
      )}
    </Card>
  );
};

export default Board;
