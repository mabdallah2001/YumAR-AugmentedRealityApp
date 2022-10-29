import { FC } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { BottomMenu } from "../components/BottomMenu";
import { IUser } from "../main";

export interface ILoaderType {
  path: string;
  user: IUser;
}

export const CustomerRoot: FC = () => {
  const { path, user } = useLoaderData() as ILoaderType;

  console.log(user);

  return (
    <div className="App">
      <Outlet />
      <BottomMenu initialPath={path} user={user} inStaff={false} />
    </div>
  );
};
