// Sidebar.tsx boiler plate oki? shut up
'use client';
import React, { useState } from 'react';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-64 overflow-y-auto bg-black-800 text-white h-screen transition duration-300 ease-in-out ${
        isOpen ? 'z-50' : 'z-10'
      } transform ${isOpen ? '-translate-x-0' : '-translate-x-full'}`}
    >
      <button onClick={toggleSidebar} className="py-4 px-6 text-left font-bold">
        Toggle Sidebar
      </button>
      <ul className="mt-6">
        <li>
          <a href="/dashboard" className="block py-2 px-4 hover:bg-gray-700">
            Dashboard
          </a>
        </li>
        <li>
          <a href="/bookmarks" className="block py-2 px-4 hover:bg-gray-700">
            Bookmarks
          </a>
        </li>
        <li>
          <a href="/discussion" className="block py-2 px-4 hover:bg-gray-700">
            Discussion
          </a>
        </li>
        <li>
          <a href="/account" className="block py-2 px-4 hover:bg-gray-700">
            Account
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
