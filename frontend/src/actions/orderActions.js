import axios from "axios";
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
  ORDER_DELIVER_SUCCESS
} from "../constants/orderConstants";

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });
    const { data } = await axios.post("/api/orders", order);
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: ORDER_CREATE_FAIL, payload: error.response.data.error });
  }
};

export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/orders/${id}`);
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: ORDER_DETAILS_FAIL, payload: error.response.data.error });
  }
};

export const payOrder = (id, paymentResult) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_PAY_RESET });
    const { data } = await axios.put(`/api/orders/${id}/pay`, paymentResult);
    dispatch({ type: ORDER_PAY_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: ORDER_PAY_FAIL, payload: error.response.data.error });
  }
};

export const getMyOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ORDER_LIST_MY_REQUEST });
    const { data } = await axios.get("/api/orders/myorders");
    dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: ORDER_LIST_MY_FAIL, payload: error.response.data.error });
  }
};

export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ORDER_LIST_REQUEST });
    const { data } = await axios.get("/api/orders");
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: ORDER_LIST_FAIL, payload: error.response.data.error });
  }
};

export const deliverOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DELIVER_REQUEST });

    await axios.put(`/api/orders/${id}/deliver`);
    dispatch({ type: ORDER_DELIVER_SUCCESS });
  } catch (error) {
    dispatch({ type: ORDER_DELIVER_FAIL, payload: error.response.data.error });
  }
};
