"use client";
import Image from "next/image";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { RiMenu2Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <nav className="fixed bg-white top-0 left-0 right-0 z-50 pt-4">
      <div className="px-4 lg:px-28">
        {/* Logo and Navigation */}
        <div className="flex items-center gap-4 w-full">
          <div className="font-bold text-xl flex gap-1 items-center">
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {!isMenuOpen && <RiMenu2Line size={25} color="green" />}
            </button>
            <Link href={"/"}>
              <Image src={"/logo/logo.webp"} alt="logo" width={150} height={30} />
            </Link>
          </div>

          {/* Desktop Navigation Menu */}
          <div className="hidden lg:flex gap-6">
            {navigationItems.map((nav) => (
              <button
                type="button"
                key={nav.slugName}
                onClick={() => setIsMenuOpen(false)}
              >
                <Link
                  href={nav.slugName}
                  className="hover:text-green-800 text-gray-800 text-sm font-medium uppercase tracking-wide"
                >
                  {nav.name}
                </Link>
              </button>
            ))}
          </div>
        </div>

        {/* Green Timeline Line */}
        <div className="h-[2px] bg-green-800 mt-4"></div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed top-0 left-0 w-3/4 bg-white h-full z-50 p-4"
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
                <RxCross2 size={25} color="green" />
              </button>
              {navigationItems.map((nav) => (
                <Link
                  key={nav.slugName}
                  href={nav.slugName}
                  className="text-gray-800 text-lg uppercase tracking-wide"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {nav.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavigationBar;