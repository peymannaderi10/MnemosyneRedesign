import React, { useState } from 'react';
import { Rnd } from 'react-rnd';

function EditCard({ id, onClose, zIndex, bringToFront, questions, updateQuestions, currentQuestion }) {
    const [selectedButton, setSelectedButton] = useState(null);
    const [tags, setTags] = useState(['tag1', 'tag2']); 
    const [isFrontBackSelected, frontBackSelected] = useState(false);
    const [isReversibleSelected, reversibleSelected] = useState(false);
    const [isVocabSelected, vocabSelected] = useState(false);

    const [question, setQuestion] = useState(questions[currentQuestion].question);
    console.log(question)
    const [answer, setAnswer] = useState(questions[currentQuestion].answer);
    
   
  
    const handleButtonClick = (buttonName) => {
        setSelectedButton(buttonName);
        frontBackSelected(buttonName === 'Front-back');
        reversibleSelected(buttonName === 'Reversible');
        vocabSelected(buttonName === 'Vocab');
        console.log("card type: ", buttonName);
    };

    const handleVocabClick = (buttonName) => {
        if (isVocabSelected) {
            // If already in vocab mode, do not change selected button
            phraseSelected(buttonName === 'Phrase');
            pronunciationSelected(buttonName === 'Pronunciation');
            meaningSelected(buttonName === 'Meaning');
            console.log("vocab type: ", buttonName);
        } else {
            // If not in vocab mode, set selected button to 'Vocab' only
            setSelectedButton('Vocab');
            phraseSelected(buttonName === 'Phrase');
            pronunciationSelected(buttonName === 'Pronunciation');
            meaningSelected(buttonName === 'Meaning');
            vocabSelected(true);
            console.log("vocab type: ", buttonName);
        }
    };

    const handleAddTag = () => {
        const newTag = prompt('Enter a new tag:');
        if (newTag) {
            setTags([...tags, newTag]);
            console.log("Updated tags:", [...tags, newTag]);
        }
    };

    const handleDeleteTag = (tagToDelete) => {
        const newTags = tags.filter(tag => tag !== tagToDelete);
        setTags(newTags);
        console.log("Updated tags:", newTags);
    };

    const handleOkClick = () => {
        const updatedQuestions = [...questions]; // Make a copy of the questions array
        const questionIndex = updatedQuestions.findIndex(
          (q) => q.question === questions[currentQuestion].question
        );
      
        if (questionIndex !== -1) {
          updatedQuestions[questionIndex] = {
            question,
            answer,
          };
        } else {
          updatedQuestions.push({
            question,
            answer,
          });
        }
      
        updateQuestions(updatedQuestions);
        console.log("Question:", question, "Answer:", answer);
        onClose(id); // Close the edit card modal after updating the questions
      };

    return (
        <Rnd
            default={{
                x: 100,
                y: 100,
                width: 500,
                height: 600,
            }}
            bounds=".main-area"
            style={{ zIndex }}
            className="overflow-hidden rounded-lg shadow-lg flex flex-col bg-white"
            onDragStart={bringToFront}
            onMouseDown={bringToFront}
            enableResizing={false}
        >
            <div className="flex-none bg-gray-700 p-2 flex items-center justify-center relative text-white">
                <span className="text-lg">EDIT CARD</span>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onClose(id);
                    }}
                    className="bg-red-500 h-3 w-3 rounded-full hover:bg-red-700 absolute right-2 top-2"
                    aria-label="Close"
                ></button>
            </div>
            <div className="flex-grow p-4 flex flex-col">
                {/* Question input */}
                <div className="flex-1 mb-2">
                    <label htmlFor="question" className="text-sm font-bold mb-2 block text-left">Question:</label>
                    <textarea 
                        id="question" 
                        className="w-full h-1/3 p-2 border rounded" 
                        placeholder="Type the question here"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    ></textarea>
                </div>
                {/* Answer input */}
                <div className="flex-1 mb-8">
                    <label htmlFor="answer" className="text-sm font-bold mb-2 block text-left">Answer:</label>
                    <textarea 
                        id="answer" 
                        className="w-full h-40 p-2 border rounded" 
                        placeholder="Type the answer here"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                    ></textarea>
                </div>
                
                {/* Card type and tags */}
                <div className="mb-4">
                    <div className="flex items-center mb-4">
                        <span className="text-sm font-bold mr-2">Card Type:</span>
                        <button
                            onClick={() => handleButtonClick('Front-back')}
                            className={`bg-${selectedButton === 'Front-back' ? 'red-500' : 'gray-200'} text-black px-2 py-1 rounded`}
                        >
                            Front-back
                        </button>
                        <button
                            onClick={() => handleButtonClick('Reversible')}
                            className={`bg-${selectedButton === 'Reversible' ? 'red-500' : 'gray-200'} text-black px-2 py-1 rounded ml-1`}
                        >
                            Reversible
                        </button>
                        <button
                            onClick={() => handleButtonClick('Vocab')}
                            className={`bg-${selectedButton === 'Vocab' ? 'red-500' : 'gray-200'} text-black px-2 py-1 rounded ml-1`}
                        >
                            Vocab
                        </button>
                    </div>
                    {/* Render "Vocab Type" section only when "Vocab" is selected */}
                    {isVocabSelected && (
                        <div className="flex items-center mb-4">
                            <span className="text-sm font-bold mr-2">Vocab Type:</span>
                            <button
                                onClick={() => handleVocabClick('Phrase')}
                                className={`bg-${isPhraseSelected ? 'green-500' : 'gray-200'} text-black px-2 py-1 rounded`}
                            >
                                Phrase
                            </button>
                            <button
                                onClick={() => handleVocabClick('Pronunciation')}
                                className={`bg-${isPronunciationSelected ? 'green-500' : 'gray-200'} text-black px-2 py-1 rounded ml-1`}
                            >
                                Pronunciation
                            </button>
                            <button
                                onClick={() => handleVocabClick('Meaning')}
                                className={`bg-${isMeaningSelected ? 'green-500' : 'gray-200'} text-black px-2 py-1 rounded ml-1`}
                            >
                                Meaning
                            </button>
                        </div>
                    )}
                    <div className="flex items-center mt-2">
                        <span className="text-sm font-bold mr-2">Tags:</span>
                        {tags.map(tag => (
                            <div key={tag} className="bg-gray-200 px-2 py-1 rounded flex items-center mr-2 hover:bg-gray-300">
                                <span className="text-sm mr-2" >{tag}</span>
                                <button onClick={() => handleDeleteTag(tag)} className="text-sm">✕</button>
                            </div>
                        ))}
                        <button onClick={handleAddTag} className="justify-center bg-blue-500 hover:bg-blue-600 text-white w-8 h-8 rounded-full">
                            +
                        </button>     
                    </div>
                </div>

                {/* Action buttons */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                    <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                        Cancel
                    </button>
                    <button onClick={() => handleOkClick()} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                        OK
                    </button>
                </div>
            </div>
        </Rnd>
    );
}

export default EditCard;
