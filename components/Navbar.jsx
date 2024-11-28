"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { RiMenu2Line } from "react-icons/ri";

const NavigationBar = () => {
  const [search, setSearch] = useState("remove");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { name: "Cricket", slugName: "/cricket" },
    { name: "Football", slugName: "/football" },
    { name: "Hockey", slugName: "/hockey" },
    { name: "Icc Wt20 Wc 24", slugName: "/tags/icc-womens-t20-world-cup-2024" },
    { name: "ISL 2024-25", slugName: "/tags/isl-2024-25" },
    { name: "Women In Sports", slugName: "/tags/women-in-sports" },
    { name: "Athletics", slugName: "/athletics" },
    { name: "Tennis", slugName: "/tennis" },
  ];

  const variants = {
    enter: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: { duration: 0.5 },
    },
    initialHidden: {
      x: "200%",
      opacity: 0,
    },
  };

  return (
    <div className="sticky top-0 z-50">
      {/* White section with search */}
      <div className="bg-white flex justify-between items-center px-4 lg:px-28 py-1 h-10">
        {/* Logo */}
        <div className="flex-1 flex justify-center h-full">
          <Link href="/" className="h-full flex items-center">
            <div className="w-[80px] h-[24px] relative">
              <Image
                src="/header.png"
                alt="Sportzpoint"
                fill
                sizes="80px"
                className="object-contain brightness-0 invert"
                priority
              />
            </div>
          </Link>
        </div>
        
        {/* Search - Positioned absolutely to maintain center alignment of logo */}
        <div className="absolute right-4 lg:right-28 flex items-center gap-3">
          <div className="overflow-hidden">
            <AnimatePresence>
              {search === "search" && (
                <motion.div
                  className="relative flex items-center px-2 bg-gray-100 h-full py-1 overflow-hidden rounded"
                  initial="initialHidden"
                  animate="enter"
                  exit="exit"
                  variants={variants}
                >
                  <FaSearch size={18} className="text-gray-600" />
                  <input
                    type="text"
                    placeholder="Search Sports, Teams, Players..."
                    className="border-0 outline-none focus:outline-none text-gray-800 ml-2 w-60 bg-transparent"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button
            type="button"
            className="p-1"
            onClick={() => setSearch(search === "search" ? "remove" : "search")}
          >
            {search === "search" ? (
              <RxCross2 size={20} className="text-gray-600" />
            ) : (
              <FaSearch size={18} className="text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Main navigation */}
      <div className="bg-[#39803E] text-white flex items-center px-4 lg:px-28 py-2">
        <button
          className="lg:hidden p-2 text-white hover:text-gray-200"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <RiMenu2Line size={24} />
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center mr-6">
          <div className="w-[80px] h-[24px] relative">
            <Image
              src="/header.png"
              alt="Sportzpoint"
              fill
              sizes="80px"
              className="object-contain brightness-0 invert"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6 w-full text-[15px]">
          {navigationItems.slice(1).map((item) => (
            <Link
              key={item.slugName}
              href={item.slugName}
              className="text-white hover:text-gray-200 transition-colors duration-200"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: "-100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "-100%" }}
              className="fixed top-[72px] left-0 w-full h-screen bg-[#39803E] lg:hidden z-50"
            >
              <div className="flex flex-col space-y-4 p-4">
                {navigationItems.slice(1).map((item) => (
                  <Link
                    key={item.slugName}
                    href={item.slugName}
                    className="text-white hover:text-gray-200 transition-colors duration-200 text-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Hamburger Menu for Mobile */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed top-0 left-0 w-3/4 bg-[#006356] h-full z-50 p-4"
            initial="initialHidden"
            animate="enter"
            exit="exit"
            variants={variants}
          >
            <div className="flex flex-col gap-4 relative">
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="top-0 end-2 absolute"
              >
                <RxCross2 size={25} color="white" />
              </button>
              {navigationItems.map((nav) => (
                <Link
                  key={nav.slugName}
                  href={nav.slugName}
                  className="text-white text-sm uppercase"
                >
                  {nav.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavigationBar;