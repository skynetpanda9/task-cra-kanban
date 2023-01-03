/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import EditButtons from "./EditButtons";
import { TaskEditorStyles } from "../styles";

const TaskEditor = ({ text, onSave, onCancel, adding }) => {
  const [mtext, setmText] = useState(text);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");

  const handleChangeText = (e) => {
    setmText(e.target.value);
  };

  const onEnter = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      if (!mtext) {
        setError("Task cannot be empty!");
        setShowError(true);
      } else if (new RegExp(/^\s+|\s+$/g).test(mtext)) {
        let newTask = mtext.replace(/^\s+|\s+$/g, "");
        if (newTask === "") {
          setmText("");
        } else {
          if (newTask.length > 20 || newTask.length < 3) {
            setmText("");
            setError("Task should be between 3-20 chars!");
            setShowError(true);
          } else onSave(newTask);
        }
      } else if (mtext.length > 20 || mtext.length < 3) {
        setmText("");
        setError("Task should be between 3-20 chars");
        setShowError(true);
      } else {
        onSave(mtext);
      }
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!mtext) {
      setError("Task cannot be empty!");
      setShowError(true);
    } else if (new RegExp(/^\s+|\s+$/g).test(mtext)) {
      let newTask = mtext.replace(/^\s+|\s+$/g, "");
      if (newTask === "") {
        setmText("");
      } else {
        if (newTask.length > 20 || newTask.length < 3) {
          setmText("");
          setError("Task should be between 3-20 chars!");
          setShowError(true);
        } else onSave(newTask);
      }
    } else if (mtext.length > 20 || mtext.length < 3) {
      setmText("");
      setError("Task should be between 3-20 chars");
      setShowError(true);
    } else {
      onSave(mtext);
    }
  };

  return (
    <div className={TaskEditorStyles.common}>
      <div className={TaskEditorStyles.common}>
        <TextareaAutosize
          autoFocus
          className={TaskEditorStyles.textArea}
          placeholder='Enter the text for this card...'
          value={mtext}
          onChange={handleChangeText}
          onKeyDown={onEnter}
        />
        {showError ? (
          <p className='text-sm text-red-500 ml-2'>{error}</p>
        ) : null}
      </div>
      <EditButtons
        handleSave={onSubmit}
        saveLabel={adding ? "Add card" : "Save"}
        handleCancel={onCancel}
      />
    </div>
  );
};

export default TaskEditor;