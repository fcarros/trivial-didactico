import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { Question } from '../types/types';

interface QuestionCardProps {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedAnswer) {
      const isCorrect = selectedAnswer === question.correctAnswer;
      setAnswered(true);
      onAnswer(isCorrect);
    }
  };

  return (
    <Card className="p-4">
      <Card.Title>{question.category}</Card.Title>
      <Card.Text>{question.question}</Card.Text>
      <Form onSubmit={handleSubmit}>
        {question.options.map((option, index) => (
          <Form.Check
            key={index}
            type="radio"
            id={`option-${index}`}
            label={option}
            name="questionOptions"
            value={option}
            onChange={(e) => setSelectedAnswer(e.target.value)}
            disabled={answered}
          />
        ))}
        <Button type="submit" className="mt-3" disabled={!selectedAnswer || answered}>
          Responder
        </Button>
      </Form>
      {answered && (
        <div className="mt-3">
          {selectedAnswer === question.correctAnswer ? (
            <p className="text-success">¡Correcto!</p>
          ) : (
            <p className="text-danger">Incorrecto. La respuesta correcta era: {question.correctAnswer}</p>
          )}
        </div>
      )}
    </Card>
  );
};

export default QuestionCard;
