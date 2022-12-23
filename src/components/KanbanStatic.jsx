/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect, useRef } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import NewTask from "./NewTask";
import { v4 as uuid } from "uuid";
import { useOnClickOutside } from "../utils/ClickOutside";
import { Bars } from "react-loader-spinner";
import Modal from "../utils/Modal/Modal";

const KanbanStatic = () => {
  const ref = useRef();
  const [loading, setLoading] = useState(false);
  const [newTodo, setNewTodo] = useState([]);
  const [newProgress, setNewProgress] = useState([]);
  const [newDone, setNewDone] = useState([]);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [scrollDown, setScrollDown] = useState(false);
  const [addNewColumn, setAddNewColumn] = useState(false);

  //utils
  // useOnClickOutside(ref, () => setAdd1(false));
  // useOnClickOutside(ref, () => setAdd2(false));
  // useOnClickOutside(ref, () => setAdd3(false));

  useEffect(() => {
    console.log(rows);
    setRows(rows);
  }, [rows]);

  useEffect(() => {
    console.log(columns);
    setColumns(columns);
  }, [columns]);

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
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
      if (source.droppableId === "0" && destination.droppableId === "1") {
        const cate = "In Progress";
        const targetIndex = destItems.findIndex(
          (f) => f.id === result.draggableId
        );
        destItems[targetIndex].Category = cate;
        setNewTodo(sourceItems);
        setNewProgress(destItems);
      } else if (
        source.droppableId === "1" &&
        destination.droppableId === "2"
      ) {
        const cate = "Done";
        const targetIndex = destItems.findIndex(
          (f) => f.id === result.draggableId
        );
        destItems[targetIndex].Category = cate;
        setNewDone(destItems);
        setNewProgress(sourceItems);
      } else if (
        source.droppableId === "2" &&
        destination.droppableId === "1"
      ) {
        const cate = "In Progress";
        const targetIndex = destItems.findIndex(
          (f) => f.id === result.draggableId
        );
        destItems[targetIndex].Category = cate;
        setNewProgress(destItems);
        setNewDone(sourceItems);
      } else if (
        source.droppableId === "1" &&
        destination.droppableId === "0"
      ) {
        const cate = "To Do";
        const targetIndex = destItems.findIndex(
          (f) => f.id === result.draggableId
        );
        destItems[targetIndex].Category = cate;
        setNewTodo(destItems);
        setNewProgress(sourceItems);
      } else if (
        source.droppableId === "0" &&
        destination.droppableId === "2"
      ) {
        const cate = "Done";
        const targetIndex = destItems.findIndex(
          (f) => f.id === result.draggableId
        );
        destItems[targetIndex].Category = cate;
        setNewDone(destItems);
        setNewTodo(sourceItems);
      } else if (
        source.droppableId === "2" &&
        destination.droppableId === "0"
      ) {
        const cate = "To Do";
        const targetIndex = destItems.findIndex(
          (f) => f.id === result.draggableId
        );
        destItems[targetIndex].Category = cate;
        setNewTodo(destItems);
        setNewDone(sourceItems);
      }
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
      if (source.droppableId === "0" && destination.droppableId === "0") {
        setNewTodo(copiedItems);
      } else if (
        source.droppableId === "1" &&
        destination.droppableId === "1"
      ) {
        setNewProgress(copiedItems);
      } else if (
        source.droppableId === "2" &&
        destination.droppableId === "2"
      ) {
        setNewDone(copiedItems);
      }
    }
  };

  const tasksEndRef = useRef(null);

  const scrollToBottom = () => {
    tasksEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    setTimeout(() => {
      setScrollDown(false);
    }, 0);
  }, [scrollDown]);

  return loading ? (
    <Bars
      height='80'
      width='80'
      color='#fafafa'
      ariaLabel='bars-loading'
      wrapperStyle={{}}
      wrapperClass=''
      visible={true}
    />
  ) : (
    <DragDropContext
      onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
    >
      <div ref={ref} className='flex flex-row items-center justify-start p-4'>
        {Object.entries(columns)?.map(([columnId, column], index) => {
          return (
            <Droppable key={columnId} droppableId={columnId}>
              {(provided, snapshot) => (
                <div
                  className='h-[90vh] mr-4 lg:mr-10 flex flex-col justify-center bg-gray-400 dark:bg-gray-800 min-w-full sm:min-w-[400px] lg:min-w-[340px] xl:min-w-[370px] rounded-md p-4'
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <div className='z-30'>
                    {column?.title !== "undefined" && (
                      <div className='text-gray-100 bg-gray-600 dark:bg-gray-900 px-4 py-2 w-full rounded-md flex flex-row justify-between items-center'>
                        <div className='font-semibold'> {column?.title}</div>
                        <div className='flex flex-row items-center justify-between w-[18%] sm:w-[12%]'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='w-5 h-5'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122'
                            />
                          </svg>
                          <div>{column.items.length}</div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className='overflow-y-scroll overflow-x-hidden h-[80vh] my-2 py-1 scrollbar-hide'>
                    {column?.items !== "undefined" &&
                      column?.items.map((item, index) => {
                        return (
                          <div key={index} ref={tasksEndRef}>
                            <TaskCard key={item.id} item={item} index={index} />
                          </div>
                        );
                      })}
                    {provided.placeholder}
                  </div>
                  <div className='rounded-md p-1 min-h-[-50px]'>
                    <div>
                      <NewTask
                        dataInit={rows}
                        setNewData={setRows}
                        onClose={() => {
                          setScrollDown(true);
                        }}
                      />
                      <div
                        className='flex flex-row shadow-none hover:shadow-md justify-center mt-4 text-gray-800 dark:text-gray-200 rounded-md p-2 cursor-pointer bg-gray-200 dark:bg-gray-900'
                        onClick={() => {}}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Droppable>
          );
        })}
        <div
          onClick={() => setAddNewColumn(true)}
          className='bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-600 hover:text-gray-100 hover:shadow-md p-2 rounded-md'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 4.5v15m7.5-7.5h-15'
            />
          </svg>
        </div>
      </div>
      {addNewColumn && (
        <Modal
          initColumnData={columns}
          initRowData={rows}
          setNewFilteredData={setColumns}
          onClickClose={() => setAddNewColumn(false)}
        />
      )}
    </DragDropContext>
  );
};

export default KanbanStatic;
