/* eslint-disable no-unused-vars */
import React from "react";
import users from "../data/userData";
import { CloseIcon } from "../icons";
import { AssigneeModalStyles } from "../styles";

const AssigneeModal = ({ setIcon, setUserFn, assignToggle }) => {
  window.addEventListener("keydown", (event) => {
    if (event.defaultPrevented) {
      return;
    }
    if (event.key === "Escape") {
      assignToggle(false);
    }
  });

  return (
    <div className={AssigneeModalStyles.amMain}>
      <div
        className={AssigneeModalStyles.amModal}
        role='dialog'
        aria-modal='true'
      >
        <div className={AssigneeModalStyles.amTitle}>
          <p className={AssigneeModalStyles.amTitleText}>Assign to</p>
          <CloseIcon toggle={() => assignToggle(false)} />
        </div>
        <div className={AssigneeModalStyles.amIconMain}>
          {users.map((user) => {
            return (
              <ul key={user.id} className='w-full'>
                <li
                  onClick={() => {
                    setIcon(user.icon);
                    setUserFn(user.icon);
                    assignToggle(false);
                  }}
                  className={AssigneeModalStyles.amIcon}
                >
                  <div className='font-medium'>{user.name}</div>
                  <div>{user.icon}</div>
                </li>
              </ul>
            );
          })}
        </div>
      </div>
      <div className={AssigneeModalStyles.amBack}></div>
    </div>
  );
};

export default AssigneeModal;
