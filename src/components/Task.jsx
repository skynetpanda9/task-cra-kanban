/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import TaskEditor from "./TaskEditor";
import { TaskStyles } from "../styles";

const Task = (listId, index) => {
  const [text, setText] = useState("");
  const [hover, setHover] = useState(false);
  const [editing, setEditing] = useState(false);

  const card = useSelector(
    (state, ownProps) => state.cardsById[ownProps.cardId]
  );
  const dispatch = useDispatch();

  const startHover = () => setHover(true);
  const endHover = () => setHover(false);

  const startEditing = () => {
    setHover(false);
    setEditing(true);
    setText(card.text);
  };

  const endEditing = () => {
    setHover(false);
    setEditing(false);
  };

  const editCard = async () => {
    endEditing();
    dispatch({
      type: "CHANGE_CARD_TEXT",
      payload: { cardId: card._id, cardText: text },
    });
  };

  const deleteCard = async () => {
    if (window.confirm("Are you sure to delete this card?")) {
      dispatch({
        type: "DELETE_CARD",
        payload: { cardId: card._id, listId },
      });
    }
  };

  if (!editing) {
    return (
      <Draggable draggableId={card._id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={TaskStyles.task}
            onMouseEnter={startHover}
            onMouseLeave={endHover}
          >
            {hover && (
              <div className={TaskStyles.taskIcons}>
                <div className={TaskStyles.taskIc} onClick={startEditing}>
                  <ion-icon name='create' />
                </div>
              </div>
            )}

            {card.text}
          </div>
        )}
      </Draggable>
    );
  } else {
    return (
      <TaskEditor
        text={card.text}
        onSave={editCard}
        onDelete={deleteCard}
        onCancel={endEditing}
      />
    );
  }
};

export default Task;
