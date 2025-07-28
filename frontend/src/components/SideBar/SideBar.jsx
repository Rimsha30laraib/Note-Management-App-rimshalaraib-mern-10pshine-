import { NavLink, useNavigate } from "react-router-dom";
import {
  FaStar,
  FaTrash,
  FaStickyNote,
  FaSignOutAlt,
  FaPlusCircle,
  FaUser,
  FaTimes,
} from "react-icons/fa";

const Sidebar = ({ onNavigate, showClose = false }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    onNavigate?.();
  };

  const linkClass =
    "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors font-medium";
  const activeClass = "bg-purple-200 text-purple-900 font-semibold";
  const inactiveClass = "text-gray-700 hover:bg-purple-100";

  return (
    <div className="w-64 h-full flex flex-col justify-between bg-gradient-to-r from-purple-100 via-white to-pink-100 backdrop-blur-md shadow-lg overflow-y-auto">
      <div className="overflow-y-auto flex-grow relative">
        
        {showClose && (
          <button
            onClick={onNavigate}
            className="absolute top-3 right-3 text-purple-700 text-xl md:hidden"
          >
            <FaTimes />
          </button>
        )}

        <h2 className="text-2xl font-bold text-purple-700 px-6 py-6 flex items-center gap-3">
          <span className="text-3xl">📝</span> Categories
        </h2>

        <nav className="space-y-2 mt-2 px-4">
          <NavLink
            to="/homepage"
            onClick={onNavigate}
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : inactiveClass}`
            }
            end
          >
            <FaStickyNote /> All Notes
          </NavLink>

          <NavLink
            to="/homepage/newnote"
            onClick={onNavigate}
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            <FaPlusCircle /> New Note
          </NavLink>

          <NavLink
            to="/homepage/starred"
            onClick={onNavigate}
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            <FaStar /> Starred
          </NavLink>

          {/* <NavLink
            to="/homepage/trash"
            onClick={onNavigate}
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            <FaTrash /> Trash
          </NavLink> */}

          <NavLink
            to="/homepage/account"
            onClick={onNavigate}
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            <FaUser /> Account
          </NavLink>
        </nav>
      </div>

      <div className="px-4 py-6">
        <button
          onClick={logout}
          className="w-full py-2 flex items-center justify-center gap-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
