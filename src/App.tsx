import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { EditorPage } from "@/pages/Editor";

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
