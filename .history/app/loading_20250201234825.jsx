/* eslint-disable prettier/prettier */
import { Spinner } from "@heroui/spinner";

import React from 'react'

function Loading() {
  return (
    <div>
      
    </div>
  )
}

export default Loading


const Loading = () => {
  return (
    <div className="flex h-screen w-full justify-center items-center">
      <Spinner />
    </div>
  );
};

export default Loading;
