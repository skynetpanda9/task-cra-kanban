import React from "react";
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
      <ion-icon name='close' />
    </div>
  </div>
);

export default EditButtons;
