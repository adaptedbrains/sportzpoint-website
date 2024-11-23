"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FaSearch, FaUser } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { RiMenu2Line } from "react-icons/ri";

const NavigationBar = () => {
  const [search, setSearch] = useState("remove");
  // const [isMenuOpen, setIsMenuOpen] = useState(false); /

  const navigationItems = [
    { name: "Cricket", slugName: "/cricket" },
    { name: "Football", slugName: "/football" },
    { name: "Hockey", slugName: "/hockey" },
    { name: "ISL 2024-25", slugName: "/tags/isl-2024-25" },
    { name: "Women In Sports", slugName: "/tags/women-in-sports" },
    { name: "Athletics", slugName: "/athletics" },
    { name: "Tennis", slugName: "/tennis" },
    { name: "Premier League 2024-25", slugName: "/tags/english-premier-league-2024-25" },
    { name: "Sportz Point Speaks", slugName: "/tags/sportz-point-speaks" },
    
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
    <div className="border-t border-b border-[#E6E8EA] bg-gray-100 text-black flex justify-center items-center px-4 lg:px-28 py-1 sticky top-0">
      <div className="flex items-center justify-center  gap-4 w-full">
          {/* <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {!isMenuOpen && <RiMenu2Line size={25} color="black" />}
          </button> */}
          {/* <Link href={"/"} >
        <div className="font-bold text-xl bg-white px-3 m-0 flex gap-1 items-center">
          <Image src={"/logo/logo.webp"} alt="logo" width={150} height={30} />
        </div>
          </Link> */}

        {/* Hamburger Icon for mobile */}

        {/* Navigation Menu */}
        <div className="hidden lg:flex gap-4">
          {navigationItems.map((nav) => (
            <button
              type="button"
              key={nav.slugName}
              onClick={() => setIsMenuOpen(false)} // Close menu when a link is clicked
            >
              <Link
                href={nav.slugName}
                className="hover:text-black text-zinc-900 font-bold"
              >
                {nav.name}
              </Link>
            </button>
          ))}
        </div>

        
        
      </div>

      {/* Hamburger Menu for Mobile */}
      {/* <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed top-0 left-0 w-3/4 bg-green-800 h-full z-50 p-4"
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
                {" "}
                <RxCross2 size={25} color="white" />{" "}
              </button>
              {navigationItems.map((nav) => (
                <Link
                  key={nav.slugName}
                  href={nav.slugName}
                  className="text-white text-lg"
                >
                  {nav.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

     
      <div className="flex items-center gap-4 relative">
        <div className="overflow-hidden">
          <AnimatePresence>
            {search === "search" && (
              <motion.div
                className="relative flex items-center px-2 bg-white h-full py-1 overflow-hidden"
                initial="initialHidden"
                animate="enter"
                exit="exit"
                variants={variants}
              >
                <FaSearch size={20} color="black" />
                <input
                  type="text"
                  placeholder="Search Sports, Teams, Players..."
                  className="border-0 outline-none focus:outline-none text-black ml-2 w-60"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <button
          type="button"
          className="p-2"
          onClick={() => setSearch(search === "search" ? "remove" : "search")}
        >
          {search === "search" ? (
            <RxCross2 size={20} />
          ) : (
            <FaSearch size={20} />
          )}
        </button>
        <FaUser className="border p-1 rounded-full" size={25} />
      </div> */}
    </div>
  );
};

export default NavigationBar;
