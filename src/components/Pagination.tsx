"use client";
import Link from "next/link";

const Pagination = ({
  currentPage,
  hasPrev,
  hasNext,
}: {
  currentPage: number;
  hasPrev: boolean;
  hasNext: boolean;
}) => {
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  return (
    <div className="w-full flex justify-center mt-8 gap-4">
      {hasPrev && (
        <Link
          href={`?page=${prevPage}`}
          className="px-4 py-2 rounded-xl border text-sm hover:bg-gray-200"
        >
          Prev
        </Link>
      )}
      <span className="px-4 py-2 rounded-xl border text-sm bg-gray-100">
        Page {currentPage}
      </span>
      {hasNext && (
        <Link
          href={`?page=${nextPage}`}
          className="px-4 py-2 rounded-xl border text-sm hover:bg-gray-200"
        >
          Next
        </Link>
      )}
    </div>
  );
};

export default Pagination;
