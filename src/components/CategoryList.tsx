import { wixClientServer } from "@/lib/wixClientServer";
import Image from "next/image";
import Link from "next/link";

const CategoryList = async () => {
  const wixClient = await wixClientServer();

  const cats = await wixClient.collections.queryCollections().find();

  return (
    <div className="px-4 overflow-x-scroll scrollbar-hide">
      <div className="flex gap-4 md:gap-8 ">
        {cats.items.map((item) => (
          <Link
            href={`/list?cat=${item.slug}`}
            className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6"
            key={item._id}
          >
            <div className="relative bg-slate-100 w-full max-w-[400px] h-[300px] mx-auto overflow-hidden">
              <Image
                src={
                  item.media?.mainMedia?.image?.url ||
                  "/4222b3e38e32630b7510ef61e6c54f36.jpg"
                }
                alt="product"
                fill
                sizes="(min-width: 1024px) 400px, (min-width: 768px) 300px, 100vw"
                quality={100}
                className="scale-[1.5] object-cover"
              />
            </div>
            <h1 className="mt-8 font-sm text-xl tracking-wide">{item.name}</h1>
          </Link>
        ))}{" "}
      </div>
    </div>
  );
};

export default CategoryList;
