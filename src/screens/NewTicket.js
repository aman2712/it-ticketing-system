import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createTicket } from "../actions/ticketActions";
import Alert from "../components/Alert";
import Loader from "../components/Loader";

const NewTicket = () => {
  const [subject, setSubject] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [department, setDepartment] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");

  const ticketCreate = useSelector((state) => state.ticketCreate);
  const { loading, error } = ticketCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  const submitHandler = () => {
    setMessage("");
    if (
      subject === "" ||
      name === "" ||
      email === "" ||
      company === "" ||
      department === "" ||
      contact === ""
    ) {
      setMessage("All fields are required");
      return;
    }
    dispatch(
      createTicket({ subject, name, email, company, department, contact })
    );
  };

  return (
    <div className="flex items-center flex-col">
      <p className="tracking-tight font-bold text-4xl mt-8">New Ticket</p>
      <div className="w-2/5">
        {error > 0 && <Alert message={error} />}
        {message.length > 0 && <Alert message={message} />}
        <input
          className="w-full outline-none border border-gray-200 mt-4 p-2"
          placeholder="Subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
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
          placeholder="Company"
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <input
          className="w-full outline-none border border-gray-200 mt-4 p-2"
          placeholder="Department"
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
        <input
          className="w-full outline-none border border-gray-200 mt-4 p-2"
          placeholder="Contact Number"
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        <button
          className="bg-slate-500 rounded px-6 py-2 block mx-auto mt-3 flex items-center text-white hover:bg-slate-600"
          onClick={submitHandler}
        >
          {loading && <Loader />}
          <p>Create</p>
        </button>
      </div>
    </div>
  );
};

export default NewTicket;
