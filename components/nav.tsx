"use client";
import Link from "next/link";
import { useState } from "react";
const Navigation = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <>
      <div className="flex gap-5 pb-5 mt-auto">
        <button
          onClick={() => {
            setActiveIndex(0);
          }}
          className=""
        >
          <Link
            href="/"
            className={`text-[#e3e3e3] flex flex-col items-center justify-center gap-1 hover:translate-y-[-3px]  hover:text-[#60A5FA]  hover:transition-all duration-300 ${
              activeIndex === 0 ? "translate-y-[-3px]" : "translate-y-0"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              strokeWidth="0"
              viewBox="0 -960 960 960"
              width="24px"
              fill="currentColor"
              stroke="currentColor"
              className="h-6 w-6 mb-1"
            >
              <path d="M120-120v-720h720v720H120Zm80-80h560v-560H200v560Zm0 0v-560 560Z" />
            </svg>
            <div
              className={`w-1 h-1 bg-[#60A5FA] rounded ${
                activeIndex === 0 ? "opacity-100" : "opacity-0"
              }  `}
            ></div>
          </Link>
        </button>
        <button
          onClick={() => {
            setActiveIndex(1);
          }}
        >
          <Link
            href="/projects"
            className={`text-[#e3e3e3] flex flex-col items-center justify-center gap-1 hover:translate-y-[-3px]  hover:text-[#60A5FA]  hover:transition-all duration-300 ${
              activeIndex === 1 ? "translate-y-[-3px]" : "translate-y-0"
            }`}
          >
            {" "}
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              className="w-6 h-6 mb-1"
              height="24px"
              width="24px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.4142 5H21C21.5523 5 22 5.44772 22 6V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H10.4142L12.4142 5ZM20 11H4V19H20V11ZM20 9V7H11.5858L9.58579 5H4V9H20Z"></path>
            </svg>
            <div
              className={`w-1 h-1 bg-[#60A5FA] rounded ${
                activeIndex === 1 ? "opacity-100" : "opacity-0"
              }  `}
            ></div>
          </Link>
        </button>

        <button
          onClick={() => {
            setActiveIndex(2);
          }}
        >
          <Link
            href={"/game"}
            className={`text-[#e3e3e3] flex flex-col items-center justify-center gap-1 hover:translate-y-[-3px]  hover:text-[#60A5FA]  hover:transition-all duration-300 ${
              activeIndex === 2 ? "translate-y-[-3px]" : "translate-y-0"
            }`}
          >
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              className="w-6 h-6 mb-1"
              strokeWidth="0"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path d="M182-200q-51 0-79-35.5T82-322l42-300q9-60 53.5-99T282-760h396q60 0 104.5 39t53.5 99l42 300q7 51-21 86.5T778-200q-21 0-39-7.5T706-230l-90-90H344l-90 90q-15 15-33 22.5t-39 7.5Zm16-86 114-114h336l114 114q2 2 16 6 11 0 17.5-6.5T800-304l-44-308q-4-29-26-48.5T678-680H282q-30 0-52 19.5T204-612l-44 308q-2 11 4.5 17.5T182-280q2 0 16-6Zm482-154q17 0 28.5-11.5T720-480q0-17-11.5-28.5T680-520q-17 0-28.5 11.5T640-480q0 17 11.5 28.5T680-440Zm-80-120q17 0 28.5-11.5T640-600q0-17-11.5-28.5T600-640q-17 0-28.5 11.5T560-600q0 17 11.5 28.5T600-560ZM310-440h60v-70h70v-60h-70v-70h-60v70h-70v60h70v70Zm170-40Z" />
            </svg>
            <div
              className={`w-1 h-1 bg-[#60A5FA] rounded ${
                activeIndex === 2 ? "opacity-100" : "opacity-0"
              }  `}
            ></div>
          </Link>
        </button>
        <button
          onClick={() => {
            setActiveIndex(3);
          }}
        >
          <Link
            href={"/qualification"}
            className={`text-[#e3e3e3] flex flex-col items-center justify-center gap-1 hover:translate-y-[-3px]  hover:text-[#60A5FA]  hover:transition-all duration-300 ${
              activeIndex === 3 ? "translate-y-[-3px]" : "translate-y-0"
            }`}
          >
            {" "}
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              className="w-6 h-6 mb-1"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.8492 11.6983L17.1421 10.9912L7.24264 20.8907H3V16.648L14.3137 5.33432L19.9706 10.9912C20.3611 11.3817 20.3611 12.0149 19.9706 12.4054L12.8995 19.4765L11.4853 18.0622L17.8492 11.6983ZM15.7279 9.57696L14.3137 8.16274L5 17.4765V18.8907H6.41421L15.7279 9.57696ZM18.5563 2.50589L21.3848 5.33432C21.7753 5.72484 21.7753 6.35801 21.3848 6.74853L19.9706 8.16274L15.7279 3.9201L17.1421 2.50589C17.5327 2.11537 18.1658 2.11537 18.5563 2.50589Z"></path>
            </svg>{" "}
            <div
              className={`w-1 h-1 bg-[#60A5FA] rounded ${
                activeIndex === 3 ? "opacity-100" : "opacity-0"
              }  `}
            ></div>
          </Link>
        </button>

        <button
          onClick={() => {
            setActiveIndex(4);
          }}
        >
          <Link
            href={"/socials"}
            className={`text-[#e3e3e3] flex flex-col items-center justify-center gap-1 hover:translate-y-[-3px]  hover:text-[#60A5FA]  hover:transition-all duration-300 ${
              activeIndex === 4 ? "translate-y-[-3px]" : "translate-y-0"
            }`}
          >
            {" "}
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              className="w-6 h-6 mb-1"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.6567 14.8284L16.2425 13.4142L17.6567 12C19.2188 10.4379 19.2188 7.90524 17.6567 6.34314C16.0946 4.78105 13.5619 4.78105 11.9998 6.34314L10.5856 7.75736L9.17139 6.34314L10.5856 4.92893C12.9287 2.58578 16.7277 2.58578 19.0709 4.92893C21.414 7.27208 21.414 11.0711 19.0709 13.4142L17.6567 14.8284ZM14.8282 17.6569L13.414 19.0711C11.0709 21.4142 7.27189 21.4142 4.92875 19.0711C2.5856 16.7279 2.5856 12.9289 4.92875 10.5858L6.34296 9.17157L7.75717 10.5858L6.34296 12C4.78086 13.5621 4.78086 16.0948 6.34296 17.6569C7.90506 19.2189 10.4377 19.2189 11.9998 17.6569L13.414 16.2426L14.8282 17.6569ZM14.8282 7.75736L16.2425 9.17157L9.17139 16.2426L7.75717 14.8284L14.8282 7.75736Z"></path>
            </svg>{" "}
            <div
              className={`w-1 h-1 bg-[#60A5FA] rounded ${
                activeIndex === 4 ? "opacity-100" : "opacity-0"
              }  `}
            ></div>
          </Link>
        </button>
      </div>
    </>
  );
};
export default Navigation;
