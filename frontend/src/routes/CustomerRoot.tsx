import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { FC, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { MdRestaurantMenu, MdOutlineShoppingCart } from "react-icons/md";

const mapIndexToRoute = (index: number) => {
  switch (index) {
    case 0:
      return "/";
    case 1:
      return "/order";
  }
  return "";
};

const BottomMenu: FC = () => {
  const [value, setValue] = useState(0);
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
          navigate(mapIndexToRoute(newValue));
        }}
      >
        <BottomNavigationAction label="Menu" icon={<MdRestaurantMenu />} />
        <BottomNavigationAction
          label="Order"
          icon={<MdOutlineShoppingCart />}
        />
      </BottomNavigation>
    </Paper>
  );
};

export const CustomerRoot: FC = () => {
  return (
    <div className="App">
      <Outlet />
      <BottomMenu />
    </div>
  );
};
