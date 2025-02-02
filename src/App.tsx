import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { Header } from "./components/headers/header";
import { TutorialContextProvider } from "./domain/tutorial/context/tutorial-context-provider";
import { NameCardListPage } from "./pages/name-card-list-page/name-card-list-page";

const router = createBrowserRouter(
  [
    {
      element: (
        <TutorialContextProvider>
          <div
            data-testid="app"
            className="fixed inset-0 flex flex-col items-stretch overflow-hidden"
          >
            <Header />
            <div className="flex flex-1 flex-col">
              <Outlet />
              <Toaster position="bottom-center" containerClassName="toaster" />
            </div>
          </div>
        </TutorialContextProvider>
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
