import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { FC, useState } from "react";
import {
  MdRestaurantMenu,
  MdOutlineShoppingCart,
  MdOutlineAdminPanelSettings,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IUser } from "../main";

const mapIndexToRoute = (index: number, user: IUser) => {
  switch (index) {
    case 0:
      return "";
    case 1:
      return user === null ? "order" : "/staff";
  }
  return "";
};

const initialPathToIndex = (path: string) => {
  switch (path) {
    case "/":
      return 0;
    case "/order":
      return 1;
  }
  return 0;
};

export const BottomMenu: FC<{ initialPath: string; user: IUser }> = ({
  initialPath,
  user,
}) => {
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
          navigate(mapIndexToRoute(newValue, user));
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
