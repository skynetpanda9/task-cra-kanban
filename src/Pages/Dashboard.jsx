/* eslint-disable no-unused-vars */
/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from "react";
import MainLayout from "../Layouts/MainLayout";
import Header from "../components/Header";
import Cards from "../components/Cards";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "./index.css";
import Kanban from "../Kanban";

function Dashboard() {
  // const columnsFromBackend = [
  //   {
  //     name: "To Do",
  //     items: transactions,
  //   },
  //   {
  //     name: "In Progress",
  //     items: [],
  //   },
  //   {
  //     name: "MR/Code Review",
  //     items: [],
  //   },
  //   {
  //     name: "QA Ready",
  //     items: [],
  //   },
  //   {
  //     name: "Finished",
  //     items: [],
  //   },
  // ];

  // const [columns, setColumns] = useState(columnsFromBackend);

  // const onDragEnd = (result, columns, setColumns) => {
  //   if (!result.destination) return;
  //   const { source, destination } = result;

  //   if (source.droppableId !== destination.droppableId) {
  //     const sourceColumn = columns[source.droppableId];
  //     const destColumn = columns[destination.droppableId];
  //     const sourceItems = [...sourceColumn.items];
  //     const destItems = [...destColumn.items];
  //     const [removed] = sourceItems.splice(source.index, 1);
  //     destItems.splice(destination.index, 0, removed);
  //     setColumns({
  //       ...columns,
  //       [source.droppableId]: {
  //         ...sourceColumn,
  //         items: sourceItems,
  //       },
  //       [destination.droppableId]: {
  //         ...destColumn,
  //         items: destItems,
  //       },
  //     });
  //   } else {
  //     const column = columns[source.droppableId];
  //     const copiedItems = [...column.items];
  //     const [removed] = copiedItems.splice(source.index, 1);
  //     copiedItems.splice(destination.index, 0, removed);
  //     setColumns({
  //       ...columns,index
  //       [source.droppableId]: {
  //         ...column,
  //         items: copiedItems,
  //       },
  //     });
  //   }
  // };

  // useEffect(() => {
  //   fetchTransactions();
  // }, []);

  return (
    <div>
      <div className='dashboard'>
        <Header />
        <MainLayout>
          <div className='dash-inner'>
            <Kanban />
          </div>
        </MainLayout>
      </div>
    </div>
  );
}

export default Dashboard;
