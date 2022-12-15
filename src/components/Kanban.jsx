/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import "./index.css";

const Kanban = () => {
  const [loading, setLoading] = useState(false);
  const [columns, setColumns] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:5000/transaction");
    const { data } = await res.json();
    const sortData = data
      .sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1))
      .map((data, i) => {
        return data;
      });
    return sortData;
  };

  const sortFetchCol = async (res) => {
    const newArray = res?.map((data, i) => {
      return {
        id: `${i + 1}`,
        Task: data.title,
        Due_Date: data.createdAt,
        Category: data.category,
      };
    });
    return newArray;
  };

  const finalArray = (res) => {
    const todo = res.filter((el) => {
      return el.Category === "To Do";
    });
    const progress = res.filter((el) => {
      return el.Category === "In Progress";
    });
    const done = res.filter((el) => {
      return el.Category === "Done";
    });
    const backdata = [
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
    setColumns(backdata);
  };

  useEffect(() => {
    fetchData()
      .then((res) => sortFetchCol(res))
      .then((res) => finalArray(res))
      .then(() => setLoading(false));
  }, []);

  const onDragEnd = (result, columns, setColumns) => {
    console.log(`columns -> ${columns}`);
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
                    <div className='title'>{column.title}</div>
                    {column.items.map((item, index) => (
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

export default Kanban;
