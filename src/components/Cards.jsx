import React, { useState, useEffect } from "react";
import AddNewTaskButton from "./AddNewTask";
import Modal from "../utils/Modal/Modal";
import TaskCard from "./TaskCard";
import "./index.css";

const Cards = ({ title, icon }) => {
  const [showModal, setShowModal] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    const res = await fetch("http://192.168.1.234:5000/transaction");
    const { data } = await res.json();
    setTransactions(data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const DataItems = () => {
    return (
      <ul>
        {transactions
          .sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1))
          .map((data) => (
            <li key={data._id}>
              <TaskCard title={data.title} />
            </li>
          ))}
      </ul>
    );
  };

  return (
    <>
      <div className='cards'>
        <div className='card-icon'>{icon}</div>
        <div className='title-flex '>
          <p className='title'>{title}</p>
        </div>
        <div className='card-body'>
          {title === "To Do" && <DataItems />}
          {title === "To Do" && (
            <>
              <AddNewTaskButton
                onClick={() => {
                  setShowModal(true);
                }}
              />
            </>
          )}
        </div>
      </div>
      {showModal && (
        <Modal
          title={"Create Task"}
          label={"Add Description of your task"}
          onClickClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default Cards;
