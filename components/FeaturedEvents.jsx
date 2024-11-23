import React from "react";
import { PiCricketDuotone } from "react-icons/pi";
import { MdOutlineSportsTennis } from "react-icons/md";

import {
  FaMedal, // For Olympics
  FaFutbol, // For Football
  FaHockeyPuck, // For Hockey
  FaThermometer,
  FaFemale, // For Women in Sports
  FaGamepad, // For E-Sports
  FaRunning, // For Athletics
  FaExchangeAlt, // For Transfer News
} from "react-icons/fa";
import Link from "next/link";

const FeaturedEvents = ({ toggleMenu }) => {
  const events = [
    {
      title: "Olympics",
      icon: <FaMedal color="rgba(0,0,0,0.8)" />,
      slug: "/olympics",
    },
    {
      title: "Cricket",
      icon: <PiCricketDuotone color="rgba(0,0,0,0.8)" />,
      slug: "/cricket",
    },
    {
      title: "Football",
      icon: <FaFutbol color="rgba(0,0,0,0.8)" />,
      slug: "/football",
    },
    {
      title: "Tennis",
      icon: <MdOutlineSportsTennis color="rgba(0,0,0,0.8)" />,
      slug: "/tennis",
    },
    {
      title: "Hockey",
      icon: <FaHockeyPuck color="rgba(0,0,0,0.8)" />,
      slug: "/hockey",
    },
    {
      title: "Badminton",
      icon: <FaThermometer color="rgba(0,0,0,0.8)" />,
      slug: "/badminton",
    },
    {
      title: "Women in Sports",
      icon: <FaFemale color="rgba(0,0,0,0.8)" />,
      slug: "/women-in-sports",
    },
    {
      title: "E-Sports",
      icon: <FaGamepad color="rgba(0,0,0,0.8)" />,
      slug: "/e-sports",
    },
    {
      title: "Athletics",
      icon: <FaRunning color="rgba(0,0,0,0.8)" />,
      slug: "/athletics",
    },
    {
      title: "Transfer News",
      icon: <FaExchangeAlt color="rgba(0,0,0,0.8)" />,
      slug: "/football/transfer-news",
    },
  ];

  return (
    <div className="bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4 pt-2 px-4">Featured Categories</h2>
      <div className="px-2">
        {events.map((event, index) => (
          <Link
            href={event.slug}
            key={index}
            className="mb-2 flex items-center hover:shadow-md hover:bg-zinc-100 px-2 py-1 rounded transition-all duration-100 text-zinc-900 cursor-pointer"
          >
            <button
              type="button"
              onClick={toggleMenu} // Handle menu toggle on click
              className="flex items-center w-full" // Ensure button doesn't break layout
            >
              {event.icon}
              <span className="ml-2">{event.title}</span>
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FeaturedEvents;
