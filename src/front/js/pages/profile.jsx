import React, { useContext, useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Context } from "../store/appContext";
import TripProfileCard from "../components/trip-profile-card";

export const Profile = () => {
  const location = useLocation();
  const { store, actions } = useContext(Context);
  const [user, setUser] = useState([]);
  const [tripsMap, setTripsMap] = useState("");
  const params = useParams();

  useEffect(() => {
    actions.verifyLogin();
    actions.getUser(params.id, false);
    actions.getTrips();
  }, [location]);

  useEffect(() => {
    if (store.trips != undefined || store.trip.user != undefined) {
      if (store.trips[0] != undefined) {
        setTripsMap(
          store.trips.map((trip, index) => {
            if (trip.traveler_id == params.id && trip.is_active == true) {
              return (
                <TripProfileCard
                  key={index.toString()}
                  tripID={trip.id}
                  userID={trip.traveler_id}
                  country={trip.country}
                  cities={trip.cities}
                  startDate={trip.start_date}
                  endDate={trip.end_date}
                  partners={trip.partners}
                />
              );
            }
            for (let x = 0; x < trip.partners.length; x++) {
              if (trip.partners[x].id == params.id) {
                return (
                  <TripProfileCard
                    key={index.toString()}
                    tripID={trip.id}
                    userID={trip.traveler_id}
                    country={trip.country}
                    cities={trip.cities}
                    startDate={trip.start_date}
                    endDate={trip.end_date}
                    partners={trip.partners}
                  />
                );
              }
            }
          })
        );
      }
    }
  }, [store.trips]);

  useEffect(() => {
    if (store.user != undefined) {
      setUser(
        <div className="profile-background py-0">
          <div className="profile-body container my-0 pb-2 px-0">
            <div className="background-image">
              <img className="profile-img" src={store.user.profile_picture} />
            </div>
            <div className="d-flex justify-content-center p-3">
              <div className="text-center">
                <h1 className="text-dark">
                  {store.user.name}
                  <i className="far fa-comments-null profile-button" />
                </h1>
                <div className="container-bio">
                  <h5 className="bio text-dark">{store.user.bio}</h5>
                </div>
              </div>
            </div>
            <div className="row body">
              <div className="col-12 col-sm-6 mb-4">
                <h3 className="text-center">Basic information</h3>
                <div className="basic-info">
                  <h5 className="mt-2">Age:</h5>
                  <span className="text-dark">{store.user.age}</span>
                  <h5 className="mt-2">Languages:</h5>
                  <span className="text-dark">{store.user.language}</span>
                  <h5 className="mt-2">Location:</h5>
                  <span className="text-dark">{store.user.localization}</span>
                </div>
              </div>
              <div className="col-12 col-sm-6 text-center mb-5">
                <h3>travel history</h3>
                <div className="trip-cards">
                  {tripsMap != "" ? tripsMap : "No trips yet..."}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }, [store.user, tripsMap]);

  return <>{user}</>;
};
