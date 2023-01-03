/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { createRef, useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { ColumnEditorStyles } from "../styles";

const ColumnEditor = ({
  saveList,
  title,
  onClickOutside,
  handleChangeTitle,
}) => {
  const ref = createRef();

  const onEnter = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      saveList();
    }
  };

  const handleClick = (e) => {
    let node = ref.current;
    if (node.contains(e.target)) {
      return;
    }
    onClickOutside();
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick, false);
    return () => {
      document.removeEventListener("mousedown", handleClick, false);
    };
  }, []);

  return (
    <div className='flex items-center' ref={ref}>
      <TextareaAutosize
        autoFocus
        className={ColumnEditorStyles.ceText}
        placeholder='Enter column title...'
        value={title}
        onChange={handleChangeTitle}
        onKeyDown={onEnter}
      />
    </div>
  );
};

export default ColumnEditor;
