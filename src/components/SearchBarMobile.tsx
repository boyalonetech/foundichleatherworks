"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const SearchBar = ({ onCancel }: { onCancel?: () => void }) => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchValue) {
      router.push(`/list?name=${searchValue}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center w-full sm:w-full px-4 py-2 bg-gray-200 rounded-2xl"
    >
      {/* Clear button (left inside input) - ALWAYS VISIBLE */}
      <button
        type="button"
        onClick={() => {
          setSearchValue("");
          onCancel?.();
        }}
        className={`p-1 mr-2 rounded-full transition ${
          searchValue
            ? "hover:bg-gray-300 text-black cursor-pointer"
            : "text-black cursor-pointer"
        }`}
        title="Clear"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M420.48 121.813L390.187 91.52L256 225.92L121.813 91.52L91.52 121.813L225.92 256L91.52 390.187l30.293 30.293L256 286.08l134.187 134.4l30.293-30.293L286.08 256z"
          ></path>
        </svg>
      </button>

      {/* Search input */}
      <input
        type="text"
        name="name"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search Products"
        className="flex-1 bg-transparent outline-none text-base"
      />

      {/* Search icon (right) */}
      <button type="submit" className="p-1 ml-1 cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M14.385 15.446a6.75 6.75 0 1 1 1.06-1.06l5.156 5.155a.75.75 0 1 1-1.06 1.06zm-7.926-1.562a5.25 5.25 0 1 1 7.43-.005l-.005.005l-.005.004a5.25 5.25 0 0 1-7.42-.004"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </form>
  );
};

export default SearchBar;
