import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Modal = ({ onClickClose }) => {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    date: new Date(),
  });

  const handleInput = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://192.168.1.234:5000/transaction", {
      method: "POST",
      body: JSON.stringify(taskData),
      headers: {
        "content-type": "application/json",
      },
    });
    if (res.ok) {
      console.log("Added succesfully 👍");
      setTimeout(() => {
        window.location.reload();
      }, 300);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center fixed z-50 left-1/2 top-1/4'>
      <div
        className='bg-stone-100 dark:bg-stone-700 rounded drop-shadow-md dark:shadow-stone-500 dark:shadow max-w-[250px] z-50 m-auto p-2 fixed top-1/4'
        role='dialog'
        aria-modal='true'
      >
        <div className='flex flex-col items-center justify-center p-2 text-stone-900 dark:text-stone-100'>
          <div className='flex flex-row items-center justify-between w-full mb-2'>
            <p className='font-semibold text-lg'>Create Task</p>
            <button onClick={onClickClose}>
              <FontAwesomeIcon
                icon={faXmark}
                size='lg'
                className='text-red-600 dark:text-stone-100'
              />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col my-1 w-full'>
              <label className='text-stone-900 dark:text-stone-100 mb-2'>
                Add Description of your task
              </label>
              <input
                className={`bg-stone-100 dark:bg-stone-600 outline-none border-stone-600 dark:border-stone-100 rounded border-2 p-2 mb-2`}
                type='text'
                name='title'
                onChange={handleInput}
                value={taskData.title}
                placeholder='Add Title'
              />
              <textarea
                rows={4}
                type='text'
                name='description'
                onChange={handleInput}
                value={taskData.description}
                className={`bg-stone-100 dark:bg-stone-600 outline-none border-stone-600 dark:border-stone-100 rounded border-2 p-2 h-20`}
                autoComplete='off'
                placeholder='Add description'
              />
            </div>
            <div className='flex flex-row w-full justify-end mt-2'>
              <button
                type='submit'
                className='rounded block box-border text-stone-100 bg-green-600 dark:bg-stone-900 px-4 py-2 text-sm'
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className='fixed top-0 left-0 w-full h-full z-10 bg-black opacity-60'></div>
    </div>
  );
};

export default Modal;
