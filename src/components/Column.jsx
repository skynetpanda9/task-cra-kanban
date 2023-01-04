/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import shortid from "shortid";

import Task from "./Task";
import TaskEditor from "./TaskEditor";
import { ColumnStyles } from "../styles";
import { connect } from "react-redux";
import { AddIcon } from "../icons";

const Column = ({ list, listId, index }) => {
  const dispatch = useDispatch();
  const tasksEndRef = useRef(null);

  const [scrollDown, setScrollDown] = useState(false);

  const [addingCard, setAddingCard] = useState(false);

  const toggleAddingCard = () => setAddingCard(!addingCard);

  const addCard = async (cardText) => {
    toggleAddingCard();
    const cardId = shortid.generate();
    dispatch({
      type: "ADD_TASK",
      payload: { cardText, cardId, listId },
    });
  };

  window.addEventListener("keydown", (event) => {
    if (event.defaultPrevented) {
      return;
    }
    if (event.key === "Escape") {
      setAddingCard(false);
    }
  });

  const scrollToBottom = () => {
    tasksEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    setTimeout(() => {
      setScrollDown(false);
    }, 50);
  }, [scrollDown]);

  return (
    <Draggable draggableId={list._id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={ColumnStyles.column}
        >
          <div className={ColumnStyles.cTitle}>{list.title}</div>
          <Droppable droppableId={list._id}>
            {(provided, _snapshot) => (
              <>
                <div
                  className={ColumnStyles.cScrollable}
                  ref={provided.innerRef}
                >
                  {list.cards &&
                    list.cards.map((cardId, index) => (
                      <div key={cardId} ref={tasksEndRef}>
                        <Task
                          key={cardId}
                          cardId={cardId}
                          index={index}
                          listId={list._id}
                        />
                      </div>
                    ))}
                  {provided.placeholder}
                </div>
                <div className='flex mt-auto'>
                  {addingCard ? (
                    <TaskEditor
                      onSave={addCard}
                      onAdd={setScrollDown}
                      onCancel={toggleAddingCard}
                      adding
                    />
                  ) : (
                    <div
                      className={ColumnStyles.cAddCard}
                      onClick={() => {
                        toggleAddingCard();
                        setScrollDown(true);
                      }}
                    >
                      <AddIcon className='mr-1' name='add' />
                      <p className='ml-2'>Add new card</p>
                    </div>
                  )}
                </div>
              </>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

const mapStateToProps = (state, ownProps) => ({
  list: state.listsById[ownProps.listId],
});

export default connect(mapStateToProps)(Column);
