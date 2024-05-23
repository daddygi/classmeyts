// components/SearchBar.js
import React from "react";

interface SearchBarProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onChange, onClick }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search title you are interested in..."
          className="w-[576px] p-2 border border-main-color-blue rounded-l-md text-lg focus:outline-none shadow-lg"
          onChange={onChange}
        />
        <button
          className="px-4 py-2 border border-secondary-color-blue bg-main-color-blue text-black text-lg rounded-md shadow-lg w-[145px]"
          onClick={onClick}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
