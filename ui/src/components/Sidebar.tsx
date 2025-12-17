import { Link, useLocation } from "react-router-dom";

const navItems = [
  { name: "Dashboard", path: "/" },
  { name: "Create Case", path: "/create" },
  { name: "Users", path: "/users" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 min-h-screen border-r bg-white p-4">
      <h1 className="text-lg font-semibold mb-6">CaseTrace</h1>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const active = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`block rounded px-3 py-2 text-sm font-medium
                ${
                  active
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}