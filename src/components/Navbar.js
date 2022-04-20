import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/userActions";

const Navbar = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  return (
    <div className="py-3 px-28 shadow-md flex justify-between items-center">
      <p className="text-2xl font-bold">Logo</p>
      <div className="flex items-center">
        <Link
          to="/"
          className="mx-5 cursor-pointer hover:text-gray-800 font-semibold text-md"
        >
          Home
        </Link>
        {!userInfo ? (
          <>
            <Link
              to="/login"
              className="mx-5 cursor-pointer hover:text-gray-800 font-semibold text-md"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="mx-5 cursor-pointer hover:text-gray-800 font-semibold text-md"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            {userInfo.isAdmin ? (
              <Link
                to="/admin-dashboard"
                className="mx-5 cursor-pointer hover:text-gray-800 font-semibold text-md"
              >
                Admin Dashboard
              </Link>
            ) : (
              <Link
                to="/dashboard"
                className="mx-5 cursor-pointer hover:text-gray-800 font-semibold text-md"
              >
                Client Dashboard
              </Link>
            )}
            <p
              onClick={() => dispatch(logout())}
              className="mx-5 cursor-pointer hover:text-gray-800 font-semibold text-md"
            >
              Logout
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
