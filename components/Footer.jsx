'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  const quickLinks = [
    { text: "About Us", href: "/about-us" },
    { text: "FAQ", href: "/faq" },
    { text: "Partners", href: "/partners" },
    { text: "Disclaimer", href: "/disclaimer" },
    { text: "Privacy Policy", href: "/privacy" },
    { text: "Contact", href: "/contact" },
    { text: "Sports Guest Post", href: "/sports-guest-post" },
  ];

  const latestStories = [
    {
      title: "IPL 2025: Squads Of Every IPL Team After The Auction",
      href: "/ipl-2025-squads"
    },
    {
      title: "IPL 2025 Auction: Top 10 Most Expensive Players Of The Auction",
      href: "/ipl-2025-auction-expensive-players"
    },
    {
      title: "Indian Captains To Win POTM Awards In Australia In Tests",
      href: "/indian-captains-potm-australia"
    },
    {
      title: "Most Expensive Sold Players In The IPL Auction Over The Years",
      href: "/most-expensive-ipl-players"
    },
    {
      title: "Ruben Amorim's First Game At United Ends In Draw Against Ipswich",
      href: "/amorim-united-ipswich"
    },
    {
      title: "Liverpool Secures Narrow Win Against Southampton To Extend Their Lead At The Top Of The Table",
      href: "/liverpool-southampton-win"
    },
    {
      title: "IPL 2025 Auction Highlights | Shreyas Iyer Goes To PBKS For 26.75, Pant Goes To LSG For 27 Cr, David Warner Goes Unsold; Venkatesh Iyer Goes To KKR For 23.75 Cr",
      href: "/ipl-2025-auction-highlights"
    },
    {
      title: "Yashasvi Jaiswal Breaks Record Of Vijay Hazare During His 161 In Perth Test",
      href: "/jaiswal-record-perth"
    },
    {
      title: "Tilak Varma Reaches Historic Milestone Of Becoming The First Indian To Score 150 In T20s",
      href: "/tilak-varma-milestone"
    }
  ];

  return (
    <footer className="bg-[#006356] text-white mt-auto pt-10">
      <div className="max-w-7xl mx-auto px-4 pb-4">
        {/* Header with Logo and Social Icons */}
        <div className="flex justify-between items-center mb-10">
          <div className="h-14">
            <Image 
              src="/footer.png" 
              alt="SportzPoint" 
              width={180} 
              height={45}
              className="object-contain w-auto h-full"
            />
          </div>
          <div className="flex items-center gap-6 h-14">
            <Link href="https://www.linkedin.com/company/sportzpoint" className="hover:opacity-80">
              <Image src="/linkedin.svg" alt="LinkedIn" width={22} height={22} />
            </Link>
            <Link href="https://www.instagram.com/sportzpoint" className="hover:opacity-80">
              <Image src="/instagram.svg" alt="Instagram" width={22} height={22} />
            </Link>
            <Link href="https://twitter.com/sportz_point" className="hover:opacity-80">
              <Image src="/twitter.svg" alt="Twitter" width={22} height={22} />
            </Link>
            <Link href="https://www.youtube.com/@sportzpoint" className="hover:opacity-80">
              <Image src="/youtube.svg" alt="YouTube" width={22} height={22} />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mb-10">
          <h3 className="text-lg font-bold uppercase mb-4">Quick Links</h3>
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {quickLinks.map((link, index) => (
              <li key={index} className="flex items-center">
                <span className="mr-2 text-sm">•</span>
                <Link 
                  href={link.href}
                  className="text-zinc-200 hover:text-white text-sm"
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Latest Stories */}
        <div className="mb-10">
          <h3 className="text-lg font-bold uppercase mb-4">Latest Stories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {latestStories.map((story, index) => (
              <Link 
                key={index}
                href={story.href}
                className="text-zinc-200 hover:text-white text-sm line-clamp-2 flex items-start"
              >
                <span className="mr-2 flex-shrink-0">•</span>
                <span>{story.title}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Made with Love Section */}
        <div className="border-t border-[#007e6c] py-4 px-4">
          <div className="text-sm flex items-center justify-center flex-wrap gap-1 text-zinc-200 text-center">
            Made with 
            <span role="img" aria-label="love" className="text-yellow-500 mx-1">💛</span> 
            by 
            <a 
              href="https://github.com/adaptedbrains" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-zinc-300 font-medium lowercase ml-1"
            >
              adapted brains
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;