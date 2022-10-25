import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CustomerHomePage } from "./routes";
import { ItemDetailsPage } from "./routes/item/[itemId]";
import { ArPage } from "./routes/item/[itemId]/ar";
import { LogInPage } from "./routes/login";
import { OrderPage } from "./routes/order";
import { CustomerRoot } from "./routes/CustomerRoot";
import { StaffRoot } from "./routes/StaffRoot";
import { StaffHomePage } from "./routes/staff";
import { EditItemDetailsPage } from "./routes/staff/item/[itemId]/edit";
import { PeoplePage } from "./routes/staff/people";
import { AddPeoplePage } from "./routes/staff/people/add";
import { NewCategoryPage } from "./routes/staff/category/new";
import { NewItemPage } from "./routes/staff/item/new";
import { StaffOrdersPage } from "./routes/staff/orders";
import { StaffProfilePage } from "./routes/staff/profile";
import { Example } from "./routes/example";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <CustomerRoot />,
    errorElement: <div>Error page</div>, // TODO: create proper error page
    children: [
      {
        path: "/",
        element: <CustomerHomePage />,
      },
      {
        path: "/order",
        element: <OrderPage />,
      },
      {
        path: "/item/:itemId",
        element: <ItemDetailsPage />,
      },
      {
        path: "/item/:itemId/ar",
        element: <ArPage />,
      },
      {
        path: "/example",
        element: <Example />,
      },
    ],
  },
  {
    path: "/staff",
    element: <StaffRoot />,
    errorElement: <div>Error page</div>, // TODO: create proper error page
    // TODO: loader to check session
    children: [
      {
        path: "",
        element: <StaffHomePage />,
      },
      {
        path: "category/new",
        element: <NewCategoryPage />,
      },
      {
        path: "item/new",
        element: <NewItemPage />,
      },
      {
        path: "item/:itemId",
        element: <ItemDetailsPage />,
      },
      {
        path: "item/:itemId/edit",
        element: <EditItemDetailsPage />,
      },
      {
        path: "people",
        element: <PeoplePage />,
      },
      {
        path: "people/add",
        element: <AddPeoplePage />,
      },
      {
        path: "orders",
        element: <StaffOrdersPage />,
      },
      {
        path: "profile",
        element: <StaffProfilePage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LogInPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} fallbackElement={<div>Loading</div>} />
    </QueryClientProvider>
  </React.StrictMode>
);
