import { RouterProvider } from "react-router-dom";
import router from "./config/router";
import "./index.css";

export default function App() {
  return <RouterProvider router={router} />;
}