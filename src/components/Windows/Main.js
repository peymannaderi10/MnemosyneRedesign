import React, { useState } from 'react';
import { Rnd } from 'react-rnd';
import QuestionMode1 from './MainWindow/QuestionMode1';
import QuestionMode2 from './MainWindow/QuestionMode2';
import { FaStar, FaToggleOff, FaToggleOn } from 'react-icons/fa';

const questions = [
  {
    question: 'What is the capital of France?',
    answer: 'The capital of France is Paris.',
  },
  {
    question: 'What is the largest ocean in the world?',
    answer: 'The largest ocean in the world is the Pacific Ocean.',
  },
  {
    question: 'What is the smallest planet in our solar system?',
    answer: 'The smallest planet in our solar system is Mercury.',
  },
  {
    question: 'What is the tallest mammal in the world?',
    answer: 'The tallest mammal in the world is the giraffe.',
  },
  {
    question: 'What is the largest continent in the world?',
    answer: 'The largest continent in the world is Asia.',
  },
];

function Main({ id, onClose, zIndex, bringToFront }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [rating, setRating] = useState(0);
  const [questionMode, setQuestionMode] = useState('mode1');


  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const handleNextQuestion = () => {
    setShowAnswer(false);
    setRating(0);
    setCurrentQuestion((currentQuestion + 1) % questions.length);
  };

  const handleRating = (value) => {
    setRating(value);
  };

  return (
    <Rnd
      default={{ x: 50, y: 50, width: 500 }}
      bounds=".main-area"
      style={{ zIndex }}
      className="overflow-hidden rounded-lg shadow-lg flex flex-col bg-white"
      onDragStart={bringToFront}
      onMouseDown={bringToFront}
      enableResizing={false}
    >
     <div className="flex-none bg-indigo-700 flex items-center justify-between relative">
        <span className="text-white text-lg font-semibold ml-4"> Quiz Window</span>
        <div className="mr-2 flex flex-col items-end">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose(id);
            }}
            className="bg-red-500 hover:bg-red-600 h-4 w-4 rounded-full mb-1"
            aria-label="Close"
          ></button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuestionMode(questionMode === 'mode1' ? 'mode2' : 'mode1');
            }}
            className="text-white focus:outline-none"
            aria-label="Toggle Question Mode"
          >
            {questionMode === 'mode1' ? <FaToggleOn /> : <FaToggleOff />}
          </button>
        </div>
      </div>
      <div className="flex-grow flex">
        {/* Sidebar */}
        <div
          className={`${
            sidebarOpen ? 'w-1/4' : 'w-8'
          } bg-gray-100 p-4 transition-width duration-300 overflow-hidden`}
        >
          <button
            onClick={toggleSidebar}
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            {sidebarOpen ? '⬅️' : '➡️'}
          </button>
          {sidebarOpen && (
            <p className="mt-4 text-gray-800 font-medium">Sidebar Content</p>
          )}
        </div>
        {/* Main content area */}
        <div
          className={`${
            sidebarOpen ? 'w-3/4' : 'w-full'
          } p-4 flex flex-col bg-gray-50`}
        >
    {questionMode === 'mode1' ? (
          <QuestionMode1
            currentQuestion={currentQuestion}
            questions={questions}
            showAnswer={showAnswer}
            handleShowAnswer={handleShowAnswer}
            handleNextQuestion={handleNextQuestion}
          />
        ) : (
          <QuestionMode2
            currentQuestion={currentQuestion}
            questions={questions}
            handleShowAnswer={handleShowAnswer}
            handleNextQuestion={handleNextQuestion}
          />
        )}
         {/* Rate Preferomance Bar */}
         {showAnswer && (
        <div className="mt-4">
          <p className="text-sm font-semibold mb-2 text-gray-700">
            Rate your performance:
          </p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {[1, 2, 3, 4, 5].map((value) => (
              <FaStar
                key={value}
                color={value <= rating ? '#ffc107' : '#e2e8f0'}
                size={24}
                className="cursor-pointer"
                onClick={() => handleRating(value)}
              />
            ))}
          </div>
        </div>
      )}
          {/* Progress Bar */}
          <div className="h-3 bg-gray-300 rounded-full mt-4 overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all duration-300"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </Rnd>
  );
}

export default Main;