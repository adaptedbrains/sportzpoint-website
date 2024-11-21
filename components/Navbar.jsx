"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaSearch, FaUser } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";

const NavigationBar = () => {
  const [search, setSearch] = useState("remove");

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
          <a href="#" className="hover:text-white text-zinc-400">
            Football
          </a>
          <a href="#" className="hover:text-white text-zinc-400">
            Cricket
          </a>
          <a href="#" className="hover:text-white text-zinc-400">
            Chess
          </a>
          <a href="#" className="hover:text-white text-zinc-400">
            ISL
          </a>
          <a href="#" className="hover:text-white text-zinc-400">
            F1
          </a>
          <a href="#" className="hover:text-white text-zinc-400">
            NBA
          </a>
          <a href="#" className="hover:text-white text-zinc-400">
            Hockey
          </a>
          <a href="#" className="hover:text-white text-zinc-400">
            More Sports
          </a>
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
