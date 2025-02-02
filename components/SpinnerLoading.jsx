/* eslint-disable prettier/prettier */
"use client"; // Indicates that this component is rendered on the client-side (in a Next.js environment).

import { Spinner } from "@heroui/spinner"; // Importing the Spinner component from HeroUI for loading indication.

const SpinnerLoading = () => {
  return (
    <div className="flex h-screen w-full justify-center items-center">
      {" "}
      {/* Flexbox container to center the spinner */}
      <Spinner /> {/* HeroUI Spinner component to show a loading animation */}
    </div>
  );
};

export default SpinnerLoading; // Exporting the SpinnerLoading component to be used elsewhere.
