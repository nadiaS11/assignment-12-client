import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  const { user, signOutUser } = useAuth();
  console.log(user);
  const navlinks = (
    <>
      <li>
        <Link to={"/"}>Home</Link>
      </li>
      <li>
        <Link to={"/all-contest"}>All Contests</Link>
      </li>
      {user && (
        <li>
          <Link to={"/dashboard"}>Dashboard</Link>
        </li>
      )}
      {!user && (
        <li>
          <Link to={"/login"}>Login</Link>
        </li>
      )}
    </>
  );
  return (
    <div className="w-full bg-base-100 left-[50%] -translate-x-2/4  fixed z-[999] shadow-sm">
      <div className="navbar  md:py-4    sm:px-6  mx-auto backdrop-blur-lg max-w-7xl 2xl:px-0">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navlinks}
            </ul>
          </div>
          <Link to={"/"} className="font-bold flex items-center text-2xl gap-2">
            <img className="h-12" src="./logo2.jpeg" alt="" />
            <span>ContestHub</span>
          </Link>
        </div>
        <div className="navbar-center flex-grow hidden lg:flex">
          <ul className="menu menu-horizontal menu-lg px-1">{navlinks}</ul>
        </div>
        <div className="navbar-end lg:w-[30%]">
          {user && (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  {user?.photoURL ? (
                    <img alt="user" src={user?.photoURL} />
                  ) : (
                    <FaUser />
                  )}
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li className="font-bold">{user?.displayName}</li>
                <li>
                  <Link>Settings</Link>
                </li>
                <li>
                  <Link to={"/login"} onClick={signOutUser}>
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>{" "}
    </div>
  );
};

Navbar.propTypes = {};

export default Navbar;
