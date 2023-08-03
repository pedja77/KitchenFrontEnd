import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./components/admin/Dashboard.jsx";
import { checkResponse } from "./utils/responseChecker.js";
import { getResource } from './utils/paths.js';
import Ingredients from "./components/ingredient/Ingredients.jsx";
import Cooks from "./components/cook/Cooks.jsx";
import LimitingFactors from "./components/limiting_factor/LimitingFactors.jsx";
import Users from "./components/user/Users.jsx";
import Recipes from "./components/recipe/Recipes.jsx";
import CookDashboard from "./components/cook/CookDashboard.jsx";
import UserDashboard from "./components/user/UserDashboard.jsx";
import UserRegisterForm from "./components/lib/UserRegisterForm.jsx";

const BASE_URI = "httl://localhost:8080/";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/register",
        element: <UserRegisterForm />,
        loader: async ({params}) => {
          console.log("Hello from UserRegisterForm loader");
          // const response = getResource
        }
      },
      {
        element: <Dashboard />,
        path: "/admin",
        // loader: async ({ params }) => {},
        // action: async ({ params, request }) => {},
        children: [
          {
            element: <Ingredients />,
            path: "/admin/ingredients",
            loader: async ({params}) => {
              console.log("Hello from Ingredients loader.");
              const response = await getResource(`http://localhost:8080/api/v1/project/ingredient/allIngredients`);
              checkResponse(response);
              const ing = await response.json();
              console.log(ing);
              return [ing];
            }
          },
          {
            element: <Users />,
            path: "/admin/users",
          },
          {
            element: <Cooks />,
            path: "/admin/cooks",
          },
          {
            element: <Recipes />,
            path: "/admin/recipes",
          },
          {
            element: <LimitingFactors />,
            path: "/admin/limiting-factors"
          }
        ]
      },
      {
        path: "/user",
        element: <UserDashboard />,
        children: [],
      },
      {
        path: "/cook",
        element: <CookDashboard />,
        children: [],
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
