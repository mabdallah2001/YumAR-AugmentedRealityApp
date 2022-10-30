import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  Typography,
} from "@mui/material";
import { useLoaderData, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { MdExpandMore } from "react-icons/md";
import { Spinner } from "../components/Spinner";
import { addToOrder, deleteFromOrder, getOrderCopy } from "../main";
import axios from "axios";
import { useState } from "react";

const MenuCategory = ({ id, name }) => {
  const [orderFilter, setOrderFilter] = useState(() => getOrderCopy());
  const { data, isLoading, isError } = useQuery(
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
          style={{ position: "relative" }}
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
                  {orderFilter.has(menuItem.id) ? (
                    <Button
                      color="error"
                      onClick={() => {
                        deleteFromOrder(menuItem.id);
                        setOrderFilter(getOrderCopy());
                      }}
                    >
                      Remove from order
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        addToOrder(menuItem.id);
                        setOrderFilter(getOrderCopy());
                      }}
                    >
                      Add to order
                    </Button>
                  )}
                </Card>
              ))}
            </>
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export const CustomerHomePage = () => {
  const categories = useLoaderData();

  return (
    <div style={{ paddingBottom: "130px" }}>
      {categories.map((category) => (
        <MenuCategory {...category} key={`category-${category.id}`} />
      ))}
    </div>
  );
};
