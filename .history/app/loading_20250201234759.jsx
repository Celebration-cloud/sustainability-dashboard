/* eslint-disable prettier/prettier */
import { Spinner } from "@heroui/spinner";

const Loading = () => {
  return (
    <div className="flex h-screen w-full justify-center items-center">
      <Spinner />
    </div>
  );
};

export default Loading;
