/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import EditButtons from "./EditButtons";
import { TaskEditorStyles } from "../styles";

const TaskEditor = (text, onSave, onCancel, onDelete, adding) => {
  const [mtext, setmText] = useState(text ? text : "");

  const handleChangeText = (e) => setmText(e.target.value);

  const onEnter = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
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
          value={text}
          onChange={handleChangeText}
          onKeyDown={onEnter}
        />
      </div>
      <EditButtons
        handleSave={() => onSave(text)}
        saveLabel={adding ? "Add card" : "Save"}
        handleDelete={onDelete}
        handleCancel={onCancel}
      />
    </div>
  );
};

export default TaskEditor;
