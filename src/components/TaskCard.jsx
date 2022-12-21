import React from "react";
import { Draggable } from "react-beautiful-dnd";

const TaskCard = ({ item, index }) => {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className='backdrop-blur-sm bg-white/30 dark:bg-gray-500/20 flex flex-col justify-center items-start py-0 px-4 min-h-[90px] rounded-md max-w-xs bg-gray-300 dark:bg-gray-700 mt-4 shadow-md'>
            <p className='font-medium text-gray-800 dark:text-gray-200'>
              {item.Task}
            </p>
            <div className='flex justify-between items-center w-full text-xs font-light mt-2 text-gray-800 dark:text-gray-200'>
              <p>
                <span>
                  {new Date(item.Due_Date).toLocaleDateString("en-us", {
                    month: "short",
                    day: "2-digit",
                  })}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
