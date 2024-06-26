import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { Header } from "./components/headers/header";
import { GlobalLoadingSpinner } from "./global-loading-spinner";
import { CreateNameCardPage } from "./pages/create-name-card-page/create-name-card-page";
import { EditNameCardPage } from "./pages/edit-name-card-page/edit-name-card-page";
import { NameCardListPage } from "./pages/name-card-list-page/name-card-list-page";

const router = createBrowserRouter(
  [
    {
      element: (
        <div className="fixed inset-0 flex flex-col items-stretch overflow-hidden">
          <Header />
          <GlobalLoadingSpinner />
          <div className="flex flex-1 flex-col overflow-y-auto">
            <Outlet />
            <Toaster containerClassName="toaster" />
          </div>
        </div>
      ),
      children: [
        {
          path: "/",
          element: <NameCardListPage />,
        },
        {
          path: "/create",
          element: <CreateNameCardPage />,
        },
        {
          path: "/edit/:id",
          element: <EditNameCardPage />,
        },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL || "/",
  }
);
export default function App() {
  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}
