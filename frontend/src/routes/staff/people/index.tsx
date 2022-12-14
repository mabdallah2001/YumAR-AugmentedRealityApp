import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  Stack,
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FC, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useLoaderData, useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import { IOutletContext } from "..";
import { Spinner } from "../../../components/Spinner";
import { IUser } from "../../../main";

export const PeoplePage: FC = () => {
  const { user } = useOutletContext() as IOutletContext;
  const peopleInit = useLoaderData() as IUser[];
  const navigate = useNavigate();
  const [open, setOpen] = useState("");

  const { data: people, refetch } = useQuery<IUser[], Error, IUser[]>(
    ["people-fetch"],
    async () => {
      const res = await axios.get("/api/v1/people");
      return res.data;
    },
    {
      initialData: peopleInit,
    }
  );

  const { mutate: deleteUser, isLoading: isDeleting } = useMutation(
    ["delete-user"],
    async (username: string) => {
      const res = await axios.delete(`/api/v1/user/${username}/delete`);
      return res.data;
    },
    {
      onSuccess: () => {
        refetch();
        toast.info("User deleted");
        setOpen("");
      },
      onError: () => {
        toast.error("There was an error when deleting the user");
      },
    }
  );

  return (
    <div>
      <Stack spacing={2}>
        {people.map((person) => {
          return (
            <Card key={`person-${person.username}`}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {person.username}
                </Typography>
                <Typography color="text.secondary">
                  {person.is_admin ? "Administrator" : "Staff"}
                </Typography>
              </CardContent>
              {person.username === user.username ? null : (
                <CardActions>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => setOpen(person.username)}
                  >
                    DELETE
                  </Button>
                </CardActions>
              )}
            </Card>
          );
        })}
      </Stack>
      <div
        style={{
          position: "fixed",
          bottom: 70,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Fab
          variant="extended"
          onClick={() => {
            navigate("/staff/people/add");
          }}
        >
          <AiOutlinePlus style={{ fontSize: "1.4em", marginRight: "0.1em" }} />
          New member
        </Fab>
      </div>
      <Dialog open={open !== ""} onClose={() => setOpen("")}>
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete this item?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {isDeleting ? <Spinner /> : "This will delete the item forever"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={isDeleting} onClick={() => setOpen("")}>
            Close
          </Button>
          <Button
            disabled={isDeleting}
            color="error"
            onClick={() => deleteUser(open)}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
