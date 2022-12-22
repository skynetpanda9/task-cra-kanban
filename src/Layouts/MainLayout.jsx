import React from "react";

const MainLayout = (props) => {
  return (
    <div className='flex flex-col justify-center items-center w-[100vw] box-border my-auto'>
      <div className='flex flex-col w-[97vw] xl:w-full overflow-x-auto min-h-[90vh]'>
        {props.children}
      </div>
    </div>
  );
};

export default MainLayout;
