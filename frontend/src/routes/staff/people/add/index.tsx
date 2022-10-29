import { LoadingButton } from "@mui/lab";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { FC, useState } from "react";
import { MdVisibilityOff, MdVisibility } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AddPeoplePage: FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(1);
  const [showPassword, setShowPassword] = useState(false);

  const { isLoading, mutate } = useMutation<
    void,
    Error,
    { username: string; password: string; is_admin: boolean }
  >(
    (data) => {
      return axios.post("/api/v1/register", data);
    },
    {
      onSuccess: () => {
        return navigate("/staff/people");
      },
      onError: () => {
        toast.error("Failed to register the new user");
      },
    }
  );

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
          <FormControl
            fullWidth
            style={{
              width: "100%",
              marginBottom: "10px",
            }}
          >
            <InputLabel id="demo-simple-select-label">Level</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={isAdmin}
              label="Age"
              onChange={(e) => setIsAdmin(e.target.value as number)}
            >
              <MenuItem value={1}>Staff</MenuItem>
              <MenuItem value={2}>Administrator</MenuItem>
            </Select>
          </FormControl>
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
              mutate({ username, password, is_admin: isAdmin === 2 });
            }}
          >
            REGISTER
          </LoadingButton>
        </Box>
      </Paper>
    </div>
  );
};
