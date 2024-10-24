import { configureStore } from "@reduxjs/toolkit";
import countriesReducer from "./countriesSlice";
import favouritesReducer from "./favouritesSlice";

export const store = configureStore({
  reducer: {
    countries: countriesReducer,
    favourites: favouritesReducer,
  },
});
