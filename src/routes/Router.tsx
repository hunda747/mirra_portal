import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// import ErrorPage from "@/pages/client/Error";

import createProtectedRoute from "./createProtectedRoute";

import Shops from "@/pages/admin/Shops";
import LoginCard from "@/pages/SignIn";
import DashboardPage from "@/pages/Dashboard";
import Products from "@/pages/admin/Products";
import ShopDetail from "@/pages/admin/ShopDetail";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/sign-in" element={<LoginCard />} />
      {createProtectedRoute({
        path: "/",
        element: <DashboardPage />,
      })}
      {createProtectedRoute({
        path: "/shops",
        element: <Shops />,
      })}
      {createProtectedRoute({
        path: "/shops/:id",
        element: <ShopDetail />,
      })}
      {createProtectedRoute({
        path: "/products",
        element: <Products />,
      })}
    </Route>
  )
);

export default router;
