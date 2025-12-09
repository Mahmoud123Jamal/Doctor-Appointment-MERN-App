import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import RootLayout from "./layouts/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import Login from "./components/Login";
import Register from "./components/Register";
import AddAppointments from "./components/AddAppointments";
import AddDoctor from "./components/AddDoctor";
import ShowAllDoctors from "./pages/ShowAllDoctors";
import DoctorDetails from "./components/DoctorDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/addAppointment", element: <AddAppointments /> },
      { path: "/addDoctor", element: <AddDoctor /> },
      { path: "/allDoctors", element: <ShowAllDoctors /> },
      { path: "/doctor/:id", element: <DoctorDetails /> },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
