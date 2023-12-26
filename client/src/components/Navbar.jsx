import Container from "./Container";
import logo from "../assets/logo.svg";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DropdownMenu from "./DropdownMenu";
import useCookieVerification from "../hooks/useCookieVerification";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userAnchorEl, setUserAnchorEl] = useState(null);

  const user = useSelector((state) => state.user.userData);
  const cart = useSelector((state) => state.cart.cartItems);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "unset";
  }

  const handleDropdownClick = (event, setAnchor) => {
    setAnchor(event.currentTarget);
  };

  const handleCloseMenu = (setAnchor) => {
    setAnchor(null);
  };

  const { isAuthorized } = useCookieVerification("private");

  useEffect(() => {
    function handleClickOutside(event) {
      if (!event.target.closest("nav")) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsOpen, isOpen, userAnchorEl]);

  return (
    <nav className="fixed z-10 mb-12 flex h-[100px] w-full  items-center bg-[#171717] shadow-sm">
      <Container
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link to="/">
          <img src={logo} alt="Digitex logo" className="w-[160px]" />
        </Link>
        {/* desktop UL Navbar */}
        <ul className="hidden gap-8 text-lg md:flex">
          <li>
            <Link className="flex items-center gap-2" to="cart">
              <div>
                <FaShoppingCart className="text-2xl" />
              </div>
              <p className="text-lg">Cart</p>
              <div
                className={`${
                  cart.length
                    ? "flex h-6 w-6 items-center justify-center rounded-full bg-primary-600 px-3 py-3 text-sm font-semibold"
                    : "hidden"
                }`}
              >
                <span>{cart.length > 0 ? cart.length : ""}</span>
              </div>
            </Link>
          </li>
          <li>
            <div
              className="flex items-center gap-2"
              onClick={(event) => handleDropdownClick(event, setUserAnchorEl)}
            >
              <FaUserCircle className="text-xl" />{" "}
              {isAuthorized ? <p>{user?.firstName}</p> : <p>Account</p>}{" "}
            </div>
            <DropdownMenu
              anchorEl={userAnchorEl}
              open={Boolean(userAnchorEl)}
              onClose={() => handleCloseMenu(setUserAnchorEl)}
              user={user}
              isAuthorized={isAuthorized}
            />
          </li>
        </ul>

        <button
          className={`p-2 transition duration-300 focus:outline-none md:hidden`}
          onClick={toggleNavbar}
        >
          <svg
            className="xs:h-10 xs:w-10 md:h-12 md:w-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className={`transition duration-300 ${isOpen ? "opacity-0" : ""}`}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              className={`transition duration-300 ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* mobile navbar */}
        <ul
          className={`navbar absolute right-0 top-[100px] flex h-screen w-2/3 transform flex-col gap-8 p-8 text-lg transition duration-500 ${
            isOpen ? "translate-x-0 overflow-y-hidden" : "translate-x-full"
          } bg-[#171717] md:hidden`}
        >
          <li>
            <Link
              className="flex items-center gap-4"
              to="/cart"
              onClick={toggleNavbar}
            >
              <FaShoppingCart className="text-2xl" />
              <p className="text-xl">Cart</p>
            </Link>
          </li>
          <li>
            <Link className="flex items-center gap-4">
              <div
                className="flex items-center gap-4"
                onClick={(event) => handleDropdownClick(event, setUserAnchorEl)}
              >
                <FaUserCircle className="text-2xl" />{" "}
                <p className="text-xl">
                  {isAuthorized ? user.firstName : "Account"}
                </p>
              </div>
              <DropdownMenu
                anchorEl={userAnchorEl}
                open={Boolean(userAnchorEl)}
                onClose={() => handleCloseMenu(setUserAnchorEl)}
                isAuthorized={isAuthorized}
                user={user}
              />
            </Link>
          </li>
        </ul>
      </Container>
    </nav>
  );
};

export default Navbar;
