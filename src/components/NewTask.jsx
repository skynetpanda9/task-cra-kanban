import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuid } from "uuid";

const NewTask = ({ dataInit, setNewData, category, onClose }) => {
  //const [cat] = useState(category);
  const date = new Date();
  const [form, setForm] = useState({
    id: uuid(),
    Task: "",
    Category: category,
    Due_Date: date,
  });

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const insertObject = (arr, obj) => {
    let finArr = [...arr, obj];
    return finArr;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (form.Task === "") {
      alert(`Task shouldn't be empty!`);
    } else {
      let newData = insertObject(dataInit, form);
      setNewData(newData);
      onClose();
    }
  };

  return (
    <div>
      <form className='flex flex-row w-[100%] mt-4' onSubmit={handleSubmit}>
        <input
          className='flex flex-row rounded-md w-[70%] p-4 border-none text-base bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-300 focus:outline-none focus:bg-gray-300 focus:text-gray-900'
          value={form.Task}
          name='Task'
          type='text'
          autoComplete='off'
          onChange={handleInput}
          placeholder='Add Task'
        />
        <button
          className='block w-[30%] ml-2 rounded-md border-none text-gray-300 bg-gray-900 shadow-md hover:bg-green-700'
          type='submit'
        >
          <FontAwesomeIcon icon={faCheck} />
        </button>
      </form>
    </div>
  );
};

export default NewTask;
