import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import { useDispatch } from "react-redux";

import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import LandingPage from "../LandingPage/LandingPage";
import EnterPerson from "../EnterPerson/EnterPerson";
import EnterOccasion from "../EnterOccasion/EnterOccasion";
import SelectCategory from "../SelectCategory/SelectCategory";
import Dashboard from "../Dashboard/Dashboard";
import ViewPersons from "../ViewPersons/ViewPersons";
import ViewPersonsEvents from "../ViewPersonsEvents/ViewPersonsEvents";
import EditEvent from "../EditEvent/EditEvent";
import PickACard from "../PickACard/PickACard";
import ShippingConfirm from "../ShippingConfirm/ShippingConfirm";
import AdminCards from "../AdminCards/AdminCards";
import AdminOccasions from "../AdminOccasions/AdminOccasions";

import "./App.css";



export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Redirect exact from="/" to="/home" />

          <Route exact path="/home">
            <LandingPage />
          </Route>

          <Route exact path="/person">
            <EnterPerson />
          </Route>

          <Route exact path="/occasion">
            <EnterOccasion />
          </Route>

          <Route exact path="/category">
            <SelectCategory />
          </Route>

          <ProtectedRoute exact path="/dashboard" authRedirect="/home">
            <Dashboard />
          </ProtectedRoute>

          <ProtectedRoute exact path="/persons" authRedirect="/home">
            <ViewPersons />
          </ProtectedRoute>

          <ProtectedRoute exact path="/events" authRedirect="/home">
            <ViewPersonsEvents />
          </ProtectedRoute>

          <ProtectedRoute exact path="/editevent" authRedirect="/home">
            <EditEvent />
          </ProtectedRoute>

          <ProtectedRoute exact path="/card" authRedirect="/home">
            <PickACard />
          </ProtectedRoute>

          <ProtectedRoute exact path="/shipping" authRedirect="/home">
            <ShippingConfirm />
          </ProtectedRoute>

          <ProtectedRoute exact path="/admin" notAdminRedirect="/home">
            <AdminOccasions />
          </ProtectedRoute>

          <ProtectedRoute exact path="/adminCards" notAdminRedirect="/home">
            <AdminCards />
          </ProtectedRoute>

          <Route>
            <img
              src="https://http.cat/404"
              alt="404 Cat Not Found"
              style={{ width: "100%" }}
            />{" "}
            {/* Cat stuff */}
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}
