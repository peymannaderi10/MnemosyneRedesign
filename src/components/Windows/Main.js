import React, { useState } from 'react';
import { Rnd } from 'react-rnd';
import QuestionMode1 from './MainWindow/QuestionMode1';
import QuestionMode2 from './MainWindow/QuestionMode2';
import { FaStar, FaToggleOff, FaToggleOn,FaChartBar } from 'react-icons/fa';
import { FaPlus, FaEdit, FaTrash, FaBook, FaDoorOpen } from 'react-icons/fa';
import AddCards from './addCardWindows/AddCards';
import Statistics from './Statistics';
import EditCard from './EditCard';
import BrowseCards from './BrowseCards';
import DeleteConfirmation from './MainWindow/deleteConfirm';


function MainQuiz({ id, onClose, zIndex, bringToFront }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [rating, setRating] = useState(0);
  const [questionMode, setQuestionMode] = useState('mode1');
  const [showAddCards, setShowAddCards] = useState(false);
  const [addCardsZIndex, setAddCardsZIndex] = useState(zIndex);
  const [showEditCard, setShowEditCard] = useState(false);
  const [editCardZIndex, setEditCardZIndex] = useState(zIndex);
  const [showBrowseCards, setShowBrowseCards] = useState(false);
  const [browseCardsZIndex, setBrowseCardsZIndex] = useState(zIndex);
  const [showStatistics, setShowStatistics] = useState(false);
  const [statisticsZIndex, setStatisticsZIndex] = useState(zIndex);
  const [deleteConfirmationZIndex, setDeleteConfirmationZIndex] = useState(zIndex + 1);
 
  const [questions, setQuestions] = useState([ {
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
]) 




const updateQuestions = (updatedQuestions) => {
  setQuestions(updatedQuestions);
};


const handleNewCard = (newCard) => {
  console.log(newCard);
  const { frontText, backText } = newCard;  
  const updatedCard = {
    question: frontText,
    answer: backText,
  };
  const updatedQuestions = [...questions, updatedCard];
  updateQuestions(updatedQuestions);
};
   
const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

const toggleDeleteConfirmation = () => {
  setShowDeleteConfirmation(!showDeleteConfirmation);
};


  const openAddCards = () => {
    setAddCardsZIndex(zIndex + 1); // Ensure the new window is on top
    setShowAddCards(true);
  };
  
  const closeAddCards = () => {
    setShowAddCards(false);
  };
  
  const openEditCard = () => {
    setEditCardZIndex(zIndex + 1); // Ensure the new window is on top
    setShowEditCard(true);
  };
  
  const closeEditCard = () => {
    setShowEditCard(false);
  };
  
  const openBrowseCards = () => {
    setBrowseCardsZIndex(zIndex + 1); // Ensure the new window is on top
    setShowBrowseCards(true);
  };
  
  const closeBrowseCards = () => {
    setShowBrowseCards(false);
  };

  const openStatistics = () => {
    setStatisticsZIndex(zIndex + 1); // Ensure the new window is on top
    setShowStatistics(true);
  };
  
  const closeStatistics = () => {
    setShowStatistics(false);
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
    <>
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
              // onClose(id);
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
          onClick={openAddCards}
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
          onClick={openEditCard}

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
  onClick={toggleDeleteConfirmation}
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
          onClick={openBrowseCards}
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
        
        <div
  className="sidebar-link relative cursor-pointer"
  onClick={openStatistics}
  onMouseEnter={(e) => e.currentTarget.querySelector('span').classList.remove('hidden')}
  onMouseLeave={(e) => e.currentTarget.querySelector('span').classList.add('hidden')}
>
  <div className="flex items-center bg-white rounded-full p-2 shadow-md">
    <FaChartBar className="text-purple-500" />
  </div>
  <span className="hidden absolute bottom-0 translate-y-full bg-gray-700 text-white text-xs px-2 py-1 rounded-md">
    Statistics
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
    {showDeleteConfirmation && (
      <DeleteConfirmation
  onConfirm={(currentQuestion) => {
    const updatedQuestions = questions.filter(
      (_, index) => index !== currentQuestion
    );
    updateQuestions(updatedQuestions);
    if (currentQuestion === questions.length - 1) {
      setCurrentQuestion(0);
    }
  }}
  onCancel={toggleDeleteConfirmation}
  currentQuestion={currentQuestion}
  zIndex={deleteConfirmationZIndex}
  bringToFront={() => setDeleteConfirmationZIndex(deleteConfirmationZIndex + 1)}
/>
)}
    {showAddCards && (
  <AddCards
    id={new Date().getTime()}
    onClose={closeAddCards}
    zIndex={addCardsZIndex}
    bringToFront={() => setAddCardsZIndex(addCardsZIndex + 1)}
    onNewCard={handleNewCard}

  />
)}
{showEditCard && (
  <EditCard
    id={new Date().getTime()}
    onClose={closeEditCard}
    zIndex={editCardZIndex}
    bringToFront={() => setEditCardZIndex(editCardZIndex + 1)}
    questions={questions}
    updateQuestions={updateQuestions}
    currentQuestion={currentQuestion}
  />
)}
{showStatistics && (
  <Statistics
    id={new Date().getTime()}
    onClose={closeStatistics}
    zIndex={statisticsZIndex}
    bringToFront={() => setStatisticsZIndex(statisticsZIndex + 1)}
  />
)}
{showBrowseCards && (
  <BrowseCards
    id={new Date().getTime()}
    onClose={closeBrowseCards}
    zIndex={browseCardsZIndex}
    bringToFront={() => setBrowseCardsZIndex(browseCardsZIndex + 1)}
  />
)}

    </>
    
  );
}

export default MainQuiz;