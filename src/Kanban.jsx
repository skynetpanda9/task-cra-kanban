/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

const Kanban = () => {
  const [transactions, setTransactions] = useState([]);
  const [columnData, setColumnData] = useState([]);
  const [backData, setBackData] = useState([]);

  const fetchData = async () => {
    const res = await fetch("http://localhost:5000/transaction");
    const { data } = await res.json();
    const sortData = data
      .sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1))
      .map((data, i) => {
        return data;
      });
    setTransactions(sortData);
  };

  const sortFetchCol = async () => {
    const newArray = await transactions?.map((data) => {
      return {
        id: data._id,
        Task: data.title,
        Due_Date: data.createdAt,
        Category: data.category,
      };
    });
    setColumnData(newArray);
    return newArray;
  };

  const sortFetchData = async (res) => {
    const backArray = await res?.map((data) => {
      return {
        title: data.Category,
        items: [],
      };
    });
    setBackData(backArray);
    return backArray;
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    sortFetchCol().then((res) => sortFetchData(res));
  }, [transactions]);

  const data = [
    {
      id: "1",
      Task: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent.",
      Due_Date: "25-May-2020",
    },
    {
      id: "2",
      Task: "Fix Styling",
      Due_Date: "26-May-2020",
    },
    {
      id: "3",
      Task: "Handle Door Specs",
      Due_Date: "27-May-2020",
    },
    {
      id: "4",
      Task: "morbi",
      Due_Date: "23-Aug-2020",
    },
    {
      id: "5",
      Task: "proin",
      Due_Date: "05-Jan-2021",
    },
  ];
  const columnsFromBackend = {
    [uuidv4()]: {
      title: "To-do",
      items: columnData,
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

  console.log("transactions", transactions);
  console.log("columnData", columnData);
  console.log("backData", backData);

  const [columns, setColumns] = useState(backData);
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
  return (
    <DragDropContext
      onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
    >
      <div className='container'>
        <div className='tcs'>
          {Object.entries(columns).map(([columnId, column], index) => {
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
                      <TaskCard key={item} item={item} index={index} />
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
