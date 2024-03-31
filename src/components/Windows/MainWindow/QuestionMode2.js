import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';

const QuestionMode2 = ({ currentQuestion, questions, handleNextQuestion, handleShowAnswer }) => {
    const [isFlipped, setIsFlipped] = useState(false);
  
    const handleFlip = () => {
      if (!isFlipped) {
        handleShowAnswer();
      }
      setIsFlipped(!isFlipped);
    };
  
    const handleNext = () => {
      setIsFlipped(false);
      handleNextQuestion();
    };
  
    return (
      <div className="flex flex-col items-center">
        <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
          <div
            className="bg-white shadow-md rounded-lg p-6 cursor-pointer"
            onClick={handleFlip}
          >
            <h2 className="text-lg font-bold mb-2">
              {questions[currentQuestion].question}
            </h2>
            <p className="text-gray-600">Click to reveal the answer</p>
          </div>
  
          <div
            className="bg-white shadow-md rounded-lg p-6 cursor-pointer"
            onClick={handleFlip}
          >
            <h2 className="text-lg font-bold mb-2">Answer</h2>
            <p className="text-gray-600">{questions[currentQuestion].answer}</p>
          </div>
        </ReactCardFlip>
  
        <button
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md shadow-sm transition duration-300 mt-4"
          onClick={handleNext}
        >
          Next question
        </button>
      </div>
    );
  };
  
  export default QuestionMode2;
  