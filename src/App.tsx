import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { EditorPage } from "@/pages/Editor";
import "./styles/global.scss"

const router = createBrowserRouter([
  {
    path: "/",
    element: <EditorPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
