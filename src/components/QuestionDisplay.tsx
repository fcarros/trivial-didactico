import React, { useState } from 'react';

interface Question {
  pregunta: string;
  opciones: string[];
  respuestaCorrecta: string;
}

interface QuestionDisplayProps {
  question: Question;
  onClose: () => void;
  onAnswerSubmit: (isCorrect: boolean) => void;
  categoryColor?: string;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({ question, onClose, onAnswerSubmit, categoryColor }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleAnswerClick = (option: string) => {
    if (selectedAnswer) return; // Do nothing if an answer is already selected
    setSelectedAnswer(option);

    const isCorrect = option === question.respuestaCorrecta;
    onAnswerSubmit(isCorrect);
  };

  const getOptionStyle = (option: string): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      padding: '12px',
      fontSize: '1em',
      border: '1px solid #ccc',
      borderRadius: '5px',
      cursor: selectedAnswer ? 'default' : 'pointer',
      transition: 'background-color 0.3s ease',
    };

    if (!selectedAnswer) {
      return baseStyle;
    }

    const isCorrect = option === question.respuestaCorrecta;
    const isSelected = option === selectedAnswer;

    if (isCorrect) {
      return { ...baseStyle, backgroundColor: '#90ee90', color: 'black', fontWeight: 'bold' }; // Light Green
    }

    if (isSelected && !isCorrect) {
      return { ...baseStyle, backgroundColor: '#f08080', color: 'white' }; // Light Coral (Red)
    }

    return { ...baseStyle, backgroundColor: '#f0f0f0', color: '#888' }; // Disabled/unselected style
  };

  const modalOverlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  };

  const modalContentStyle: React.CSSProperties = {
    backgroundColor: categoryColor || 'white',
    padding: '30px',
    borderRadius: '10px',
    width: '90%',
    maxWidth: '500px',
    textAlign: 'center',
    boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
  };

  const questionTextStyle: React.CSSProperties = {
    marginBottom: '20px',
    fontSize: '1.5em',
    fontWeight: 'bold',
    color: '#333'
  };

  const optionsContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '20px',
  };

  const closeButtonStyle: React.CSSProperties = {
    padding: '10px 20px',
    fontSize: '1em',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#1e90ff',
    color: 'white',
    cursor: 'pointer',
    marginTop: '20px'
  };

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        <h2 style={questionTextStyle}>{question.pregunta}</h2>
        <div style={optionsContainerStyle}>
          {question.opciones.map((opcion, index) => (
            <button 
              key={index} 
              style={getOptionStyle(opcion)}
              onClick={() => handleAnswerClick(opcion)}
              disabled={selectedAnswer !== null}
            >
              {opcion}
            </button>
          ))}
        </div>
        {selectedAnswer && (
          <button onClick={onClose} style={closeButtonStyle}>Continuar</button>
        )}
      </div>
    </div>
  );
};

export default QuestionDisplay;