import {
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_SUCCESS,
  PRODUCT_TOP_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
} from "../constants/productConstants";
import axios from "axios";

export const listProducts = (keyword = "", page = 1) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get(
      `/api/products?filter=${keyword}&page=${page}`
    );
    dispatch({ type: PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: "error" });
  }
};

export const getProductById = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAIL_REQUEST });
    const { data } = await axios.get(`/api/products/${id}`);
    if (data.success && !data.data) {
      dispatch({ type: PRODUCT_DETAIL_FAIL, payload: "Product Not Found" });
    }
    if (data.success && data.data) {
      dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: data.data });
    }
  } catch (error) {
    dispatch({ type: PRODUCT_DETAIL_FAIL, payload: error.response.data.error });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });
    await axios.delete(`/api/products/${id}`);
    dispatch({ type: PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    dispatch({ type: PRODUCT_DELETE_FAIL });
  }
};

export const getProductTop = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_TOP_REQUEST });
    const { data } = await axios.get("/api/products/top");
    dispatch({ type: PRODUCT_TOP_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: PRODUCT_TOP_FAIL, payload: error.response.data.error });
  }
};
