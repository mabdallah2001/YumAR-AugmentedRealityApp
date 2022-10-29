import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FC, useState } from "react";
import { MdDelete, MdExpandMore } from "react-icons/md";
import { Link, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
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

const Order: FC<IOrder & { onCompleteClick: (id: number) => void }> = ({
  id,
  time_created,
  onCompleteClick,
}) => {
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
            <span
              style={{
                position: "absolute",
                right: "30px",
                top: "5px",
              }}
            >
              <Button
                color="info"
                onClick={(e) => {
                  e.stopPropagation();
                  onCompleteClick(id);
                }}
              >
                COMPLETE
              </Button>
            </span>
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
  const [open, setOpen] = useState(-1);

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

  const { mutate: completeOrder, isLoading: isCompleting } = useMutation(
    [`complete-order`],
    async (orderId: number) => {
      const res = await axios.post(`/api/v1/orders/${orderId}/complete`);
      return res.data;
    },
    {
      onSuccess: () => {
        refetch();
        toast.info("Order completed");
        setOpen(-1);
      },
      onError: () => {
        toast.error("There was an error while completing the order");
      },
    }
  );

  return (
    <div>
      <Typography variant="h1">Orders</Typography>
      {orders.map((order) => (
        <Order
          key={`order-${order.id}`}
          {...order}
          onCompleteClick={(id) => setOpen(id)}
        />
      ))}
      <Dialog open={open !== -1} onClose={() => setOpen(-1)}>
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to complete this order?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {isCompleting ? <Spinner /> : null}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={isCompleting} onClick={() => setOpen(-1)}>
            Close
          </Button>
          <Button
            disabled={isCompleting}
            color="success"
            onClick={() => completeOrder(open)}
          >
            Complete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
