/* eslint-disable no-unused-vars */
import React from "react";
import users from "../data/userData";

const AssigneeModal = ({ item, assignToggle, setNewIcon, columnId }) => {
  window.addEventListener("keydown", (event) => {
    if (event.defaultPrevented) {
      return;
    }
    if (event.key === "Escape") {
      assignToggle(false);
    }
  });
  return (
    <div className='flex flex-col justify-center items-center fixed z-50 left-1/2 top-1/4  cursor-default'>
      <div
        className='bg-gray-200 dark:bg-gray-700 w-[270px] rounded-md drop-shadow-md dark:shadow-gray-500 dark:shadow max-w-[250px] z-50 m-auto p-2 fixed top-1/4'
        role='dialog'
        aria-modal='true'
      >
        <div className='flex flex-row items-center justify-between w-full p-2 bg-gray-300 dark:bg-gray-800 rounded-md'>
          <p className='font-semibold text-lg text-gray-800 dark:text-gray-300'>
            Assign to
          </p>
          <svg
            onClick={() => assignToggle(false)}
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='w-5 h-5 text-gray-800 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-600 cursor-pointer'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </div>
        <div className='flex flex-col py-2 px-1 items-center justify-center text-gray-800 dark:text-gray-300'>
          {users.map((user) => {
            return (
              <ul key={user.id} className='w-full'>
                <li
                  onClick={() => {
                    const test = {
                      ...item,
                      iconId: user.id,
                      icon: user.icon,
                      columnId: columnId,
                    };
                    setNewIcon(test);
                    assignToggle(false);
                  }}
                  className='flex flex-row p-2 items-center w-full justify-between cursor-pointer rounded-md hover:bg-gray-400 dark:hover:bg-gray-800 hover:shadow-md'
                >
                  <div className='font-medium'>{user.name}</div>
                  <div>{user.icon}</div>
                </li>
              </ul>
            );
          })}
        </div>
      </div>
      <div className='fixed top-0 left-0 w-full h-full z-10 bg-black opacity-60'></div>
    </div>
  );
};

export default AssigneeModal;
