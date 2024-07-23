
import React, { useContext, createContext } from 'react';
import { User } from '../../Models/Models';
interface AuthenticationState {
    loggedInUser: User | undefined;
    ProfileUser: User | undefined;
    displayLogin: boolean;
    loading: boolean;
    error: boolean;
    registerSuccess: boolean;
  }
  
  export type Action =
    | { type: 'REGISTER REQUEST' }
    | { type: 'REGISTER SUCCESS' }
    | { type: 'REGISTER FAILURE' }
    | { type: 'LOGIN REQUEST' }
    | { type: 'LOGIN SUCCESS', payload: User }
    | { type: 'LOGIN FAILURE' }
    | { type: 'LOGOUT' }
    | { type: 'HIDE MODAL' }
    | { type: 'RESET REGISTER SUCCESS' }
    | { type: 'SHOW MODAL' };
  
export const initialState: AuthenticationState = {
    loggedInUser: undefined,
    ProfileUser: undefined,
    displayLogin: true,
    loading: false,
    error: false,
    registerSuccess: false,
  };
  
  export const AuthContext = createContext<{
    state: AuthenticationState;
    dispatch: React.Dispatch<Action>;
  }>({ state: initialState, dispatch: () => null });
  
  export const AuthReducer = (state: AuthenticationState, action: Action): AuthenticationState => {
    switch (action.type) {
      case 'REGISTER REQUEST':
        return { ...state, loading: true, error: false, registerSuccess: false };
      case 'REGISTER SUCCESS':
        return { ...state, loading: false, error: false, registerSuccess: true };
      case 'REGISTER FAILURE':
        return { ...state, loading: false, error: true, registerSuccess: false };
      case 'LOGIN REQUEST':
        return { ...state, loading: true, error: false, registerSuccess: false };
      case 'LOGIN SUCCESS':
        return { ...state, loading: false, error: false, registerSuccess: false, loggedInUser: action.payload };
      case 'LOGIN FAILURE':
        return { ...state, loading: false, error: true, registerSuccess: false };
      case 'LOGOUT':
        return { ...state, loggedInUser: undefined, ProfileUser: undefined };
      case 'HIDE MODAL':
        return { ...state, displayLogin: false };
      case 'SHOW MODAL':
        return { ...state, displayLogin: true };
      default:
        return state;
    }
  };
  export const useAuth = () => useContext(AuthContext);