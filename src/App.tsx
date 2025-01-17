import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { Header } from "./components/headers/header";
import { GlobalLoadingSpinner } from "./global-loading-spinner";
import { NameCardListPage } from "./pages/name-card-list-page/name-card-list-page";

const router = createBrowserRouter(
  [
    {
      element: (
        <div className="fixed inset-0 flex flex-col items-stretch overflow-hidden">
          <Header />
          <GlobalLoadingSpinner />
          <div className="flex flex-1 flex-col">
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
