/* eslint-disable prettier/prettier */
import { configureStore, createSlice } from "@reduxjs/toolkit";

// Initial state with mock data and filter values
const initialState = {
  data: [],
  filter: {
    startDate: null,
    endDate: null,
  },
};

// Create a slice for sustainability data
const sustainabilitySlice = createSlice({
  name: "sustainability",
  initialState,
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
    setFilter(state, action) {
      state.filter = { ...state.filter, ...action.payload };
    },
  },
});

export const { setData, setFilter } = sustainabilitySlice.actions;

export const store = configureStore({
  reducer: {
    sustainability: sustainabilitySlice.reducer,
  },
  middleware: ()
});
