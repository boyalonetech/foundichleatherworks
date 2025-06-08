import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="py-20 px-4 md:px-8 lg:px-16 xl:32 2xl:64 bg-gray-100 text-sm mt-20">
      {/*  TOP */}
      <div className="flex flex-col md:flex-row justify-center gap-24 ">
        {/* LEFT */}
        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
          <Link href="/admin">
            <div className="text-2xl tracking-wide font-bold">Foundich</div>
          </Link>{" "}
          <p>
            14 Powerline, Ariaria International Market, Osisioma Ngwa, Aba
            453113, Abia State, Nigeria
          </p>
          <span className="font-[600] flex gap-2">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="0 0 36 36"
              >
                <path
                  fill="currentColor"
                  d="M32 6H4a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2m-1.54 22H5.66l7-7.24l-1.44-1.39L4 26.84V9.52l12.43 12.37a2 2 0 0 0 2.82 0L32 9.21v17.5l-7.36-7.36l-1.41 1.41ZM5.31 8h25.07L17.84 20.47Z"
                  className="clr-i-outline clr-i-outline-path-1"
                ></path>
                <path fill="none" d="M0 0h36v36H0z"></path>
              </svg>
            </span>
            foundichleatherworks@gmail.com
          </span>
          <span className="font-semibold flex gap-2">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeMiterlimit={10}
                  strokeWidth={1.5}
                  d="m7.18 10.27l6.504 6.46c.697-.807 5.11-5.538 7.316.924c0 0-.232 3.346-4.994 3.346c-3.367 0-6.851-4.038-9.29-6.346C4.626 12.692 3 10.154 3 7.846C3 3.116 6.252 3 6.252 3c7.432 2.538.929 7.27.929 7.27Z"
                ></path>
              </svg>
            </span>
            +2349074833734
          </span>
          <div className="flex gap-6">
            <Image src="/facebook.png" alt="icon" width={16} height={16} />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              viewBox="0 0 24 24"
              className="scale-[1.3]"
            >
              <circle
                cx={17}
                cy={7}
                r={1.5}
                fill="currentColor"
                fillOpacity={0}
              >
                <animate
                  fill="freeze"
                  attributeName="fill-opacity"
                  begin="1.3s"
                  dur="0.15s"
                  values="0;1"
                ></animate>
              </circle>
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              >
                <path
                  strokeDasharray={72}
                  strokeDashoffset={72}
                  d="M16 3c2.76 0 5 2.24 5 5v8c0 2.76 -2.24 5 -5 5h-8c-2.76 0 -5 -2.24 -5 -5v-8c0 -2.76 2.24 -5 5 -5h4Z"
                >
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    dur="0.6s"
                    values="72;0"
                  ></animate>
                </path>
                <path
                  strokeDasharray={28}
                  strokeDashoffset={28}
                  d="M12 8c2.21 0 4 1.79 4 4c0 2.21 -1.79 4 -4 4c-2.21 0 -4 -1.79 -4 -4c0 -2.21 1.79 -4 4 -4"
                >
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    begin="0.7s"
                    dur="0.6s"
                    values="28;0"
                  ></animate>
                </path>
              </g>
            </svg>
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
              <Link href="/about">About Us</Link>
              <Link href="/">Careers</Link>
              <Link href="/">Affiliates</Link>
              <Link href="/">Blog</Link>
              <Link href="/contact">Contact Us</Link>
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
              <Link href="/">Legacy & Privacy</Link>
              <Link href="/certification" className="hover:text-found">
                Certification
              </Link>
              <Link href="/admin" className="flex gap-1 hover:text-found">
                Admin
              </Link>
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
            <button className="w-1/4 bg-found text-white rounded-r-xl">
              JOIN
            </button>
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
