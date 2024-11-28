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
        {/* <div className="flex-1 flex justify-center h-full">
          <Link href="/" className="h-full flex items-center">
            <Image
              src="/header.png"
              alt="Sportzpoint"
              width={140}
              height={28}
              className="object-contain h-[24px] w-auto"
              priority
            />
          </Link>
        </div> */}
        
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
      <div className="bg-[#006356] text-white flex items-center px-4 lg:px-28 py-3">
        <button
          className="lg:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {!isMenuOpen && <RiMenu2Line size={24} color="white" />}
        </button>

        {/* Navigation Menu */}
        <div className="hidden lg:flex gap-6">
          {navigationItems.map((nav) => (
            <button
              type="button"
              key={nav.slugName}
              onClick={() => setIsMenuOpen(false)}
            >
              <Link
                href={nav.slugName}
                className="hover:text-white text-zinc-200 text-sm uppercase font-medium"
              >
                {nav.name}
              </Link>
            </button>
          ))}
        </div>
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