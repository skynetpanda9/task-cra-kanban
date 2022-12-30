import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { CloseIcon } from "../../icons";

const titleSchema = Yup.object({
  title: Yup.string()
    .min(2, "Too Short!")
    .max(16, "Too Long!")
    .required("Title is required!"),
});

const Modal = ({ setNewTitle, onClickClose }) => {
  const [form] = useState({
    title: "",
  });
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
            <CloseIcon toggle={onClickClose} />
          </div>
          <Formik
            initialValues={form}
            validationSchema={titleSchema}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={(form, { resetForm, setSubmitting }) => {
              if (new RegExp(/^\s+|\s+$/g).test(form.title)) {
                let newTitle = form.title.replace(/^\s+|\s+$/g, "");
                if (newTitle === "") {
                  resetForm({ values: "" });
                } else {
                  setNewTitle(newTitle);
                  setSubmitting(false);
                  onClickClose();
                }
              } else {
                setNewTitle(form.title);
                setSubmitting(false);
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
