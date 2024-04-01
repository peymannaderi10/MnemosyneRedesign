import React, { useState } from 'react';
import { Rnd } from 'react-rnd';
import frontBackImage from './front-back.png';
import reversibleImage from './reversible.png';
import vocabImage from './dictionary.png';


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
                <button 
                    className={`w-32 h-32 rounded flex flex-col items-center justify-center focus:outline-none focus:ring-2 ${
                        localCard.cardType === 'front-back' ? 'bg-blue-600 shadow-2xl' : 'bg-blue-400 hover:shadow-2xl'
                    }`} 
                    onClick={() => handleButtonClick('front-back')}
                >
                    <img src={frontBackImage} alt="Front-Back" style={{ maxWidth: '80%', maxHeight: '60%' }} />
                    <span className="text-white text mt-2">Front to Back</span>
                </button>
                    <button className={`w-32 h-32 rounded flex flex-col items-center justify-center focus:outline-none focus:ring-2 hover:shadow-2xl ${
                        localCard.cardType === 'reversible' ? 'bg-green-600 shadow-2xl' : 'bg-green-400 hover:shadow-2xl'
                    }`} onClick={() => handleButtonClick('reversible')}>

                    <img src={reversibleImage} alt="Front-Back" style={{ maxWidth: '80%', maxHeight: '60%' }} />
                    <span className="text-white text mt-2">Reversible</span>
                    </button>
                    <button className={`w-32 h-32 rounded flex flex-col items-center justify-center focus:outline-none focus:ring-2 hover:shadow-2xl ${
                        localCard.cardType === 'vocabulary' ? 'bg-yellow-600 shadow-2xl' : 'bg-yellow-400 hover:shadow-2xl'
                    }`} onClick={() => handleButtonClick('vocabulary')}>

                    <img src={vocabImage} alt="Front-Back" style={{ maxWidth: '80%', maxHeight: '60%' }} />
                    <span className="text-white text mt-2">Vocabulary</span>
                    </button>
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
