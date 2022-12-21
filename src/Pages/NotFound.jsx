import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const NotFound = () => {
  return (
    <div className='flex flex-row items-start justify-center p-4 bg-gray-300 min-h-screen'>
      <div className='flex flex-col w-full justify-start items-center'>
        <div className='flex flex-row items-center justify-start w-full'>
          <Link
            to='/'
            className='group text-gray-900 hover:text-gray-300 w-auto rounded-md p-2 no-underline font-medium bg-gray-300 hover:bg-gray-900'
          >
            <div className='flex flex-row justify-between items-center'>
              <FontAwesomeIcon
                icon={faArrowLeft}
                className='group-hover:text-gray-300 mx-3'
              />
              <p className='mr-6 group-hover:text-gray-300'>Home</p>
            </div>
          </Link>
        </div>
        <div className='flex flex-col w-1/4 h-1/4 box-border rounded-md drop-shadow-md mt-16'>
          <img
            className='rounded-md'
            src='https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7888.jpg?w=2000'
            alt='not found'
          />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
