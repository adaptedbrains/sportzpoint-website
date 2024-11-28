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
    { text: "Privacy Policy", href: "/privacy-policy" },
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
    <footer className="bg-[#006356] text-white w-full py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header with Logo and Social Icons */}
        <div className="flex justify-between items-start mb-12">
          <Image 
            src="/footer.png" 
            alt="SportzPoint" 
            width={100} 
            height={35}
            className="object-contain"
          />
          <div className="flex gap-4">
            <Link href="https://www.linkedin.com/company/sportzpoint" className="hover:opacity-80">
              <Image src="/linkedin.svg" alt="LinkedIn" width={24} height={24} />
            </Link>
            <Link href="https://www.instagram.com/sportzpoint" className="hover:opacity-80">
              <Image src="/instagram.svg" alt="Instagram" width={24} height={24} />
            </Link>
            <Link href="https://twitter.com/sportz_point" className="hover:opacity-80">
              <Image src="/twitter.svg" alt="Twitter" width={24} height={24} />
            </Link>
            <Link href="https://www.youtube.com/@sportzpoint" className="hover:opacity-80">
              <Image src="/youtube.svg" alt="YouTube" width={24} height={24} />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-white mb-4">QUICK LINKS</h3>
          <ul className="flex flex-wrap gap-x-8 gap-y-2">
            <li className="flex items-center">
              <span className="mr-2 text-lg">•</span>
              <Link 
                href="/about-us"
                className="text-zinc-200 hover:text-white"
              >
                About Us
              </Link>
            </li>
            {quickLinks.slice(1).map((link, index) => (
              <li key={index} className="flex items-center">
                <span className="mr-2 text-lg">•</span>
                <Link 
                  href={link.href}
                  className="text-zinc-200 hover:text-white"
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Info */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-white mb-4 max-w-3xl">
            SPORTZPOINT IS A GLOBAL, MULTI-PLATFORM SPORTS MEDIA COMPANY
          </h3>
          <div className="space-y-2">
            <p>For More Queries And News</p>
            <p>Contact Us On This Email:</p>
            <p>mail@sportzpoint.com</p>
          </div>
        </div>

        {/* Latest Stories */}
        <div className="border-t border-gray-200 pt-8 mb-12">
          <h3 className="text-xl font-bold text-white mb-6">LATEST STORIES</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestStories.map((story, index) => (
              <div key={index} className="flex items-start">
                <span className="mr-2 text-lg mt-1">•</span>
                <Link 
                  href={story.href}
                  className="hover:text-gray-300 transition-colors"
                >
                  {story.title}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Powered By Section */}
        <div className="flex flex-col items-center justify-center text-center border-t border-gray-200 pt-8">
          <div className="text-sm flex items-center justify-center flex-wrap gap-1">
            Made with 
            <span role="img" aria-label="love" className="text-yellow-500">💛</span> 
            by 
            <a 
              href="https://github.com/adaptedbrains" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 font-medium ml-1"
            >
              Adapted Brains
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;