/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import AssigneeModal from "./AssigneeModal";
import { UserIcon } from "../icons";

const TaskCard = ({ item, index, setNewIcon, columnId }) => {
  const [assignee, setAssignee] = useState(false);
  return (
    <>
      <Draggable draggableId={item.id} index={index} mode='SNAP'>
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
