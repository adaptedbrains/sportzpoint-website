import Image from 'next/image';
import React from 'react';
import { FaSearch, FaUser } from 'react-icons/fa';

const NavigationBar = () => {
  return (
    <div className="bg-zinc-800 text-white flex justify-between items-center px-28 py-2">
      <div className="flex items-center gap-4">
        <div className="font-bold text-xl"> <Image src={'/logo/logo.webp'} alt='logo' width={150} height={70}   />  </div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-gray-400">Football</a>
          <a href="#" className="hover:text-gray-400">Cricket</a>
          <a href="#" className="hover:text-gray-400">Chess</a>
          <a href="#" className="hover:text-gray-400">ISL</a>
          <a href="#" className="hover:text-gray-400">F1</a>
          <a href="#" className="hover:text-gray-400">NBA</a>
          <a href="#" className="hover:text-gray-400">Hockey</a>
          <a href="#" className="hover:text-gray-400">More Sports</a>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <FaSearch />
        <FaUser />
      </div>
    </div>
  );
};

export default NavigationBar;
