/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import NewTask from "./NewTask";

const KanbanStatic = () => {
  const [loading, setLoading] = useState(false);
  const [add1, setAdd1] = useState(false);
  const [add2, setAdd2] = useState(false);
  const [add3, setAdd3] = useState(false);
  const [columns, setColumns] = useState([]);

  const date = new Date();
  const dataInit = [
    {
      id: "1",
      Category: "To Do",
      Task: "Task 1",
      Due_Date: date,
    },
    {
      id: "2",
      Task: "Akash",
      Category: "In Progress",
      Due_Date: date,
    },
    {
      id: "3",
      Task: "Task 2",
      Category: "To Do",
      Due_Date: date,
    },
    {
      id: "4",
      Task: "Mongo",
      Category: "Done",
      Due_Date: date,
    },
  ];

  const [newArray, setNewArray] = useState(dataInit);

  const settingInitialData = async () => {
    setLoading(true);
    const todo = dataInit.filter((el) => {
      return el.Category === "To Do";
    });
    const progress = dataInit.filter((el) => {
      return el.Category === "In Progress";
    });
    const done = dataInit.filter((el) => {
      return el.Category === "Done";
    });

    return { todo, progress, done };
  };

  useEffect(() => {
    settingInitialData().then((res) => {
      const backStaticData = [
        {
          title: "To Do",
          items: res.todo,
        },
        {
          title: "In Progress",
          items: res.progress,
        },
        {
          title: "Done",
          items: res.done,
        },
      ];
      setColumns(backStaticData);
      setLoading(false);
    });
  }, []);

  console.log("data", newArray);
  const setNewData = async () => {
    console.log("data", newArray);
    const NewTodo = newArray.filter((el) => {
      return el.Category === "To Do";
    });
    const newProgress = newArray.filter((el) => {
      return el.Category === "In Progress";
    });
    const newDone = newArray.filter((el) => {
      return el.Category === "Done";
    });

    const backStaticData = [
      {
        title: "To Do",
        items: NewTodo,
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
  };

  useEffect(() => {
    setNewData();
  }, [newArray]);

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
      // localStorage.setItem(
      //   "updatedData",
      //   JSON.stringify({
      //     ...columns,
      //     [source.droppableId]: {
      //       ...sourceColumn,
      //       items: sourceItems,
      //     },
      //     [destination.droppableId]: {
      //       ...destColumn,
      //       items: destItems,
      //     },
      //   })
      // );
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
      // localStorage.setItem(
      //   "updatedData",
      //   JSON.stringify({
      //     ...columns,
      //     [source.droppableId]: {
      //       ...column,
      //       items: copiedItems,
      //     },
      //   })
      // );
    }
  };

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
                            dataInit={newArray}
                            category={"To Do"}
                            setData={setNewArray}
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
                            dataInit={newArray}
                            category={"In Progress"}
                            setData={setNewArray}
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
                            dataInit={newArray}
                            category={"Done"}
                            setData={setNewArray}
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
