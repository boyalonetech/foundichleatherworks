"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Filter = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mt-16 flex justify-between sm:mt-12">
      <div className="flex gap-6 flex-wrap">
        <select
          name="type"
          id=""
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED] flex justify-between"
          onChange={handleFilterChange}
        >
          <option>Type</option>
          <option value="physical">Physical</option>
          <option value="digital">Digital</option>
        </select>
        <div className="flex justify-between gap-[8rem] sm:gap-4">
          <input
            type="text"
            name="min"
            placeholder="min price"
            className="text-xs rounded-2xl pl-2 py-2 w-24 ring-1 ring-gray-400"
            onChange={handleFilterChange}
          />
          <input
            type="text"
            name="max"
            placeholder="max price"
            className="text-xs rounded-2xl pl-2 py-2 w-24 ring-1 ring-gray-400"
            onChange={handleFilterChange}
          />
        </div>
      </div>
      <div className="">
        <select
          name=""
          id=""
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED] hidden sm:block"
        >
          <option>All Filters</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
