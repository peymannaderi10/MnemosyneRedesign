import React, { useState } from 'react';
import { Rnd } from 'react-rnd';
import EditCard from './EditCard'; // Import EditCard component

// Mock data, replace with your actual JSON data
const mockData = [
    { id: 1, title: 'Search', content: 'Content of Flashcard 1', tags: ['Science'] },
    { id: 2, title: 'Flashcard 2', content: 'Content of Flashcard 2', tags: ['History'] },
    { id: 3, title: 'Search', content: 'Content of Flashcard 1', tags: ['Math'] },
    { id: 4, title: 'Search', content: 'Content of Flashcard 1', tags: ['Science'] },
    { id: 5, title: 'Flashcard 2', content: 'Content of Flashcard 2', tags: ['History'] },
    { id: 6, title: 'Search', content: 'Content of Flashcard 1', tags: ['Science'] },
    { id: 7, title: 'Search', content: 'Content of Flashcard 1', tags: ['History'] },
    { id: 8, title: 'Flashcard 2', content: 'Content of Flashcard 2', tags: ['Math'] },
    { id: 9, title: 'Search', content: 'Content of Flashcard 1', tags: ['Science'] },
    { id: 10, title: 'Search', content: 'Content of Flashcard 1', tags: ['History'] },
    { id: 11, title: 'Flashcard 2', content: 'Content of Flashcard 2', tags: ['Math'] },
    { id: 12, title: 'Search', content: 'Content of Flashcard 1', tags: ['Science'] },
    // ... more flashcards
];

function BrowseCards({ id, onClose, zIndex, bringToFront }) {
    const [flashcards, setFlashcards] = useState(mockData);
    const [selectedCards, setSelectedCards] = useState(new Set());
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [selectedFlashcard, setSelectedFlashcard] = useState(null);

    const categories = Array.from(new Set(flashcards.flatMap(card => card.tags)));

    const categoryColors = {};
    categories.forEach((category, index) => {
        categoryColors[category] = `hsl(${index * (360 / categories.length)}, 70%, 50%)`;
    });

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory((prevCategory) => {
            return prevCategory === category ? null : category;
        });
        setSearchTerm('');
    };

    const filteredFlashcards = searchTerm
        ? flashcards.filter(card =>
            card.title.toLowerCase().includes(searchTerm) ||
            card.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
        : selectedCategory
            ? flashcards.filter(card => card.tags.includes(selectedCategory))
            : flashcards;

    const handleCardSelect = (cardId) => {
        const updatedSelectedCards = new Set(selectedCards);
        if (updatedSelectedCards.has(cardId)) {
            updatedSelectedCards.delete(cardId);
        } else {
            updatedSelectedCards.add(cardId);
        }
        setSelectedCards(updatedSelectedCards);
    };

    const handleDelete = () => {
        const updatedFlashcards = flashcards.filter(card => !selectedCards.has(card.id));
        setFlashcards(updatedFlashcards);
        setSelectedCards(new Set());
    };

    const handleEdit = () => {
        if (selectedCards.size === 1) {
            const cardId = Array.from(selectedCards)[0];
            const cardToEdit = flashcards.find(card => card.id === cardId);
            setSelectedFlashcard(cardToEdit);
            setEditModalOpen(true);
        }
    };

    const handleEditModalClose = () => {
        setEditModalOpen(false);
    };

    const handleUpdateFlashcard = (updatedFlashcard) => {
        const updatedFlashcards = flashcards.map(card => {
            if (card.id === updatedFlashcard.id) {
                return updatedFlashcard;
            }
            return card;
        });
        setFlashcards(updatedFlashcards);
        setEditModalOpen(false);
    };

    const renderFlashcards = () => {
        return filteredFlashcards.map((card) => (
            <div
                key={card.id}
                className={`border p-8 relative ${selectedCards.has(card.id) ? 'bg-blue-100' : ''}`}
                onClick={() => handleCardSelect(card.id)}
            >
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ backgroundColor: categoryColors[card.tags[0]] }}></div>
                <h3>{card.title}</h3>
            </div>
        ));
    };

    return (
        <>
            <Rnd
                default={{
                    x: 100,
                    y: 100,
                    width: 700,
                    height: 500
                }}
                bounds=".main-area"
                style={{ zIndex, display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
                className="overflow-hidden rounded-lg shadow-lg bg-white"
                onDragStart={bringToFront}
                onMouseDown={bringToFront}
                enableResizing={false}
            >
                <div className="flex-none bg-gray-700 p-2 flex items-center justify-between relative text-white">
                    <span className="text-lg">Browse Cards</span>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose(id);
                        }}
                        className="bg-red-500 h-6 w-6 rounded-full hover:bg-red-700 absolute right-2 top-2"
                        aria-label="Close"
                    ></button>
                </div>
                <div className="flex flex-grow">
                    <div className="w-1/5 bg-gray-200 p-4 space-y-4" style={{ minWidth: '20%' }}>
                        <div className="text-lg">Categories</div>
                        {categories.map((category) => (
                            <div
                                key={category}
                                className={`flex items-center space-x-2 cursor-pointer ${selectedCategory === category ? 'font-bold' : ''}`}
                                onClick={() => handleCategorySelect(category)}
                            >
                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: categoryColors[category] }}></span>
                                <span>{category}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex-grow flex flex-col">
                        <div className="flex overflow-hidden p-4">
                            <input
                                type="search"
                                className="p-2 flex-grow border rounded"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            <button
                                className="bg-gray-300 px-4 hover:bg-gray-400"
                                onClick={() => setSearchTerm('')}
                            >
                                Clear
                            </button>
                        </div>
                        <div className="flex-grow overflow-y-auto" style={{ maxHeight: 'calc(100vh - 300px)' }}>
                            <div className="grid grid-cols-3 gap-4 p-4" style={{ maxHeight: 'calc(100vh - 400px)' }}>
                                {renderFlashcards()}
                            </div>
                        </div>
                    </div>
                </div>
                {(selectedCards.size === 1) && (
                    <div className="p-4 flex justify-end">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={handleEdit}>Edit</button>
                        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleDelete}>Delete</button>
                    </div>
                )}
                {selectedCards.size > 1 && (
                    <div className="p-4 flex justify-end">
                        <div className="w-8 h-8"></div>
                        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleDelete}>Delete</button>
                    </div>
                )}
            </Rnd>
            {isEditModalOpen && (
                <EditCard
                    id={selectedFlashcard.id}
                    zIndex={zIndex + 1}
                    onClose={handleEditModalClose}
                    bringToFront={bringToFront}
                    flashcard={selectedFlashcard}
                    onUpdate={handleUpdateFlashcard}
                />
            )}
        </>
    );
}

export default BrowseCards;
