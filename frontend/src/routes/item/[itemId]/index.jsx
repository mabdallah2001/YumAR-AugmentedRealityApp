// import {React} from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Card } from "@mui/material";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useLoaderData } from "react-router";

export const ItemDetailsPage = () => {
  const data = useLoaderData();

  return (
    <div>
      {data.map((menuItem) => {
        return (
          <Card
            key={`item-${menuItem.id}`}
            sx={{ minWidth: 275 }}
            style={{ flex: 1, backgroundColor: "lightgrey" }}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                {menuItem.name}
              </Typography>
              <Typography variant="body1">${menuItem.price}</Typography>
            </CardContent>
            <CardActions>
              <a
                href={`https://szaldivar.github.io/ar_yumar/?p=${menuItem.link_3d_model}`}
                target="_blank"
              >
                View in AR
              </a>
            </CardActions>
          </Card>
        );
      })}
    </div>
  );
};
