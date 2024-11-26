'use client'

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import usePostStore from "@/store/postStore";

const Footer = () => {
  const { fetchLatestStory, latestStory } = usePostStore();
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad.current) {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/article/latest-articles`;
      fetchLatestStory(url);
      isFirstLoad.current = false;
    }
  }, [fetchLatestStory]);

  const sportsLinks = [
    { text: "Cricket", href: "/cricket" },
    { text: "Football", href: "/football" },
    { text: "Tennis", href: "/tennis" },
    { text: "Hockey", href: "/hockey" },
    { text: "Badminton", href: "/badminton" },
    { text: "Athletics", href: "/athletics" },
    { text: "Olympics", href: "/olympics" },
  ];

  const specialCoverage = [
    { text: "ICC WT20 WC 24", href: "/icc-wt20-wc-24" },
    { text: "ISL 2024-25", href: "/isl-2024-25" },
    { text: "Premier League", href: "/premier-league" },
    { text: "Women in Sports", href: "/women-in-sports" },
    { text: "E-Sports", href: "/e-sports" },
    { text: "Transfer News", href: "/transfer-news" },
  ];

  const companyLinks = [
    { text: "About Us", href: "/about-us" },
    { text: "Partners", href: "/partners" },
    { text: "Disclaimer", href: "/disclaimer" },
    { text: "Privacy Policy", href: "/privacy-policy" },
    { text: "Contact", href: "/contact" },
    { text: "Sports Guest Post", href: "/sports-guest-post" },
    { text: "FAQ", href: "/faq" }
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Sports Section */}
          <div>
            <h3 className="text-sm font-bold mb-4 uppercase tracking-wider">Sports</h3>
            <ul className="space-y-2">
              {sportsLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-gray-600 hover:text-gray-900 text-sm"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Special Coverage */}
          <div>
            <h3 className="text-sm font-bold mb-4 uppercase tracking-wider">Special Coverage</h3>
            <ul className="space-y-2">
              {specialCoverage.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-gray-600 hover:text-gray-900 text-sm"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Latest Stories */}
          <div>
            <h3 className="text-sm font-bold mb-4 uppercase tracking-wider">Latest Stories</h3>
            <ul className="space-y-2">
              {latestStory && latestStory.slice(0, 6).map((story, index) => (
                <li key={index}>
                  <Link 
                    href={`/${story.categories[0]?.slug}/${story.slug}`}
                    className="text-gray-600 hover:text-gray-900 text-sm line-clamp-2"
                  >
                    {story.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-bold mb-4 uppercase tracking-wider">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-gray-600 hover:text-gray-900 text-sm"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Company Info */}
        <div className="text-sm text-gray-600 mb-8 pb-8 border-b border-gray-200">
          <p className="mb-2">
            SportzPoint is a global, multi-platform sports media company delivering in-depth news, insights, and stories across cricket, football, and other major sports.
          </p>
          <p>
            For inquiries and updates, contact us at{' '}
            <a 
              href="mailto:mail@sportzpoint.com"
              className="text-gray-600 hover:text-gray-900 underline"
            >
              mail@sportzpoint.com
            </a>
          </p>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <Image 
            src="/logo.png" 
            alt="Sportzpoint Logo" 
            width={120} 
            height={40}
            className="h-8 w-auto"
          />
          <div className="text-sm text-gray-900 flex items-center justify-center flex-wrap gap-1">
            Made with 
            <span role="img" aria-label="love" className="text-yellow-500">💛</span> 
            and 
            <span role="img" aria-label="coffee" className="mx-1">☕</span> 
            by 
            <a 
              href="https://github.com/adaptedbrains" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-900 hover:text-gray-700 font-medium ml-1"
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