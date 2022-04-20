import axios from "axios";
import {
  TICKET_CREATE_FAIL,
  TICKET_CREATE_REQUEST,
  TICKET_CREATE_SUCCESS,
  TICKET_USER_FAIL,
  TICKET_USER_REQUEST,
  TICKET_USER_SUCCESS,
  GET_ALL_TICKETS_FAIL,
  GET_ALL_TICKETS_REQUEST,
  GET_ALL_TICKETS_SUCCESS,
} from "../constants/ticketConstants";

import { logout } from "./userActions";

import url from "../utils/apiUrl";

export const createTicket = (details) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TICKET_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };

    await axios.post(
      `${url}/api/tickets/new`,
      { ...details, userId: userInfo._id },
      config
    );

    dispatch({
      type: TICKET_CREATE_SUCCESS,
    });

    document.location.href = "/dashboard";
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: TICKET_CREATE_FAIL,
      payload: message,
    });
  }
};

export const getTicketsOfUser = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: TICKET_USER_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${url}/api/tickets/user`, config);

    dispatch({
      type: TICKET_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: TICKET_USER_FAIL,
      payload: message,
    });
  }
};

export const getAllTickets = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_ALL_TICKETS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${url}/api/tickets`, config);

    dispatch({
      type: GET_ALL_TICKETS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: GET_ALL_TICKETS_FAIL,
      payload: message,
    });
  }
};
