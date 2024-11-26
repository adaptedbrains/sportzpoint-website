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
      href: 'http://www.facebook.com/sharer/sharer.php?u=https://sportzpoint.com/cricket/ipl-2025-squads-of-every-ipl-team-after-the-auction-7608832',
      className: 'text-blue-600'
    },
    {
      icon: <FaTwitter className="opacity-80" />,
      text: 'Share on Twitter',
      href: 'http://www.twitter.com/intent/tweet?url=https://sportzpoint.com/cricket/ipl-2025-squads-of-every-ipl-team-after-the-auction-7608832',
      className: 'text-sky-500'
    },
    {
      icon: <FaWhatsapp className="opacity-80" />,
      text: 'Share on WhatsApp',
      href: 'https://api.whatsapp.com/send?text=https://sportzpoint.com/cricket/ipl-2025-squads-of-every-ipl-team-after-the-auction-7608832',
      className: 'text-green-600'
    },
  ];

  return (
    <div className="bg-white rounded shadow sticky top-20">
      <h2 className="text-xl font-bold mb-4 pt-2 px-4">Follow Us</h2>
      <div className="px-2">
        {socialLinks.map((link, index) => (
          <Link 
            href={link.href}
            key={index}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-2 flex items-center hover:shadow-md hover:bg-zinc-100 px-2 py-1 rounded transition-all duration-100 text-zinc-900 cursor-pointer"
          >
            <span className="w-5 h-5 flex items-center justify-center">
              {link.icon}
            </span>
            <span className="ml-2 text-sm">{link.text}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Follow;