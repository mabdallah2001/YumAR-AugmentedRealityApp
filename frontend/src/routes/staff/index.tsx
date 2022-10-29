import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  Fab,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FC, useState } from "react";
import { useLoaderData, useNavigate, useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";
import { MdExpandMore } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { Spinner } from "../../components/Spinner";
import { IUser } from "../../main";
import { BsCurrencyDollar } from "react-icons/bs";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";

interface ICategory {
  id: number;
  name: string;
}

export interface IMenuItem {
  id: number;
  category_id: number;
  name: string;
  price: number;
  link_3d_model: string;
}

const NewMenuItem: FC<{ categoryId: number; refetch: () => void }> = ({
  categoryId,
  refetch,
}) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [model, setModel] = useState("");
  const { mutate, isLoading } = useMutation(
    [`new-item-${categoryId}`],
    async (newItem: { name: string; price: number; model: string }) => {
      const res = await axios.post(
        `/api/v1/categories/${categoryId}/new`,
        newItem
      );
      return res.data;
    },
    {
      onSuccess: () => {
        refetch();
        setName("");
        setPrice("");
        setModel("");
      },
      onError: () => {
        toast.error("There was an error while creating the new item");
      },
    }
  );
  return (
    <div>
      {show ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            let priceInt = Number(price);
            if (isNaN(priceInt) || priceInt === 0) {
              toast.error("Invalid price");
              return;
            }
            mutate({ name, price: priceInt, model });
          }}
        >
          <TextField
            required
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            value={price}
            required
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            label="Price"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BsCurrencyDollar />
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
          <TextField
            required
            label="3D model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
          <div style={{ marginTop: "0.3em" }}>
            <Button
              onClick={() => setShow(false)}
              variant="outlined"
              style={{ width: "50%" }}
            >
              Cancel
            </Button>
            <LoadingButton
              loading={isLoading}
              variant="outlined"
              type="submit"
              style={{ width: "50%" }}
            >
              Save
            </LoadingButton>
          </div>
        </form>
      ) : (
        <Button onClick={() => setShow(true)} style={{ width: "100%" }}>
          New item
        </Button>
      )}
    </div>
  );
};

const MenuCategory: FC<ICategory & { isAdmin: boolean }> = ({
  id,
  name,
  isAdmin,
}) => {
  const { data, isLoading, isError, refetch } = useQuery<
    void,
    Error,
    IMenuItem[]
  >([`category-${id}`], async () => {
    const res = await axios.get(`/api/v1/categories/${id}`);
    return res.data;
  });
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<MdExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {isError ? (
            <Typography>Error with the items in this category</Typography>
          ) : isLoading ? (
            <Spinner />
          ) : (
            <>
              {data.map((menuItem) => (
                <Card variant="outlined" key={`cat-${id}-item-${menuItem.id}`}>
                  <h1>{menuItem.name}</h1>
                  <h4>
                    <Link to={`item/${menuItem.id}`}>See Item Details</Link>
                  </h4>
                </Card>
              ))}
              {isAdmin ? (
                <NewMenuItem categoryId={id} refetch={refetch} />
              ) : null}
            </>
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export interface IOutletContext {
  user: IUser;
}

export const StaffHomePage: FC = () => {
  const { user } = useOutletContext() as IOutletContext;
  const categories = useLoaderData() as ICategory[];
  const navigate = useNavigate();

  return (
    <div>
      <div style={{ paddingBottom: "130px" }}>
        {categories.map((category) => (
          <MenuCategory
            {...category}
            key={`category-${category.id}`}
            isAdmin={user.is_admin}
          />
        ))}
      </div>
      {user !== null && user.is_admin ? (
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
              navigate("/staff/category/new");
            }}
          >
            <AiOutlinePlus
              style={{ fontSize: "1.4em", marginRight: "0.1em" }}
            />
            New Category
          </Fab>
        </div>
      ) : null}
    </div>
  );
};
