"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { categoryFilters } from "@/constants";

const Categories = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const category = searchParams.get("category");

  const handleTags = (item: string) => {
    router.push(`${pathName}?category=${item}`);
  };

  return (
    <div className="flexBetween w-full gap-5 flex-wrap">
      <ul className="flex gap-2 overflow-auto scroll-m-0 -scroll-ml-80">
        <button
          type="button"
          onClick={() => router.push(`${pathName}`)}
          className={`${
            !category
              ? "bg-light-white-300 font-medium text-primary"
              : "font-normal"
          } px-4 py-3 rounded-lg capitalize whitespace-nowrap`}
        >
          {"All Category"}
        </button>
        {categoryFilters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => handleTags(filter)}
            className={`${
              category === filter
                ? "bg-light-white-300 font-medium text-primary"
                : "font-normal"
            } px-4 py-3 rounded-lg capitalize whitespace-nowrap`}
          >
            {filter}
          </button>
        ))}
      </ul>
    </div>
  );
};

export default Categories;