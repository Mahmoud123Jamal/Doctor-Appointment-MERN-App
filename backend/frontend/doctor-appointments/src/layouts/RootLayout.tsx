import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import logo from "../assets/images/logo.webp";
const RootLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col min-h-screen w-full">
      <header className="bg-blue-100 text-blue-950 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="App Logo" className="w-15 h-15 rounded-4xl" />
            <span className="font-bold text-xl">DoctorApp</span>
          </div>

          <nav className="hidden sm:flex space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "underline font-bold" : "hover:underline"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "underline font-bold" : "hover:underline"
              }
            >
              About
            </NavLink>
            <NavLink
              to="/departments"
              className={({ isActive }) =>
                isActive ? "underline font-bold" : "hover:underline"
              }
            >
              Departments
            </NavLink>
          </nav>

          {/* Hamburger Button */}
          <button
            className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <span className="text-2xl">&#x2715;</span>
            ) : (
              <span className="text-2xl">&#9776;</span>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <nav className="md:hidden mt-2 flex flex-col justify-center items-center space-y-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "underline font-bold" : "hover:underline"
              }
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "underline font-bold" : "hover:underline"
              }
              onClick={() => setIsOpen(false)}
            >
              About
            </NavLink>
            <NavLink
              to="/departments"
              className={({ isActive }) =>
                isActive ? "underline font-bold" : "hover:underline"
              }
              onClick={() => setIsOpen(false)}
            >
              Departments
            </NavLink>
          </nav>
        )}
      </header>

      <main className="flex-1 ">
        <Outlet />
      </main>

      <footer className="bg-blue-100 text-blue-950 p-6 text-center">
        © 2025 Doctor Appointments
      </footer>
    </div>
  );
};

export default RootLayout;
