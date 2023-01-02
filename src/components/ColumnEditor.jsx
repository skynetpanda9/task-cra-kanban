/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { ColumnEditorStyles } from "../styles";

const ColumnEditor = ({
  saveList,
  onClickOutside,
  title,
  handleChangeTitle,
}) => {
  const ref = useRef(null);

  const onEnter = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      saveList();
    }
  };

  const handleClick = (e) => {
    const node = ref.current;
    if (node.contains(e.target)) {
      return;
    }
    onClickOutside();
  };

  // useEffect(() => {
  //   document.addEventListener("click", handleClick, false);
  //   return () => {
  //     document.removeEventListener("click", handleClick, false);
  //   };
  // }, []);

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
