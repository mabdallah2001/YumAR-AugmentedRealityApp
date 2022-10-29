import { FC } from "react";
import { ImSpinner } from "react-icons/im";

export const Spinner: FC = () => {
  return (
    <ImSpinner
      style={{
        animation: "rotation 2s infinite linear",
      }}
    />
  );
};
