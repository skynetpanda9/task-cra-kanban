/* eslint-disable react-hooks/exhaustive-deps */

import React from "react";
import "./index.css";

const MainLayout = (props) => {
  return (
    <div className='main-layout'>
      <div className='main-props'>{props.children}</div>
    </div>
  );
};

export default MainLayout;
