'use client';

import React from "react";
import { GiCricketBat } from "react-icons/gi";
import { MdOutlineSportsTennis } from "react-icons/md";
import {
  FaMedal,
  FaFutbol,
  FaHockeyPuck,
  FaThermometer,
  FaFemale,
  FaGamepad,
  FaRunning,
  FaExchangeAlt,
} from "react-icons/fa";
import Link from "next/link";

const FeaturedEvents = ({ toggleMenu }) => {
  const events = [
    {
      title: "Olympics",
      icon: <FaMedal size={18} />,
      slug: "/olympics",
    },
    {
      title: "Cricket",
      icon: <GiCricketBat size={18} />,
      slug: "/cricket",
    },
    {
      title: "Football",
      icon: <FaFutbol size={18} />,
      slug: "/football",
    },
    {
      title: "Tennis",
      icon: <MdOutlineSportsTennis size={18} />,
      slug: "/tennis",
    },
    {
      title: "Hockey",
      icon: <FaHockeyPuck size={18} />,
      slug: "/hockey",
    },
    {
      title: "Badminton",
      icon: <FaThermometer size={18} />,
      slug: "/badminton",
    },
    {
      title: "Women In Sports",
      icon: <FaFemale size={18} />,
      slug: "/women-in-sports",
    },
    {
      title: "E-Sports",
      icon: <FaGamepad size={18} />,
      slug: "/e-sports",
    },
    {
      title: "Athletics",
      icon: <FaRunning size={18} />,
      slug: "/athletics",
    },
    {
      title: "Transfers",
      icon: <FaExchangeAlt size={18} />,
      slug: "/football/transfer-news",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="p-3 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">Featured Categories</h2>
      </div>
      <div className="py-1">
        {events.map((event, index) => (
          <Link
            href={event.slug}
            key={index}
            className="block"
          >
            <div 
              className="flex items-center px-2 py-2 hover:bg-gray-50 transition-colors duration-200 group"
              onClick={toggleMenu}
            >
              <span className="text-gray-500 group-hover:text-[#006356] transition-colors duration-200">
                {event.icon}
              </span>
              <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-900 transition-colors duration-200">
                {event.title}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FeaturedEvents;
