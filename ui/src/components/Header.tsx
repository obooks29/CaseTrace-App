import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-gray-900 text-gray-100 rounded-lg px-6 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-lg font-semibold">CaseTrace</h1>
        <p className="text-sm text-gray-400">Hackathon demo</p>
      </div>

      <nav className="flex items-center gap-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-sm px-3 py-1 rounded ${
              isActive ? "bg-gray-800" : "hover:bg-gray-800"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/cases/new"
          className={({ isActive }) =>
            `text-sm px-3 py-1 rounded ${
              isActive ? "bg-gray-800" : "hover:bg-gray-800"
            }`
          }
        >
          Create Case
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `text-sm px-3 py-1 rounded ${
              isActive ? "bg-gray-800" : "hover:bg-gray-800"
            }`
          }
        >
          Users
        </NavLink>
      </nav>

  
    </header>
  );
}