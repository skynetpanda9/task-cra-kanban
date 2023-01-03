/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useRef, useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { ColumnEditorStyles } from "../styles";

const ColumnEditor = ({
  onEnter,
  title,
  onClickOutside,
  handleChangeTitle,
}) => {
  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          return;
        }
        onClickOutside();
      }
      document.addEventListener("mousedown", handleClickOutside, false);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside, false);
      };
    }, [ref]);
  }

  const wrapperRef = useRef();
  useOutsideAlerter(wrapperRef);

  return (
    <div className='flex items-center' ref={wrapperRef}>
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
