import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { FC, useState } from "react";
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
      return user === null ? "order" : "/staff/people";
  }
  return "";
};

const initialPathToIndex = (path: string) => {
  switch (path) {
    case "/":
    case "/staff":
      return 0;
    case "/order":
    case "/staff/people":
      return 1;
  }
  return 0;
};

export const BottomMenu: FC<{
  initialPath: string;
  user: IUser;
  inStaff: boolean;
}> = ({ initialPath, user, inStaff }) => {
  const [value, setValue] = useState(initialPathToIndex(initialPath));
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
        {user === null ? (
          <BottomNavigationAction
            label="Order"
            icon={<MdOutlineShoppingCart />}
          />
        ) : (
          <BottomNavigationAction
            label="Staff"
            icon={<MdOutlineAdminPanelSettings />}
          />
        )}
      </BottomNavigation>
    </Paper>
  );
};
