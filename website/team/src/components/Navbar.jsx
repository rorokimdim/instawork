import { NavLink } from "react-router-dom";
import logo from "../assets/images/react.svg";
import { FaPlus } from "react-icons/fa";

const Navbar = () => {
  const linkClass = ({ isActive }) =>
    isActive ? "active-link" : "inactive-link";

  return (
    <nav>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
              <img className="h-10 w-auto" src={logo} alt="Members" />
              <span className="hidden md:block text-white text-2xl font-bold ml-2">
                Team Members
              </span>
            </NavLink>
            <div className="md:ml-auto">
              <div className="flex space-x-2">
                <NavLink to="/add" className={linkClass}>
                  <FaPlus className="h-10 w-auto" />
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
