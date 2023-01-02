/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect, useRef } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import NewTask from "./NewTask";
import { v4 as uuid } from "uuid";
import Modal from "../utils/Modal/Modal";
import { AddIcon, StackIcon } from "../icons";

const Trello = () => {
  const ref = useRef();
  const tasksEndRef = useRef(null);
  const [addTask, setAddTask] = useState(false);
  const [title, setTitle] = useState("");
  const [rows, setRows] = useState([]);
  const [icon, setNewIcon] = useState({});
  const [columns, setColumns] = useState({});
  const [selectedId, setSelectedId] = useState("");
  const [scrollDown, setScrollDown] = useState(false);
  const [addNewColumn, setAddNewColumn] = useState(false);
  const [showDot, setShowDot] = useState(false);

  useEffect(() => {
    const newColumnObj = {
      title: title,
      items: [],
    };
    const newArr = {
      ...columns,
      [uuid()]: newColumnObj,
    };
    title ? setColumns(newArr) : setColumns([]);
  }, [title]);

  useEffect(() => {
    const newCol = columns[rows.columnBelong];
    if (newCol?.items) {
      newCol.items = [
        ...newCol.items,
        {
          task: rows.task,
          id: rows.id,
          dueDate: rows.dueDate,
          icon: rows.icon,
        },
      ];
    }
  }, [rows]);

  useEffect(() => {
    setShowDot(true);
    const newCol = columns[icon.columnId];
    const dataCol = newCol?.items.map((data) => {
      if (data.id === icon.id) {
        return { ...data, icon: icon.icon };
      }
      return data;
    });
    if (newCol?.items) newCol.items = dataCol;
    setTimeout(() => {
      setShowDot(false);
    }, 0);
  }, [icon]);

  const selId = (id) => {
    setSelectedId(id);
    setAddTask(!addTask);
  };

  window.addEventListener("keydown", (event) => {
    if (event.defaultPrevented) {
      return;
    }
    if (event.key === "Escape") {
      setAddTask(false);
      setAddNewColumn(false);
    }
  });

  const scrollToBottom = () => {
    tasksEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    setTimeout(() => {
      setScrollDown(false);
    }, 50);
  }, [scrollDown]);

  const onDragEnd = (result, columns, setColumns) => {
    console.log("result type", result.type);
    const { source, destination, type } = result;

    if (!destination) return;
    // Move List
    if (type === "COLUMN") {
      // Prevent update if nothing has changed
      if (source.index !== destination.index) {
      }
      return;
    }

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  return (
    <DragDropContext
      onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
    >
      <div ref={ref} className='flex flex-row items-center justify-start p-4'>
        {Object.entries(columns)?.map(([columnId, column]) => {
          return (
            <Droppable
              key={columnId}
              droppableId={columnId}
              direction='horizontal'
              type='COLUMN'
            >
              {(provided, snapshot) => (
                <div
                  className='h-[90vh] mr-4 lg:mr-10 flex flex-col justify-center bg-gray-400 dark:bg-gray-800 min-w-full sm:min-w-[370px] lg:min-w-[340px] xl:min-w-[370px] rounded-md p-4'
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <div className='z-30'>
                    {column?.title !== "undefined" && (
                      <div className='text-gray-100 bg-gray-600 dark:bg-gray-900 px-4 py-2 w-full rounded-md flex flex-row justify-between items-center'>
                        <div className='font-semibold'> {column?.title}</div>
                        <div className='flex flex-row items-center justify-between w-[20%] sm:w-[14%]'>
                          <StackIcon />
                          <div>{column.items.length}</div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className='overflow-y-scroll overflow-x-hidden h-[80vh] my-2 py-1 scrollbar-hide text-red-700'>
                    {column?.items !== "undefined" &&
                      column?.items.map((item, index) => {
                        return (
                          <div key={index} ref={tasksEndRef}>
                            <TaskCard
                              key={item.id}
                              item={item}
                              index={index}
                              setNewIcon={setNewIcon}
                              columnId={columnId}
                            />
                          </div>
                        );
                      })}
                    {provided.placeholder}
                  </div>
                  <div className='rounded-md p-1 min-h-[-50px]'>
                    {addTask && selectedId === columnId ? (
                      <div>
                        <NewTask
                          title={column.title}
                          setNewRows={setRows}
                          columnId={columnId}
                          onClose={() => {
                            setScrollDown(true);
                            setAddTask(false);
                          }}
                        />
                      </div>
                    ) : null}
                    <div
                      className='flex flex-row shadow-none hover:shadow-md justify-center mt-4 text-gray-800 dark:text-gray-200 rounded-md p-2 cursor-pointer bg-gray-200 dark:bg-gray-900'
                      onClick={() => selId(columnId)}
                    >
                      <AddIcon />
                    </div>
                  </div>
                </div>
              )}
            </Droppable>
          );
        })}

        {showDot && (
          <div className='bg-red-500 flex items-center justify-center h-4 rounded-full w-4 p-1'></div>
        )}
        <div
          onClick={() => {
            setAddNewColumn(true);
          }}
          className='bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-600 hover:text-gray-100 hover:shadow-md p-2 rounded-md'
        >
          <AddIcon />
        </div>
      </div>
      {addNewColumn && (
        <Modal
          setNewTitle={setTitle}
          onClickClose={() => setAddNewColumn(false)}
        />
      )}
    </DragDropContext>
  );
};

export default Trello;
