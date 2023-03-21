import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Button from "./button";

export const TripCard = (props) => {
  const linkToTripID = "/trips/".concat(props.tripID);
  const linkToUserID = "/user/".concat(props.userID);
  const [partnersMap, setPartnersMap] = useState("");

  useEffect(() => {
    setPartnersMap(
      props.partners.map((partner, index) => {
        const linkToPartnerID = "/user/".concat(partner.id);
        return (
          <div className="partner-box-trip-card" key={index.toString()}>
            <Link to={linkToPartnerID}>
              <div className="partner-picture-box">
                <img
                  src={localStorage.getItem("token")
                  ? partner.profile_picture
                  : "https://res.cloudinary.com/braulg/image/upload/v1624454265/airfaohxepd3ncf5tnlf.png"}
                  className="partner-picture"
                />
              </div>
              <p className="">{localStorage.getItem("token")
                  ? partner.name : "Mark"}</p>
            </Link>
          </div>
        );
      })
    );
  }, []);

  return (
    <div className="my-card">
      <div className="my-card-header d-flex row p-3">
        <div className="col-12 col-md-9 my-auto">
          <h2>
          Travel to: <span className="text-dark">{props.country}</span>
          </h2>
        </div>
        <div className="col-12 col-md-3 ms-auto my-auto text-center">
          <Link to={linkToTripID}>
            <Button className="" size="sm" color="secondary" text="Know more" />
          </Link>
        </div>
      </div>
      <div className="my-card-body">
        <div className="row">
          <div className="col-12 col-md-6">
            <h4>Proposed by:</h4>
            <Link to={linkToUserID}>
              <div className="d-flex align-items-center">
                <img src={
                  localStorage.getItem("token")
                  ? props.userpicture
                  : "https://res.cloudinary.com/braulg/image/upload/v1624454265/airfaohxepd3ncf5tnlf.png"
                }
                className="user-picture" />
                <p className="user-name">{localStorage.getItem("token")
                  ? props.username: "Mark"}</p>
              </div>
            </Link>
          </div>
          <div className="col-12 col-md-6">
            <h4 className="mt-2">cities:</h4>
            <p>{props.cities}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-6">
            <h4>Start date:</h4>
            <p>{props.startDate.slice(0, -12)}</p>
          </div>
          <div className="col-12 col-md-6">
            <h4>Return date:</h4>
            <p>{props.endDate.slice(0, -12)}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-6">
            <h4>Activities:</h4>
            <div className="activities-box">
              <span>{props.activities}</span>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <h4>Companions:</h4>
            {partnersMap != "" ? partnersMap : "no companions yet"}
          </div>
        </div>
      </div>
    </div>
  );
};

TripCard.propTypes = {
  userpicture: PropTypes.string,
  username: PropTypes.string,
  userID: PropTypes.number,
  tripID: PropTypes.number,
  country: PropTypes.string,
  cities: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  activities: PropTypes.string,
  partners: PropTypes.array,
};
