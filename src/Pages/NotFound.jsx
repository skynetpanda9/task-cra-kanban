import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const NotFound = () => {
  return (
    <div className='flex flex-row w-full items-start justify-center p-8 bg-stone-300 min-h-[100vh]'>
      <div className='flex flex-col w-full justify-start items-center'>
        <div className='flex flex-row items-center justify-start w-full'>
          <Link
            to='/'
            className='group bg-stone-300 hover:bg-stone-800 w-auto rounded px-4 py-2 text-stone-800 hover:text-stone-100 '
          >
            <div className=' flex flex-row items-center justify-between'>
              <FontAwesomeIcon
                icon={faArrowLeft}
                className='text-stone-800 group-hover:text-stone-100 mr-4'
              />
              <p className='mr-6 group-hover:text-stone-100'>Home</p>
            </div>
          </Link>
        </div>
        <div className='flex flex-col w-full h-full md:w-1/4 md:h-1/4 box-border rounded drop-shadow-xl mt-16'>
          <img
            className='rounded'
            src='https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7888.jpg?w=2000'
            alt='not found'
          />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
