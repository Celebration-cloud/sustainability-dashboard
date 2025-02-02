/* eslint-disable prettier/prettier */
/*
 * This is common in Redux configuration files where the structure is more rigid
 */
/* eslint-disable prettier/prettier */
import { configureStore, createSlice } from "@reduxjs/toolkit";

/**
 * Initial state for the sustainability data slice
 * @typedef {Object} InitialState
 * @property {Array} data - Array of sustainability metrics data
 * @property {Object} filter - Date range filter configuration
 * @property {Date|null} filter.startDate - Start date of the filter range
 * @property {Date|null} filter.endDate - End date of the filter range
 * @property {Object} selectedMetric - Currently selected metric to display
 * @property {string} selectedMetric.key - Machine-readable metric key
 * @property {string} selectedMetric.label - Human-readable metric label
 */
const initialState = {
  data: [],
  filter: {
    startDate: null,
    endDate: null,
  },
  selectedMetric: {
    key: "carbonEmissions",
    label: "Carbon Emissions",
  },
};

/**
 * Redux slice for managing sustainability data and filters
 * @type {import("@reduxjs/toolkit").Slice}
 */
const sustainabilitySlice = createSlice({
  name: "sustainability",
  initialState,
  reducers: {
    /**
     * Updates the sustainability data in the store
     * @param {Object} state - Current Redux state
     * @param {Object} action - Redux action containing payload
     * @param {Array} action.payload - New array of sustainability data
     */
    setData(state, action) {
      state.data = action.payload;
    },

    /**
     * Updates the date range filter values
     * @param {Object} state - Current Redux state
     * @param {Object} action - Redux action containing payload
     * @param {Date} [action.payload.startDate] - New start date for filter
     * @param {Date} [action.payload.endDate] - New end date for filter
     */
    setFilter(state, action) {
      state.filter = {
        ...state.filter,
        ...action.payload,
      };
    },

    /**
     * Updates the currently selected metric
     * @param {Object} state - Current Redux state
     * @param {Object} action - Redux action containing payload
     * @param {Object} action.payload - New metric selection
     * @param {string} action.payload.key - Metric key identifier
     * @param {string} action.payload.label - Display label for metric
     */
    setSelectedMetric(state, action) {
      state.selectedMetric = action.payload;
    },
  },
});

// Export action creators for use in components
export const { setData, setFilter, setSelectedMetric } =
  sustainabilitySlice.actions;

/**
 * Redux store configuration
 * @type {import("@reduxjs/toolkit").EnhancedStore}
 */
export const store = configureStore({
  // Combine reducers (currently only sustainability slice)
  reducer: {
    sustainability: sustainabilitySlice.reducer,
  },

  // Custom middleware configuration
  middleware: (getMiddleware) => {
    return getMiddleware({
      // Disable serializable check for Date objects in filter
      // This is safe for this implementation but should be used cautiously
      serializableCheck: false,
    });
  },
});
