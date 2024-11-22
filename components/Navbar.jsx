"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaSearch, FaUser } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const NavigationBar = () => {
  const [search, setSearch] = useState("remove");
  const navigationItems = [
    { name: "Cricket", slugName: "/cricket" },
    { name: "Football", slugName: "/football" },
    { name: "Hockey", slugName: "/hockey" },
    // { name: "ICC WT20 WC 24", slugName: "/tags/icc-womens-t20-world-cup-2024" },
    { name: "ISL 2024-25", slugName: "/tags/isl-2024-25" },
    // { name: "Premier League 2024-25", slugName: "/tags/sportz-point-speaks" },
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
      x: "100%", // Exit right to left
      opacity: 0,
      transition: { duration: 0.5 },
    },
    initialHidden: {
      x: "200%", // Enter left to right
      opacity: 0,
    },
  };
  return (
    <div className="bg-zinc-800 text-white flex justify-between items-center px-28 py-1  sticky top-0 ">
      <div className="flex items-center gap-4">
        <div className="font-bold text-xl bg-white px-3 m-0 ">
          {" "}
          <Image
            src={"/logo/logo.webp"}
            className=""
            alt="logo"
            width={150}
            height={30}
          />{" "}
        </div>
        <div className="flex gap-4">
          {navigationItems.map((nav, i) => {
            return (
              <Link
              key={nav.slugName}
              href={nav.slugName}
              className="hover:text-white text-zinc-400"
            >
              {nav.name}
            </Link>
            );
          })}
        </div>
      </div>
      <div className="flex items-center gap-4  relative ">
        <div className=" overflow-hidden">
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
      </div>
    </div>
  );
};

export default NavigationBar;
