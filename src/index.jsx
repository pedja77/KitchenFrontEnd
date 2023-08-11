import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./components/admin/Dashboard.jsx";
import { checkResponse } from "./utils/responseChecker.js";
import { deleteResource, getResource, postResource, putResource } from "./utils/paths.js";
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
import RecipeDetails from "./components/recipe/RecipeDetails.jsx";

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
        element: <RecipeDetails />,
        path: "/recipe/:id",
        loader: async ({ params }) => {
          console.log("recipe details loading params", params);
          const response = await fetch(`${BASE_URI}/recipes/${params.id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "",
            },
          });
          checkResponse(response);
          const recipeDetail = await response.json();
          console.log(JSON.stringify(recipeDetail, null, 4));
          return recipeDetail;
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
                `http://localhost:8080/api/v1/project/ingredient`
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
              console.log("Hello from user loader");
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

                  const response2 = await getResource(
                    `${BASE_URI}/limitingFactor`
                  );
                  checkResponse(response2);
                  const factors = await response2.json();
                  return [user, factors];
                },
                action: async ({ params, request }) => {
                  if (request.method === "DELETE") {
                    const response = await deleteResource(
                      `${BASE_URI}/register/deleteRegUserFromDB/${params.id}`
                    );
                    checkResponse(response);

                    return response;
                  } else if (request.method === "PUT") {
                    const data = Object.fromEntries(await request.formData());
                    const response = await putResource(
                      `${BASE_URI}/register/adminUpdateUser/${params.id}`,
                      data
                    );
                    checkResponse(response);

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

                  const response2 = await getResource(
                    `${BASE_URI}/limitingFactor`
                  );
                  checkResponse(response2);
                  const factors = await response2.json();
                  return [cook, factors];
                },
                action: async ({ params, request }) => {
                  if (request.method === "DELETE") {
                    const response = await deleteResource(
                      `${BASE_URI}/register/deleteCook/${params.id}`
                    );
                    // checkResponse(response);

                    return response;
                  } else if (request.method === "PUT") {
                    const data = Object.fromEntries(await request.formData());
                    const response = await putResource(
                      `${BASE_URI}/register/updateCook/${params.id}`,
                      data
                    );
                    checkResponse(response);

                    return response;
                  }
                },
              },
              {
                path: "/admin/cooks/new",
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
                action: async ({params, request}) => {
                  const data = Object.fromEntries(await request.formData());
                  const response = postResource(
                    `${BASE_URI}/register/cook `,
                    data
                  );
                  return response;
                }
              }
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
                `http://localhost:8080/api/v1/project/limitingFactor`
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
