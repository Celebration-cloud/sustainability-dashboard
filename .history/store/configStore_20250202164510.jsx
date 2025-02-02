/* eslint-disable prettier/prettier */
import { configureStore, createSlice } from "@reduxjs/toolkit";

// Initial state with mock data, filter values, and the selected metric
const initialState = {
  data: [],
  filter: {
    startDate: null,
    endDate: null,
  },
  selectedMetric: { key: "carbonEmissions", label: "Carbon Emissions" }, // default metric
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
    setSelectedMetric(state, action) {
      state.selectedMetric = action.payload;
    },
  },
});

export const { setData, setFilter, setSelectedMetric } =
  sustainabilitySlice.actions;

export const store = configureStore({
  reducer: {
    sustainability: sustainabilitySlice.reducer,
  },
  middleware: (getMiddleware) => {
    return getMiddleware({
      serializableCheck: false,
    });
  },
});
/