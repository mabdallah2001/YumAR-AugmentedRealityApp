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
          <Card variant="outlined">
            <div key={menuItem.pk}>
              {menuItem.fields.name}
              <Link to={`item/${menuItem.pk}`}>See Item Details</Link>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
