/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useRef, useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { ColumnEditorStyles } from "../styles";

const ColumnEditor = ({ onEnter, title, handleChangeTitle }) => {
  return (
    <div className='flex items-center'>
      <TextareaAutosize
        autoFocus
        maxRows={3}
        className={ColumnEditorStyles.ceText}
        placeholder='Enter the title for column...'
        value={title}
        onChange={handleChangeTitle}
        onKeyDown={onEnter}
      />
    </div>
  );
};

export default ColumnEditor;
