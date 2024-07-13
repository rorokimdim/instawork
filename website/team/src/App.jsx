import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import ListPage from "./pages/ListPage.jsx";
import AddPage from "./pages/AddPage.jsx";
import EditPage from "./pages/EditPage";
import NotFoundPage from "./pages/NotFoundPage";
import storage from "./storage.js";

const memberLoader = async ({ params }) => {
  const response = await storage.getMember(params.id);
  if (response.status == 200) {
    return response.json();
  } else if (response.status == 404 || response.status == 422) {
    return { error: "Member not found" };
  } else {
    return { error: "An unexpected error occurred: status " + response.status };
  }
};

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<ListPage />} />
        <Route path="/add" element={<AddPage />} />
        <Route path="/edit/:id" element={<EditPage />} loader={memberLoader} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};
export default App;
