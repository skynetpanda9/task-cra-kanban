import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { CloseIcon } from "../../icons";
import { ModalStyles } from "../../styles";

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
    <div className={ModalStyles.modalMain}>
      <div className={ModalStyles.modalBack} role='dialog' aria-modal='true'>
        <div className={ModalStyles.modalMainChild}>
          <div className={ModalStyles.modalChild2}>
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
                    <label className={ModalStyles.modalLabel}>Add Column</label>
                    <Field
                      className={`${ModalStyles.modalField}`}
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
                      className={ModalStyles.modalButton}
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
      <div className={ModalStyles.modalUltraBack}></div>
    </div>
  );
};

export default Modal;
