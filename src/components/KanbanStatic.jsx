/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import "./index.css";
import { v4 as uuidv4 } from "uuid";

const KanbanStatic = () => {
  const [loading, setLoading] = useState(false);

  const date = new Date();
  const data = [
    {
      id: "1",
      Task: "Task 1",
      Due_Date: date,
    },
    {
      id: "2",
      Task: "Akash",
      Due_Date: date,
    },
    {
      id: "3",
      Task: "Task 2",
      Due_Date: date,
    },
    {
      id: "4",
      Task: "Mongo",
      Due_Date: date,
    },
    {
      id: "5",
      Task: "Rocket",
      Due_Date: date,
    },
  ];

  const columnsFromBackend = {
    [uuidv4()]: {
      title: "To-do",
      items: data,
    },
    [uuidv4()]: {
      title: "In Progress",
      items: [],
    },
    [uuidv4()]: {
      title: "Done",
      items: [],
    },
  };

  const [columns, setColumns] = useState(columnsFromBackend);

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

export default KanbanStatic;
