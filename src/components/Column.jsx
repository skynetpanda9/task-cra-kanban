/* eslint-disable no-unused-vars */
import React, { useState } from "react";
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

  return (
    <Draggable draggableId={list._id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={ColumnStyles.Column}
        >
          <div className={ColumnStyles.editList}>{list.title}</div>

          <Droppable droppableId={list._id}>
            {(provided, _snapshot) => (
              <div ref={provided.innerRef}>
                {list.cards &&
                  list.cards.map((cardId, index) => (
                    <Task
                      key={cardId}
                      cardId={cardId}
                      index={index}
                      listId={list._id}
                    />
                  ))}
                {provided.placeholder}
                {addingCard ? (
                  <TaskEditor
                    onSave={addCard}
                    onCancel={toggleAddingCard}
                    adding
                  />
                ) : (
                  <div
                    className={ColumnStyles.cAddCard}
                    onClick={toggleAddingCard}
                  >
                    <AddIcon className='mr-1' name='add' />
                    <p className='ml-2'>Add new card</p>
                  </div>
                )}
              </div>
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
