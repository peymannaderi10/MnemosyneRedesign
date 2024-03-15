import React from 'react';
import { Rnd } from 'react-rnd';

function BrowseCards({ id, onClose, zIndex, bringToFront }) {
    return (
        <Rnd
            default={{
                x: 100,
                y: 100,
                width: 700,
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
                <span className="text-lg">Browse cards</span>
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
                <div className="w-1/5 bg-gray-200 p-4 space-y-4">
                    <div className="text-lg">Categories</div>
                    {/* Replace below with dynamic category list */}
                    <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        <span>Science</span>
                    </div>
                    {/* Other categories */}
                </div>
                {/* Main content area */}
                <div className="w-4/5 p-4">
                    <div className="flex justify-between mb-4">
                        <div className="flex border rounded overflow-hidden w-1/2">
                            <input type="search" className="p-2" placeholder="Search..." />
                            <button className="bg-gray-300 px-4 hover:bg-gray-400">Search</button>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        {/* Replace below with dynamic card list */}
                        <div className="border p-4 relative">
                            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-500"></div>
                            {/* Card Content */}
                        </div>
                        {/* Other cards */}
                    </div>
                    <div className="flex justify-end space-x-2 mt-4">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Edit
                        </button>
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </Rnd>
    );
}

export default BrowseCards;
