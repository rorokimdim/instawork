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
  const [member, error, status] = await storage.getMember(params.id);
  if (!error) {
    return member;
  } else {
    return { error: error, status: status };
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
