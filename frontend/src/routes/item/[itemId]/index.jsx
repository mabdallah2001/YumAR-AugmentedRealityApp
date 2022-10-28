
// import {React} from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Card } from "@mui/material";
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from "axios";

export const ItemDetailsPage = () => {
  const { data, isLoading, isError } = useQuery(["ItemDetailsPage"], async () => {
    let res = await axios.get("/api/v1/item/2", {
      params: { id: 2 }
    });
    return res.data;
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Some error when requesting the information</div>;

  var url = window.location.pathname;
  url = url + "/ar"

  return (
    <div>
      {data.map(menuItem => {
        console.log(menuItem);
        return (
          <Card sx={{ minWidth: 275 }} style={{flex:1, backgroundColor:'lightgrey'}}>
      <CardContent>
        <Typography variant="h5" component="div">
          {menuItem.name}
        </Typography>
        <Typography variant="body1">
          ${menuItem.price}
        </Typography>
      </CardContent>
      <CardActions>
      <Link to={url}>
        <Button size="medium">View AR Model</Button>
      </Link>
      </CardActions>
    </Card>
        );
      })}
    </div>
  );
};