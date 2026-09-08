import { NavLink } from "react-router-dom";

const links = [
  { to: "/farms", label: "Danh sách Farm", icon: "🚜" },
  { to: "/my-plots", label: "Ô đất của tôi", icon: "🌾" },
  { to: "/rent", label: "Thuê ô đất", icon: "🌻" },
];

function Sidebar() {
  return (
    <aside className="hidden w-56 shrink-0 border-r border-farm-100 bg-white p-4 md:block">
      <nav className="flex flex-col gap-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `group relative flex items-center gap-2 overflow-hidden rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? "bg-farm-50 text-farm-700"
                  : "text-gray-600 hover:bg-farm-50/60 hover:text-farm-700"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-farm-500 transition-transform duration-300 ${
                    isActive ? "scale-y-100" : "scale-y-0 group-hover:scale-y-75"
                  }`}
                />
                <span className="transition-transform duration-200 group-hover:scale-110">
                  {link.icon}
                </span>
                {link.label}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
