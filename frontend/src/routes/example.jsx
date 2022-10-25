// import {React} from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const Example = () => {
  const { data, isLoading, isError } = useQuery(["example"], async () => {
    let res = await axios.get("/api/v1/example");
    return res.data;
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Some error when requesting the information</div>;

  console.log(data);
  return (
    <div>
      {data.map((restaurant) => (
        <div key={restaurant.id}>
          <div>
            ID: {restaurant.id} Name: {restaurant.name}
          </div>
          <div>{restaurant.cuisine}</div>
        </div>
      ))}
    </div>
  );
};
