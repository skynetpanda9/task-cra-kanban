/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import { TaskStyles } from "../styles";

import TaskEditor from "./TaskEditor";
import { connect } from "react-redux";
import { EditIcon } from "../icons";

const Task = ({ card, index }) => {
  const [text, setText] = useState("");
  const [hover, setHover] = useState(false);
  const [editing, setEditing] = useState(false);

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
            {/* {hover && (
              <div className={TaskStyles.taskIcons}>
                <div className={TaskStyles.taskIc} onClick={startEditing}>
                  <EditIcon name='create' />
                </div>
              </div>
            )} */}
            {card.text}
          </div>
        )}
      </Draggable>
    );
  } else {
    return (
      <TaskEditor text={card.text} onSave={editCard} onCancel={endEditing} />
    );
  }
};

const mapStateToProps = (state, ownProps) => ({
  card: state.cardsById[ownProps.cardId],
});

export default connect(mapStateToProps)(Task);
