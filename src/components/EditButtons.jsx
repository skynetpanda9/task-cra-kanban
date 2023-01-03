import React from "react";
import { CloseIcon } from "../icons";
import { EditButtonsStyles } from "../styles";

const EditButtons = ({ handleSave, saveLabel, handleCancel }) => (
  <div className='flex'>
    <div
      tabIndex='0'
      className={EditButtonsStyles.EditButtonGreen}
      onClick={handleSave}
    >
      {saveLabel}
    </div>
    <div
      tabIndex='0'
      className={EditButtonsStyles.EditClose}
      onClick={handleCancel}
    >
      <CloseIcon name='close' />
    </div>
  </div>
);

export default EditButtons;
