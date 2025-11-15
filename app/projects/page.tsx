import Link from "next/link";

const ProjectsPage = () => {
  return (
    <div className="flex flex-col justify-center w-full md:w-[50vw] gap-3 mt-10 px-4 md:px-10 pb-10 md:pb-0">
      {" "}
      <div className="flex items-center gap-2">
        <span>
          <svg
            stroke="              
"
            fill="#d1d5db"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.4142 5H21C21.5523 5 22 5.44772 22 6V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H10.4142L12.4142 5ZM20 11H4V19H20V11ZM20 9V7H11.5858L9.58579 5H4V9H20Z"></path>
          </svg>
        </span>
        <a href="newflix-lilac.vercel.app" className="text-sm md:text-md">
          {" "}
          Newflix
        </a>
      </div>
      <p className="text-xs md:text-sm text-gray-400 mb-3">
        {" "}
        Newflix is a fully responsive, high-fidelity clone of Netflix, designed
        to replicate its sleek UI and streaming platform functionality. Built
        with modern web technologies, Newflix showcases my frontend and
        full-stack development skills through dynamic content rendering, user
        authentication, and seamless UI animations.
      </p>
      <div className="flex gap-1 flex-wrap text-xs md:text-sm">
        <span
          className={`group p-1 border-solid border-[1px] border-gray-300 flex items-center justify-center gap-2 mb-4 animate-fade-in transition-all duration-200`}
        >
          Next.js
        </span>
        <span
          className={`group p-1 border-solid border-[1px] border-gray-300 flex items-center justify-center gap-2 mb-4 animate-fade-in transition-all duration-200`}
        >
          Prisma
        </span>
        <span
          className={`group p-1 border-solid border-[1px] border-gray-300 flex items-center justify-center gap-2 mb-4 animate-fade-in transition-all duration-200`}
        >
          Supabase
        </span>
        <span
          className={`group p-1 border-solid border-[1px] border-gray-300 flex items-center justify-center gap-2 mb-4 animate-fade-in transition-all duration-200`}
        >
          shadcnUi
        </span>
      </div>
      <div className="flex gap-2 items-center mt-2">
        <a
          href="newflix-lilac.vercel.app"
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
        <a
          href="https://github.com/akiyl/Newflix"
          className=" flex items-center text-gray-500 hover:text-gray-600 hover:scale-110"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="20px"
            fill="currentColor"
            stroke="currentColor"
            height="20px"
          >
            {" "}
            <path d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.6,5,2.5,9.3,6.9,10.7v-2.3c0,0-0.4,0.1-0.9,0.1c-1.4,0-2-1.2-2.1-1.9 c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1c0.4,0,0.7-0.1,0.9-0.2 c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6C7,7.2,7,6.6,7.3,6c0,0,1.4,0,2.8,1.3 C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3C15.3,6,16.8,6,16.8,6C17,6.6,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4c0.7,0.8,1.2,1.8,1.2,3 c0,2.2-1.7,3.5-4,4c0.6,0.5,1,1.4,1,2.3v3.3c4.1-1.3,7-5.1,7-9.5C22,6.1,16.9,1.4,10.9,2.1z" />
          </svg>
        </a>
      </div>
      <div className="flex items-center gap-2 mt-5">
        <span>
          <svg
            stroke="              
"
            fill="#d1d5db"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.4142 5H21C21.5523 5 22 5.44772 22 6V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H10.4142L12.4142 5ZM20 11H4V19H20V11ZM20 9V7H11.5858L9.58579 5H4V9H20Z"></path>
          </svg>
        </span>
        <a
          href="discord-clone-seven-mu.vercel.app"
          className="text-sm md:text-md"
        >
          {" "}
          Discord Clone
        </a>
      </div>
      <p className="text-xs md:text-sm text-gray-400 mb-3">
        {" "}
        I developed a full-stack Discord clone that replicates the core features
        of the popular chat platform, including real-time messaging, user
        authentication, server and channel creation, and direct messaging. Using
        technologies like React for the frontend, Node.js and Express for the
        backend, MongoDB for data storage, and Socket.io for real-time
        communication, the app allows users to sign up, join or create servers,
        chat in public or private channels, and send direct messages.
      </p>
      <div className="flex gap-1 flex-wrap text-xs md:text-sm">
        <span
          className={`group p-1 border-solid border-[1px] border-gray-300 flex items-center justify-center gap-2 mb-4 animate-fade-in transition-all duration-200`}
        >
          Next.js
        </span>
        <span
          className={`group p-1 border-solid border-[1px] border-gray-300 flex items-center justify-center gap-2 mb-4 animate-fade-in transition-all duration-200`}
        >
          Prisma
        </span>
        <span
          className={`group p-1 border-solid border-[1px] border-gray-300 flex items-center justify-center gap-2 mb-4 animate-fade-in transition-all duration-200`}
        >
          Supabase
        </span>
        <span
          className={`group p-1 border-solid border-[1px] border-gray-300 flex items-center justify-center gap-2 mb-4 animate-fade-in transition-all duration-200`}
        >
          shadcnUi
        </span>
      </div>
      <div className="flex gap-2 items-center">
        <a
          href="discord-clone-seven-mu.vercel.app"
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
        <a
          href="https://github.com/akiyl/discord-clone"
          className=" flex items-center text-gray-500 hover:text-gray-600 hover:scale-110"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="20px"
            fill="currentColor"
            stroke="currentColor"
            height="20px"
          >
            {" "}
            <path d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.6,5,2.5,9.3,6.9,10.7v-2.3c0,0-0.4,0.1-0.9,0.1c-1.4,0-2-1.2-2.1-1.9 c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1c0.4,0,0.7-0.1,0.9-0.2 c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6C7,7.2,7,6.6,7.3,6c0,0,1.4,0,2.8,1.3 C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3C15.3,6,16.8,6,16.8,6C17,6.6,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4c0.7,0.8,1.2,1.8,1.2,3 c0,2.2-1.7,3.5-4,4c0.6,0.5,1,1.4,1,2.3v3.3c4.1-1.3,7-5.1,7-9.5C22,6.1,16.9,1.4,10.9,2.1z" />
          </svg>
        </a>
      </div>
    </div>
  );
};
export default ProjectsPage;
