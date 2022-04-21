import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import Loader from "../components/Loader";
import { registerUserByAdmin, nullifyUserCreated } from '../actions/userActions'

const NewUserByAdmin = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userRegisterByAdmin = useSelector((state) => state.userRegisterByAdmin)
    const { loading, error, userCreated } = userRegisterByAdmin

    const navigate = useNavigate();

    useEffect(() => {
        if (!userInfo) {
            navigate("/login");
            return;
        } else if (!userInfo.isAdmin) {
            navigate("/dashboard");
            return;
        } else if (userCreated) {
            dispatch(nullifyUserCreated())
            navigate('/admin-dashboard')
        }

    }, [userInfo, navigate, userCreated, dispatch]);

    const submitHandler = (e) => {
        e.preventDefault();
        setMessage('')
        if (name === '' || email === '' || password === '') {
            setMessage('All fields are required')
            return
        }
        dispatch(registerUserByAdmin(name, email, password));
    };

    return (
        <div className="h-[calc(100vh-56px)] flex justify-center items-center">
            <div className="shadow-md w-96 p-6 border border-solid border-gray-100">
                <p className="text-center text-3xl font-bold">Register A User</p>
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
            </div>
        </div>
    )
}

export default NewUserByAdmin