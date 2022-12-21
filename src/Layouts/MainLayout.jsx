import React from "react";

const MainLayout = (props) => {
  return (
    <div className='flex flex-col relative my-2 justify-center items-center w-full px-4 box-border min-h-screen overflow-y-auto'>
      <div className='flex flex-col w-full justify-start min-h-screen'>
        {props.children}
      </div>
    </div>
  );
};

export default MainLayout;
