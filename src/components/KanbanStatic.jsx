/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import NewTask from "./NewTask";
import { v4 as uuid } from "uuid";

const KanbanStatic = () => {
  const [loading, setLoading] = useState(false);
  const [add1, setAdd1] = useState(false);
  const [add2, setAdd2] = useState(false);
  const [add3, setAdd3] = useState(false);
  const [newTodo, setNewTodo] = useState([]);
  const [newProgress, setNewProgress] = useState([]);
  const [newDone, setNewDone] = useState([]);
  const [columns, setColumns] = useState([]);

  const date = new Date();
  const dataInit = [
    {
      id: uuid(),
      Task: "Task 1",
      Category: "To Do",
      Due_Date: date,
    },
    {
      id: uuid(),
      Task: "Task 2",
      Category: "To Do",
      Due_Date: date,
    },
    {
      id: uuid(),
      Task: "Task 3",
      Category: "In Progress",
      Due_Date: date,
    },
    {
      id: uuid(),
      Task: "Task 4",
      Category: "Done",
      Due_Date: date,
    },
  ];

  const setData = () => {
    const todo = dataInit.filter((el) => {
      return el.Category === "To Do";
    });
    const progress = dataInit.filter((el) => {
      return el.Category === "In Progress";
    });
    const done = dataInit.filter((el) => {
      return el.Category === "Done";
    });

    // console.log(newTodo.length);

    const backStaticData = [
      {
        title: "To Do",
        items: todo.length ? newTodo : todo,
      },
      {
        title: "In Progress",
        items: progress.length ? newProgress : progress,
      },
      {
        title: "Done",
        items: done.length ? newDone : done,
      },
    ];
    setColumns(backStaticData);
    setNewTodo(todo);
    setNewProgress(progress);
    setNewDone(done);
  };

  useEffect(() => {
    setData();
  }, []);

  useEffect(() => {
    const backStaticData = [
      {
        title: "To Do",
        items: newTodo,
      },
      {
        title: "In Progress",
        items: newProgress,
      },
      {
        title: "Done",
        items: newDone,
      },
    ];
    setColumns(backStaticData);
  }, [newTodo, newProgress, newDone]);

  const onDragEnd = (result, columns, setColumns) => {
    setLoading(true);
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
        setLoading(false);
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
        setLoading(false);
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
        setLoading(false);
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
        setLoading(false);
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
        setLoading(false);
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
        setLoading(false);
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
        setLoading(false);
      } else if (
        source.droppableId === "1" &&
        destination.droppableId === "1"
      ) {
        setNewProgress(copiedItems);
        setLoading(false);
      } else if (
        source.droppableId === "2" &&
        destination.droppableId === "2"
      ) {
        setNewDone(copiedItems);
        setLoading(false);
      }
    }
  };

  // console.log("newTodo", newTodo);
  // console.log("newProgress", newProgress);
  // console.log("newDone", newDone);

  return loading ? (
    "ok"
  ) : (
    <DragDropContext
      onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
    >
      <div className='container'>
        <div className='tcs'>
          {Object.entries(columns)?.map(([columnId, column], index) => {
            //console.log(column.items.length);
            return (
              <Droppable key={columnId} droppableId={columnId}>
                {(provided, snapshot) => (
                  <div
                    className='tasklist'
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {column?.title !== "undefined" && (
                      <div className='title'>
                        {column?.title}
                        <div>{column.items.length}</div>
                      </div>
                    )}
                    {column?.items !== "undefined" &&
                      column?.items.map((item, index) => {
                        return (
                          <TaskCard key={item.id} item={item} index={index} />
                        );
                      })}
                    {provided.placeholder}
                    {columnId === "0" ? (
                      <div>
                        {add1 && (
                          <NewTask
                            dataInit={newTodo}
                            category={"To Do"}
                            setNewData={setNewTodo}
                            onClose={() => setAdd1(false)}
                          />
                        )}
                        <div
                          className='add-task'
                          onClick={() => {
                            setAdd1(true);
                            setAdd2(false);
                            setAdd3(false);
                          }}
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </div>
                      </div>
                    ) : columnId === "1" ? (
                      <div>
                        {add2 && (
                          <NewTask
                            dataInit={newProgress}
                            category={"In Progress"}
                            setNewData={setNewProgress}
                            onClose={() => setAdd2(false)}
                          />
                        )}
                        <div
                          className='add-task'
                          onClick={() => {
                            setAdd1(false);
                            setAdd2(true);
                            setAdd3(false);
                          }}
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </div>
                      </div>
                    ) : (
                      <div>
                        {add3 && (
                          <NewTask
                            dataInit={newDone}
                            category={"Done"}
                            setNewData={setNewDone}
                            onClose={() => setAdd3(false)}
                          />
                        )}
                        <div
                          className='add-task'
                          onClick={() => {
                            setAdd1(false);
                            setAdd2(false);
                            setAdd3(true);
                          }}
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </div>
    </DragDropContext>
  );
};

export default KanbanStatic;
