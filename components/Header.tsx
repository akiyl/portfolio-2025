import LiveTime from "./main/time";
const Header = () => {
  return (
    <>
      <div className=" mt-6  ">
        <div className=" flex w-[50vw] justify-between px-4">
          <div>
            {" "}
            <nav className="text-white hover:text-[#60A5FA] transition-all  duration-300 hover:cursor-pointer">
              Akshat Thapliyal
            </nav>
          </div>
          <div>
            <span> </span>
            <div>
              <LiveTime />
            </div>
          </div>
        </div>
        <div className=" h-px bg-gray-700 mt-4"></div>
      </div>
    </>
  );
};
export default Header;
