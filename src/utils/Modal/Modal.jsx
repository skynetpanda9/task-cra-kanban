import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { v4 as uuid } from "uuid";

const Modal = ({
  initColumnData,
  onClickClose,
  initRowData,
  setNewFilteredData,
}) => {
  // console.log(initColumnData);
  const [columnName] = useState({
    title: "",
  });

  const newColumnObj = (title, items) => {
    return {
      title: title,
      items: items,
    };
  };

  return (
    <div className='flex flex-col justify-center items-center fixed z-50 left-1/2 top-1/4'>
      <div
        className='bg-gray-200 dark:bg-gray-700 rounded-md drop-shadow-md dark:shadow-gray-500 dark:shadow max-w-[250px] z-50 m-auto p-2 fixed top-1/4'
        role='dialog'
        aria-modal='true'
      >
        <div className='flex flex-col py-2 px-1 items-center justify-center text-gray-800 dark:text-gray-300'>
          <div className='flex flex-row items-center justify-between w-full mb-2'>
            <p className='font-semibold text-lg'>Create New Column</p>
            <button onClick={onClickClose}>
              <FontAwesomeIcon
                icon={faXmark}
                size='lg'
                className='text-gray-800 hover:text-red-600 dark:hover:text-red-600'
              />
            </button>
          </div>
          <Formik
            initialValues={columnName}
            validateOnChange={false}
            validateOnBlur={false}
            validate={(columnName) => {
              let errors = {};
              if (!columnName.title) {
                errors.title = "Title shouldn't be empty!";
              }
              return errors;
            }}
            onSubmit={(columnName, { setSubmitting }) => {
              if (new RegExp(/^\s+|\s+$/g).test(columnName.title)) {
                let newTitle = columnName.title.replace(/^\s+|\s+$/g, "");
                let newForm = { ...columnName, title: newTitle };
                console.log(newForm);
                setSubmitting(false);
                onClickClose();
              } else {
                setSubmitting(false);
                const data = newColumnObj(columnName.title, initRowData);
                const newArr = { ...initColumnData, [uuid()]: data };

                setNewFilteredData(newArr);
                onClickClose();
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className='w-full'>
                <div>
                  <div className='flex flex-col'>
                    <label className='text-gray-800 dark:text-gray-300 mb-2'>
                      Add Column
                    </label>
                    <Field
                      className={`bg-gray-200 dark:bg-gray-600 outline-none border-gray-600 dark:border-gray-300 rounded border-2 p-2 mb-2`}
                      type='text'
                      name='title'
                      autoComplete='off'
                      placeholder='Column Title'
                      autoFocus
                    />
                  </div>
                  <ErrorMessage
                    className='text-red-500 mt-2 mb-0'
                    name='title'
                    component='div'
                  />
                  <div className='flex flex-row w-full justify-end mt-2'>
                    <button
                      type='submit'
                      disabled={isSubmitting}
                      className='rounded block box-border text-gray-300 bg-green-600 dark:bg-gray-900 dark:hover:bg-green-600 p-2 text-sm'
                    >
                      Add Column
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <div className='fixed top-0 left-0 w-full h-full z-10 bg-black opacity-60'></div>
    </div>
  );
};

export default Modal;
