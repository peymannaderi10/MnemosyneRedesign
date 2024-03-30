import React, { useState } from 'react';
import { Rnd } from 'react-rnd';

function SelectCardType({ id, onClose, zIndex, bringToFront, onNext, card: initialCard }) { 
    const [localCard, setLocalCard] = useState(initialCard);

    const handleButtonClick = (typeValue) => {
        // Update the local state instead of directly modifying the prop
        setLocalCard({
            ...localCard,
            cardType: typeValue,
        });
        console.log(localCard);
    };
    
    const handleNextClick = () => {
        // Pass the locally updated card object to the parent component's onNext function
        onNext(localCard);
    };

    return (
        <Rnd
            default={{
                x: 0,
                y: 0,
                width: 500,
                height: 300,
            }}
            bounds=".main-area"
            style={{ zIndex }}
            className="overflow-hidden rounded-lg shadow-lg flex flex-col bg-white"
            onDragStart={bringToFront}
            onMouseDown={bringToFront}
            enableResizing={false}
        >
            <div className="flex-none bg-gray-700 p-2 flex items-center justify-between relative text-white">
                <span className="text-lg">Add cards</span>
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
            <label className="text-xl font-bold block mb-2">Choose A Card Type:</label>
            <div className="flex-grow p-4 overflow-auto flex items-center justify-center">
                <div className="flex justify-between items-center w-full max-w-md">
                    <button className={`w-32 h-32 rounded focus:outline-none focus:ring-2 ${
                        localCard.cardType === 'front-back' ? 'bg-blue-700' : 'bg-blue-500'
                    }`} onClick={() => handleButtonClick('front-back')}></button>
                    <button className={`w-32 h-32 rounded focus:outline-none focus:ring-2 ${
                        localCard.cardType === 'reversible' ? 'bg-green-700' : 'bg-green-500'
                    }`} onClick={() => handleButtonClick('reversible')}></button>
                    <button className={`w-32 h-32 rounded focus:outline-none focus:ring-2 ${
                        localCard.cardType === 'vocabulary' ? 'bg-yellow-700' : 'bg-yellow-500'
                    }`} onClick={() => handleButtonClick('vocabulary')}></button>
                </div>
            </div>
            <div className="flex justify-between mt-4">
                <button
                    className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-1 px-3 ml-2 rounded"
                    onClick={() => onClose(id)} // Assuming onClose can toggle visibility
                    >
                    Cancel
                </button>

                <button 
                    className={`font-bold py-1 px-3 mr-2 rounded ${
                        localCard.cardType ? 'bg-blue-500 hover:bg-blue-700 text-white' : 'bg-gray-400 text-gray-700 cursor-not-allowed'
                    }`}
                    onClick={handleNextClick}
                    disabled={!localCard.cardType}
                >
                    Next
                </button>
            </div>
        </Rnd>
    );
}

export default SelectCardType;
