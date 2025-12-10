import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import logo from "../assets/images/logo.webp";
import { useAuth } from "../context/AuthContext";

const RootLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "underline font-bold" : "hover:underline";

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/departments", label: "Departments" },
    ...(user?.role === "admin"
      ? [
          { to: "/addDoctor", label: "Add Doctor" },
          { to: "/addDepartment", label: "Add Department" },
        ]
      : []),
    ...(user?.role === "user"
      ? [
          { to: "/addAppointment", label: "Add Appointment" },
          { to: "/appointments", label: "MyAppointment" },
        ]
      : []),
    ...(!user
      ? [
          { to: "/login", label: "Login" },
          { to: "/register", label: "Register" },
        ]
      : []),
  ];

  return (
    <div className="flex flex-col min-h-screen w-full">
      <header className="bg-blue-100 text-blue-950 p-4 sticky top-0 z-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src={logo} alt="App Logo" className="w-15 h-15 rounded-4xl" />
            <span className="font-bold text-xl">DoctorApp</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden sm:flex items-center space-x-6">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={navLinkClass}>
                {item.label}
              </NavLink>
            ))}

            {user && (
              <button onClick={logout} className="btn rounded-sm">
                Logout
              </button>
            )}
          </nav>

          {/* Hamburger */}
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
          <nav className="md:hidden mt-2 flex flex-col justify-center items-center space-y-3">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className={navLinkClass}
              >
                {item.label}
              </NavLink>
            ))}

            {user && (
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="btn rounded-sm"
              >
                Logout
              </button>
            )}
          </nav>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-blue-100 text-blue-950 p-6 text-center">
        © 2025 Doctor Appointments
      </footer>
    </div>
  );
};

export default RootLayout;
