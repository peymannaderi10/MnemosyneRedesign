import React from 'react';
import './Flashcard.css'; // Import CSS for styling
import flipIcon from './Flip Icon.png'

const Flashcard = ({ frontContent, backContent, isFlipped, setIsFlipped }) => {
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className={`flashcard-container ${isFlipped ? 'flipped' : ''}`}
      onClick={handleFlip}
    >
        <div className="flashcard">
            <div className="front">{frontContent}</div>
            <div className="back">{backContent}</div>
        </div>
            <div className="icon-container">
            <img src={flipIcon} alt="Icon" className="icon" />
        </div>
    </div>
  );
};

export default Flashcard;
