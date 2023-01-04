import React from "react";
import { MainLayoutStyles } from "../styles";

const MainLayout = (props) => {
  return (
    <div className={MainLayoutStyles.mlMain}>
      <div className={MainLayoutStyles.mlProps}>{props.children}</div>
    </div>
  );
};

export default MainLayout;
