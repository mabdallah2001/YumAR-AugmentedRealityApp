import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  Fab,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FC } from "react";
import { useLoaderData, useNavigate, useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";
import { MdExpandMore } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { Spinner } from "../../components/Spinner";
import { IUser } from "../../main";

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

export const MenuCategory: FC<ICategory> = ({ id, name }) => {
  const { data, isLoading, isError } = useQuery<void, Error, IMenuItem[]>(
    [`category-${id}`],
    async () => {
      const res = await axios.get(`/api/v1/categories/${id}`);
      return res.data;
    }
  );
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
            data.map((menuItem) => (
              <Card variant="outlined" key={`cat-${id}-item-${menuItem.id}`}>
                <h1>{menuItem.name}</h1>
                <h4>
                  <Link to={`item/${menuItem.id}`}>See Item Details</Link>
                </h4>
              </Card>
            ))
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
          <MenuCategory {...category} key={`category-${category.id}`} />
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
