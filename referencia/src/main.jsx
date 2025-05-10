import React from "react";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {  createBrowserRouter,   RouterProvider,} from "react-router-dom";
import './index.css'
import App from './App.jsx'
import CalendarPage from './pages/CalendarPage';
import AllEventsPage from './pages/AllEventsPage';
import MonthlyEventsPage from './pages/MonthlyEventsPage';
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <div>404 Not Found. The page you are looking for does not exist.</div>,
  },
  {
    path: "/calendar",
    element: <CalendarPage />,
  },
  {
    path: "/all-events",
    element: <AllEventsPage />,
  },
  {
    path: "/monthly-events",
    element: <MonthlyEventsPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
