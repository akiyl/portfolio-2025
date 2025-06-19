const qualification = () => {
  return (
    <>
      <div className="w-[50vw] flex flex-col  justify-center gap-4 mt-10 px-10">
        <div className="flex items-center gap-3 mt-5">
          <span>
            <svg
              stroke="              
            "
              fill="#d1d5db"
              strokeWidth="0"
              viewBox="0 0 24 24"
              // className="w-6 h-6 mb-1"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.4142 5H21C21.5523 5 22 5.44772 22 6V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H10.4142L12.4142 5ZM20 11H4V19H20V11ZM20 9V7H11.5858L9.58579 5H4V9H20Z"></path>
            </svg>
          </span>
          <div className="display flex text-sm    ">
            <h3 className="text-md text-wrap"> Diploma in civil Eng</h3>
            <h3 className="text-md float-right ">Jun 2021 - oct 2024</h3>
          </div>
        </div>
        <p className="text-[14px] text-gray-400">
          {" "}
          I completed my diploma in civil Engineering from the Government
          Polytechnic College, RaniPohkri , dehradun, Uttarakhand. This program
          provided me with a solid foundation in civil engineerin. and as a
          hobby i was interested in web development and programming.
        </p>

        <div className="flex gap-2 items-center  mt-2">
          <a
            href=""
            className=" flex items-center text-gray-500 hover:text-gray-600  hover:scale-110"
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
export default qualification;
