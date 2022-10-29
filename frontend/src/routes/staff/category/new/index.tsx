import {
  Button,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { FC, useState } from "react";
import { MdCategory } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Spinner } from "../../../../components/Spinner";

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
        navigate("/staff");
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
        <Button
          variant="contained"
          type="submit"
          style={{ width: "100%", marginTop: "0.3em" }}
          disabled={isLoading}
        >
          {isLoading ? <Spinner /> : null}
          Save
        </Button>
      </form>
    </div>
  );
};
