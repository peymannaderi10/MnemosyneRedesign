import React from 'react';
import { Rnd } from 'react-rnd';

function Main({ id, onClose, zIndex, bringToFront }) {
    return (
        <Rnd
            default={{
                x: 50,
                y: 50,
                width: 500,
                height: 500,
            }}
            bounds=".main-area"
            style={{ zIndex }}
            className="overflow-hidden rounded-lg shadow-lg flex flex-col bg-white"
            onDragStart={bringToFront}
            onMouseDown={bringToFront}
            enableResizing={false} // Disable resizing functionality
        >
            <div className="flex-none bg-gray-700 p-2 flex items-center justify-center relative">
                <span className="text-white text-lg">MAIN WINDOW</span>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onClose(id);
                    }}
                    className="bg-red-500 h-3 w-3 rounded-full hover:bg-red-700 absolute right-2 top-2"
                    aria-label="Close"
                ></button>
            </div>
            <div className="flex-grow flex">
                {/* Sidebar */}
                <div className="w-1/4 bg-gray-200 p-4">
                    <p>Sidebar Content</p>
                </div>
                {/* Main content area */}
                <div className="w-3/4 p-4 flex flex-col">
                    {/* Question Section */}
                    <div className="flex-1 mb-4">
                        <label htmlFor="question" className="text-sm font-bold mb-2 block">Question</label>
                        <textarea id="question" className="w-full h-32 p-2 border rounded" placeholder="Type your question here"></textarea>
                    </div>
                    {/* Answer Section */}
                    <div className="flex-1">
                        <label htmlFor="answer" className="text-sm font-bold mb-2 block">Answer</label>
                        <textarea id="answer" className="w-full h-32 p-2 border rounded" placeholder="The answer will appear here"></textarea>
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Show answer
                    </button>
                </div>
            </div>
        </Rnd>
    );
}

export default Main;
