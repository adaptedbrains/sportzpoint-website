import React from 'react';

const FeaturedEvents = () => {
  const events = [
    { title: 'Olympics' },
    { title: 'Cricket' },
    { title: 'Football' },
    { title: 'Tennis' },
    { title: 'Hockey' },
    { title: 'Badminton' },
    { title: 'Women in Sports' },
    { title: 'E-Sports' },
    { title: 'Athletics' },
    { title: 'Transfer News' },
  ];

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Featured Categories</h2>
      <ul className="list-none">
        {events.map((event, index) => (
          <li key={index} className="mb-2">
            {event.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeaturedEvents;