"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { HiMenuAlt3 } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from 'next/navigation';

const NavigationBar = () => {
  const [search, setSearch] = useState("remove");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const navigationItems = [
    { name: "CRICKET", slugName: "/cricket" },
    { name: "FOOTBALL", slugName: "/football" },
    { name: "HOCKEY", slugName: "/hockey" },
    { name: "ICC WT20 WC 24", slugName: "/tags/icc-womens-t20-world-cup-2024" },
    { name: "ISL 2024-25", slugName: "/tags/isl-2024-25" },
    { name: "WOMEN IN SPORTS", slugName: "/tags/women-in-sports" },
    { name: "ATHLETICS", slugName: "/athletics" },
    { name: "TENNIS", slugName: "/tennis" },
  ];

  // Debounce function
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };

  // Search function
  const performSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      
      // Ensure data is an array and handle the response properly
      const results = Array.isArray(data) ? data : data.results || [];
      setSearchResults(results.slice(0, 5)); // Limit to 5 results
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search
  const debouncedSearch = debounce(performSearch, 300);

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  // Handle search result click
  const handleResultClick = (slug) => {
    setSearch("remove");
    setSearchQuery("");
    setSearchResults([]);
    router.push(slug);
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setSearch("remove");
        setSearchQuery("");
        setSearchResults([]);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <nav className="sticky top-0 z-50">
      {/* Main navigation bar with teal background */}
      <div className="bg-[#006356] text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-12">
            {/* Logo section */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center cursor-pointer">
                <div className="bg-white py-0.5 px-1.5 rounded-sm hover:opacity-90 transition-opacity">
                  <Image
                    src="/nav.webp"
                    alt="SportzPoint"
                    width={110}
                    height={32}
                    className="h-6 w-auto"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Navigation items - Desktop */}
            <div className="hidden lg:flex flex-1 justify-start space-x-5 ml-6">
              {navigationItems.map((item) => (
                <Link
                  key={item.slugName}
                  href={item.slugName}
                  className="text-white hover:text-gray-200 px-2 py-1 text-[13px] font-medium tracking-wide whitespace-nowrap"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Search and Menu buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSearch(search === "remove" ? "add" : "remove")}
                className="text-white hover:text-gray-200 p-1"
                aria-label="Search"
              >
                <FaSearch className="h-4 w-4" />
              </button>
              
              {/* Hamburger Menu Button - Mobile only */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden text-white hover:text-gray-200 p-1"
                aria-label="Menu"
              >
                <HiMenuAlt3 className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white shadow-lg overflow-hidden"
          >
            <div className="container mx-auto px-4 py-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.slugName}
                  href={item.slugName}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-gray-800 hover:text-[#006356] text-sm font-medium border-b border-gray-100 last:border-none"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search overlay */}
      <AnimatePresence>
        {search === "add" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute w-full bg-white shadow-lg"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search articles..."
                  className="w-full p-2 pr-10 border border-gray-300 rounded focus:outline-none focus:border-green-700"
                  autoFocus
                />
                <button
                  onClick={() => {
                    setSearch("remove");
                    setSearchQuery("");
                    setSearchResults([]);
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  <RxCross2 className="h-5 w-5" />
                </button>
              </div>

              {/* Search results */}
              {searchQuery && (
                <div className="mt-4">
                  {isLoading ? (
                    <div className="text-center text-gray-500">Loading...</div>
                  ) : searchResults.length > 0 ? (
                    <ul className="space-y-2">
                      {searchResults.map((result, index) => (
                        <li key={index}>
                          <button
                            onClick={() => handleResultClick(result.slug)}
                            className="w-full text-left p-2 hover:bg-gray-100 rounded"
                          >
                            {result.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-center text-gray-500">No results found</div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavigationBar;