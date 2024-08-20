import Axios from 'axios';
import {
  APPOINTMENT_SET_TYPE,
  DEPARTMENT_LIST_REQUEST,
  DEPARTMENT_LIST_FAIL,
  DEPARTMENT_LIST_SUCCESS,
  APPOINTMENT_CREATE_REQUEST,
  APPOINTMENT_CREATE_SUCCESS,
  APPOINTMENT_LIST_FAIL,
  APPOINTMENT_ADD_ITEM,
  APPOINTMENT_REMOVE_ITEM,
  APPOINTMENT_CLEAR,
  APPOINTMENT_SET_PAYMENT_TYPE,
  APPOINTMENT_LIST_REQUEST,
  APPOINTMENTS_LIST_SUCCESS,
  APPOINTMENT_QUEUE_LIST_REQUEST,
  APPOINTMENT_QUEUE_LIST_SUCCESS,
  APPOINTMENT_QUEUE_LIST_FAIL,
  SERVICE_LIST_REQUEST,
  SCREEN_SET_WIDTH,
  SERVICE_LIST_SUCCESS,
  SERVICE_LIST_FAIL,
  APPOINTMENT_CREATE_FAIL,
} from './constants';

export const setAppointmentType = (dispatch, appointmentType) => {
  return dispatch({
    type: APPOINTMENT_SET_TYPE,
    payload: appointmentType,
  });
};

export const listDepartments = async (dispatch) => {
  dispatch({ type: DEPARTMENT_LIST_REQUEST });
  try {
    const { data } = await Axios.get('/api/departments');
    return dispatch({
      type: DEPARTMENT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    return dispatch({
      type: DEPARTMENT_LIST_FAIL,
      payload: error.message,
    });
  }
};

export const listServices = async (dispatch, departmentName = '') => {
  dispatch({ type: SERVICE_LIST_REQUEST });
  try {
    const { data } = await Axios.get(`/api/services?department=${departmentName}`);
    return dispatch({
      type: SERVICE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    return dispatch({
      type: SERVICE_LIST_FAIL,
      payload: error.message,
    });
  }
};

export const addToAppointment = async (dispatch, service) => {
  return dispatch({
    type: APPOINTMENT_ADD_ITEM,
    payload: service,
  });
};

export const removeFromAppointment = async (dispatch, service) => {
  return dispatch({
    type: APPOINTMENT_REMOVE_ITEM,
    payload: service,
  });
};

export const clearAppointment = async (dispatch) => {
  return dispatch({
    type: APPOINTMENT_CLEAR,
  });
};

export const setPaymentType = async (dispatch, paymentType) => {
  return dispatch({
    type: APPOINTMENT_SET_PAYMENT_TYPE,
    payload: paymentType,
  });
};

export const createAppointment = async (dispatch, apppointment) => {
  dispatch({ type: APPOINTMENT_CREATE_REQUEST });
  try {
    const { data } = await Axios.post('/api/appointments', apppointment);
    dispatch({
      type: APPOINTMENT_CREATE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: APPOINTMENT_CLEAR,
    });
  } catch (error) {
    dispatch({
      type: APPOINTMENT_CREATE_FAIL,
      payload: error.message,
    });
  }
};

export const listAppointments = async (dispatch) => {
  dispatch({ type: SCREEN_SET_WIDTH });
  dispatch({ type: APPOINTMENT_LIST_REQUEST });
  try {
    const { data } = await Axios.get(`/api/appointments`);
    return dispatch({
      type: APPOINTMENTS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    return dispatch({
      type: APPOINTMENT_LIST_FAIL,
      payload: error.message,
    });
  }
};

export const listQueue = async (dispatch) => {
  dispatch({ type: SCREEN_SET_WIDTH });
  dispatch({ type: APPOINTMENT_QUEUE_LIST_REQUEST });
  try {
    const { data } = await Axios.get(`/api/appointment/queue`);
    return dispatch({
      type: APPOINTMENT_QUEUE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    return dispatch({
      type: APPOINTMENT_QUEUE_LIST_FAIL,
      payload: error.message,
    });
  }
};