"use client";
import AnimatedText from "@/components/AnimatedText";

const Socials = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen animate-fade-in transition-all duration-200 pb-20 md:pb-0">
      <div className="grid grid-cols-2 md:grid-cols-3 md:grid gap-4 md:gap-4 p-4">
        <div
          className={`group flex items-center justify-center gap-2 mb-4 animate-fade-in transition-all duration-200`}
        >
          <a href="mailto:akshatthapliyal2004@gmail.com">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="0"
                className="text-gray-600 dark:text-gray-400 text-lg"
              >
                <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
              </svg>
            </span>
            <AnimatedText
              as="span"
              className="group-hover:underline underline-offset-4 text-xs md:text-sm"
              delay={0.04}
            >
              Email
            </AnimatedText>
          </a>
        </div>
        <div
          className={`group flex items-center justify-center gap-2 mb-4 animate-fade-in transition-all duration-500 delay-200`}
        >
          <a href="https://x.com/unique_tweet524?t=ZzrTzBFws7xzMvTcUTBr0g&s=08">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 30 30"
                width="24px"
                height="24px"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="0"
                className="text-gray-600 dark:text-gray-400 text-lg"
              >
                <path d="M26.37,26l-8.795-12.822l0.015,0.012L25.52,4h-2.65l-6.46,7.48L11.28,4H4.33l8.211,11.971L12.54,15.97L3.88,26h2.65 l7.182-8.322L19.42,26H26.37z M10.23,6l12.34,18h-2.1L8.12,6H10.23z" />
              </svg>
            </span>
            <AnimatedText
              as="span"
              className="group-hover:underline underline-offset-4 text-xs md:text-sm"
              delay={0.08}
            >
              Twitter
            </AnimatedText>
          </a>
        </div>
        <div
          className={`group flex items-center justify-center gap-2 mb-4 animate-fade-in transition-all duration-500 delay-200`}
        >
          <a href="https://in.linkedin.com/in/akshat-thapliyal-29162b276">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 30 30"
                width="24px"
                height="24px"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="0"
                className="text-gray-600 dark:text-gray-400 text-lg"
              >
                <path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V6C26,4.895,25.105,4,24,4z M10.954,22h-2.95 v-9.492h2.95V22z M9.449,11.151c-0.951,0-1.72-0.771-1.72-1.72c0-0.949,0.77-1.719,1.72-1.719c0.948,0,1.719,0.771,1.719,1.719 C11.168,10.38,10.397,11.151,9.449,11.151z M22.004,22h-2.948v-4.616c0-1.101-0.02-2.517-1.533-2.517 c-1.535,0-1.771,1.199-1.771,2.437V22h-2.948v-9.492h2.83v1.297h0.04c0.394-0.746,1.356-1.533,2.791-1.533 c2.987,0,3.539,1.966,3.539,4.522V22z" />
              </svg>
            </span>
            <AnimatedText
              as="span"
              className="group-hover:underline underline-offset-4 text-xs md:text-sm"
              delay={0.12}
            >
              Linkdin
            </AnimatedText>
          </a>
        </div>
        <div
          className={`group flex items-center justify-center gap-2 mb-4 animate-fade-in transition-all duration-500 delay-200`}
        >
          <a href="https://github.com/akiyl">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24px"
                height="24px"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="0"
                className="text-gray-600 dark:text-gray-400 text-lg"
              >
                <path d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.6,5,2.5,9.3,6.9,10.7v-2.3c0,0-0.4,0.1-0.9,0.1c-1.4,0-2-1.2-2.1-1.9 c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1c0.4,0,0.7-0.1,0.9-0.2 c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6C7,7.2,7,6.6,7.3,6c0,0,1.4,0,2.8,1.3 C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3C15.3,6,16.8,6,16.8,6C17,6.6,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4c0.7,0.8,1.2,1.8,1.2,3 c0,2.2-1.7,3.5-4,4c0.6,0.5,1,1.4,1,2.3v3.3c4.1-1.3,7-5.1,7-9.5C22,6.1,16.9,1.4,10.9,2.1z" />
              </svg>
            </span>
            <AnimatedText
              as="span"
              className="group-hover:underline underline-offset-4 text-xs md:text-sm"
              delay={0.16}
            >
              Github
            </AnimatedText>
          </a>
        </div>
        <div
          className={`group flex items-center justify-center gap-2 mb-4 animate-fade-in transition-all duration-500 delay-200`}
        >
          <a href="https://github.com/akiyl?tab=repositories">
            <span>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                className="text-gray-600 dark:text-gray-400 text-lg"
                height="24px"
                width="24px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M13 21V23.5L10 21.5L7 23.5V21H6.5C4.567 21 3 19.433 3 17.5V5C3 3.34315 4.34315 2 6 2H20C20.5523 2 21 2.44772 21 3V20C21 20.5523 20.5523 21 20 21H13ZM13 19H19V16H6.5C5.67157 16 5 16.6716 5 17.5C5 18.3284 5.67157 19 6.5 19H7V17H13V19ZM19 14V4H6V14.0354C6.1633 14.0121 6.33024 14 6.5 14H19ZM7 5H9V7H7V5ZM7 8H9V10H7V8ZM7 11H9V13H7V11Z"></path>
              </svg>
            </span>
            <span className="group-hover:underline underline-offset-4 text-xs md:text-sm">
              Repository
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};
export default Socials;
