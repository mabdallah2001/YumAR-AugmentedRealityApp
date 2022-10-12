import { FC } from "react";
import { Outlet } from "react-router-dom";

export const StaffRoot: FC = () => {
  return (
    <div className="App">
      <Outlet />
    </div>
  );
}