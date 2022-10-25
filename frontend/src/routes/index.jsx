import { useQuery } from "@tanstack/react-query";

export const CustomerHomePage = () => {

  const {data, isLoading, error, isError} = useQuery(['api/v1/menu', async () => {
    let response = await fetch("/v1/menu", {method: "GET"});
    if (!response.ok) {
      throw new Error("Could not retrieve menu items");
    }
    return await response.json();
  }])

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>

  return (
    <div>
      {data.name};
    </div>
  );
};
