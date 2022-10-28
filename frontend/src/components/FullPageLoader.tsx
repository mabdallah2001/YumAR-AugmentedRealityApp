import { FC } from "react";
import "./FullPageLoader.css";

export const FullPageLoader: FC = () => {
  return (
    <div id="wrapper">
      <div id="bgloader"></div>
      <div id="loader"></div>
    </div>
  );
};
