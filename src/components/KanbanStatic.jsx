/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import "./index.css";

const KanbanStatic = () => {
  const [loading, setLoading] = useState(false);
  const [columns, setColumns] = useState([]);

  const date = new Date();
  const datainit = [
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
    {
      id: "5",
      Task: "Rocket",
      Category: "Done",
      Due_Date: date,
    },
  ];

  const backData = localStorage.getItem("backData");
  const upData = localStorage.getItem("updatedData");

  const settingInitialData = () => {
    const data = datainit.map((res) => {
      return res;
    });

    const todo = data.filter((el) => {
      return el.Category === "To Do";
    });
    const progress = data.filter((el) => {
      return el.Category === "In Progress";
    });
    const done = data.filter((el) => {
      return el.Category === "Done";
    });

    const backStaticdata = [
      {
        title: "To Do",
        items: todo,
      },
      {
        title: "In Progress",
        items: progress,
      },
      {
        title: "Done",
        items: done,
      },
    ];
    setColumns(backStaticdata);
    localStorage.setItem("backData", JSON.stringify(backStaticdata));
  };

  const settingUpdatedData = () => {
    setColumns(JSON.parse(upData));
  };

  useEffect(() => {
    if (!backData) {
      settingInitialData();
    } else {
      if (backData && !upData) {
        const backData = localStorage.getItem("backData");
        setColumns(JSON.parse(backData));
      } else if (upData) {
        settingUpdatedData();
      }
    }
  }, []);

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
      localStorage.setItem(
        "updatedData",
        JSON.stringify({
          ...columns,
          [source.droppableId]: {
            ...sourceColumn,
            items: sourceItems,
          },
          [destination.droppableId]: {
            ...destColumn,
            items: destItems,
          },
        })
      );
      // console.log("dragEnd----> ", {
      //   ...columns,
      //   [source.droppableId]: {
      //     ...sourceColumn,
      //     items: sourceItems,
      //   },
      //   [destination.droppableId]: {
      //     ...destColumn,
      //     items: destItems,
      //   },
      // });
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
      localStorage.setItem(
        "updatedData",
        JSON.stringify({
          ...columns,
          [source.droppableId]: {
            ...column,
            items: copiedItems,
          },
        })
      );
      // console.log("dragEnd", {
      //   ...columns,
      //   [source.droppableId]: {
      //     ...column,
      //     items: copiedItems,
      //   },
      // });
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
            return (
              <Droppable key={columnId} droppableId={columnId}>
                {(provided, snapshot) => (
                  <div
                    className='tasklist'
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {column?.title !== "undefined" && (
                      <div className='title'>{column?.title}</div>
                    )}
                    {column?.items !== "undefined" &&
                      column?.items.map((item, index) => (
                        <TaskCard key={item.id} item={item} index={index} />
                      ))}
                    {provided.placeholder}
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
