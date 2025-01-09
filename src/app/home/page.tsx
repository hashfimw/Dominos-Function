"use client";

import DotsDomino from "@/components/dotsDomino";
import {
  countDoubleNumbers,
  Domino,
  flipDominoes,
  removeByTotal,
  removeDuplicates,
  resetDominoes,
  sortDominoes,
  addDominoes,
} from "@/components/utilsFunc";
import { useState } from "react";

const defaultData: Domino[] = [
  [6, 1],
  [4, 3],
  [5, 1],
  [3, 4],
  [1, 1],
  [3, 4],
  [1, 2],
];

export default function HomePage() {
  const [sourceDominoes, setSourceDominoes] = useState<Domino[]>(defaultData); // Data asli (source)
  const [dominoes, setDominoes] = useState<Domino[]>(defaultData); // Data hasil manipulasi
  const [inputNumber, setInputNumber] = useState("");
  const [newDominoInput, setNewDominoInput] = useState<string>("");

  const handleSort = (order: "asc" | "desc") => {
    setDominoes(sortDominoes(dominoes, order));
  };

  const handleRemoveDuplicates = () => {
    setDominoes(removeDuplicates(dominoes));
  };

  const handleFlip = () => {
    setDominoes(flipDominoes(dominoes));
  };

  const handleRemoveByTotal = () => {
    const total = parseInt(inputNumber, 10);
    if (!isNaN(total)) {
      setDominoes(removeByTotal(dominoes, total));
    }
  };

  const handleReset = () => {
    setDominoes(resetDominoes(defaultData));
    setSourceDominoes(defaultData); // Reset sourceDominoes ke defaultData
  };

  const handleAddDomino = () => {
    const newDomino = newDominoInput
      .split(",")
      .map((num) => parseInt(num.trim(), 10))
      .filter((num) => !isNaN(num));

    if (newDomino.length === 2) {
      setSourceDominoes((prev) => addDominoes(prev, [newDomino as Domino])); // Menambahkan ke sourceDominoes
      setDominoes((prev) => addDominoes(prev, [newDomino as Domino])); // Menambahkan ke dominoes (Result)
      setNewDominoInput(""); // Reset input setelah penambahan
    } else {
      alert("Please enter a valid domino (two numbers separated by a comma).");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-200 mx-auto">
      <div className="w-1/5 bg-gray-600 text-white p-6 rounded-e-3xl">
        <h2 className="text-2xl font-bold mb-6">Domino Functions</h2>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => handleSort("asc")}
            className="bg-blue-300 hover:bg-blue-400 text-white px-4 py-2 rounded-lg shadow-md"
          >
            Sort (ASC)
          </button>
          <button
            onClick={() => handleSort("desc")}
            className="bg-blue-300 hover:bg-blue-400 text-white px-4 py-2 rounded-lg shadow-md"
          >
            Sort (DESC)
          </button>
          <button
            onClick={handleFlip}
            className="bg-blue-300 hover:bg-blue-400 text-white px-4 py-2 rounded-lg shadow-md"
          >
            Flip
          </button>

          <button
            onClick={handleReset}
            className="bg-blue-300 hover:bg-blue-400 text-white px-4 py-2 rounded-lg shadow-md"
          >
            Reset
          </button>
          <div className="mt-4">
            <input
              type="text"
              value={inputNumber}
              onChange={(e) => setInputNumber(e.target.value)}
              placeholder="Input Number for Remove byTotal"
              className="w-full text-sm p-2 mb-2 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleRemoveByTotal}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md w-60"
            >
              Remove by Total
            </button>
            <button
              onClick={handleRemoveDuplicates}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md w-60 mt-2"
            >
              Remove Duplicates
            </button>
          </div>

          <div className="mt-4">
            <input
              type="text"
              value={newDominoInput}
              onChange={(e) => setNewDominoInput(e.target.value)}
              placeholder="Enter a domino (e.g., 3,4) max (6,6)"
              className="w-full text-sm p-2 mb-2 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddDomino}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md w-60"
            >
              Add Domino
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-6 container mx-auto ">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 ">Source</h2>
          <div className="border rounded-xl bg-slate-400 p-8">
            <div className="grid grid-cols-7 gap-4">
              {sourceDominoes.map(([top, bottom], index) => (
                <div
                  key={index}
                  className="border-2 rounded-xl shadow-lg bg-white flex flex-col justify-between p-3 w-24 h-48 hover:scale-105 hover:shadow-xl transition-transform duration-300"
                >
                  <div className="flex justify-center pt-4">
                    <DotsDomino number={top} />
                  </div>
                  <div className="border-t-2 border-red-500 my-2"></div>
                  <div className="flex justify-center pb-4">
                    <DotsDomino number={bottom} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Result Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Result</h2>

          <div className="border rounded-xl bg-slate-400 p-8">
            <div className="grid grid-cols-7 gap-4">
              {dominoes.map(([top, bottom], index) => (
                <div
                  key={index}
                  className="border-2 rounded-xl shadow-lg bg-white flex flex-col justify-between p-3 w-24 h-48 hover:scale-105 hover:shadow-xl transition-transform duration-300"
                >
                  <div className="flex justify-center pt-4">
                    <DotsDomino number={top} />
                  </div>
                  <div className="border-t-2 border-red-500 my-2"></div>
                  <div className="flex justify-center pb-4">
                    <DotsDomino number={bottom} />
                  </div>
                </div>
              ))}
              <h2 className="text-2xl font-semibold text-gray-700 w-full">
                Double Numbers :
              </h2>
              <input
                readOnly
                value={countDoubleNumbers(sourceDominoes)}
                className=" mt-10 w-10 text-center h-3 p-3 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
