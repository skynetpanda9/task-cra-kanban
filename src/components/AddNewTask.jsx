import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./index.css";

const AddNewTaskButton = ({ onClick }) => {
  return (
    <div>
      <button onClick={onClick} className='task-button'>
        <FontAwesomeIcon className='icon' icon={faPlus} />
      </button>
    </div>
  );
};

export default AddNewTaskButton;
