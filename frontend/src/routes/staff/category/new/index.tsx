import { LoadingButton } from "@mui/lab";
import { FormControl, Input, InputAdornment, InputLabel } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { FC, useState } from "react";
import { MdCategory } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const NewCategoryPage: FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const { mutate, isLoading } = useMutation(
    ["new-category"],
    async (name: string) => {
      const res = await axios.post("/api/v1/categories/new", { name });
      return res.data;
    },
    {
      onSuccess: () => {
        return navigate("/staff");
      },
      onError: () => {
        toast.error("There was an error while creating the category");
      },
    }
  );
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (isLoading) return;
          if (name === "") {
            toast.error("Category needs a name");
            return;
          }
          mutate(name);
        }}
      >
        <FormControl variant="standard" style={{ width: "100%" }}>
          <InputLabel htmlFor="input-with-icon-adornment">
            Name of the new category
          </InputLabel>
          <Input
            id="input-with-icon-adornment"
            value={name}
            onChange={(e) => setName(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <MdCategory />
              </InputAdornment>
            }
          />
        </FormControl>
        <LoadingButton
          loading={isLoading}
          variant="outlined"
          type="submit"
          style={{ width: "100%", marginTop: "0.3em" }}
        >
          Save
        </LoadingButton>
      </form>
    </div>
  );
};
