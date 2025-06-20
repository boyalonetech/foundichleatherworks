"use client";

import { useRouter } from "next/navigation";


const SearchBar = () => {
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;

    if (name) {
      router.push(`/list?name=${name}`);
    }
  };

  return (
<form
  className="flex items-center gap-4 w-[88%] sm:w-full marker:selection:first-line: px-5 py-[6px] bg-gray-200 rounded-2xl"
  onSubmit={handleSearch}
>
  <input
    type="text"
    name="name"
    placeholder="Search Products"
    className="flex-1 py-1 bg-transparent outline-none text-base"
  />
  <button type="submit" className="cursor-pointer">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25px"
      height="25px"
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
