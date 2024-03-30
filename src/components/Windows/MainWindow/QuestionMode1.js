import React from 'react';
import { FaStar } from 'react-icons/fa';

const QuestionMode1 = ({
  currentQuestion,
  questions,
  showAnswer,
  handleShowAnswer,
  handleNextQuestion,

}) => {
  return (
    <>
      {/* Question Section */}
      <div className="flex-1 mb-4 text-center">
        <label htmlFor="question" className="text-sm font-semibold mb-2 block text-gray-700">
          Question
        </label>
        <textarea
          id="question"
          className="  text-center w-full h-32 p-2 border rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold"
          value={questions[currentQuestion].question}
          readOnly
        ></textarea>
      </div>

      {/* Answer Section */}
      <div className="flex-1 mb-4 text-center	">
        <label htmlFor="answer" className="text-sm font-semibold mb-2 block text-gray-700">
          Answer
        </label>
        <textarea
          id="answer"
          className=" text-center w-full h-32 p-2 border rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold"
          value={showAnswer ? questions[currentQuestion].answer : ''}
          readOnly
        ></textarea>
      </div>

      <div className="flex justify-between">
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md shadow-sm transition duration-300"
          onClick={handleShowAnswer}
        >
          Show answer
        </button>
        <button
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md shadow-sm transition duration-300"
          onClick={handleNextQuestion}
        >
          Next question
        </button>
      </div>
    </>
  );
};

export default QuestionMode1;
