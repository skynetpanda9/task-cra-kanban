/* eslint-disable no-unused-vars */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./index.css";

const TaskCard = ({ title }) => {
  return (
    <div className='task-card'>
      <p className='task-p'>{title}</p>
    </div>
  );
};

export default TaskCard;
