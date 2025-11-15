"use client";
import AnimatedText from "@/components/AnimatedText";

const Qualification = () => {
  return (
    <>
      <div className="w-full md:w-[50vw] flex flex-col justify-center gap-4 mt-10 px-4 md:px-10 pb-10 md:pb-0">
        <div className="flex items-center gap-3 mt-5">
          <span>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.4142 5H21C21.5523 5 22 5.44772 22 6V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H10.4142L12.4142 5ZM20 11H4V19H20V11ZM20 9V7H11.5858L9.58579 5H4V9H20Z"></path>
            </svg>
          </span>
          <div className="flex flex-col md:flex-row text-xs md:text-sm gap-2 break-words">
            <AnimatedText
              as="h3"
              className="text-sm md:text-md text-wrap"
              delay={0.04}
            >
              Diploma in civil Eng
            </AnimatedText>
            <AnimatedText
              as="h3"
              className="text-xs md:text-sm text-gray-400"
              delay={0.08}
            >
              Jun 2021 - oct 2024
            </AnimatedText>
          </div>
        </div>
        <AnimatedText
          as="p"
          className="text-xs md:text-sm text-gray-400"
          delay={0.12}
        >
          I completed my diploma in civil Engineering from the Government
          Polytechnic College, RaniPohkri, Dehradun, Uttarakhand. This program
          provided me with a solid foundation in civil engineering. As a hobby,
          I became interested in web development and programming.
        </AnimatedText>

        <div className="flex gap-2 items-center mt-2">
          <a
            href=""
            className=" flex items-center text-gray-500 hover:text-gray-600 hover:scale-110"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="20px"
              width="20px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19L18.9999 6.413L11.2071 14.2071L9.79289 12.7929L17.5849 5H13V3H21Z"></path>
            </svg>
          </a>
        </div>
      </div>
    </>
  );
};
export default Qualification;
