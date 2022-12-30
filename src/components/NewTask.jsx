import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { v4 as uuid } from "uuid";
import * as Yup from "yup";

const formSchema = Yup.object({
  task: Yup.string()
    .min(2, "Too Short!")
    .max(16, "Too Long!")
    .required("Task is required!"),
});

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
        validationSchema={formSchema}
        validateOnChange={false}
        validateOnBlur={false}
        className='flex flex-col w-[100%] mt-4'
        onSubmit={(form, { resetForm, setSubmitting }) => {
          if (new RegExp(/^\s+|\s+$/g).test(form.task)) {
            let newTask = form.task.replace(/^\s+|\s+$/g, "");
            if (newTask === "") {
              resetForm({ values: "" });
            } else {
              let newForm = { ...form, task: newTask };
              setNewRows(newForm);
              setSubmitting(false);
              onClose();
            }
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
