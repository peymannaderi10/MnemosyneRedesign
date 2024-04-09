import React from "react";
import MainQuiz from "./Windows/Main";

function MainSection() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow main-area">
        {/* Directly render the Main component without conditional checks */}
        <MainQuiz />
      </div>
    </div>
  );
}

export default MainSection;
