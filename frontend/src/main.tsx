import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
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
import axios from "axios";
import { FullPageLoader } from "./components/FullPageLoader";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.withCredentials = true;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

let user: IUser | null = null;
let ranOnce = false;

export interface IUser {
  username: string;
  is_admin: boolean;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <CustomerRoot />,
    loader: async ({ request }) => {
      const url = new URL(request.url);
      if (ranOnce) return { path: url.pathname, user };
      ranOnce = true;
      try {
        user = (await axios.get("/api/v1/whoami")).data as IUser;
        return {
          user,
          path: url.pathname,
        };
      } catch {
        return { path: url.pathname, user: null };
      }
    },
    errorElement: <div>Error page</div>, // TODO: create proper error page
    children: [
      {
        path: "",
        element: <CustomerHomePage />,
      },
      {
        path: "order",
        element: <OrderPage />,
      },
      {
        path: "/item/:itemId",
        loader: async ({ params }) => {
          let res = await axios.get(`/api/v1/item/${params.itemId}`, {
            params: { id: 2 },
          });
          return res.data;
        },
        element: <ItemDetailsPage />,
      },
      {
        path: "item/:itemId/ar",
        element: <ArPage />,
      },
      {
        path: "example",
        element: <Example />,
      },
    ],
  },
  {
    path: "/staff",
    element: <StaffRoot />,
    errorElement: <div>Error page</div>, // TODO: create proper error page
    loader: async ({ request }) => {
      if (ranOnce && user === null) return redirect("/login");
      ranOnce = true;
      const url = new URL(request.url);
      try {
        user = (await axios.get("/api/v1/whoami")).data as IUser;
        return {
          user,
          path: url.pathname,
        };
      } catch {
        return redirect("/login");
      }
    },
    // TODO: loader to check session
    children: [
      {
        loader: async () => {
          let response = await fetch("/api/v1/categories", { method: "GET" });
          if (!response.ok) {
            throw new Error("Could not retrieve menu items");
          }
          return await response.json();
        },
        path: "",
        element: <StaffHomePage />,
      },
      {
        path: "category/new",
        loader: () => {
          if (user == null || !user.is_admin) return redirect("/staff");
          return user;
        },
        element: <NewCategoryPage />,
      },
      {
        path: "item/new",
        element: <NewItemPage />,
      },
      {
        path: "item/:itemId",
        loader: async ({ params }) => {
          let res = await axios.get(`/api/v1/item/${params.itemId}`, {
            params: { id: 2 },
          });
          return res.data;
        },
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
      <RouterProvider router={router} fallbackElement={<FullPageLoader />} />
    </QueryClientProvider>
    <ToastContainer position="top-center" />
  </React.StrictMode>
);
