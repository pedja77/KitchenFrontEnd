import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard.jsx";

const BASE_URI = "httl://localhost:8080/";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        element: <Dashboard />,
        path: "/admin",
        // loader: async ({ params }) => {},
        // action: async ({ params, request }) => {},
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
