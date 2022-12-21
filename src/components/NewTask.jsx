import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import "./index.css";
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
      <form className='input-group' onSubmit={handleSubmit}>
        <input
          className='input-task'
          value={form.Task}
          name='Task'
          type='text'
          autoComplete='off'
          onChange={handleInput}
          placeholder='Add Task'
        />
        <button className='button' type='submit'>
          <FontAwesomeIcon icon={faCheck} />
        </button>
      </form>
    </div>
  );
};

export default NewTask;
