import React, { useState } from 'react';
import { Rnd } from 'react-rnd';

function EditCard({ id, onClose, zIndex, bringToFront }) {
    const [selectedButton, setSelectedButton] = useState(null);
    const [tags, setTags] = useState(['tag1', 'tag2']); 
    const [isFrontBackSelected, frontBackSelected] = useState(false);
    const [isReversibleSelected, reversibileSelected] = useState(false);
    const [isVocabSelected, vocabSelected] = useState(false);
    const [difficulty, setDifficulty] = useState(-1); 
    const difficultyColors = ["#00FF00", "#95FF66", "#F7E379", "#FFC2A6", "#FF6B5E", "#FF0000"];
  
    const handleDifficultyClick = (level) => {
      setDifficulty(level);
    };

    const handleButtonClick = (buttonName) => {
        setSelectedButton(buttonName);
        frontBackSelected(buttonName === 'Front-Back');
        reversibileSelected(buttonName === 'Reversible');
        vocabSelected(buttonName === 'Vocab');
        console.log("card type: ", buttonName);
    };

    const handleAddTag = () => {
        const newTag = prompt('Enter a new tag:');
        if (newTag) {
            setTags([...tags, newTag]);
            console.log("Updated tags:", [...tags, newTag]);
        }
    };

    const handleDeleteTag = (tagToDelete) => {
        const newTags = tags.filter(tag => tag !== tagToDelete);
        setTags(newTags);
        console.log("Updated tags:", newTags);
    };

    return (
        <Rnd
            default={{
                x: 100,
                y: 100,
                width: 500,
                height: 600,
            }}
            bounds=".main-area"
            style={{ zIndex }}
            className="overflow-hidden rounded-lg shadow-lg flex flex-col bg-white"
            onDragStart={bringToFront}
            onMouseDown={bringToFront}
            enableResizing={false}
        >
            <div className="flex-none bg-gray-700 p-2 flex items-center justify-center relative text-white">
                <span className="text-lg">EDIT CARD</span>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onClose(id);
                    }}
                    className="bg-red-500 h-3 w-3 rounded-full hover:bg-red-700 absolute right-2 top-2"
                    aria-label="Close"
                ></button>
            </div>
            <div className="flex-grow p-4 flex flex-col">
                {/* Question input */}
                <div className="flex-1 mb-2">
                    <label htmlFor="question" className="text-sm font-bold mb-2 block text-left">Question:</label>
                    <textarea id="question" className="w-full h-1/3 p-2 border rounded" placeholder="Type the question here"></textarea>
                </div>
                {/* Answer input */}
                <div className="flex-1 mb-7">
                    <label htmlFor="answer" className="text-sm font-bold mb-2 block text-left">Answer:</label>
                    <textarea id="answer" className="w-full h-40 p-2 border rounded" placeholder="Type the answer here"></textarea>
                </div>
                
                {/* Card type and tags */}
                <div className="mb-4">
                    <div className="flex items-center mb-4">
                        <span className="text-sm font-bold mr-2">Card Type:</span>
                        <button
                            onClick={() => handleButtonClick('Front-back')}
                            className={`bg-${selectedButton === 'Front-back' ? 'red-500' : 'gray-200'} text-black px-2 py-1 rounded`}
                        >
                            Front-back
                        </button>
                        <button
                            onClick={() => handleButtonClick('Reversible')}
                            className={`bg-${selectedButton === 'Reversible' ? 'red-500' : 'gray-200'} text-black px-2 py-1 rounded ml-1`}
                        >
                            Reversible
                        </button>
                        <button
                            onClick={() => handleButtonClick('Vocab')}
                            className={`bg-${selectedButton === 'Vocab' ? 'red-500' : 'gray-200'} text-black px-2 py-1 rounded ml-1`}
                        >
                            Vocab
                        </button>
                    </div>
                    <div className="flex items-center mt-2">
                        <span className="text-sm font-bold mr-2">Tags:</span>
                        {tags.map(tag => (
                            <div key={tag} className="bg-gray-200 px-2 py-1 rounded flex items-center mr-2 hover:bg-gray-300">
                                <span className="text-sm mr-2" >{tag}</span>
                                <button onClick={() => handleDeleteTag(tag)} className="text-sm">✕</button>
                            </div>
                        ))}
                        <button onClick={handleAddTag} className="justify-center bg-blue-500 hover:bg-blue-600 text-white w-8 h-8 rounded-full">
                            +
                        </button>     
                    </div>
                </div>
                    <div className="flex items-center mb-4"> {/* This div will be a flex container */}
                    <span className="text-sm mr-2 font-bold">Difficulty Level:</span> {/* Added a right margin */}
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

            {/* Action buttons */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                    <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                        Cancel
                    </button>
                    <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                        OK
                    </button>
                </div>

            </div>
        </Rnd>
    );
}

export default EditCard;