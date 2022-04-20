import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { getTicketsOfUser } from "../actions/ticketActions";
import Alert from '../components/Alert'

const ClientDashboard = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const getTicketsUser = useSelector((state) => state.getTicketsUser);
  const { tickets, loading, error } = getTicketsUser;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo || userInfo?.isAdmin) {
      navigate("/login");
    } else {
      dispatch(getTicketsOfUser());
    }
  }, [userInfo, navigate, dispatch]);

  return (
    <div className="flex items-center flex-col">
      <h1 className="tracking-tight font-black mt-8 text-4xl">
        Welcome, {userInfo?.name}
      </h1>
      <p className="tracking-tight font-semibold mt-2 text-xl">Your tickets</p>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <Alert message={error} />
      ) : (
        <div className="w-2/4 mt-8 grid grid-cols-3 gap-2">
          {tickets?.map((ticket) => (
            <div
              className={`border border-solid mt-4 border-${ticket.status === "IN PROGRESS" ? "yellow" : "green"
                }-400 rounded-md`}
              key={ticket.shortId}
            >
              <p className="tracking-tight font-bold text-2xl text-center my-8">
                #{ticket.shortId}
              </p>
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
          <Link
            to="/ticket/new"
            className="py-10 border border-solid mt-4 border-gray-400 rounded-md flex justify-center items-center cursor-pointer hover:opacity-80 duration-200"
          >
            <p className="tracking-tight font-bold text-2xl text-center">
              Create New
            </p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ClientDashboard;
