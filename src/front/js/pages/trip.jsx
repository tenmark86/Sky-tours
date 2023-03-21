import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";
import Button from "../components/button";
import Modal from "react-bootstrap/Modal";

export const Trip = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const [trip, setTrip] = useState({});
  const [tripDetails, setTripDetails] = useState("");
  const [partnersMap, setPartnersMap] = useState("");
  const linkToUserID = "/user/".concat(trip.traveler_id);
  const joinTrip = () => actions.joinTrip(params.id);
  // variables para desplegar modal de borrar trip
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const modalDeleteTrip = () => {
    if (trip.traveler_id == localStorage.getItem("tokenID")) {
      return (
        <div
          role="button"
          className="d-flex m-5 justify-content-end text-danger"
        >
          <span onClick={handleShow}>
          Delete travel proposal <i className="fas fa-trash-alt" />
          </span>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header className="text-center">
              <Modal.Title className="text-center">
              Delete travel proposal
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
              <p>Are you sure you want to delete this trip proposal?</p>
              <Button
                className="m-2"
                size="sm"
                color="secondary"
                text="Cancel"
                callBackFunc={handleClose}
              />
              <Button
                className="m-2"
                size="sm"
                color="primary"
                text="Eliminate"
                callBackFunc={() => {
                  actions.deleteTrip(params.id);
                }}
              />
            </Modal.Body>
          </Modal>
        </div>
      );
    }
  };

  useEffect(() => {
    actions.getTrip(params.id);
  }, []);

  useEffect(() => {
    setTrip(store.trip);
  }, [store.trip]);

  useEffect(() => {
    if (trip.partners != undefined) {
      if (trip.partners.length != 0) {
        setPartnersMap(
          trip.partners.map((partner, index) => {
            const linkToPartnerID = "/user/".concat(partner.id);
            return (
              <div className="partner-element" key={index.toString}>
                <Link to={linkToPartnerID}>
                  <img
                    src={
                      localStorage.getItem("token")
                      ? partner.profile_picture
                      : "https://res.cloudinary.com/braulg/image/upload/v1624454265/airfaohxepd3ncf5tnlf.png"
                    }
                    className="partner-picture"
                  />
                  <p className="fw-bold">{
            localStorage.getItem("token")
            ? partner.name: "Usuario"}</p>
                </Link>
              </div>
            );
          })
        );
      } else {
        setPartnersMap(<p>No one has joined yet, be patient :)</p>);
      }
    }
  }, [trip]);

  useEffect(() => {
    if (trip != undefined && trip.id == params.id) {
      setTripDetails(
        <>
          <h1 className="my-4">
          Travel to : <span className="text-dark fw-bold">{trip.country}</span>
          </h1>
          <div className="row">
            <div className="col-12 col-md-6">
              <h4>Proposed by:</h4>
              <Link to={linkToUserID}>
                <div className="d-flex align-items-center">
                  <img src={
                    localStorage.getItem("token")
                    ? trip.traveler_picture
                    : "https://res.cloudinary.com/braulg/image/upload/v1624454265/airfaohxepd3ncf5tnlf.png"
                    } className="user-picture" />
                  <p className="user-name fw-bold">{
                  localStorage.getItem("token")
                  ? trip.traveler_name: "Usuario"
                  }</p>
                </div>
              </Link>
            </div>
            <div className="col-12 col-md-6">
              <h4 className="mt-2">cities:</h4>
              <p className="fw-bold">{trip.cities}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6">
              <h4>Start date:</h4>
              <p>{trip.start_date.slice(0, -12)}</p>
            </div>
            <div className="col-12 col-md-6">
              <h4>Return date:</h4>
              <p>{trip.end_date.slice(0, -12)}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6">
              <h4><Activities></Activities>:</h4>
              <p>{trip.activities}</p>
            </div>
            {trip.traveler_id == localStorage.getItem("tokenID") ? (
              ""
            ) : (
              <div className="col-12 col-md-6 my-2 pt-2">
                <Button
                  className=""
                  size="lm"
                  color="secondary"
                  text="APÚNTATE"
                  callBackFunc={joinTrip}
                />
              </div>
            )}
          </div>
          <h4><Companions></Companions>:</h4>
          {partnersMap != "" ? partnersMap : "no companions yet"}
        </>
      );
    }
    if (trip.is_active == false) {
      setTripDetails(
        <h2 className="text-center my-3">
          Looks like this trip has been deleted... :(
        </h2>
      );
    }
  }, [partnersMap]);

  return (
    <div className="container-fluid row main-box trips-background">
        <div className="col-sm-12 col-md-9 content-box scrollable-box px-5 py-3">
          {tripDetails}
          {modalDeleteTrip()}
        </div>
    </div>
  );
};
