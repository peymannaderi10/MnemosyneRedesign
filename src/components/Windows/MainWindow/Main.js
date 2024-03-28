import React, { useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import Flashcard from './Flashcard';
import leftArrow from './Left Arrow.png';
import rightArrow from './Right Arrow.png';

function Main({ id, onClose, zIndex, bringToFront }) {
    const [flashcards] = useState([
        {frontContent: "Front Content 1", backContent: "Back Content 1"},
        {frontContent: "Front Content 2", backContent: "Back Content 2"},
        {frontContent: "Front Content 3", backContent: "Back Content 3"}
    ]);

    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    const handlePrevCard = () => {
        if (isFlipped === false) {
            if (currentCardIndex === 0) {
                setCurrentCardIndex(flashcards.length - 1);
            } else {
                setCurrentCardIndex(currentCardIndex - 1);
            }
        } else {
            setIsFlipped(false);
            setTimeout(() => {
                if (currentCardIndex === 0) {
                    setCurrentCardIndex(flashcards.length - 1);
                } else {
                    setCurrentCardIndex(currentCardIndex - 1);
                }
            }, 600);
        }
    }

    const handleNextCard = () => {
        if (isFlipped === false) {
            setCurrentCardIndex((currentCardIndex + 1) % flashcards.length);
        } else {
            setIsFlipped(false);
            setTimeout(() => {
                setCurrentCardIndex((currentCardIndex + 1) % flashcards.length);
            }, 600);
        }
    };

    useEffect(() => {
        setIsFlipped(false);
    }, [currentCardIndex]);

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
                <span className="text-white text-lg">Study Deck</span>
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
                {/* Main content area */}
                <div className="w-full p-4 flex flex-col">
                    <Flashcard frontContent={flashcards[currentCardIndex].frontContent} backContent={flashcards[currentCardIndex].backContent} isFlipped={isFlipped} setIsFlipped={setIsFlipped} />
                </div>
            </div>
            <div className='flex-grow flex p-4'>
                <div className='window-button transition ease-in-out bg-gray-300 hover:bg-gray-500 rounded shadow-lg w-1/4 duration-300'>
                    <button className='w-full h-full' onClick={handlePrevCard}>
                        <img src={leftArrow} alt='leftArrow' className='object-scale-down h-12 w-24 m-auto'></img>
                    </button>
                </div>
                <div className='m-auto'>
                    <div>{`${currentCardIndex + 1}/${flashcards.length}`}</div>
                </div>
                <div className='window-button transition ease-in-out bg-gray-300 hover:bg-gray-500 rounded shadow-lg w-1/4 duration-300'>
                    <button className='w-full h-full' onClick={handleNextCard}>
                        <img src={rightArrow} alt='rightArrow' className='object-scale-down h-12 w-24 m-auto'></img>
                    </button>
                </div>
            </div>
        </Rnd>
    );
}

export default Main;
