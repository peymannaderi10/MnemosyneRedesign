import React, { useState } from 'react';
import { Rnd } from 'react-rnd';
import QuestionMode1 from './MainWindow/QuestionMode1';
import QuestionMode2 from './MainWindow/QuestionMode2';
import { FaStar, FaToggleOff, FaToggleOn } from 'react-icons/fa';
import { FaPlus, FaEdit, FaTrash, FaBook, FaDoorOpen } from 'react-icons/fa';
import App from '../../App';
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
      {/* Sidebar */}
<div className="flex-grow flex">
  <div
    className={`${
      sidebarOpen ? 'w-fit' : 'w-16'
    } bg-gray-100 p-4 transition-width duration-300 flex flex-col justify-between`}
  >
    <div className="flex flex-col items-center">
      <button
        // onClick={toggleSidebar}
        className="text-gray-600 hover:text-gray-800 focus:outline-none mb-10"
      >
        {/* {sidebarOpen ? '⬅️' : '➡️'} */}

        <img src={require('./logoR.png')} height={10} width={40}/>
      </button>
      <div className="flex flex-col items-center space-y-8 mb-4">
        <div
          className="sidebar-link relative cursor-pointer"
          onMouseEnter={(e) => e.currentTarget.querySelector('span').classList.remove('hidden')}
          onMouseLeave={(e) => e.currentTarget.querySelector('span').classList.add('hidden')}
        >
          <div className="flex items-center bg-white rounded-full p-2 shadow-md">
            <FaPlus className="text-green-400" />
          </div>
          <span className="hidden absolute bottom-0 translate-y-full bg-gray-700 text-white text-xs px-2 py-1 rounded-md">
            Add Card
          </span>
        </div>
        <div
          className="sidebar-link relative cursor-pointer"
          onMouseEnter={(e) => e.currentTarget.querySelector('span').classList.remove('hidden')}
          onMouseLeave={(e) => e.currentTarget.querySelector('span').classList.add('hidden')}
        >
          <div className="flex items-center bg-white rounded-full p-2 shadow-md">
            <FaEdit className="text-yellow-500" />
          </div>
          <span className="hidden absolute bottom-0 translate-y-full bg-gray-700 text-white text-xs px-2 py-1 rounded-md">
            Edit Card
          </span>
        </div>
        <div
          className="sidebar-link relative cursor-pointer"
          onMouseEnter={(e) => e.currentTarget.querySelector('span').classList.remove('hidden')}
          onMouseLeave={(e) => e.currentTarget.querySelector('span').classList.add('hidden')}
        >
          <div className="flex items-center bg-white rounded-full p-2 shadow-md">
            <FaTrash className="text-red-500" />
          </div>
          <span className="hidden w-fit absolute bottom-0 translate-y-full bg-gray-700 text-white text-xs px-3 py-1 rounded-md">
            Delete Card
          </span>
        </div>
        <div
          className="sidebar-link relative cursor-pointer"
          onMouseEnter={(e) => e.currentTarget.querySelector('span').classList.remove('hidden')}
          onMouseLeave={(e) => e.currentTarget.querySelector('span').classList.add('hidden')}
        >
          <div className="flex items-center bg-white rounded-full p-2 shadow-md">
            <FaBook className="text-blue-500" />
          </div>
          <span className="hidden absolute bottom-0 translate-y-full bg-gray-700 text-white text-xs px-2 py-1 rounded-md">
            Browse Cards
          </span>
        </div>
      </div>
    </div>
    <div className="cursor-pointer sidebar-link flex items-center px-2 py-1 hover:bg-gray-200 rounded-md transition-colors duration-300">
      <div className="mr-4 bg-white rounded-full p-1">
        <FaDoorOpen className="text-black-500" />
      </div>
      <span className="text-gray-700 font-semibold">Exit</span>
    </div>
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