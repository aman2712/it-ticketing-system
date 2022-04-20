import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import Loader from "../components/Loader";
import { register } from '../actions/userActions'

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState('')

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard");
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    setMessage('')
    if(name === '' || email === '' || password === ''){
      setMessage('All fields are required')
      return
    }
    dispatch(register(name, email, password));
  };

  return (
    <div className="h-[calc(100vh-56px)] flex justify-center items-center">
      <div className="shadow-md w-96 p-6 border border-solid border-gray-100">
        <p className="text-center text-3xl font-bold">Register</p>
        {error && <Alert variant='danger' message={error} />}
        {message.length > 0 && <Alert variant='danger' message={message} />}
        <input
          className="w-full outline-none border border-gray-200 mt-4 p-2"
          placeholder="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          <p>Register</p>
        </button>
        <p className="text-sm mt-6 text-center">
          Already Registered?{" "}
          <Link to="/login" className="text-gray-900 hover:text-black">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterScreen;
