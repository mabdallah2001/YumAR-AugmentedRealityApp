import { FC } from "react";
import { FaSpinner } from "react-icons/fa";
import "./Spinner.css";

export const Spinner: FC = () => {
  return (
    <FaSpinner
      style={{
        animation: "rotation 1s infinite linear",
      }}
    />
  );
};
