import React from 'react';
import {
  FaTrophy,
 
} from 'react-icons/fa';

const FeaturedEvents = () => {
  const events = [
    { title: 'Olympics', icon: <FaTrophy color='rgba(0,0,0,0.8)' /> },
    { title: 'Cricket', icon: <FaTrophy color='rgba(0,0,0,0.8)' /> },
    { title: 'Football', icon: <FaTrophy color='rgba(0,0,0,0.8)' /> },
    { title: 'Tennis', icon: <FaTrophy color='rgba(0,0,0,0.8)' /> },
    { title: 'Hockey', icon: <FaTrophy color='rgba(0,0,0,0.8)' /> },
    { title: 'Badminton', icon: <FaTrophy color='rgba(0,0,0,0.8)' /> },
    { title: 'Women in Sports', icon: <FaTrophy color='rgba(0,0,0,0.8)' /> },
    { title: 'E-Sports', icon: <FaTrophy color='rgba(0,0,0,0.8)' /> },
    { title: 'Athletics', icon: <FaTrophy color='rgba(0,0,0,0.8)' /> },
    { title: 'Transfer News', icon: <FaTrophy color='rgba(0,0,0,0.8)' /> },
  ];

  return (
    <div className="bg-white  rounded shadow">
      <h2 className="text-xl font-bold mb-4 pt-4 px-4">Featured Categories</h2>
      <ul className="list-none px-2">
        {events.map((event, index) => (
          <li key={index} className="mb-2 flex items-center hover:shadow-md  hover:bg-zinc-100 px-2 py-1 rounded transition-all duration-100 text-zinc-900 cursor-pointer">
            {event.icon}
            <span className="ml-2">{event.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeaturedEvents;