import axios from "axios";
import { CLEAR_CART } from "../constants/cartConstants";
import { ORDER_LIST_MY_RESET } from "../constants/orderConstants";
import {
  USER_DETAIL_FAIL,
  USER_DETAIL_REQUEST,
  USER_DETAIL_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_RESET,
  USER_DETAIL_RESET,
  USER_LIST_REQUEST,
  USER_LIST_FAIL,
  USER_LIST_SUCCESS,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_SINGLE_REQUEST,
  USER_SINGLE_SUCCESS,
  USER_SINGLE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const { data } = await axios.post("/api/users/login", { email, password });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data.data });
    localStorage.setItem("userInfo", JSON.stringify(data.data));
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL, payload: error.response.data.error });
  }
};

export const register = (email, password, name) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    const { data } = await axios.post("/api/users", { email, password, name });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data.data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data.data });
    localStorage.setItem("userInfo", JSON.stringify(data.data));
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error.response.data.error });
  }
};

export const getUserDetails = () => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAIL_REQUEST });
    const { data } = await axios.get("/api/users/profile");
    dispatch({ type: USER_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_DETAIL_FAIL, payload: error.response.data.error });
  }
};

export const updateUserDetails = (name, email, password) => async (
  dispatch
) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST });
    const { data } = await axios.put("/api/users/profile", {
      name,
      email,
      password,
    });
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data.data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data.data });
    dispatch({ type: USER_DETAIL_SUCCESS, payload: data.data });

    localStorage.setItem("userInfo", JSON.stringify(data.data));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: error.response.data.error,
    });
  }
};

export const listUser = () => async (dispatch) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });
    const { data } = await axios.get("/api/users");
    dispatch({ type: USER_LIST_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: USER_LIST_FAIL, payload: error.response.data.error });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST });
    const { data } = await axios.delete(`/api/users/${id}`);
    dispatch({ type: USER_DELETE_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({ type: USER_DELETE_FAIL, payload: error.response.data.error });
  }
};

export const getSingleUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_SINGLE_REQUEST });
    const { data } = await axios.get(`/api/users/${id}`);
    dispatch({ type: USER_SINGLE_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: USER_SINGLE_FAIL, payload: error.response.data.error });
  }
};

export const updateUser = (user) => async (dispatch) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });
    const { data } = await axios.put(`/api/users/${user._id}`, user);
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: USER_UPDATE_FAIL, payload: error.response.data.error });
  }
};

export const logout = () => (dispatch) => {
  localStorage.clear();
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: CLEAR_CART });
  dispatch({ type: ORDER_LIST_MY_RESET });
  dispatch({ type: USER_UPDATE_PROFILE_RESET });
  dispatch({ type: USER_DETAIL_RESET });
  dispatch({ type: USER_LIST_RESET });
};
