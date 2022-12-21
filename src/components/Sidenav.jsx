import React from "react";

const Sidenav = () => {
  return (
    <div className='fixed top-10 z-50 flex flex-col my-2 mx-0 w-52 shadow-md left-2'>
      <div className='w-full h-[90vh] p-2 rounded-md bg-gray-500 dark:bg-gray-800'>
        <ul className='nav-ul text-gray-200'>
          <li>Akash</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidenav;
