import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const CustomerHomePage = () => {
  const {data, isLoading} = useQuery()

  return <div>Customer Home page</div>;
};
