import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { v4 as uuid } from "uuid";

const NewTask = ({ setNewRows, columnId, onClose }) => {
  const date = new Date();
  const [form] = useState({
    id: uuid(),
    columnBelong: columnId,
    task: "",
    dueDate: date,
    icon: "",
  });

  return (
    <div>
      <Formik
        initialValues={form}
        validateOnChange={false}
        validateOnBlur={false}
        validate={(form) => {
          let errors = {};
          if (!form.task) {
            errors.task = "Task shouldn't be empty!";
          } else if (form.task.length > 16) {
            errors.task = "Heading! Not a discription...";
          }
          return errors;
        }}
        className='flex flex-col w-[100%] mt-4'
        onSubmit={(form, { setSubmitting }) => {
          if (new RegExp(/^\s+|\s+$/g).test(form.task)) {
            let newTask = form.task.replace(/^\s+|\s+$/g, "");
            let newForm = { ...form, task: newTask };
            let newData = newForm;
            setNewRows(newData);
            setSubmitting(false);
            onClose();
          } else {
            setNewRows(form);
            setSubmitting(false);
            onClose();
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className='flex flex-row'>
              <Field
                className='flex flex-row rounded-md w-[80%] p-4 border-none text-base bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-300 focus:outline-none focus:bg-gray-300 focus:text-gray-900'
                type='text'
                name='task'
                autoComplete='off'
                placeholder='Add Task'
                autoFocus
              />

              <button
                className='block w-[20%] ml-2 rounded-md border-none text-gray-300 bg-gray-900 shadow-md hover:bg-green-700'
                type='submit'
                disabled={isSubmitting}
              >
                <FontAwesomeIcon icon={faCheck} />
              </button>
            </div>
            <ErrorMessage
              className='text-red-500 mt-2 mb-0'
              name='task'
              component='div'
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewTask;
