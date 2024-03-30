import React, { useState } from 'react';
import { Rnd } from 'react-rnd';

function SelectTopic({ id, onClose, zIndex, bringToFront, onNext, onBack, card: initialCard }) {
  const [localCard, setLocalCard] = useState(initialCard);
  const [topics, setTopics] = useState(["Math", "Science", "CompSci", "Biology", "Physics","EarthSci", "Psych", "History", "Kin2021", "CS4474"]); // REPLACE with JSON import
  const [selectedTopics, setSelectedTopics] = useState(initialCard.Topics || []);
  const [newTopic, setNewTopic] = useState('');
  const [showInput, setShowInput] = useState(false);


  
  const handleTopicClick = (topic) => {
    const index = selectedTopics.indexOf(topic);
    let newSelectedTopics = [...selectedTopics];
  
    if (index > -1) {
      newSelectedTopics.splice(index, 1);
    } else {
      newSelectedTopics.push(topic);
    }
  
    setSelectedTopics(newSelectedTopics);
    setLocalCard({ ...localCard, Topics: newSelectedTopics });
    console.log(localCard);
  };
  
  const handleNewTopic = () => {
    setShowInput(true);
  };

  const handleNewTopicChange = (e) => {
    setNewTopic(e.target.value);
  };

  const handleNewTopicSubmit = () => {
    if (newTopic.trim()) {
      setTopics([...topics, newTopic]);
      handleTopicClick(newTopic);
      setNewTopic('');
      setShowInput(false);
    }
  };

  const handleNextClick = () => {
    onNext(localCard);
  };

  return (
    <Rnd
      bounds=".main-area"
      style={{ zIndex }}
      className="overflow-hidden rounded-lg shadow-lg flex flex-col bg-white"
      onDragStart={bringToFront}
      onMouseDown={bringToFront}
      enableResizing={false}
    >
      <div className="flex-none bg-gray-700 p-2 flex items-center justify-between text-white">
        <span className="text-lg">Add/Select Topic</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose(id);
          }}
          className="bg-red-500 h-6 w-6 rounded-full hover:bg-red-700 absolute right-2 top-2 flex items-center justify-center"
          aria-label="Close"
        >
          ✕
        </button>
      </div>
      <div className="flex-grow p-4 overflow-auto grid grid-cols-3 gap-2 content-start">
      {topics.map((topic, index) => (
          <button 
            key={index} 
            onClick={() => handleTopicClick(topic)}
            className={`w-full font-bold py-2 px-4 rounded focus:outline-none ${
              selectedTopics.includes(topic) ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-blue-400 hover:bg-blue-600'
            } text-white`}
          >
            {topic}
          </button>
        ))}
        <button onClick={handleNewTopic} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          + new
        </button>
        {showInput && (
          <div className="col-span-3">
            <input
              type="text"
              value={newTopic}
              onChange={handleNewTopicChange}
              placeholder="Enter custom topic"
              className="border-2 border-gray-300 rounded py-1 px-2 text-black mb-2 w-full"
            />
            <button onClick={handleNewTopicSubmit} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">
              Add
            </button>
          </div>
        )}
      </div>
      <div className="flex justify-between mt-4 p-2">
        <button
          className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-1 px-3 rounded"
          onClick={() => onBack()} // Directly call onBack here
        >
          Back
        </button>
        <button 
          className={`font-bold py-1 px-3 rounded ${
            localCard.Topic ? 'bg-blue-500 hover:bg-blue-700 text-white' : 'bg-gray-400 text-gray-700 cursor-not-allowed'
          }`}
          onClick={handleNextClick}
          disabled={!localCard.Topic}
        >
          Continue
        </button>
      </div>
    </Rnd>
  );
}

export default SelectTopic;
