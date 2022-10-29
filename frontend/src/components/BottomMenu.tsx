import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { FC, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import {
  MdRestaurantMenu,
  MdOutlineShoppingCart,
  MdOutlineAdminPanelSettings,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IUser } from "../main";

const mapIndexToRoute = (index: number, user: IUser, inStaff: boolean) => {
  switch (index) {
    case 0:
      if (inStaff) {
        return "/staff";
      }
      return "/";
    case 1:
      return user === null ? "/" : "/staff/orders";
    case 2:
      return user === null
        ? "/"
        : user.is_admin
        ? "/staff/people"
        : "/staff/profile";
    case 3:
      return user === null ? "/order" : "/staff/people";
    case 4:
      return "/staff/profile";
  }
  return "";
};

const initialPathToIndex = (path: string, user: IUser) => {
  switch (path) {
    case "/":
    case "/staff":
      return 0;
    case "/order":
    case "/staff/orders":
      return 1;
    case "/staff/people":
      return 2;
    case "/staff/profile":
      return user?.is_admin ? 3 : 2;
  }
  return 0;
};

export const BottomMenu: FC<{
  initialPath: string;
  user: IUser;
  inStaff: boolean;
}> = ({ initialPath, user, inStaff }) => {
  const [value, setValue] = useState(initialPathToIndex(initialPath, user));
  const navigate = useNavigate();
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_, newValue) => {
          setValue(newValue);
          navigate(mapIndexToRoute(newValue, user, inStaff));
        }}
      >
        <BottomNavigationAction label="Menu" icon={<MdRestaurantMenu />} />
        {user !== null ? (
          <BottomNavigationAction
            label="Orders"
            icon={<MdOutlineShoppingCart />}
          />
        ) : null}
        {user !== null && user.is_admin ? (
          <BottomNavigationAction
            label="Staff"
            icon={<MdOutlineAdminPanelSettings />}
          />
        ) : null}
        {user === null ? (
          <BottomNavigationAction
            label="Order"
            icon={<MdOutlineShoppingCart />}
          />
        ) : null}
        {user !== null ? (
          <BottomNavigationAction label="Profile" icon={<AiOutlineUser />} />
        ) : null}
      </BottomNavigation>
    </Paper>
  );
};
