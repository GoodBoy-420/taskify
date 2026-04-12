import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Cart from "../../assets/cart.svg";
import Logo from "../../assets/logo.svg";
import Menu from "../../assets/menu.svg";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const { auth, setAuth } = useAuth();
  const { state } = useCart();

  const logOutHandler = () => {
    localStorage.removeItem("booknest_auth");
    setAuth({});
    window.location.href = "/";
  };

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all relaitve">
      <Link>
        <img src={Logo} alt="Logo" width="180px" />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <Link to="/books" className="hover:text-primary">
          Books
        </Link>

        <Link to="/contact" className="hover:text-primary">
          Contact
        </Link>

        <Link to="cart" className="relative cursor-pointer">
          <img
            src={Cart}
            alt="Cart"
            width="23px"
            className="text-primary fill-current"
          />
          <span className="absolute -top-2 -right-3 text-xs text-white bg-primary w-4.5 h-4.5 rounded-full flex items-center justify-center pl-0.2">
            {state.totalItems > 0 ? state.totalItems : 0}
          </span>
        </Link>

        {auth && auth?.user?.role === "customer" ? (
          <>
            <Link
              to="/profile"
              className="cursor-pointer px-6 py-2 mt-1 bg-primary hover:bg-cyan-800 transition text-white rounded-full text-sm"
            >
              Welcome, {auth?.user?.name}
            </Link>
            <button
              onClick={logOutHandler}
              className="cursor-pointer px-6 py-2 mt-1 bg-primary hover:bg-cyan-800 transition text-white rounded-full text-sm"
            >
              Log out
            </button>
          </>
        ) : (
          <Link
            to="/signin"
            className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary transition text-white rounded-full text-sm"
          >
            Login
          </Link>
        )}
      </div>

      <button
        onClick={() => (open ? setOpen(false) : setOpen(true))}
        aria-label="Menu"
        className="sm:hidden"
      >
        {/* Menu Icon SVG */}
        <img src={Menu} alt="menu" width="30px" />
      </button>

      {/* Mobile Menu */}
      <div
        className={`${open ? "flex" : "hidden"} absolute top-15 left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
      >
        <Link className="block hover:text-primary">Home</Link>
        <Link className="block hover:text-primary">About</Link>
        <Link className="block hover:text-primary">Contact</Link>
        <Link
          to="/signin"
          className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary transition text-white rounded-full text-sm"
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
