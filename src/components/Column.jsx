/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import shortid from "shortid";

import Task from "./Task";
import TaskEditor from "./TaskEditor";
import ColumnEditor from "./ColumnEditor";
import { ColumnStyles } from "../styles";

const Column = ({ listId }, index) => {
  const list = useSelector((state) => state.listsById[listId]);
  const dispatch = useDispatch();

  const [editingTitle, setEditingTitle] = useState(false);
  const [title, setTitle] = useState(list.title);
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

  const toggleEditingTitle = () => setEditingTitle(!editingTitle);

  const handleChangeTitle = (e) => setTitle(e.target.value);

  const editListTitle = async () => {
    toggleEditingTitle();
    dispatch({
      type: "CHANGE_LIST_TITLE",
      payload: { listId, listTitle: title },
    });
  };

  return (
    <Draggable draggableId={list._id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={ColumnStyles.Column}
        >
          {editingTitle ? (
            <ColumnEditor
              list={list}
              title={title}
              handleChangeTitle={handleChangeTitle}
              saveList={editListTitle}
              onClickOutside={editListTitle}
            />
          ) : (
            <div
              className='cursor-pointer p-2 break-words'
              onClick={toggleEditingTitle}
            >
              {list.title}
            </div>
          )}

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
                    <ion-icon className='mr-1' name='add' /> Add a card
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

export default Column;
