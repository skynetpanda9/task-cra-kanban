/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import AssigneeModal from "./AssigneeModal";

const TaskCard = ({ item, index, setNewIcon, columnId }) => {
  const [assignee, setAssignee] = useState(false);
  const UserIcon = () => {
    return (
      <div>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className='w-5 h-5 text-gray-800 dark:text-gray-300'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z'
          />
        </svg>
      </div>
    );
  };

  return (
    <>
      <Draggable draggableId={item.id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className='backdrop-blur-sm bg-white/30 dark:bg-gray-500/20 flex flex-col justify-center items-start py-0 px-4 h-[100px] rounded-md w-auto bg-gray-300 dark:bg-gray-700 mt-4 shadow-md'>
              <div className='flex flex-row w-full items-center justify-center'>
                <div className='flex flex-col w-10/12'>
                  <p className='font-medium text-gray-800 dark:text-gray-200'>
                    {item.task}
                  </p>
                  <div className='flex justify-between items-center w-full text-xs font-light mt-2 text-gray-800 dark:text-gray-200'>
                    <p>
                      <span>
                        {new Date(item.dueDate).toLocaleDateString("en-us", {
                          month: "short",
                          day: "2-digit",
                        })}
                      </span>
                    </p>
                  </div>
                </div>
                <div
                  className='flex w-2/12 justify-center cursor-pointer'
                  onClick={() => {
                    setAssignee(!assignee);
                  }}
                >
                  {item.icon ? item.icon : <UserIcon />}
                </div>
              </div>
            </div>
            {assignee && (
              <AssigneeModal
                id={item.id}
                item={item}
                setNewIcon={setNewIcon}
                assignToggle={setAssignee}
                columnId={columnId}
              />
            )}
          </div>
        )}
      </Draggable>
    </>
  );
};

export default TaskCard;
