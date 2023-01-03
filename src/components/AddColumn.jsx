/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import shortid from "shortid";
import { connect, useDispatch } from "react-redux";
import ColumnEditor from "./ColumnEditor";
import EditButtons from "./EditButtons";

const AddColumn = ({ toggleAddingList }) => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const handleChangeTitle = (e) => setTitle(e.target.value);

  const createList = async () => {
    toggleAddingList();
    dispatch({
      type: "ADD_COLUMN",
      payload: { listId: shortid.generate(), listTitle: title },
    });
  };
  return (
    <div className='bg-["#dfe3e6"] rounded-md p-0.5'>
      <ColumnEditor
        title={title}
        handleChangeTitle={handleChangeTitle}
        onClickOutside={toggleAddingList}
        saveList={createList}
      />

      <EditButtons
        handleSave={createList}
        saveLabel={"Add Column"}
        handleCancel={toggleAddingList}
      />
    </div>
  );
};

export default connect()(AddColumn);
