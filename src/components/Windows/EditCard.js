import React from 'react';
import { Rnd } from 'react-rnd';

function EditCard({ id, onClose, zIndex, bringToFront }) {
    return (
        <Rnd
            default={{
                x: 100,
                y: 100,
                width: 500,
                height: 500,
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
                {/* Card type and tags */}
                <div className="flex items-center mb-4">
                    <div className="flex items-center mr-4">
                        <span className="text-sm font-bold mr-2">card type:</span>
                        <button className="bg-gray-200 hover:bg-gray-300 text-black px-2 py-1 rounded">front-back</button>
                        <button className="bg-gray-200 hover:bg-gray-300 text-black px-2 py-1 rounded ml-1">Reversible</button>
                        <button className="bg-gray-200 hover:bg-gray-300 text-black px-2 py-1 rounded ml-1">vocab</button>
                    </div>
                    <div className="flex items-center">
                        <span className="text-sm font-bold mr-2">tags:</span>
                        <div className="bg-gray-200 px-2 py-1 rounded flex items-center mr-1">
                            <span className="text-sm mr-2">tag1</span>
                            <button className="text-sm">✕</button>
                        </div>
                        <div className="bg-gray-200 px-2 py-1 rounded flex items-center mr-2">
                            <span className="text-sm mr-2">tag2</span>
                            <button className="text-sm">✕</button>
                        </div>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white p-1 rounded-full text-lg">+</button>
                    </div>
                </div>
                {/* Question input */}
                <div className="flex-1 mb-2">
                    <label htmlFor="question" className="text-sm font-bold mb-2 block">Question:</label>
                    <textarea id="question" className="w-full h-1/3 p-2 border rounded" placeholder="Type the question here"></textarea>
                </div>
                {/* Answer input */}
                <div className="flex-1 mb-4">
                    <label htmlFor="answer" className="text-sm font-bold mb-2 block">Answer:</label>
                    <textarea id="answer" className="w-full h-1/3 p-2 border rounded" placeholder="Type the answer here"></textarea>
                </div>
                {/* Action buttons */}
                <div className="flex justify-end">
                    <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2">
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
