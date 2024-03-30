import React, { useState } from 'react';
import { Rnd } from 'react-rnd';

const options = ["phrase", "pronunciation", "meaning", "notes", "none"];

function AddCorrespondence({ id, onClose, zIndex, bringToFront, onBack, onNext, card: initialCard }) {
  const [localCard, setLocalCard] = useState(initialCard);
  const [correspondence, setCorrespondence] = useState(localCard.Correspondence || ["", ""]);

  const handleOptionClick = (option, index) => {
    const newCorrespondence = [...correspondence];
    newCorrespondence[index] = option;
    setCorrespondence(newCorrespondence);
    setLocalCard({ ...localCard, Correspondence: newCorrespondence });
    console.log(localCard);
  };

  const handleNextClick = () => {
    onNext({ ...localCard, Correspondence: correspondence });
  };

  const handleBackClick = () => {
    // Reset the local correspondence state
    setCorrespondence(["", ""]);
    // Call onBack with the reset correspondence
    onBack({ ...localCard, Correspondence: ["", ""] });
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
        <span className="text-lg">Add Correspondence</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose(id);
          }}
          className="bg-red-500 h-6 w-6 rounded-full hover:bg-red-700 absolute right-2 top-2 flex items-center justify-center"
          aria-label="Close"
        >✕</button>
      </div>
      <div className="flex-grow p-4 overflow-auto">
        <div className="mb-4">
          <span className="text-lg mb-2">Front:</span>
          <div className="grid grid-cols-3 gap-2"> {/* Use grid layout */}
            {options.map((option, idx) => (
              <button
                key={`front-${idx}`}
                onClick={() => handleOptionClick(option, 0)}
                className={`font-bold py-2 px-4 rounded focus:outline-none ${
                  correspondence[0] === option ? 'bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                } text-white`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <div>
          <span className="text-lg mb-2">Back:</span>
          <div className="grid grid-cols-3 gap-2"> {/* Use grid layout */}
            {options.map((option, idx) => (
              <button
                key={`back-${idx}`}
                onClick={() => handleOptionClick(option, 1)}
                className={`font-bold py-2 px-4 rounded focus:outline-none ${
                  correspondence[1] === option ? 'bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                } text-white`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-4 p-2">
        <button
          className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-1 px-3 rounded"
          onClick={handleBackClick}
        >
          Back
        </button>
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
          onClick={handleNextClick}
        >
          Continue
        </button>
      </div>
    </Rnd>
  );
}

export default AddCorrespondence;
