import LiveTime from "./main/time";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="w-full px-4 md:px-0">
        <div className="mx-auto md:w-[50vw] flex items-center justify-between h-14 md:h-16 px-2 md:px-4">
          <nav className="text-white text-sm md:text-base hover:text-[#60A5FA] transition-all duration-300">
            Akshat Thapliyal
          </nav>

          <div className="text-sm md:text-base text-white">
            <LiveTime />
          </div>
        </div>
      </div>

      <div className="h-px bg-gray-700  " />
    </header>
  );
};

export default Header;
