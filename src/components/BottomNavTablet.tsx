import Link from "next/link";

const BottomNavTablet = () => {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 shadow-md
                 hidden xl:hidden md:flex md:justify-around md:items-center md:h-16 z-40"
    >
      <Link
        href="/home"
        className="flex flex-col items-center text-red-600 text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="red"
        >
          <path d="M5 20V9.5l7-5.288L19 9.5V20h-5.192v-6.384h-3.616V20z" />
        </svg>
        Home
      </Link>

      <Link
        href="/list"
        className="flex flex-col items-center text-red-600 text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="red"
        >
          <path
            fillRule="evenodd"
            d="M5.207 5.486A1 1 0 0 1 6.065 5h11.867a1 1 0 0 1 .858.486l2.254 3.757a.5.5 0 0 1-.429.757H19.5v8.5a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-5.3a.2.2 0 0 0-.2-.2H7.2a.2.2 0 0 0-.2.2v5.3a1 1 0 0 1-1 1h-.5a1 1 0 0 1-1-1V10H3.382a.5.5 0 0 1-.43-.757zm7.293 7.68c0-.23.187-.416.417-.416h4.166c.23 0 .417.187.417.417v2.916c0 .23-.186.417-.417.417h-4.166a.417.417 0 0 1-.417-.417z"
            clipRule="evenodd"
          />
        </svg>
        Shop
      </Link>

      <Link
        href="/deals"
        className="flex flex-col items-center text-red-600 text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 50 50"
        >
          <path
            fill="red"
            d="M47.783 11.883c-.688-.542-2.533-.977-3.914-1.301L42 10.332V5.814l.957-.015C43.854 6.254 45.146 7 45.213 8h3.604c-.067-2-1.586-3.262-2.938-4.264C44.982 3.071 44 2.716 42 2.501V0h-2v2.424c-2 .192-2.646.69-3.549 1.503c-1.181 1.063-1.707 2.397-1.707 4.003c0 1.76.503 3.053 1.712 3.881c.676.469 1.544.905 3.544 1.309v4.895c-1-.177-1.002-.132-1.355-.551c-.34-.406-.433-1.464-.549-1.464H34.52c0 2 .541 2.958 1.895 4.025c.976.769 1.585.905 3.585 1.107V23h2v-1.836c2-.193 3.699-.702 4.676-1.536c1.268-1.083 2.305-2.444 2.305-4.082c-.001-1.598-.129-2.818-1.198-3.663m-8.765-2.786c-.582-.317-.806-.797-.806-1.438c0-.698.193-1.244.783-1.634c.311-.205.005-.354 1.005-.453v3.94c-1-.152-.762-.29-.982-.415m4.343 8.82c-.168.058-1.361.104-1.361.145v-4.167c2 .172 1.846.357 2.178.558c.521.324.783.786.783 1.377q-.001 1.525-1.6 2.087M38.52 30h-.553l-6.144-11.125c-.265-.481-.933-.875-1.483-.875H11.699c-.55 0-1.218.394-1.483.875L4.072 30H3.52C2.419 30 1 30.9 1 32v10c0 1.1 1.419 2 2.52 2H5v3c0 1.65 1.87 3 3.52 3h1c1.65 0 2.48-1.35 2.48-3v-3h17v3c0 1.65 1.869 3 3.52 3h1c1.65 0 2.48-1.35 2.48-3v-3h2.52c1.1 0 1.48-.9 1.48-2V32c0-1.1-.381-2-1.48-2m-31.5 8a2.5 2.5 0 1 1 0-5a2.5 2.5 0 0 1 0 5m2-8l4.053-8.105c.245-.493.897-.895 1.447-.895h13c.55 0 1.201.402 1.447.895L33.02 30zm26 8a2.5 2.5 0 1 1 0-5a2.5 2.5 0 0 1 0 5"
          />
        </svg>
        Deals
      </Link>

      <Link
        href="/about"
        className="flex flex-col items-center text-red-600 text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 512 512"
          fill="red"
        >
          <path
            fillRule="evenodd"
            d="M256 42.667c117.822 0 213.334 95.512 213.334 213.333c0 117.82-95.512 213.334-213.334 213.334c-117.82 0-213.333-95.513-213.333-213.334S138.18 42.667 256 42.667m21.38 192h-42.666v128h42.666zM256.217 144c-15.554 0-26.837 11.22-26.837 26.371c0 15.764 10.986 26.963 26.837 26.963c15.235 0 26.497-11.2 26.497-26.667c0-15.446-11.262-26.667-26.497-26.667"
          />
        </svg>
        About
      </Link>

      <Link
        href="/contact"
        className="flex flex-col items-center text-red-600 text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="red"
        >
          <path d="M21 2H6a2 2 0 0 0-2 2v3H2v2h2v2H2v2h2v2H2v2h2v3a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1m-8 2.999c1.648 0 3 1.351 3 3A3.01 3.01 0 0 1 13 11c-1.647 0-3-1.353-3-3.001c0-1.649 1.353-3 3-3M19 18H7v-.75c0-2.219 2.705-4.5 6-4.5s6 2.281 6 4.5z" />
        </svg>
        Contact
      </Link>
    </nav>
  );
};

export default BottomNavTablet;
