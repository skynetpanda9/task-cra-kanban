/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { TaskStyles } from "../styles";

import { connect, useDispatch } from "react-redux";
import { UserIcon } from "../icons";
import AssigneeModal from "./AssigneeModal";

const Task = ({ card, index }) => {
  const [assignee, setAssignee] = useState(false);
  const [user, setUser] = useState(card.user);

  const dispatch = useDispatch();

  const updateUser = async (userIcon) => {
    dispatch({
      type: "UPDATE_USER",
      payload: { cardUser: userIcon, cardId: card._id },
    });
  };

  return (
    <div>
      <Draggable draggableId={card._id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={TaskStyles.task}
          >
            {card.text}
            <div
              className='cursor-pointer'
              onClick={() => setAssignee(!assignee)}
            >
              {user ? user : <UserIcon />}
            </div>
          </div>
        )}
      </Draggable>
      {assignee && (
        <AssigneeModal
          id={card.id}
          setIcon={setUser}
          setUserFn={updateUser}
          assignToggle={setAssignee}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  card: state.cardsById[ownProps.cardId],
});

export default connect(mapStateToProps)(Task);
