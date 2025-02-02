/*
 * Disable Prettier formatting to preserve Redux Toolkit pattern conventions
 * This exception should be used judiciously and documented
 */
/* eslint-disable prettier/prettier */

// Redux Toolkit core imports for store configuration
import { configureStore, createSlice } from "@reduxjs/toolkit";

/**
 * @constant {Object} initialState
 * @description Base structure for the sustainability data store
 * @property {Array} data - Collection of sustainability metrics
 * @property {Object} filter - Date range filter configuration
 * @property {Date|null} filter.startDate - Inclusive start date for data filtering
 * @property {Date|null} filter.endDate - Inclusive end date for data filtering
 * @property {Object} selectedMetric - Currently active metric visualization
 * @property {string} selectedMetric.key - Technical identifier for metric (e.g., API key mapping)
 * @property {string} selectedMetric.label - Display-friendly metric name
 */
const initialState = {
  data: [], // Initialize empty until API data loads
  filter: {
    startDate: null, // Null represents "no start date filter"
    endDate: null, // Null represents "no end date filter"
  },
  selectedMetric: {
    key: "carbonEmissions",
    label: "Carbon Emissions",
  }, // Default visualization metric
};

/**
 * @module sustainabilitySlice
 * @description Redux slice managing all sustainability-related state
 * @see {@link https://redux-toolkit.js.org/api/createSlice|Redux Toolkit createSlice}
 */
const sustainabilitySlice = createSlice({
  name: "sustainability", // Unique slice identifier
  initialState, // Reference to base state shape

  // State modification handlers
  reducers: {
    /**
     * @method setData
     * @description Replaces entire dataset with new payload
     * @param {Object} state - Current slice state
     * @param {Object} action - Redux action object
     * @param {Array} action.payload - New array of sustainability metrics
     */
    setData(state, action) {
      state.data = action.payload;
    },

    /**
     * @method setFilter
     * @description Merges partial filter updates with existing filter state
     * @param {Object} state - Current slice state
     * @param {Object} action - Redux action object
     * @param {Object} action.payload - Filter updates object
     * @example
     * dispatch(setFilter({ startDate: new Date('2024-01-01') }))
     */
    setFilter(state, action) {
      // Preserve existing filter values while applying updates
      state.filter = {
        ...state.filter, // Existing filter values
        ...action.payload, // New filter values
      };
    },

    /**
     * @method setSelectedMetric
     * @description Updates the currently active visualization metric
     * @param {Object} state - Current slice state
     * @param {Object} action - Redux action object
     * @param {Object} action.payload - Full metric replacement object
     * @param {string} action.payload.key - New metric identifier
     * @param {string} action.payload.label - New display label
     */
    setSelectedMetric(state, action) {
      // Full replacement ensures consistent state shape
      state.selectedMetric = action.payload;
    },
  },
});

// Export action creators for component consumption
export const { setData, setFilter, setSelectedMetric } =
  sustainabilitySlice.actions;

/**
 * @module store
 * @description Configured Redux store instance
 * @see {@link https://redux-toolkit.js.org/api/configureStore|Redux Toolkit configureStore}
 */
export const store = configureStore({
  // Registered reducers (currently only sustainability slice)
  reducer: {
    sustainability: sustainabilitySlice.reducer,
  },

  /**
   * @method middleware
   * @description Custom middleware configuration
   * @param {Function} getMiddleware - Redux Toolkit middleware getter
   * @returns {Array} Configured middleware chain
   */
  middleware: (getMiddleware) => {
    return getMiddleware({
      // Disable serialization checks for Date objects in filter state
      // CAUTION: Only safe if all Date instances are serializable
      serializableCheck: false,
    });
  },
});

/*
 * Implementation Notes for Collaborators:
 * 1. State Structure: Designed for dashboard flexibility - add new metrics via data structure
 * 2. Filter Handling: Dates stored as Date objects for direct comparison operations
 * 3. Action Safety: All reducers use Immer.js under the hood for immutable updates
 * 4. Middleware Choice: Serializable checks disabled for Date objects - avoid non-serializable values
 *
 * Usage Patterns:
 * - Data Fetching: Dispatch setData after API responses
 * - Filter Updates: Partial updates supported via setFilter
 * - Metric Switching: Use setSelectedMetric with full {key, label} objects
 */
