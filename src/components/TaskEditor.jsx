/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import EditButtons from "./EditButtons";
import { TaskEditorStyles } from "../styles";

const TaskEditor = ({ text, onSave, onCancel, adding }) => {
  const [mtext, setmText] = useState(text);

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
          value={mtext}
          onChange={handleChangeText}
          onKeyDown={onEnter}
        />
      </div>
      <EditButtons
        handleSave={() => onSave(mtext)}
        saveLabel={adding ? "Add card" : "Save"}
        handleCancel={onCancel}
      />
    </div>
  );
};

export default TaskEditor;
