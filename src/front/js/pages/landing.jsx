import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { Context } from "../store/appContext";
import Button from "../components/button";
import logo from "../../img/logo.png";
import logoSkytours from "../../img/logo-braulg.png";
import { TripCardLanding } from "../components/trip-card-landing";
import CardSmall from "../components/cardsmall";

export const Landing = () => {
  const { store, actions } = useContext(Context);
  const [postsMap, setPostsMap] = useState("");
  const [tripsMap, setTripsMap] = useState("");
  const theme = createMuiTheme({
    breakpoints: {
      values: {
        xs: 768,
        sm: 1000,
        md: 1450,
        lg: 1480,
        xl: 1920,
      },
    },
  });

  useEffect(() => {
    actions.getTrips();
    actions.getPosts();
  }, []);

  useEffect(() => {
    if (store.posts != undefined) {
      setPostsMap(
        store.posts.map((post, index) => (
          <CardSmall
            key={index.toString()}
            postID={post.id}
            img={post.media}
            title={post.title}
            coloredText={post.text}
          />
        ))
      );
    }
  }, [store.posts]);

  useEffect(() => {
    if (store.trips != undefined || store.trip.user != undefined) {
      const activeTrips = store.trips.filter((trip) => trip.is_active === true);
      setTripsMap(
        activeTrips
          .slice(activeTrips.length - 3, activeTrips.length)
          .reverse()
          .map((trip, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              className="m-auto"
              key={index.toString()}
            >
              <TripCardLanding
                idTrip={trip.id}
                username={trip.traveler_name}
                userpicture={trip.traveler_picture}
                country={trip.country}
                cities={trip.cities}
                startDate={trip.start_date}
                endDate={trip.end_date}
                activities={trip.activities}
                partners={trip.partners}
              />
            </Grid>
          ))
      );
    }
  }, [store.trips]);

  return (
    <div className="home-container">
      <div className="home-header">
        <div className="logo-box">
          <img className="logobraulg" src={logo} />
          
        </div>
        {!localStorage.getItem("token") ? (
          <div className="links-box">
            <h3 className="secondary-color">Find travel companions!</h3>
            <Link to="/register">
              <button className="button lm primary m-2" id="register-btn">
              REGISTER
              </button>
            </Link>
            <Link to="/login">
              <button className="button lm secondary m-2" id="login-btn">
              LOG IN
              </button>
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="home-background">
        <div className="home-body container">
          <h1 className="title-home my-0 py-3 landing-color fw-bold">
          What is sky tours?
          </h1>
          <div className="mx-2 resume-container">
            <p className="">
              Sky tours is a social network to connect with people with the same
              purpose of traveling in company.
            </p>
            <p className="">
              If you are a user who already has a travel plan in mind,
              you can publish a travel advisory where you tell the rest of
              users where you want to travel, on what date you plan to do it, and what
              activities you want to do.
            </p>
            <p>
              On the other hand, if you still do not have any plan in mind but you
              If you want to join a trip proposed by another user, you will be able to see
              the list of trips proposed by other users and join
              them as a partner. In the chat of our application you can
              maintain contact to agree on all
              details of the trip.
            </p>
            <p>
              In addition, our application has a blog where users
              can share their experiences so that other users
              can take inspiration for your future plans :).
            </p>
          </div>

          <div className="">
            <h2 className="title-home landing-color my-4">
            Some of our latest proposed trips
            </h2>
            <div className="row d-flex flex-row-reverse">{tripsMap}</div>
          </div>
          <div className="mini-cards">
            <h2 className="title-home landing-color my-4">
            Get inspired by our user stories
            </h2>
            <MuiThemeProvider theme={theme}>
              <Grid container className="card-sm-container">
                <Grid item xs={12} sm={6} md={4} className="card-sm">
                 {postsMap[0]}
                </Grid>
                <Grid item xs={12} sm={6} md={4} className="card-sm">
                  {postsMap[1]}
                </Grid>
                <Grid item xs={12} sm={12} md={4} className="card-sm">
                  {postsMap[2]}
                </Grid>
              </Grid>
            </MuiThemeProvider>
          </div>
          <div className="text-center blog-button">
            <Link to="/blog">
              <Button
                className="mb-5"
                size="lm"
                color="secondary"
                text="View blog posts"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
