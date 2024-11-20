import React from 'react';
import { FaTrophy } from 'react-icons/fa';

const LatestStories = () => {
  const stories = [
    {
      title: "Japan remain top of Group C after defeating China in World Cup Qualifiers",
      description: "Brief description of the story",
      image: "path/to/image1.jpg" // Add image path if available
    },
    {
      title: "Border-Gavaskar Trophy: Here is how India's battling lineup might look in the first test",
      description: "Brief description of the story",
      image: "path/to/image2.jpg" // Add image path if available
    },
    {
      title: "'You challenged me in ways no one else could': Roger Federer's special message on Rafael...",
      description: "Brief description of the story",
      image: "path/to/image3.jpg" // Add image path if available
    },
  ];

  return (
    <div className="bg-white  rounded shadow p-4">
      <h2 className="text-xl font-bold mb-4">Latest Stories</h2>
      <ul className="list-none">
        {stories.map((story, index) => (
          <li key={index} className="mb-4">
            <div className="flex items-center mb-2">
              <FaTrophy className="text-gray-500 mr-2" />
              <h3 className="text-sm font-bold">{story.title}</h3>
            </div>
            <p>{story.description}</p>
            {story.image && (
              <img src={story.image} alt={story.title} className="w-full h-auto" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LatestStories;