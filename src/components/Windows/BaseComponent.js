// USE THIS TO CREATE YOUR OWN CUSTOMIZABLE WINDOW COMPONENTS
// JUST COPY AND PASTE THIS FILE AND RENAME IT TO YOUR COMPONENT NAME
// THEN IMPORT inside your commpnent 
import React from 'react';
import { Rnd } from 'react-rnd';

const BaseComponent = ({ id, onClose, zIndex, bringToFront, title, children }) => {
    return (
        <Rnd
            default={{
                x: 100,
                y: 100,
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
            <div className="flex-none bg-gray-700 p-1 flex items-center justify-center relative text-white">
                <span className="text-m"> BaseComponents </span>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onClose(id);
                    }}
                    className="bg-red-500 h-3 w-3 rounded-full hover:bg-red-700 absolute right-2 top-2"
                    aria-label="Close"
                ></button>
            </div>
            <div className="flex-grow overflow-auto">
                {children}
            </div>
        </Rnd>
    );
};

export default BaseComponent;

