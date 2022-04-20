import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import Loader from "../components/Loader";
import { login } from "../actions/userActions";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      if (userInfo.isAdmin) {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    setMessage("");
    if (email === "" || password === "") {
      setMessage("All fields are required");
      return;
    }
    dispatch(login(email, password));
  };

  return (
    <div className="h-[calc(100vh-56px)] flex justify-center items-center">
      <div className="shadow-md w-96 p-6 border border-solid border-gray-100">
        <p className="text-center text-3xl font-bold">Login</p>
        {error && <Alert variant="danger" message={error} />}
        {message.length > 0 && <Alert variant="danger" message={message} />}
        <input
          className="w-full outline-none border border-gray-200 mt-4 p-2"
          placeholder="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full outline-none border border-gray-200 mt-4 p-2"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-slate-500 rounded px-4 py-1 block mx-auto mt-3 flex items-center text-white hover:bg-slate-600"
          onClick={submitHandler}
        >
          {loading && <Loader />}
          <p>Login</p>
        </button>
        <p className="text-sm mt-6 text-center">
          Not Registered?{" "}
          <Link to="/register" className="text-gray-900 hover:text-black">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
