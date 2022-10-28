import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Card } from "@mui/material"

export const CustomerHomePage = () => {

  const {data, isLoading, error, isError} = useQuery(['CustomerHomePage'], async () => {
    let response = await fetch("/api/v1/menu/", {method: "GET"});
    if (!response.ok) {
      throw new Error("Could not retrieve menu items");
    }
    return JSON.parse(await response.json());
  })

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>

  return (
    <div>
      {data.map(menuItem => {
        return (
          <div key={menuItem.pk}>
            <Card variant="outlined">
              <h1>{menuItem.fields.name}</h1>
              <h4><Link to={`item/${menuItem.pk}`}>See Item Details</Link></h4>
            </Card>
          </div>
        );
      })}
    </div>
  );
};
