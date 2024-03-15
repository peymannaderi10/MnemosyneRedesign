import React, { useState } from 'react';
import { Rnd } from 'react-rnd';
import BaseComponent from './BaseComponent'; // Ensure this import path is correct

function Main({ id, onClose, zIndex, bringToFront }) {
    const [showBaseComponent, setShowBaseComponent] = useState(false);
    const [baseComponentZIndex, setBaseComponentZIndex] = useState(zIndex);

    const openBaseComponent = () => {
        setBaseComponentZIndex(zIndex + 1); // Ensure the new window is on top
        setShowBaseComponent(true);
    };

    const closeBaseComponent = () => {
        setShowBaseComponent(false);
    };

    return (
        <>
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
                <span className="text-white text-lg">Example MULTIN WINDOW :)</span>
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
   
                   <button
                className="absolute left-20 m-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={openBaseComponent}
            >
                Open New Window
            </button>
                
            </div>
        </Rnd>
            {showBaseComponent && (
                <BaseComponent
                    id={new Date().getTime()} // Create a unique ID for the new window
                    onClose={closeBaseComponent}
                    zIndex={baseComponentZIndex}
                    bringToFront={() => setBaseComponentZIndex(baseComponentZIndex + 1)}
                    title="New Window"
                >
                    {/* Content of the new BaseComponent */}
                    <div>Your new BaseComponent content here</div>
                </BaseComponent>
            )}
           
        </>
    );
}

export default Main;
