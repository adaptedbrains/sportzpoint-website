import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Follow = () => {
  const socialLinks = [
    { icon: <FaFacebookF />, text: 'Facebook' },
    { icon: <FaTwitter />, text: 'Twitter' },
    { icon: <FaInstagram />, text: 'Instagram' },
  ];

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Follow India</h2>
      <ul className="list-none">
        {socialLinks.map((link, index) => (
          <li key={index} className="mb-2 flex items-center hover:shadow-md  hover:bg-zinc-100 px-2 py-1 rounded transition-all duration-100 text-zinc-900 cursor-pointer">
            {link.icon}
            <span className="ml-2">{link.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Follow;