import React from "react";
import ReactDOM from "react-dom/client";
import { registerSW } from "virtual:pwa-register";

import toast from "react-hot-toast";
import App from "./App.tsx";
import "./index.css";

const updateSW = registerSW({
  onRegisteredSW() {},
  onOfflineReady() {
    toast.success("This app is up to date!😄");
  },

  onNeedRefresh() {
    const toastId = toast.custom(() => (
      <span
        className="text-slate-dark p-2 rounded-lg"
        onClick={() => {
          toast.dismiss(toastId);
          updateSW(true);
        }}
      >
        New version of the app is available. Click to install
      </span>
    ));
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
