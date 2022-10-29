import { FC } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { ILoaderType } from "./CustomerRoot";
import { BottomMenu } from "../components/BottomMenu";

export const StaffRoot: FC = () => {
  const { path, user } = useLoaderData() as ILoaderType;
  return (
    <div className="App">
      <div style={{ paddingBottom: "100px" }}>
        <Outlet context={{ user }} />
      </div>
      <BottomMenu initialPath={path} user={user} inStaff={true} />
    </div>
  );
};
