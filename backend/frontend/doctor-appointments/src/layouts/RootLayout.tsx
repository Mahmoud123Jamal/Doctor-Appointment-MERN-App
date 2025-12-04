import { NavLink, Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <header className="bg-blue-600 text-white p-6 ">
        <nav>
          <ul className="flex space-x-4">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "underline font-bold" : "hover:underline"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "underline font-bold" : "hover:underline"
                }
              >
                About
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <main className="flex-1 p-4">
        <Outlet />
      </main>

      <footer className="bg-gray-800 text-white p-4 text-center">
        © 2025 Doctor Appointments
      </footer>
    </div>
  );
};

export default RootLayout;
