import {
  Paper,
  InputAdornment,
  IconButton,
  OutlinedInput,
  InputLabel,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/system";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { setRanOnce } from "../../main";

export const LogInPage = () => {
  const [navigate, setNavigate] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading, mutate } = useMutation(
    (data) => {
      return axios.post("/api/v1/login", data);
    },
    {
      onSuccess: () => {
        setRanOnce(false);
        setNavigate(true);
      },
      onError: () => {
        toast.error("Wrong username or password");
      },
    }
  );

  if (navigate) return <Navigate to="/staff" />;

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        style={{
          maxWidth: "30rem",
          width: "100%",
        }}
      >
        <Box
          style={{
            padding: "10px",
          }}
        >
          <InputLabel htmlFor="outlined-adornment-username">
            Username
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-username"
            style={{
              width: "100%",
              marginBottom: "10px",
            }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            style={{
              width: "100%",
              marginBottom: "10px",
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword((state) => !state)}
                  onMouseDown={(e) => e.preventDefault()}
                  edge="end"
                >
                  {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <LoadingButton
            loading={isLoading}
            variant="outlined"
            style={{ width: "100%" }}
            onClick={() => {
              if (username === "" || password === "") {
                toast.error("Plase enter a username and password", {
                  toastId: 1,
                });
                return;
              }
              mutate({ username, password });
            }}
          >
            LOG IN
          </LoadingButton>
        </Box>
      </Paper>
    </div>
  );
};
