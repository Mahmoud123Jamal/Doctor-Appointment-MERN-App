import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "../assets/images/logo.webp";
import { useAuth } from "../context/AuthContext";
import { BackButton } from "../components/BackBtn";

const RootLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const navLinkClass = ({ isActive }: { isActive: boolean }) => {
    const baseClasses =
      "relative px-1 py-2 transition-all duration-300 ease-in-out text-base font-medium";

    const stateClasses = isActive
      ? "text-[#00B5FF] font-bold"
      : "text-blue-950 hover:text-[#00B5FF]";

    return `${baseClasses} ${stateClasses} group`;
  };

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/departments", label: "Departments" },
    ...(user?.role === "admin"
      ? [
          { to: "/addDoctor", label: "Add Doctor" },
          { to: "/addDepartment", label: "Add Department" },
        ]
      : []),
    ...(user?.role === "user"
      ? [
          { to: "/allDoctors", label: "Doctors" },
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
      <header className="bg-blue-50 font-semibold shadow-md sticky top-0 z-100 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
          <div className="flex items-center gap-2 md:gap-4">
            <BackButton />
            <Link to="/" className="flex items-center space-x-2 shrink-0">
              <img
                src={logo}
                alt="App Logo"
                className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
              />
              <span className="font-bold text-blue-950 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-tight block">
                Menoufia Hospital
              </span>
            </Link>
          </div>

          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-8">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={navLinkClass}>
                {item.label}
              </NavLink>
            ))}

            {user && (
              <button onClick={logout} className="btn btn-info btn-md">
                Logout
              </button>
            )}
          </nav>

          <button
            className="lg:hidden p-2 rounded-md hover:bg-blue-100 transition-colors focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <span className="text-2xl leading-none">&#x2715;</span>
            ) : (
              <span className="text-2xl leading-none">&#9776;</span>
            )}
          </button>
        </div>

        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-blue-100 bg-white ${
            isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col p-4 space-y-4 shadow-inner">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium py-2 px-4 hover:bg-blue-50 rounded-md transition-colors"
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
                className="btn btn-info btn-md w-full"
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 overflow-x-hidden">
        <Outlet />
      </main>

      <footer className="bg-blue-50 text-blue-950 p-6 md:p-8 text-center border-t border-blue-200 mt-auto w-full">
        <div className="max-w-7xl mx-auto space-y-2">
          <p className="text-sm font-medium">
            &copy; {new Date().getFullYear()} Doctor Appointments
          </p>
          <p className="text-xs opacity-80">
            Developed and Maintained by{" "}
            <span className="font-bold">ENG/Mahmoud Jamal</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default RootLayout;
