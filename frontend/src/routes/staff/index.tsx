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
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import { MdExpandMore } from "react-icons/md";
import { Spinner } from "../../components/Spinner";

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

export const StaffHomePage: FC = () => {
  const categories = useLoaderData() as ICategory[];
  return (
    <div>
      {categories.map((category) => {
        return (
          <MenuCategory {...category} key={`category-${category.id}`} />
          // <div key={menuItem.pk}>
          //   <Card variant="outlined">
          //     <h1>{menuItem.fields.name}</h1>
          //     <h4>
          //       <Link to={`item/${menuItem.pk}`}>See Item Details</Link>
          //     </h4>
          //   </Card>
          // </div>
        );
      })}
      <div>
        <Fab variant="extended">New Category</Fab>
      </div>
    </div>
  );
};
