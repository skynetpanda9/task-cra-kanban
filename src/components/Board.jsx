/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { BoardStyles } from "../styles";

import Column from "./Column";
import AddColumn from "./AddColumn";
import { connect } from "react-redux";
import { AddIcon } from "../icons";

const Board = ({ board }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const [addingList, setAddingList] = useState(false);

  const toggleAddingList = () => {
    setAddingList(!addingList);
  };

  window.addEventListener("keydown", (event) => {
    if (event.defaultPrevented) {
      return;
    }
    if (event.key === "Escape") {
      setAddingList(false);
    }
  });

  const handleDragEnd = ({ source, destination, type }) => {
    // dropped outside the allowed zones
    if (!destination) return;
    // Move list
    if (type === "COLUMN") {
      // Prevent update if nothing has changed
      if (source.index !== destination.index) {
        dispatch({
          type: "MOVE_LIST",
          payload: {
            oldListIndex: source.index,
            newListIndex: destination.index,
          },
        });
      }
      return;
    }

    // Move card
    if (
      source.index !== destination.index ||
      source.droppableId !== destination.droppableId
    ) {
      dispatch({
        type: "MOVE_CARD",
        payload: {
          sourceListId: source.droppableId,
          destListId: destination.droppableId,
          oldCardIndex: source.index,
          newCardIndex: destination.index,
        },
      });
    }
  };

  const next = () => {
    requestAnimationFrame(() => {
      const scrollLeft = ref.current.scrollLeft;
      const itemWidth = parseInt(
        getComputedStyle(ref.current.children[0]).width
      );
      ref.current.scrollLeft = scrollLeft + itemWidth * 3;
    });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId='board' direction='horizontal' type='COLUMN'>
        {(provided, snapshot) => (
          <div className={BoardStyles.board} ref={provided.innerRef}>
            <div className={BoardStyles.bChild} ref={ref}>
              {board.lists.map((listId, index) => {
                return <Column listId={listId} key={listId} index={index} />;
              })}
              {provided.placeholder}
              <div className={BoardStyles.addList}>
                {addingList ? (
                  <AddColumn toggleAddingList={toggleAddingList} />
                ) : (
                  <div
                    onClick={() => {
                      next();
                      toggleAddingList();
                    }}
                    className={BoardStyles.listButton}
                  >
                    <AddIcon name='add' />
                    <p className='mr-3'>Add a column</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const mapStateToProps = (state) => ({ board: state.board });

export default connect(mapStateToProps)(Board);
