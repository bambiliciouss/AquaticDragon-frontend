import axios from "axios";

import {
  CREATE_STOREBRANCH_REQUEST,
  CREATE_STOREBRANCH_SUCCESS,
  CREATE_STOREBRANCH_FAIL,
  ALL_STOREBRANCH_REQUEST,
  ALL_STOREBRANCH_SUCCESS,
  ALL_STOREBRANCH_FAIL,
  CLEAR_ERRORS,
} from "../constants/storebranchConstants";

export const createStoreBranch = (storeBranch) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_STOREBRANCH_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/v1/register/storebranch",
      storeBranch,
      config
    );
    dispatch({
      type: CREATE_STOREBRANCH_SUCCESS,
      payload: data.storeBranch,
    });
  } catch (error) {
    dispatch({
      type: CREATE_STOREBRANCH_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

export const allStoreBranch = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_STOREBRANCH_REQUEST });
    const { data } = await axios.get(`/api/v1/admin/storebranch`);
    dispatch({
      type: ALL_STOREBRANCH_SUCCESS,
      payload: data.storeBranch,
    });
  } catch (error) {
    dispatch({
      type: ALL_STOREBRANCH_FAIL,
      payload: error.response.data.message,
    });
  }
};

