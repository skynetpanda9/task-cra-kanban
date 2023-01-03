/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import shortid from "shortid";
import { connect, useDispatch } from "react-redux";
import ColumnEditor from "./ColumnEditor";
import EditButtons from "./EditButtons";

const AddColumn = ({ toggleAddingList }) => {
  const [title, setTitle] = useState("");
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleChangeTitle = (e) => setTitle(e.target.value);

  const createList = async () => {
    toggleAddingList();
    dispatch({
      type: "ADD_COLUMN",
      payload: { listId: shortid.generate(), listTitle: title },
    });
  };

  const onEnter = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      if (!title) {
        setError("Task cannot be empty!");
        setShowError(true);
      } else if (new RegExp(/^\s+|\s+$/g).test(title)) {
        let newTask = title.replace(/^\s+|\s+$/g, "");
        if (newTask === "") {
          setTitle("");
        } else {
          if (newTask.length > 20 || newTask.length < 3) {
            setTitle("");
            setError("Task should be between 3-20 chars!");
            setShowError(true);
          } else createList();
        }
      } else if (title.length > 20 || title.length < 3) {
        setTitle("");
        setError("Task should be between 3-20 chars");
        setShowError(true);
      } else {
        createList();
      }
    }
  };

  const onSubmit = (e) => {
    if (!title) {
      setError("Task cannot be empty!");
      setShowError(true);
    } else if (new RegExp(/^\s+|\s+$/g).test(title)) {
      let newTask = title.replace(/^\s+|\s+$/g, "");
      if (newTask === "") {
        setTitle("");
      } else {
        if (newTask.length > 20 || newTask.length < 3) {
          setTitle("");
          setError("Task should be between 3-20 chars!");
          setShowError(true);
        } else createList();
      }
    } else if (title.length > 20 || title.length < 3) {
      setTitle("");
      setError("Task should be between 3-20 chars");
      setShowError(true);
    } else {
      createList();
    }
  };

  return (
    <div className='bg-gray-400 dark:bg-gray-700 rounded-md p-1'>
      <ColumnEditor
        title={title}
        handleChangeTitle={handleChangeTitle}
        onClickOutside={toggleAddingList}
        onEnter={onEnter}
      />
      {showError ? (
        <p className='text-sm text-red-500 ml-2 my-1'>{error}</p>
      ) : null}
      <EditButtons
        handleSave={onSubmit}
        saveLabel={"Add Column"}
        handleCancel={toggleAddingList}
      />
    </div>
  );
};

export default connect()(AddColumn);
