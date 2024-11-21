import Image from 'next/image';
import React from 'react';
import { FaTrophy } from 'react-icons/fa';

const LatestStories = () => {
  const stories = [
    {
      title: "Japan remain top of Group C after defeating China in World Cup Qualifiers",
      description: "Brief description of the story",
      image: "https://img-cdn.thepublive.com/fit-in/300x0/filters:format(webp)/sportzpoint/media/media_files/2024/11/20/w3M23TMKTWazI5OCEvMu.jpg" // Add image path if available
    },
    {
      title: "Border-Gavaskar Trophy: Here is how India's battling lineup might look in the first test",
      description: "Brief description of the story",
      image: "https://img-cdn.thepublive.com/fit-in/300x0/filters:format(webp)/sportzpoint/media/media_files/2024/11/20/w3M23TMKTWazI5OCEvMu.jpg" // Add image path if available
    },
    {
      title: "'You challenged me in ways no one else could': Roger Federer's special message on Rafael...",
      description: "Brief description of the story",
      image: "https://img-cdn.thepublive.com/fit-in/300x0/filters:format(webp)/sportzpoint/media/media_files/2024/11/20/w3M23TMKTWazI5OCEvMu.jpg" // Add image path if available
    },
  ];

  return (
    <div className="bg-white  rounded shadow p-4">
        <div className='flex justify-between items-center'>

      <h2 className="text-xl font-bold mb-4 text-green-800">Latest Stories</h2>
      <div className='w-32 mb-2 h-[1px] bg-green-800'>

      </div>
        </div>
      <ul className="list-none">
        {stories.map((story, index) => (
          <li key={index} className="mb-4 flex">
            {story.image && (
              <Image
              src={story.image} 
              alt={story.title} 
              className='object-contain'
              width={130} 
              height={20} 
             
            />
            )}
            <div className="flex items-center mb-2 w-[60%]">
              <FaTrophy className="text-gray-500 mr-2" />
              <h3 className="text-sm font-bold">{story.title}</h3>
            </div>
            {/* <p>{story.description}</p> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LatestStories;