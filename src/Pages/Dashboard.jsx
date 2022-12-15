/* eslint-disable no-unused-vars */
/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from "react";
import MainLayout from "../Layouts/MainLayout";
import Header from "../components/Header";
import "./index.css";
import Kanban from "../components/Kanban";

function Dashboard() {
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
