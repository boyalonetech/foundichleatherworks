import React from 'react'

const Text = () => {
  return (
    <div>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Search"
              className="bg-transparent outline-none w-48 sm:w-64"
            />
            <button type="submit" className="text-gray-700">
              {/* Submit Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
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

            {/* Cancel (X) Button */}
            <button
              type="button"
              onClick={() => setIsSearch(false)}
              className="ml-2 p-1 rounded-full hover:bg-gray-300 text-gray-600"
              title="Cancel"
            >
              {/* Cancel Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59L7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12l-4.89 4.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.89a1 1 0 0 0 0-1.4"
                />
              </svg>
            </button>
          </div>
    </div>
  )
}

export default Text
