import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../store/appContext";
import newtripImage from "../../img/background-newtrip.jpg";
import countriesList from "../resources/countries.json";

export const NewTrip = () => {
  const { store, actions } = useContext(Context);

  const countriesSelect = countriesList.countries.map((elem) => {
    return (
      <option value={elem.name_es} id={elem.code}>
        {elem.name_es}
      </option>
    );
  });

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    if (data.start_date > data.end_date) {
      alert("date is invalid");
    } else {
      actions.createTrip(JSON.stringify(data));
    }
  };

  useEffect(() => {
    actions.verifyLogin();
  }, []);

  return (
    <div className="container-fluid row main-box newtrip-view">
      <div className="col-sm-12 col-md-5 picture-box">
        <img src={newtripImage} className="picture" />
      </div>
      <div className="col-sm-12 col-md-7 content-box">
        <h1 className="text-center my-5">propose a trip</h1>
        <form className="form-div" onSubmit={handleSubmit(onSubmit)}>
          <div className="my-3">
            <h5 className="my-2">Country you are going to travel to:</h5>
            <select
              id="country"
              name="country"
              className="input-style my-select"
              required
              {...register("country")}
            >
              <option hidden defaultValue value="">
              Choose a country
              </option>
              {countriesSelect}
            </select>
          </div>
          <div className="my-3">
            <h5 className="my-2">Cities you are going to visit:</h5>
            <input
              id="cities"
              type="text"
              className="input-style"
              placeholder="write cities"
              maxLenght="250"
              title="Maximum 250 characters"
              required
              {...register("cities")}
            />
          </div>
          <div className="my-3">
            <h5 className="my-2">Estimated travel date:</h5>
            <div className="row">
              <div className="col-6">
                <label>Start date</label>
                <input
                  id="start_date"
                  type="date"
                  min="2021-07-06"
                  max="2041-07-06"
                  className="input-style"
                  required
                  {...register("start_date")}
                />
              </div>
              <div className="col-6 pe-4 me-0">
                <label>Return date</label>
                <input
                  id="end_date"
                  type="date"
                  min="2021-07-06"
                  max="2041-07-06"
                  className="input-style"
                  required
                  {...register("end_date")}
                />
              </div>
            </div>
          </div>
          <div className="my-3">
            <h5 className="my-2">Activities that you are going to do:</h5>
            <textarea
              id="activities"
              className="input-style my-textarea"
              placeholder="Write your travel plans here"
              maxLenght="5000"
              title="Maximum 250 characters"
              required
              {...register("activities")}
            />
          </div>
          <div className="text-center">
            <input
              type="submit"
              value="PROPOSE TRIP"
              className="button lm secondary mx-auto my-4"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
