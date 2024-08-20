import React, { createContext, useReducer } from 'react';
import {
  DEPARTMENT_LIST_FAIL,
  DEPARTMENT_LIST_REQUEST,
  DEPARTMENT_LIST_SUCCESS,
  APPOINTMENT_ADD_ITEM,
  APPOINTMENT_CLEAR,
  APPOINTMENT_CREATE_FAIL,
  APPOINTMENT_CREATE_REQUEST,
  APPOINTMENT_CREATE_SUCCESS,
  APPOINTMENT_LIST_FAIL,
  APPOINTMENT_LIST_REQUEST,
  APPOINTMENT_LIST_SUCCESS,
  APPOINTMENT_QUEUE_LIST_FAIL,
  APPOINTMENT_QUEUE_LIST_REQUEST,
  APPOINTMENT_LIST_SUCCESS,
  APPOINTMENT_REMOVE_ITEM,
  APPOINTMENT_SET_PAYMENT_TYPE,
  APPOINTMENT_SET_TYPE,
  SERVICE_LIST_FAIL,
  SERVICE_LIST_REQUEST,
  SERVICE_LIST_SUCCESS,
  SCREEN_SET_WIDTH,
} from './constants';

export const Service = createContext();

const initialState = {
  widthScreen: false,
  departmentList: { loading: true },
  serviceList: { loading: true },
  queueList: { loading: true },
  appointment: {
    appointmentType: 'Eat in',
    appointmentItems: [],
    paymentType: 'Pay here',
  },
  appointmentCreate: { loading: true },

  appointmentList: { loading: true },
};

function reducer(state, action) {
  switch (action.type) {
    case SCREEN_SET_WIDTH:
      return {
        ...state,
        widthScreen: true,
      };
    case DEPARTMENT_LIST_REQUEST:
      return { ...state, departmentList: { loading: true } };
    case DEPARTMENT_LIST_SUCCESS:
      return {
        ...state,
        departmentList: { loading: false, departments: action.payload },
      };
    case DEPARTMENT_LIST_FAIL:
      return {
        ...state,
        departmentList: { loading: false, error: action.payload },
      };
    case SERVICE_LIST_REQUEST:
      return { ...state, serviceList: { loading: true } };
    case SERVICE_LIST_SUCCESS:
      return {
        ...state,
        serviceList: { loading: false, products: action.payload },
      };
    case SERVICE_LIST_FAIL:
      return {
        ...state,
        serviceList: { loading: false, error: action.payload },
      };
    case APPOINTMENT_SET_TYPE:
      return {
        ...state,
        appointment: { ...state.appointment, appointmentType: action.payload },
      };
    case APPOINTMENT_SET_PAYMENT_TYPE:
      return {
        ...state,
        appointment: { ...state.appointment, paymentType: action.payload },
      };
    case APPOINTMENT_ADD_ITEM: {
      const item = action.payload;
      const existItem = state.appointment.appointmentItems.find(
        (x) => x.name === item.name
      );
      const appointmentItems = existItem
        ? state.appointment.appointmentItems.map((x) =>
            x.name === existItem.name ? item : x
          )
        : [...state.appointment.appointmentItems, item];

      const itemsCount = appointmentItems.reduce((a, c) => a + c.quantity, 0);
      const itemsPrice = appointmentItems.reduce(
        (a, c) => a + c.quantity * c.price,
        0
      );
      const taxPrice = Math.round(0.15 * itemsPrice * 100) / 100;
      const totalPrice = Math.round((itemsPrice + taxPrice) * 100) / 100;

      return {
        ...state,
        appointment: {
          ...state.appointment,
          appointmentItems,
          taxPrice,
          totalPrice,
          itemsCount,
        },
      };
    }
    case APPOINTMENT_REMOVE_ITEM: {
      const appointmentItems = state.appointment.appointmentItems.filter(
        (x) => x.name !== action.payload.name
      );
      const itemsCount = appointmentItems.reduce((a, c) => a + c.quantity, 0);
      const itemsPrice = appointmentItems.reduce(
        (a, c) => a + c.quantity * c.price,
        0
      );
      const taxPrice = Math.round(0.15 * itemsPrice * 100) / 100;
      const totalPrice = Math.round((itemsPrice + taxPrice) * 100) / 100;

      return {
        ...state,
        appointment: {
          ...state.appointment,
          appointmentItems,
          taxPrice,
          totalPrice,
          itemsCount,
        },
      };
    }

    case APPOINTMENT_CLEAR:
      return {
        ...state,
        appointment: {
          appointmentItems: [],
          taxPrice: 0,
          totalPrice: 0,
          itemsCount: 0,
        },
      };

    case APPOINTMENT_CREATE_REQUEST:
      return { ...state, appointmentCreate: { loading: true } };
    case APPOINTMENT_CREATE_SUCCESS:
      return {
        ...state,
        appointmentCreate: { loading: false, newAppointment: action.payload },
      };
    case APPOINTMENT_CREATE_FAIL:
      return {
        ...state,
        appointmentCreate: { loading: false, error: action.payload },
      };
    case APPOINTMENT_LIST_REQUEST:
      return { ...state, appointmentList: { loading: true } };
    case APPOINTMENT_LIST_SUCCESS:
      return {
        ...state,
        appointmentList: { loading: false, appointments: action.payload },
      };
    case APPOINTMENT_LIST_FAIL:
      return {
        ...state,
        appointmentList: { loading: false, error: action.payload },
      };

    case APPOINTMENT_QUEUE_LIST_REQUEST:
      return { ...state, queueList: { loading: true } };
    case APPOINTMENT_QUEUE_LIST_SUCCESS:
      return {
        ...state,
        queueList: { loading: false, queue: action.payload },
      };
    case APPOINTMENT_QUEUE_LIST_FAIL:
      return {
        ...state,
        queueList: { loading: false, error: action.payload },
      };
    default:
      return state;
  }
}

export function ServiceProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <Service.Provider value={value}>{props.children}</Service.Provider>;
}