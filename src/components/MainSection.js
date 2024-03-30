
import React, { useState } from "react";
import Main from "./Windows/MainWindow/Main";
import AddCards from "./Windows/addCardWindows/AddCards";
import BrowseCards from "./Windows/BrowseCards";
import EditCard from "./Windows/EditCard";
import ExampleMulWindow from "./Windows/ExampleMulWindow";
import Statistics from "./Windows/Statistics";


function MainSection() {
  const [activeWindows, setActiveWindows] = useState(Array(6).fill(false));
  const [zIndices, setZIndices] = useState(Array(6).fill(1));
  const [isButtonsVisible, setIsButtonsVisible] = useState(true);

  const toggleWindow = (index) => {
    const updatedWindows = [...activeWindows];
    updatedWindows[index] = !updatedWindows[index];
    setActiveWindows(updatedWindows);
  };

  const bringToFront = (index) => {
    const maxZIndex = Math.max(...zIndices) + 1;
    const updatedZIndices = zIndices.map((z, i) =>
      i === index ? maxZIndex : z
    );
    setZIndices(updatedZIndices);
  };

  const toggleButtonVisibility = () => {
    setIsButtonsVisible(!isButtonsVisible);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-start bg-gray-800 p-1 shadow-md">
        <button
          onClick={toggleButtonVisibility}
          className="bg-gray-600 hover:bg-gray-700 text-white text-sm font-bold py-1 px-1 rounded  "
        >
          {isButtonsVisible ? "Hide Buttons" : "Show Buttons"}
        </button>
      </div>
      <div className="flex flex-grow">
        <div
          className={`flex flex-col bg-gray-800 p-4 space-y-2 ${
            isButtonsVisible ? "" : "hidden"
          }`}
        >
          <button
            onClick={() => toggleWindow(0)}
            className="window-button bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-2 px-4 rounded shadow-lg"
          >
            Open Main
          </button>
          <button
            onClick={() => toggleWindow(1)}
            className="window-button bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded shadow-lg"
          >
            Open Add Cards
          </button>
          <button
            onClick={() => toggleWindow(2)}
            className="window-button bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold py-2 px-4 rounded shadow-lg"
          >
            Open Edit Card
          </button>
          <button
            onClick={() => toggleWindow(3)}
            className="window-button bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-2 px-4 rounded shadow-lg"
          >
            Open Browse Cards
          </button>
          <button
            onClick={() => toggleWindow(4)}
            className="window-button bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600 text-white font-bold py-2 px-4 rounded shadow-lg"
          >
            Open Statistics
          </button>
          <button
            onClick={() => toggleWindow(5)}
            className="window-button bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-2 px-4 rounded shadow-lg"
          >
            Example multi Window call
          </button>
        </div>
        <div className="flex-grow main-area">
          {activeWindows.map((isActive, index) => {
            const WindowComponent = [
              Main,
              AddCards,
              EditCard,
              BrowseCards,
              Statistics,
              ExampleMulWindow,
            ][index];
            return (
              isActive && (
                <WindowComponent
                  key={index}
                  id={index}
                  onClose={toggleWindow}
                  zIndex={zIndices[index]}
                  bringToFront={() => bringToFront(index)}
                />
              )
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MainSection;
