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

export const ticketCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TICKET_CREATE_REQUEST:
      return { loading: true, success: false };
    case TICKET_CREATE_SUCCESS:
      return { loading: false, success: true };
    case TICKET_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getTicketsUserReducer = (state = { tickets: [] }, action) => {
  switch (action.type) {
    case TICKET_USER_REQUEST:
      return { loading: true };
    case TICKET_USER_SUCCESS:
      return { loading: false, tickets: action.payload };
    case TICKET_USER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getTicketsReducer = (state = { tickets: [] }, action) => {
  switch (action.type) {
    case GET_ALL_TICKETS_REQUEST:
      return { loading: true };
    case GET_ALL_TICKETS_SUCCESS:
      return { loading: false, tickets: action.payload };
    case GET_ALL_TICKETS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
