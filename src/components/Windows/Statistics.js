import React, { useState, useRef } from "react";
import { Rnd } from "react-rnd";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
  LineChart,
} from "recharts";

import LeftArrowIcon from "../../assets/left-arrow.svg";
import RightArrowIcon from "../../assets/right-arrow.svg";

export const tabSelectedStyle =
  "font-semibold bg-gray-400 opacity-50 px-[2%] py-[1%] rounded-xl z-[1]";
export const selectedTabTitle = [
  "Correct/Incorrect Answers",
  "Quiz Scores",
  "Levels Cleared",
  "Time Studied",
];

export const data = [
  {
    day: "Sun",
    correct: 3,
    incorrect: 8,
    highestGrade: 60,
    avgGrade: 58,
    timeStudied: 30,
    levelCleared: 1,
  },
  {
    day: "Mon",
    correct: 4,
    incorrect: 6,
    highestGrade: 72,
    avgGrade: 70,
    timeStudied: 20,
    levelCleared: 1,
  },
  {
    day: "Tues",
    correct: 7,
    incorrect: 5,
    highestGrade: 71,
    avgGrade: 65,
    timeStudied: 10,
    levelCleared: 1,
  },
  {
    day: "Wed",
    correct: 8,
    incorrect: 4,
    highestGrade: 81,
    avgGrade: 72,
    timeStudied: 30,
    levelCleared: 2,
  },
  {
    day: "Thurs",
    correct: 9,
    incorrect: 3,
    highestGrade: 82,
    avgGrade: 78,
    timeStudied: 48,
    levelCleared: 2,
  },
  {
    day: "Fri",
    correct: 6,
    incorrect: 1,
    highestGrade: 90,
    avgGrade: 81,
    timeStudied: 45,
    levelCleared: 3,
  },
  {
    day: "Sat",
    correct: 9,
    incorrect: 1,
    highestGrade: 92,
    avgGrade: 83,
    timeStudied: 50,
    levelCleared: 4,
  },
];

const chartComps = [
  <BarChart width={500} height={240} data={data}>
    <XAxis dataKey="day"> </XAxis>
    <YAxis />
    <Legend />

    <Tooltip />

    <Bar dataKey="correct" stackId="a" fill="#abf7b1" />
    <Bar dataKey="incorrect" stackId="a" fill="#FF6865" />
  </BarChart>,

  <LineChart width={500} height={240} data={data}>
    <CartesianGrid strokeDasharray="3 3"></CartesianGrid>
    <XAxis dataKey="day"></XAxis>
    <YAxis domain={[50, 100]}></YAxis>
    <Tooltip></Tooltip>
    <Legend></Legend>
    <Line
      type="monotone"
      dataKey="highestGrade"
      name="Highest Grade"
      stroke="#8884d8"
    />
    <Line
      type="monotone"
      dataKey="avgGrade"
      name="Average Grade"
      stroke="#82ca9d"
    />
  </LineChart>,
  <BarChart width={500} height={240} data={data}>
    <XAxis dataKey="day"> </XAxis>
    <YAxis domain={[0, 6]} />
    <Legend />

    <Tooltip />

    <Bar
      name="Level Cleared"
      dataKey="levelCleared"
      stackId="a"
      fill="#3459d4"
    />
  </BarChart>,
  <LineChart width={500} height={240} data={data}>
    <CartesianGrid strokeDasharray="3 3"></CartesianGrid>
    <XAxis dataKey="day"></XAxis>
    <YAxis
      domain={[
        Math.min(...data.map((item) => item.timeStudied)) - 10,
        Math.max(...data.map((item) => item.timeStudied)) + 10,
      ]}
    ></YAxis>
    <Tooltip></Tooltip>
    <Legend></Legend>
    <Line
      type="monotone"
      dataKey="timeStudied"
      name="Time Studied"
      stroke="#ab457f"
    />
  </LineChart>,
];

function Statistics({ id, onClose, zIndex, bringToFront }) {
  const [toggleState, setToggleState] = useState(0);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <Rnd
      default={{
        x: 150,
        y: 150,
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
      <div className="flex-none bg-gray-700 p-2 flex items-center justify-between relative text-white">
        <span className="text-lg">Statistics</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose(id);
          }}
          className="bg-red-500 h-3 w-3 rounded-full hover:bg-red-700 absolute right-2 top-2"
          aria-label="Close"
        ></button>
      </div>
      <div className="bg-gray-200 p-2 flex justify-between text-sm px-[5%]">
        <button
          className={`hover:text-blue-500 ${
            toggleState === 0 ? tabSelectedStyle : ""
          }`}
          onClick={() => toggleTab(0)}
        >
          Correct Answers
        </button>
        <button
          className={`hover:text-blue-500 ${
            toggleState === 1 ? tabSelectedStyle : ""
          }`}
          onClick={() => toggleTab(1)}
        >
          Quiz Scores
        </button>
        <button
          className={`hover:text-blue-500 ${
            toggleState === 2 ? tabSelectedStyle : ""
          }`}
          onClick={() => toggleTab(2)}
        >
          Highest Level
        </button>
        <button
          className={`hover:text-blue-500 ${
            toggleState === 3 ? tabSelectedStyle : ""
          }`}
          onClick={() => toggleTab(3)}
        >
          {" "}
          Time Studied
        </button>
      </div>
      <div className="flex p-4 flex-col justify-between">
        <h3 className="text-center text-lg font-bold mb-4">
          {selectedTabTitle[toggleState]}
        </h3>
        {/* Placeholder for chart */}
        <div className="w-full bg-gradient-to-r h-72 rounded-lg shadow-inner p-4 flex justify-around items-end">
          {/* Mockup bars for the chart */}
          {chartComps[toggleState]}
        </div>
        <div className="flex justify-center mt-[1rem] gap-[0.5rem] align-middle">
          <button className="w-[4%] h-[4%] hover:bg-gray-300 rounded-full p-1">
            <img src={LeftArrowIcon} alt="LeftArrowIcon"></img>
          </button>
          <span className="font-semibold text-[0.8em]">
            March 24th - March 30th
          </span>
          <button className="w-[4%] h-[4%] hover:bg-gray-300 rounded-full p-1 ">
            <img src={RightArrowIcon} alt="RightArrowIcon"></img>
          </button>
        </div>
      </div>
    </Rnd>
  );
}

export default Statistics;
