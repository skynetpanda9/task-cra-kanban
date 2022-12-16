/* eslint-disable no-unused-vars */
import React from "react";
import MainLayout from "../Layouts/MainLayout";
import Header from "../components/Header";
import "./index.css";
import Kanban from "../components/Kanban";
import KanbanStatic from "../components/KanbanStatic";

function Dashboard() {
  return (
    <div>
      <div className='dashboard'>
        <Header />
        <MainLayout>
          <div className='dash-inner'>
            <KanbanStatic />
            {/* <Kanban /> */}
          </div>
        </MainLayout>
      </div>
    </div>
  );
}

export default Dashboard;
