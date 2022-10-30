import { LoadingButton } from "@mui/lab";
import { Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { FC } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IUser, removeUser, setRanOnce } from "../../../main";

export const StaffProfilePage: FC = () => {
  const user = useLoaderData() as IUser;
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(
    ["logout"],
    () => axios.post("/api/v1/logout"),
    {
      onSuccess: () => {
        removeUser();
        setRanOnce(false);
        return navigate("/");
      },
      onError: () => {
        toast.error("Error while logging you out");
      },
    }
  );

  return (
    <div>
      <Typography variant="h1">{user.username}</Typography>
      <Typography variant="h4">
        {user.is_admin ? "Administrator" : "Staff"}
      </Typography>
      <LoadingButton
        loading={isLoading}
        onClick={() => mutate()}
        variant="outlined"
      >
        LOG OUT
      </LoadingButton>
    </div>
  );
};
