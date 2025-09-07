import { useState } from "react";

import { FaBars, FaLaptopCode, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const base = "transition hover:text-blue-400";
  const active = "text-blue-400 font-semibold";

  const closeMenu = () => setMenuOpen(false);
  return (
    <nav className="md sticky top-0 z-50 border-b border-gray-700 bg-gray-800 shadow">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <NavLink
          to="/"
          className="flex items-center gap-2 text-lg font-bold text-blue-300 hover:text-blue-500"
        >
          <FaLaptopCode className="text-xl text-blue-400" />
          <span>The Friendly Developer</span>
        </NavLink>
        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          <div className="space-x-4 text-sm text-gray-300">
            <NavLink
              className={({ isActive }) => (isActive ? active : base)}
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? active : base)}
              to="/projects"
            >
              Projects
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? active : base)}
              to="/blog"
            >
              Blog
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? active : base)}
              to="/about"
            >
              About
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? active : base)}
              to="/contact"
            >
              Contact
            </NavLink>
          </div>
        </div>

        {/* Mobile nav button */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={() => setMenuOpen((prevMenuOpen) => !prevMenuOpen)}
            className="cursor-pointer text-xl text-blue-400"
            title="Menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
      {/* Mobile navigation list */}
      {menuOpen && (
        <div className="space-y-2 space-x-4 border-t border-gray-700 bg-gray-800 px-6 py-4 text-center md:hidden">
          <NavLink
            className={({ isActive }) => (isActive ? active : base)}
            to="/"
            onClick={closeMenu}
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? active : base)}
            to="/projects"
            onClick={closeMenu}
          >
            Projects
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? active : base)}
            to="/blog"
            onClick={closeMenu}
          >
            Blog
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? active : base)}
            to="/about"
            onClick={closeMenu}
          >
            About
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? active : base)}
            to="/contact"
            onClick={closeMenu}
          >
            Contact
          </NavLink>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
