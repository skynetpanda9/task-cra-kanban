import React from "react";

const MainLayout = (props) => {
  return (
    <div className='flex flex-col relative my-2 justify-center items-center w-full px-4 box-border overflow-y-auto'>
      <div className='flex flex-col w-full justify-start min-h-[90vh]'>
        {props.children}
      </div>
    </div>
  );
};

export default MainLayout;
