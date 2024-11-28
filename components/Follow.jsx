import React from 'react';
import { FaFacebookF, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

const Follow = () => {
  const socialLinks = [
    {
      icon: <Image 
        src="/icon/google_news.png" 
        alt="google news" 
        width={15} 
        height={15}
        className="opacity-80" 
      />,
      text: 'Google News',
      href: 'https://news.google.com/publications/CAAqBwgKMKDuqAswkvnAAw?ceid=IN:en&oc=3',
      className: 'text-blue-800'
    },
    {
      icon: <FaFacebookF className="opacity-80" />,
      text: 'Facebook',
      href: 'https://www.facebook.com/sportzpoint',
      className: 'text-blue-600'
    },
    {
      icon: <FaTwitter className="opacity-80" />,
      text: 'Twitter',
      href: 'https://twitter.com/sportzpoint',
      className: 'text-sky-500'
    },
    {
      icon: <FaWhatsapp className="opacity-80" />,
      text: 'WhatsApp',
      href: 'https://api.whatsapp.com/send?text=https://sportzpoint.com',
      className: 'text-[#006356]'
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="p-3 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">Follow Us</h2>
      </div>
      <div className="py-1">
        {socialLinks.map((link, index) => (
          <Link 
            href={link.href}
            key={index}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-2 py-2 hover:bg-gray-50 transition-colors duration-200 group"
          >
            <span className={`w-5 h-5 flex items-center justify-center ${link.className}`}>
              {link.icon}
            </span>
            <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-900 transition-colors duration-200">
              {link.text}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Follow;