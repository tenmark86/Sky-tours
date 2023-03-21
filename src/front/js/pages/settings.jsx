import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "../components/button";

export const Settings = () => {
  const { store, actions } = useContext(Context);
  const { register, handleSubmit } = useForm();
  const [settingsPanel, setSettingsPanel] = useState("");
  // variables para desplegar modal de borrar cuenta
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSubmit = (data) => {
    if (data.picture != undefined) {
      actions.setNewPicture(data.picture);
    }
    actions.updateProfileData(JSON.stringify(data), data.picture);
    localStorage.setItem("tokenName", data.name);
  };

  useEffect(() => {
    actions.verifyLogin();
    actions.getUser(localStorage.getItem("tokenID"), true);
  }, []);

  useEffect(() => {
    if (store.currentUser && store.currentUser.age != undefined) {
      setSettingsPanel(
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-div">
            <h5 className="my-2">profile picture:</h5>
            <input
              id="picture"
              type="file"
              className="input-style"
              {...register("picture")}
            />
            <h5 className="my-2">Biography:</h5>
            <textarea
              id="biography"
              className="input-style my-textarea"
              maxLength="1000"
              title="Maximum 1000 characters"
              defaultValue={store.currentUser.bio}
              {...register("bio")}
            />
            <h5 className="my-2">Name:</h5>
            <input
              id="name"
              type="text"
              className="input-style"
              minLength="2"
              maxLength="35"
              defaultValue={store.currentUser.name}
              {...register("name")}
            />
            <h5 className="my-2">Age:</h5>
            <input
              id="age"
              type="number"
              className="input-style"
              min="16"
              max="110"
              title="invalid age"
              defaultValue={store.currentUser.age}
              required
              {...register("age")}
            />
            <h5 className="my-2">Languages:</h5>
            <input
              id="language"
              type="text"
              className="input-style"
              minLength="2"
              maxLength="100"
              defaultValue={store.currentUser.language}
              {...register("language")}
            />
            <h5 className="my-2">Location:</h5>
            <input
              id="localization"
              type="text"
              className="input-style"
              minLength="2"
              maxLength="100"
              defaultValue={store.currentUser.localization}
              {...register("localization")}
            />
            <h5 className="my-2">Email:</h5>
            <input
              id="email"
              type="email"
              defaultValue={store.currentUser.email}
              className="input-style"
              {...register("email")}
            />
            <h5 className="my-2">Password:</h5>
            <input
              id="password"
              type="password"
              className="input-style"
              minLength="6"
              maxLength="30"
              {...register("password")}
            />
            <div className="text-center my-4 d-block">
              <Link to={"/user/".concat(store.currentUser.id)}>
                <Button
                  className="m-2"
                  size="lm"
                  color="primary"
                  text="CANCEL"
                />
              </Link>
              <input
                type="submit"
                value="KEEP"
                className="button lm secondary m-2"
              />
            </div>
          </div>
        </form>
      );
    }
  }, [store.currentUser]);

  return (
    <div className="settings-background py-0">
      <div className="settings-body container my-0 pb-2">
        <h1 className="text-center pt-4">profile settings</h1>
        {settingsPanel}
        <div
          role="button"
          className="d-flex m-5 justify-content-end text-danger"
        >
          <span onClick={handleShow}>
          Delete account
            <i className="fas fa-trash-alt cursor-pointer" />
          </span>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header className="text-center">
              <Modal.Title className="text-center">Delete account</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
              <p>Are you sure you want to permanently delete your account?</p>
              <Button
                className="m-2"
                size="sm"
                color="secondary"
                text="cancel"
                callBackFunc={handleClose}
              />
              <Button
                className="m-2"
                size="sm"
                color="primary"
                text="Eliminate"
                callBackFunc={() => {
                  actions.deleteUser();
                }}
              />
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
};
