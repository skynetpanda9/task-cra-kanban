/* eslint-disable no-unused-vars */
import React from "react";
import MainLayout from "../Layouts/MainLayout";
import Header from "../components/Header";
import Trello from "../components/Trello";
import { DashStyle } from "../styles";
import Board from "../components/Board";

function Dashboard() {
  return (
    <div>
      <div className={DashStyle.DashMain}>
        <Header />
        <MainLayout>
          {/* <Trello /> */}
          <Board />
        </MainLayout>
      </div>
    </div>
  );
}

export default Dashboard;
