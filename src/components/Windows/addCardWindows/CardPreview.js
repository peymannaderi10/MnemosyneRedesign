import React, { useState, useRef, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import ReactCardFlip from 'react-card-flip';

const CardPreview = ({ onClose, zIndex, frontText, backText, width }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [height, setHeight] = useState('auto');
    const cardRef = useRef(null);

    useEffect(() => {
        if (cardRef.current) {
            setHeight(cardRef.current.offsetHeight);
        }
    }, [frontText, backText]); // Recalculate height if text changes

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const cardStyle = {
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        borderRadius: '10px',
        margin: '16px',
        cursor:'pointer',
    };

    const cardHoverStyle = {
        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.4)', // More prominent shadow effect
        transition: 'box-shadow 0.3s ease-in-out', // Smooth transition for the shadow
    };

    return (
        <Rnd
            default={{
                x: (window.innerWidth - (width || 320)) / 2, // Use provided width or default
                y: (window.innerHeight - height) / 2,
                width: width || 320, // Use provided width or default
                height: height,
            }}
            bounds="window"
            style={{ zIndex }}
            className="rounded-lg shadow-lg overflow-hidden"
            enableResizing={false}
        >
            <div className="flex flex-col items-center justify-center bg-white rounded-lg">
                <div className="text-2xl font-bold mb-4 p-2 bg-gray-100 w-full text-center">
                    Card Preview
                </div>
                <div ref={cardRef} className="p-4">
                    <div className="text-lg font-semibold mb-2">
                        {isFlipped ? 'Back' : 'Front'}
                    </div>
                    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
                        <div
                            style={{ ...cardStyle, ...cardHoverStyle }} // Merge styles for hover effect
                            onMouseOver={e => e.currentTarget.style.boxShadow = cardHoverStyle.boxShadow} // Apply hover style
                            onMouseOut={e => e.currentTarget.style.boxShadow = cardStyle.boxShadow} // Revert to original style
                            onClick={handleFlip}
                        >
                            <p className="p-2">{frontText || "Front text not available"}</p>
                            <h2 className="text-lg font-bold mb-2">⭮</h2>
                        </div>
                        <div
                            style={{ ...cardStyle, ...cardHoverStyle }} // Merge styles for hover effect
                            onMouseOver={e => e.currentTarget.style.boxShadow = cardHoverStyle.boxShadow} // Apply hover style
                            onMouseOut={e => e.currentTarget.style.boxShadow = cardStyle.boxShadow} // Revert to original style
                            onClick={handleFlip}
                        >
                            <p className="p-2">{backText || "Back text not available"}</p>
                            <h2 className="text-lg font-bold mb-2">⭯</h2>
                        </div>
                    </ReactCardFlip>
                </div>
                <button
                    onClick={onClose}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full m-2"
                >
                    Close
                </button>
            </div>
        </Rnd>
    );
};

export default CardPreview;