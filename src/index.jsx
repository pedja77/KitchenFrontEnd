import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./components/admin/Dashboard.jsx";
import { checkResponse } from "./utils/responseChecker.js";
import { deleteResource, getResource } from "./utils/paths.js";
import Ingredients from "./components/ingredient/Ingredients.jsx";
import Cooks from "./components/cook/Cooks.jsx";
import LimitingFactors from "./components/limiting_factor/LimitingFactors.jsx";
import Users from "./components/user/Users.jsx";
import Recipes from "./components/recipe/Recipes.jsx";
import CookDashboard from "./components/cook/CookDashboard.jsx";
import UserDashboard from "./components/user/UserDashboard.jsx";
import UserRegisterForm from "./components/lib/UserRegisterForm.jsx";
import Error from "./components/Error.jsx";
import Cook from "./components/cook/Cook.jsx";
import User from "./components/user/User.jsx";

const BASE_URI = "http://localhost:8080/api/v1/project";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    loader: async ({ params }) => {
      console.log("hi from home loader");
      const response = await fetch(`${BASE_URI}/recipes`);
      checkResponse(response);
      const recipes = await response.json();
      console.log("home all recipes", JSON.stringify(recipes, null, 4));
      return recipes;
    },
    children: [
      {
        path: "/register",
        element: <UserRegisterForm />,
        loader: async ({ params }) => {
          console.log("Hello from UserRegisterForm loader");
          const response = await fetch(`${BASE_URI}/register/allbyUserName`, {
            method: "GET",
          });
          checkResponse(response);
          const usernames = await response.json();
          console.log("usernames", usernames);
          return usernames;
        },
        action: async ({ params, request }) => {
          const data = Object.fromEntries(await request.formData());
          console.log("register action", JSON.stringify(data, null, 4));
          const response = await fetch(`${BASE_URI}/register/regUser`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "",
            },
            body: JSON.stringify(data),
          });
          checkResponse(response);
          return response;
        },
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
            loader: async ({ params }) => {
              console.log("Hello from Ingredients loader.");
              const response = await getResource(
                `http://localhost:8080/api/v1/project/ingredient/allIngredients`
              );
              checkResponse(response);
              const ing = await response.json();
              console.log("ing", JSON.stringify(ing, null, 4));
              return ing;
            },
          },
          {
            element: <Users />,
            path: "/admin/users",
            loader: async ({ params }) => {
              console.log("Hello from Users loader.");
              const response = await getResource(
                `http://localhost:8080/api/v1/project/register/getUsers`
              );
              checkResponse(response);
              const users = await response.json();
              console.log(users);
              return users;
            },
            children: [
              {
                path: "/admin/users/:id",
                element: <User />,
                loader: async ({ params }) => {
                  console.log("user loader params", params);
                  const response = await getResource(
                    `${BASE_URI}/register/getUser/${params.id}`
                  );
                  checkResponse(response);
                  const user = await response.json();
                  console.log(JSON.stringify(user, null, 4));

                  // const response2 = await getResource(`${BASE_URI}/register/allbyUserName`);
                  // const usernames = await response2.json();
                  return user;
                },
                action: async ({ params, request }) => {
                  if (request.method === "DELETE") {
                    const response = await deleteResource(
                      `${BASE_URI}/register/deleteRegUserFromDB/${params.id}`
                    );
                    checkResponse(response);
                    console.log("response data", await response.json());
                    return response;
                  }
                },
              },
            ],
          },
          {
            element: <Cooks />,
            path: "/admin/cooks",
            loader: async ({ params }) => {
              console.log("Hello from Cooks loader.");
              const response = await getResource(
                `http://localhost:8080/api/v1/project/register/getCooks`
              );
              checkResponse(response);
              const cooks = await response.json();
              console.log(cooks);
              return cooks;
            },
            children: [
              {
                path: "/admin/cooks/:id",
                element: <Cook />,
                loader: async ({ params }) => {
                  console.log("cook loader params", params);
                  const response = await getResource(
                    `${BASE_URI}/register/getCook/${params.id}`
                  );
                  // checkResponse(response);
                  const cook = await response.json();
                  console.log(JSON.stringify(cook, null, 4));
                  return cook;
                },
              },
            ],
          },
          {
            element: <Recipes />,
            path: "/admin/recipes",
            loader: async ({ params }) => {
              console.log("recipes loader params", params);
              const response = await getResource(`${BASE_URI}/recipes`);
              // checkResponse(response);
              const recipes = await response.json();
              console.log(JSON.stringify(recipes, null, 4));
              return recipes;
            },
          },
          {
            element: <LimitingFactors />,
            path: "/admin/limiting-factors",
            loader: async ({ params }) => {
              console.log("limiting factors loader params", params);
              const response = await getResource(
                `http://localhost:8080/api/v1/project/limitingFactor/all`
              );
              checkResponse(response);
              const factors = await response.json();
              console.log(JSON.stringify(factors, null, 4));
              return factors;
            },
          },
        ],
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
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
