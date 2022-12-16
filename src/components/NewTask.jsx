import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import { v4 as uuid } from "uuid";

const NewTask = ({ onClose }) => {
  const date = new Date();
  const [form, setForm] = useState({
    id: uuid(),
    Category: "To Do",
    Task: "",
    Due_Date: date,
  });

  const upData = localStorage.getItem("updatedData");
  const parsed = JSON.parse(upData);
  console.log("sdfsf", parsed);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (form.Task === "") {
      alert(`Task shouldn't be empty!`);
    } else {
      alert(JSON.stringify(form));
      function insertObject(arr, obj) {
        // append object
        let finArr = [...arr, obj];
        console.log(finArr);
      }
      insertObject([parsed], form);
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
