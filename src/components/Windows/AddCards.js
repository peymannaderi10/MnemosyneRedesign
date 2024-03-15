import React from 'react';
import { Rnd } from 'react-rnd';

function AddCards({ id, onClose, zIndex, bringToFront }) {
    return (
        <Rnd
            default={{
                x: 0,
                y: 0,
                width: 600,
                height: 700,
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
                    className="bg-red-500 h-3 w-3 rounded-full hover:bg-red-700 absolute right-2 top-2"
                    aria-label="Close"
                ></button>
            </div>
            <div className="p-4 flex-grow overflow-auto">
                {/* Card Type */}
                <div className="mb-4">
                    <label htmlFor="card-type" className="text-sm font-bold block mb-2">Card type:</label>
                    <select id="card-type" className="w-full border p-2 rounded">
                        <option>Front-to-back only</option>
                        {/* Other options */}
                    </select>
                </div>
                {/* Tags */}
                <div className="mb-4">
                    <label htmlFor="tags" className="text-sm font-bold block mb-2">Tags:</label>
                    <input type="text" id="tags" className="w-full border p-2 rounded" placeholder="Enter tags" />
                </div>
                {/* Front */}
                <div className="mb-4">
                    <label htmlFor="front" className="text-sm font-bold block mb-2">Front:</label>
                    <textarea id="front" className="w-full border p-2 rounded h-24" placeholder="Front content"></textarea>
                </div>
                {/* Back */}
                <div className="mb-4">
                    <label htmlFor="back" className="text-sm font-bold block mb-2">Back:</label>
                    <textarea id="back" className="w-full border p-2 rounded h-24" placeholder="Back content"></textarea>
                </div>
                {/* Initial Grade */}
                <div className="mb-4">
                    <label className="text-sm font-bold block mb-2">Select initial grade:</label>
                    <div className="flex gap-2">
                        <button className="border p-1 rounded">Yet to learn</button>
                        {/* Number buttons */}
                        {[2, 3, 4, 5].map((num) => (
                            <button key={num} className="border p-1 rounded">{num}</button>
                        ))}
                    </div>
                </div>
                {/* Action Buttons */}
                <div className="flex justify-between mt-4">
                    <button className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded">
                        Preview
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Exit
                    </button>
                </div>
            </div>
        </Rnd>
    );
}

export default AddCards;
