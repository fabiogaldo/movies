import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import { Analytics } from "@vercel/analytics/react";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);
const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <App />
    <Analytics mode="production" />
  </QueryClientProvider>
);
