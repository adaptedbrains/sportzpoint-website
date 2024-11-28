"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { RiMenu2Line } from "react-icons/ri";
import { useRouter } from 'next/navigation';

const NavigationBar = () => {
  const [search, setSearch] = useState("remove");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/article/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      setSearchResults(data.slice(0, 5)); // Limit to 5 results
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

  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearch("remove");
      setSearchQuery("");
    }
  };

  // Close search on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setSearch("remove");
        setSearchQuery("");
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <nav className="sticky top-0 z-50">
      {/* White space section */}
      <div className="bg-white h-1" />

      {/* Main navigation bar with green background */}
      <div className="bg-[#1B5E20] text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-12">
            {/* Logo section */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <div className="bg-white py-0.5 px-1.5 rounded-sm">
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

            {/* Navigation items */}
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

            {/* Search button */}
            <div className="flex items-center">
              <button
                onClick={() => setSearch(search === "remove" ? "add" : "remove")}
                className="text-white hover:text-gray-200 p-1"
                aria-label="Search"
              >
                <FaSearch className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden bg-[#1B5E20] text-white"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.slugName}
                  href={item.slugName}
                  className="block px-3 py-2 text-base font-medium hover:bg-[#2E7D32]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Search overlay */}
      <AnimatePresence>
        {search === "add" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-20 px-4"
          >
            <div className="bg-white rounded-lg w-full max-w-2xl shadow-xl">
              <form onSubmit={handleSearchSubmit} className="p-4">
                <div className="flex items-center bg-gray-50 rounded-lg">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search for sports, teams, players..."
                    className="flex-1 p-3 bg-transparent border-none rounded-l-lg focus:outline-none text-gray-900"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setSearch("remove")}
                    className="p-3 text-gray-500 hover:text-gray-700"
                    aria-label="Close search"
                  >
                    <RxCross2 className="h-5 w-5" />
                  </button>
                </div>
              </form>

              {/* Search results */}
              {searchQuery && (
                <div className="border-t">
                  {isLoading ? (
                    <div className="p-4 text-center text-gray-500">
                      Searching...
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="max-h-96 overflow-y-auto">
                      {searchResults.map((result) => (
                        <Link
                          key={result._id}
                          href={`/${result.category}/${result.slug}`}
                          onClick={() => setSearch("remove")}
                          className="block p-4 hover:bg-gray-50 transition-colors"
                        >
                          <h3 className="text-gray-900 font-medium">{result.title}</h3>
                          <p className="text-sm text-gray-500 mt-1">{result.category}</p>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      No results found
                    </div>
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