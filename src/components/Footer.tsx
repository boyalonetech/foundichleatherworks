import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="py-20 px-4 md:px-8 lg:px-16 xl:32 2xl:64 bg-gray-100 text-sm mt-20">
      {/*  TOP */}
      <div className="flex flex-col md:flex-row justify-center gap-24 ">
        {/* LEFT */}
        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
          <Link href="/">
            <div className="text-2xl tracking-wide font-bold">Foundich</div>
          </Link>{" "}
          <p>14 Powerline, Ariaria International Market, Osisioma Ngwa, Aba 453113, Abia State, Nigeria</p>
          <span className="font-[600] ">foundichleatherworks@gmail.com</span>
          <span className="font-semibold ">+2349074833734</span>
          <div className="flex gap-6">
            <Image src="/facebook.png" alt="icon" width={16} height={16} />
            <Image src="/instagram.png" alt="icon" width={16} height={16} />
            <Image src="/youtube.png" alt="icon" width={16} height={16} />
            <Image src="/pinterest.png" alt="icon" width={16} height={16} />
            <Image src="/x.png" alt="icon" width={16} height={16} />
          </div>
        </div>
        {/* CENTER */}
        <div className="hidden lg:flex justify-between w-1/2 ">
          <div className="flex flex-col justify-between">
            <h1 className="font-medium text-lg">COMPANY</h1>
            <div className="flex flex-col gap-6">
              <Link href="/">About Us</Link>
              <Link href="/">Careers</Link>
              <Link href="/">Affiliates</Link>
              <Link href="/">Blog</Link>
              <Link href="/">Contact Us</Link>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <h1 className="font-medium text-lg">SHOP</h1>
            <div className="flex flex-col gap-6">
              <Link href="/">New Arrivals</Link>
              <Link href="/">Accessories</Link>
              <Link href="/">Men</Link>
              <Link href="/">Women</Link>
              <Link href="/">All Products</Link>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <h1 className="font-medium text-lg">HELP</h1>
            <div className="flex flex-col gap-6">
              <Link href="/">Customer Service</Link>
              <Link href="/">My Account</Link>
              <Link href="/">Find a Store</Link>
              <Link href="/">Legacy & Privacy</Link>
              <Link href="/certification" className="hover:text-found">Certification</Link>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
          <h1 className="font-medium text-lg ">SUBSCRIBE</h1>
          <p>
            Be the first to get the latest news about trends, updates and more!
          </p>
          <div className="flex ">
            <input
              type="text"
              placeholder="Email Address"
              className="p-3 rounded-l-xl w-3/4 "
            />
            <button className="w-1/4 bg-found text-white rounded-r-xl">JOIN</button>
          </div>
          <span className="font-semibold">Secure Payments</span>
          <div className="flex justify-between">
            <Image src="/discover.png" alt="" width={40} height={20} />{" "}
            <Image src="/skrill.png" alt="" width={40} height={20} />{" "}
            <Image src="/paypal.png" alt="" width={40} height={20} />{" "}
            <Image src="/mastercard.png" alt="" width={40} height={20} />{" "}
            <Image src="/visa.png" alt="" width={40} height={20} />{" "}
          </div>
        </div>
      </div>
      {/*  BOTTOM */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-16">
        <div className="font-semibold">&copy; 2025 Foundich</div>
        <div className="">
          <div className="">
            <span className="text-gray-500 mr-4 ">Language</span>
            <span className="font-medium">Nigeria | English</span>
          </div>
        </div>
          <div className="">
            <span className="text-gray-500 mr-4 ">Currency</span>
            <span className="font-medium">₦ | Nigerian Naira</span>
          </div>
        </div>
    </div>
  );
};

export default Footer;
