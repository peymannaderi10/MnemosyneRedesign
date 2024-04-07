import React, { useState, useEffect, useCallback } from "react";
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

import statData from "../../data/statData.json";

export const tabSelectedStyle =
  "font-semibold bg-gray-400 opacity-50 px-[2%] py-[1%] rounded-xl z-[1]";
export const selectedTabTitle = [
  "Correct/Incorrect Answers",
  "Quiz Scores",
  "Levels Cleared",
  "Time Studied",
];

function Statistics({ id, onClose, zIndex, bringToFront }) {
  const [toggleState, setToggleState] = useState(0);
  const [data, setData] = useState([]);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const getStartDateOfWeek = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diff = today.getDate() - dayOfWeek;
    return new Date(today.setDate(diff));
  };
  const [startDate, setStartDate] = useState(getStartDateOfWeek());

  const goToNextWeek = () => {
    setStartDate((prevStartDate) => {
      const newStartDate = new Date(prevStartDate);
      newStartDate.setDate(prevStartDate.getDate() + 7);
      console.log(newStartDate);
      return newStartDate;
    });
  };

  const goToPreviousWeek = () => {
    setStartDate((prevStartDate) => {
      const newStartDate = new Date(prevStartDate);
      newStartDate.setDate(prevStartDate.getDate() - 7);
      return newStartDate;
    });
  };

  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);

  const disablePreviousButton = startDate <= new Date(Object.keys(statData)[0]);
  const disableNextButton =
    endDate >= new Date(Object.keys(statData).slice(-1)[0]);

  useEffect(() => {
    fetchDataForWeek();
  }, [startDate]);

  const fetchDataForWeek = useCallback(() => {
    const startOfStartDate = new Date(startDate);
    startOfStartDate.setDate(startOfStartDate.getDate() - 1);
    startOfStartDate.setHours(0, 0, 0, 0);

    const endOfEndDate = new Date(endDate);
    endOfEndDate.setHours(0, 0, 0, 0);

    const filteredData = Object.entries(statData).map(([date, data]) => ({
      date,
      ...data,
    }));

    const filteredWeekData = filteredData.filter((dataObject) => {
      const date = new Date(dataObject.date);
      return date >= startOfStartDate && date <= endOfEndDate;
    });

    setData(filteredWeekData);
  }, [startDate]);

  const chartComps = [
    <BarChart width={500} height={240} data={data}>
      <XAxis dataKey="day"> </XAxis>
      <YAxis />
      <Legend />

      <Tooltip />

      <Bar dataKey="correct" stackId="a" fill="#03CE4a" />
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
        <div className="flex justify-center gap-[0.5rem] align-middle">
          <button
            className="w-[1.8rem] h-[1.8rem] hover:bg-gray-300 rounded-full p-1"
            disabled={disablePreviousButton}
          >
            <img
              src={LeftArrowIcon}
              alt="LeftArrowIcon"
              onClick={goToPreviousWeek}
              className="w-[80%]"
              style={{ opacity: disablePreviousButton ? 0.2 : 1.0 }}
            ></img>
          </button>
          <span className="font-semibold text-[0.8em] text-center">
            {startDate.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
            })}{" "}
            -{" "}
            {endDate.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
            })}
          </span>
          <button
            className="w-[1.8rem] h-[1.8rem] hover:bg-gray-300 rounded-full p-1"
            disabled={disableNextButton}
          >
            <img
              src={RightArrowIcon}
              alt="RightArrowIcon"
              onClick={goToNextWeek}
              style={{ opacity: disableNextButton ? 0.2 : 1.0 }}
              className="w-[80%] "
            ></img>
          </button>
        </div>
      </div>
    </Rnd>
  );
}

export default Statistics;
