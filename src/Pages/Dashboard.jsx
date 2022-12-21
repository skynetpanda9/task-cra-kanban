/* eslint-disable no-unused-vars */
import React from "react";
import MainLayout from "../Layouts/MainLayout";
import Header from "../components/Header";
import KanbanStatic from "../components/KanbanStatic";

function Dashboard() {
  return (
    <div>
      <div className='h-screen w-full fixed flex flex-col items-center justify-start bg-gray-200 dark:bg-gray-900'>
        <Header />
        <MainLayout>
          <div className='flex flex-row justify-center items-center'>
            <KanbanStatic />
          </div>
        </MainLayout>
      </div>
    </div>
  );
}

export default Dashboard;
