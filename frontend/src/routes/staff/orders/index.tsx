import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
  Fab,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FC } from "react";
import { MdDelete, MdExpandMore } from "react-icons/md";
import { Link, useLoaderData } from "react-router-dom";
import { IMenuItem } from "..";
import { Spinner } from "../../../components/Spinner";

const MenuItem: FC<IMenuItem> = ({ name, price }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography color="text.secondary">${price}</Typography>
      </CardContent>
    </Card>
  );
};

const Order: FC<IOrder> = ({ id, time_created }) => {
  const { data, isLoading, isError } = useQuery<void, Error, IMenuItem[]>(
    [`category-${id}`],
    async () => {
      const res = await axios.get(`/api/v1/orders/${id}/items`);
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
          <Typography>
            {id} - {time_created}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {isError ? (
            <Typography>Error with the items in this order</Typography>
          ) : isLoading ? (
            <Spinner />
          ) : (
            <>
              {data.map((menuItem) => (
                <MenuItem
                  key={`order-${id}-item-${menuItem.id}`}
                  {...menuItem}
                />
              ))}
            </>
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

interface IOrder {
  id: number;
  order_number: number;
  time_created: string;
  total: number;
  is_completed: boolean;
  restaurant_id: number;
}

export const StaffOrdersPage: FC = () => {
  const orderInit = useLoaderData() as IOrder[];

  const { data: orders, refetch } = useQuery<IOrder[], Error, IOrder[]>(
    ["rest-orders"],
    async () => {
      const res = await axios.get("/api/v1/orders");
      return res.data;
    },
    {
      initialData: orderInit,
    }
  );

  return (
    <div>
      <Typography variant="h1">Orders</Typography>
      {orders.map((order) => (
        <Order key={`order-${order.id}`} {...order} />
      ))}
    </div>
  );
};
