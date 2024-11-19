"use client";

import React, { useRef, useEffect, useState } from "react";
import { events } from "../util/headerScore"; // Import events from the provided file
import { FaChevronRight } from "react-icons/fa"; // Importing React Icon

const EventSection = () => {
  const [visibleMatches, setVisibleMatches] = useState([]);

  useEffect(() => {
    // Calculate visible matches based on container width
    const calculateVisibleMatches = () => {
      const containerWidth = document.body.offsetWidth; // Example width check
      const matchWidth = 200; // Approx width of one match
      const maxVisible = Math.floor(containerWidth / matchWidth);

      const updatedVisibleMatches = events.map((event) => {
        const totalMatches = event.matches.length;
        return {
          ...event,
          visible: event.matches.slice(0, maxVisible), // Slice matches to fit
          remaining: totalMatches - maxVisible,
        };
      });

      setVisibleMatches(updatedVisibleMatches);
    };

    calculateVisibleMatches(); // Initial calculation
    window.addEventListener("resize", calculateVisibleMatches); // Recalculate on resize

    return () => window.removeEventListener("resize", calculateVisibleMatches);
  }, []);

  const handleShowMore = (index) => {
    setVisibleMatches((prev) => {
      const updated = [...prev];
      const event = updated[index];
      event.visible = [...event.visible, ...event.remainingMatches];
      event.remaining = 0;
      return updated;
    });
  };

  return (
    <div className="flex mx-auto  gap-4 overflow-hidden w-[85%]">
      <div className="flex items-center">
        <select className="border border-zinc-400 focus:outline-none min-w-28 rounded-full px-2 py-1 text-zinc-700 font-semibold text-sm">
          <option value="">Jhon</option>
          <option value="">Chin</option>
          <option value="">India</option>
          <option value="">l</option>
          <option value="">l</option>
          <option value="">l</option>
        </select>
      </div>
      <div className="event-section flex">
        {visibleMatches.map((event, index) => (
          <div key={index} className="event flex items-center relative">
            {/* Event Title */}
            <div className="text-xs font-semibold px-2 bg-gray-100 flex justify-center items-center h-full border-l border-zinc-600">
              <h1 className="whitespace-nowrap">{event.title}</h1>
            </div>

            {/* Matches Display */}
            <div className="matches-container flex border-r">
              {event.visible.map((match, matchIndex) => (
                <div
                  key={matchIndex}
                  className="match px-4 border-l border-zinc-600 min-w-[200px]"
                >
                  <p className="text-zinc-700 text-xs font-semibold">
                    {match.time || "Full Time"}
                  </p>
                  <div className="flex justify-between">
                    <span className="text-xs font-bold text-zinc-800">
                      {match.homeTeam}
                    </span>
                    <span className="font-bold">{match.homeScore}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs font-bold text-zinc-800">
                      {match.awayTeam}
                    </span>
                    <span className="font-bold">{match.awayScore}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Show More Button */}
            {event.remaining > 0 && (
              <button
                onClick={() => handleShowMore(index)}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 rounded-full p-2 shadow"
              >
                <FaChevronRight className="text-gray-600" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventSection;
