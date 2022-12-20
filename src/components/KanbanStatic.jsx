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
      Category: "To Do",
      Task: "Task 1",
      Due_Date: date,
    },
    {
      id: uuid(),
      Task: "Akash",
      Category: "To Do",
      Due_Date: date,
    },
    {
      id: uuid(),
      Task: "Task 2",
      Category: "In Progress",
      Due_Date: date,
    },
    {
      id: uuid(),
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
    setLoading(true);
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
      setNewTodo(res.todo);
      setNewProgress(res.progress);
      setNewDone(res.done);
      setColumns(backStaticData);
      setLoading(false);
    });
  }, []);

  const onDragEnd = (result, columns, setColumns) => {
    // console.log("result", result);
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      let dataInitCopy = [];
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
      const cate =
        destination.droppableId === "0"
          ? "To Do"
          : destination.droppableId === "1"
          ? "In Progress"
          : "Done";

      destination.droppableId === "0"
        ? (dataInitCopy = [...newTodo])
        : destination.droppableId === "1"
        ? (dataInitCopy = [...newProgress])
        : (dataInitCopy = [...newDone]);

      const targetIndex = dataInitCopy.findIndex(
        (f) => f.id === result.draggableId
      );
      console.log("dataInitCopy", dataInitCopy);
      dataInitCopy[targetIndex].Category = cate;
      console.log([...newTodo]);
      console.log([...newProgress]);
      console.log([...newDone]);
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

      //const dataInitCopy = [...newArray];
      const dataInitCopy =
        destination.droppableId === "0"
          ? [...newTodo]
          : destination.droppableId === "1"
          ? [...newProgress]
          : [...newDone];
      const targetIndex = dataInitCopy.findIndex(
        (f) => f.id === result.draggableId
      );

      // const id = `${source.index + 1}`;
      // dataInitCopy[targetIndex].id = id;

      console.log("source.index", source.index);
      console.log("destination.index", destination.index);
      console.log("copiedItems", copiedItems);
      // console.log("result.draggableId", result.draggableId);
    }
  };

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
                            setData={setNewTodo}
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
                            setData={setNewProgress}
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
                            setData={setNewDone}
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
