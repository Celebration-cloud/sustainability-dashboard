"use client"; // Ensures this component runs on the client side

import { useEffect } from "react";

/**
 * Error Boundary Component
 * - Handles unexpected errors in the application.
 * - Logs errors for debugging and provides a UI to retry rendering.
 *
 * @param {Object} props - Component props
 * @param {Error} props.error - The error object encountered
 * @param {Function} props.reset - Function to reset and retry rendering
 *
 * @returns {JSX.Element} - Error message with a retry button
 */
export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an external monitoring service or console
    /* eslint-disable no-console */
    console.error(error);
  }, [error]); // Runs whenever the error changes

  return (
    <div className="h-screen flex justify-center items-center w-full">
      <>
        <h2 className="text-xl font-semibold text-red-600">
          Something went wrong!
        </h2>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => reset()} // Attempts to recover by re-rendering
        >
          Try again
        </button>
      </>
    </div>
  );
}
