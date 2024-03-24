import React, { useState } from 'react';
import SelectCardType from './SelectCardType';
import SelectTopic from './SelectTopic';
import AddCorrespondence from './AddCorrespondence';
import AddFrontBack from './AddFrontBack';

function AddCards({ id, onClose, zIndex, bringToFront}) {
  const [currentStep, setCurrentStep] = useState('addCards');
  const [card, setCard] = useState({
    cardType: "",
    Topic: "",
    Correspondence: ["", ""],
    front: "",
    back: "",
    level: 0,
  });

  const goToSelectCardTypeFromCorrespondence = (updatedCard) => {
    setCard({
      ...card,
      Correspondence: ["", ""] // Reset correspondence
    });
    setCurrentStep('addCards');
    
  };

  const goToCorrespondenceOrCardType = () => {
    setCurrentStep(card.cardType === 'vocabulary' ? 'addCorrespondence' : 'addCards');
    

  };

  const goToSelectTopic = (updatedCard) => {
    setCard(updatedCard);
    // Check if the selected card type is 'vocabulary'
    if (updatedCard.cardType === 'vocabulary') {
      setCurrentStep('addCorrespondence'); // Go to AddCorrespondence if 'vocabulary'
    } else {
      setCurrentStep('selectTopic'); // Otherwise go straight to SelectTopic
    }
    
  };

  const goToNextStepFromCorrespondence = (updatedCard) => {
    setCard(updatedCard);
    setCurrentStep('selectTopic');
  };

  const goToAddFrontBack = (updatedCard) => {
    setCard(updatedCard);
    setCurrentStep('addFrontBack');
  };

  const goToSelectTopicFromAddFrontBack = () => {
    setCurrentStep('selectTopic');
  };

  return (
    <div>
      {currentStep === 'addCards' && (
        <SelectCardType card={card} onNext={goToSelectTopic} onClose={onClose} zIndex={zIndex} bringToFront={bringToFront} id={id} />
      )}
      {currentStep === 'addCorrespondence' && (
        <AddCorrespondence
          card={card}
          onBack={goToSelectCardTypeFromCorrespondence} // Pass this new handler
          onNext={goToNextStepFromCorrespondence}
          onClose={onClose}
          zIndex={zIndex}
          bringToFront={bringToFront}
          id={id}
        />
      )}
      {currentStep === 'selectTopic' && (
        <SelectTopic
          card={card}
          onBack={goToCorrespondenceOrCardType} // Pass this handler to SelectTopic
          onNext={goToAddFrontBack}
          onClose={onClose}
          zIndex={zIndex}
          bringToFront={bringToFront}
          id={id}
        />
      )}
    {currentStep === 'addFrontBack' && (
        <AddFrontBack
          card={card}
          onClose={onClose}
          onBack={goToSelectTopicFromAddFrontBack}
          // onNext={...}
          zIndex={zIndex}
          bringToFront={bringToFront}
          id={id}
        />
      )}


    </div>
  );
}

export default AddCards;