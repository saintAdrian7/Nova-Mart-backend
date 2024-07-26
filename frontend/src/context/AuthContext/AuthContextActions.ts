// authActions.ts
import axios from 'axios';
import { Action } from './AuthContextConsts';
import { LoginUserPayload, RegisterUserPayload } from '../../Models/Models';




export const LoginUser = async (dispatch: React.Dispatch<Action>, user: LoginUserPayload) => {
  dispatch({ type: 'LOGIN REQUEST' });
  try {
    const response = await axios.post('https://nova-mart-server.onrender.com/api/users/login', user);
    const currentLoggedInUser = response.data.user;
    const userId = currentLoggedInUser._id;
    if (currentLoggedInUser && currentLoggedInUser._id) {
      sessionStorage.setItem("userId", userId.toString());
      localStorage.setItem("token", response.data.token)
    } else {
      console.error("User ID not found in response");
    }

    dispatch({ type: 'LOGIN SUCCESS', payload: currentLoggedInUser });
  } catch (error) {
    console.error("Error during login:", error);
    dispatch({ type: 'LOGIN FAILURE' });
    throw error;
  }
};

export const registerUser = async (dispatch: React.Dispatch<Action>, user: RegisterUserPayload) => {
  dispatch({ type: 'REGISTER REQUEST' });
  try {
    await axios.post('https://nova-mart-server.onrender.com/api/users/register', user);
    dispatch({ type: 'REGISTER SUCCESS' });
  } catch (error) {
    dispatch({ type: 'REGISTER FAILURE' });
    throw error;
  }
};

export const fetchUser = async (dispatch: React.Dispatch<Action>, id: string) => {
  try {
    const response = await axios.get(`https://nova-mart-server.onrender.com/api/users/${id}`);
    dispatch({ type: 'LOGIN SUCCESS', payload: response.data.user });
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const Logout = async (dispatch:React.Dispatch<Action>) => {
  sessionStorage.removeItem("userId")
  localStorage.removeItem('token')
  dispatch({ type: 'LOGOUT' });

}