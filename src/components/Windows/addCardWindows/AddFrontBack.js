import React, { useState } from 'react';
import { Rnd } from 'react-rnd';

function AddFrontBack({ id, onClose, zIndex, bringToFront, onBack, card: initialCard }) {
  const [localCard, setLocalCard] = useState(initialCard);
  const [frontText, setFrontText] = useState('');
  const [backText, setBackText] = useState('');
  const [difficulty, setDifficulty] = useState(-1); 
  const difficultyColors = ["#00FF00", "#95FF66", "#F7E379", "#FFC2A6", "#FF6B5E", "#FF0000"];

  const handleDifficultyClick = (level) => {
    setDifficulty(level);
  };

  const handleAddCard = () => {
    const updatedCard = { ...localCard, front: frontText, back: backText, level: difficulty };
    setLocalCard(updatedCard);
    
   
    //saveCardToFile(updatedCard); // Save to file (this function needs to be implemented)

    console.log('Card Added', updatedCard);
  };

  const handlePreview = () => {   // Placeholder function for preview, to be implemented later

    console.log(localCard);
  };

  const isAddCardEnabled = frontText && backText && difficulty >= 0;

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
        <span className="text-lg">Add Front/Back</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose(id);
          }}
          className="bg-red-500 h-6 w-6 rounded-full hover:bg-red-700 absolute right-2 top-2 flex items-center justify-center"
          aria-label="Close"
        >✕</button>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-end">
          <label className="text-lg mb-2">Front:</label>
          <button onClick={handlePreview} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mb-2">
            Preview
          </button>
        </div>
        <textarea 
          value={frontText} 
          onChange={(e) => setFrontText(e.target.value)}
          className="border-2 border-gray-300 rounded py-2 px-3 text-black mb-4 w-full"
          style={{ height: '8em' }} // Increased height
        />
       <div className="flex justify-between items-end">
          <label className="text-lg mb-2" style={{ alignSelf: 'flex-start' }}>Back:</label>
        </div>
        <textarea 
          value={backText} 
          onChange={(e) => setBackText(e.target.value)}
          className="border-2 border-gray-300 rounded py-2 px-3 text-black mb-4 w-full"
          style={{ height: '8em' }} // Increased height
        />
        <div className="flex items-center mb-4"> {/* This div will be a flex container */}
          <label className="text-lg mr-2">Difficulty Level:</label> {/* Added a right margin */}
          <div className="flex">
            {difficultyColors.map((color, index) => (
              <button
                key={index}
                onClick={() => handleDifficultyClick(index)}
                style={{ backgroundColor: color }}
                className={`font-bold py-1 px-3 m-1 rounded ${
                  difficulty === index ? 'ring-2 ring-offset-1 ring-black' : ''
                }`}
              >
                {index}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-4 p-2">
        <button
          className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-1 px-3 rounded"
          onClick={onBack}
        >
          Back
        </button>
        <button 
          className={`font-bold py-1 px-3 rounded text-white ${isAddCardEnabled ? 'bg-green-500 hover:bg-green-700' : 'bg-gray-400'}`}
          onClick={handleAddCard}
          disabled={!isAddCardEnabled}
        >
          Add Card
        </button>
      </div>
    </Rnd>
  );
}

export default AddFrontBack;
