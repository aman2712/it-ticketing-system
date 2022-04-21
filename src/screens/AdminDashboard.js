import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { getAllTickets } from "../actions/ticketActions";
import Alert from "../components/Alert";
import Modal from "react-modal";
import axios from "axios";
import url from "../utils/apiUrl";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "500px",
  },
};

const AdminDashboard = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentTicket, setCurrentTicket] = useState({});

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const getTickets = useSelector((state) => state.getTickets);
  const { tickets, loading, error } = getTickets;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
      return;
    } else {
      if (!userInfo.isAdmin) {
        navigate("/dashboard");
        return;
      }
    }

    dispatch(getAllTickets());
  }, [userInfo, navigate, dispatch]);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleModalOpen(ticket) {
    setCurrentTicket(ticket);
    openModal();
  }

  const handleStatusChange = async (e) => {
    console.log({ status: e.target.value, ticketId: currentTicket._id })
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `${url}/api/tickets/status`,
      { status: e.target.value, ticketId: currentTicket._id },
      config
    )

    // FIX
    if (data.message === 'Updated') {
      window.location.reload()
    }
  };

  return (
    <div className="flex items-center flex-col relative">
      <h1 className="tracking-tight font-black mt-8 text-4xl">
        Admin Dashboard
      </h1>
      <p className="tracking-tight font-semibold mt-2 text-xl">
        All issued tickets
      </p>
      <Link to='/new-user-admin'>
        <button className="bg-slate-500 rounded px-4 py-1 block mx-auto mt-3 flex items-center text-white hover:bg-slate-600 absolute top-1 right-5">
          Create a User
        </button>
      </Link>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <Alert message={error} />
      ) : (
        <div className="w-2/4 mt-8 grid grid-cols-3 gap-2">
          {tickets?.map((ticket) => (
            <div
              className={`border border-solid mt-4 border-${ticket.status === "IN PROGRESS" ? "yellow" : "green"
                }-400 rounded-md cursor-pointer`}
              key={ticket.shortId}
              onClick={() => handleModalOpen(ticket)}
            >
              <p className="tracking-tight font-bold text-2xl text-center mt-8">
                #{ticket.shortId}
              </p>
              <p className="mb-6 text-center">User: {ticket.name}</p>
              <div
                className={`bg-${ticket.status === "IN PROGRESS" ? "yellow" : "green"
                  }-400 py-1`}
              >
                <p className="text-sm text-center text-uppercase">
                  {ticket.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <p className="text-center font-bold text-xl">
          Ticket: {currentTicket.shortId}
        </p>
        <div className="flex items-center mt-4">
          <p className="font-bold text-lg">Subject: </p>
          <p>&nbsp;&nbsp;{currentTicket.subject}</p>
        </div>
        <div className="flex items-center mt-2">
          <p className="font-bold text-lg">Name: </p>
          <p>&nbsp;&nbsp;{currentTicket.name}</p>
        </div>
        <div className="flex items-center mt-2">
          <p className="font-bold text-lg">Email: </p>
          <p>&nbsp;&nbsp;{currentTicket.email}</p>
        </div>
        <div className="flex items-center mt-2">
          <p className="font-bold text-lg">Company: </p>
          <p>&nbsp;&nbsp;{currentTicket.company}</p>
        </div>
        <div className="flex items-center mt-2">
          <p className="font-bold text-lg">Department: </p>
          <p>&nbsp;&nbsp;{currentTicket.department}</p>
        </div>
        <div className="flex items-center mt-2">
          <p className="font-bold text-lg">Contact: </p>
          <p>&nbsp;&nbsp;{currentTicket.contact}</p>
        </div>
        <div className="flex items-center mt-2">
          <p className="font-bold text-lg">Status:&nbsp;&nbsp;</p>
          <select
            defaultValue={currentTicket.status}
            className="border border-solid border-gray-500 outline-none"
            onChange={handleStatusChange}
          >
            <option value="IN PROGRESS">IN PROGRESS</option>
            <option value="RESOLVED">RESOLVED</option>
          </select>
        </div>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
