import React from 'react';
import { Rnd } from 'react-rnd';

function Statistics({ id, onClose, zIndex, bringToFront }) {
    return (
        <Rnd
            default={{
                x: 150,
                y: 150,
                width: 600,
                height: 500,
            }}
            bounds=".main-area"
            style={{ zIndex }}
            className="overflow-hidden rounded-lg shadow-lg flex flex-col bg-white"
            onDragStart={bringToFront}
            onMouseDown={bringToFront}
            enableResizing={false}
        >
            <div className="flex-none bg-gray-700 p-2 flex items-center justify-between relative text-white">
                <span className="text-lg">Statistics</span>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onClose(id);
                    }}
                    className="bg-red-500 h-3 w-3 rounded-full hover:bg-red-700 absolute right-2 top-2"
                    aria-label="Close"
                ></button>
            </div>
            <div className="bg-gray-200 p-2 flex justify-between text-sm">
                <button className="font-semibold">Highest Level</button>
                <button className="hover:text-blue-500">Grades</button>
                <button className="hover:text-blue-500">Cards Added</button>
                <button className="hover:text-blue-500">Highest Level</button>
            </div>
            <div className="flex-grow p-4">
                <h3 className="text-center text-lg font-bold mb-4">Highest Level Cleared</h3>
                {/* Placeholder for chart */}
                <div className="w-full bg-blue-500 h-64 rounded-lg shadow-inner p-4 flex justify-around items-end">
                    {/* Mockup bars for the chart */}
                    <div className="w-1/12 bg-purple-700 h-1/4"></div>
                    <div className="w-1/12 bg-purple-700 h-1/3"></div>
                    <div className="w-1/12 bg-purple-700 h-2/5"></div>
                    <div className="w-1/12 bg-purple-700 h-3/5"></div>
                    <div className="w-1/12 bg-purple-700 h-1/2"></div>
                    <div className="w-1/12 bg-purple-700 h-3/4"></div>
                    <div className="w-1/12 bg-purple-700 h-5/6"></div>
                </div>
                <div className="flex justify-center mt-4">
                    <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                        OK
                    </button>
                </div>
            </div>
        </Rnd>
    );
}

export default Statistics;
