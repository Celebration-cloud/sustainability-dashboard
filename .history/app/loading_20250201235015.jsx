import { Spinner } from "@heroui/spinner";

export default function Loading() {
  return (
    <div className="flex justify-center w-full h-screen">
      <Spinner />
    </div>
  );
}
