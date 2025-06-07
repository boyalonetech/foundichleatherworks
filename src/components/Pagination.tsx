"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import LoadingScreen from "./LoadingScreen";

const Pagination = ({
  currentPage,
  hasPrev,
  hasNext,
}: {
  currentPage: number;
  hasPrev: boolean;
  hasNext: boolean;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mt-12 flex justify-between w-full">
        <Suspense fallback={<LoadingScreen />}>
      <button
        className="rounded-md bg-found text-white p-2 text-sm w-24 cursor-pointer disabled:cursor-not-allowed disabled:bg-red-300"
        disabled={!hasPrev}
        onClick={() => createPageUrl(currentPage - 1)}
      >
        Previous
      </button>
      <button
        className="rounded-md bg-found text-white p-2 text-sm w-24 cursor-pointer disabled:cursor-not-allowed disabled:bg-red-300"
        disabled={!hasNext}
        onClick={() => createPageUrl(currentPage + 1)}
      >
        Next
      </button>
      </Suspense>
    </div>
  );
};

export default Pagination;